import type {
    IPollFunctions,
    IDataObject,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

import {
    NodeConnectionType,
    NodeOperationError
} from 'n8n-workflow';

import {
    getProspectProTags,
    getProspectProAudiences,
    getProspectProOwners,
    apiRequest,
} from './GenericFunctions';

import type {
	ProspectProStaticData,
} from './ProspectPro.types';

export class ProspectproTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'ProspectPro Trigger',
        name: 'prospectproTrigger',
        icon: 'file:logo.svg',
        group: ['trigger'],
        version: 1,
        subtitle:
			'={{($parameter["event"] === "contactUpsert" || $parameter["event"] === "contactInsert") ? "Contacts" : "Prospects"}} - {{($parameter["event"] === "contactInsert" || $parameter["event"] === "prospectInsert") ? "Added" : "Added or Updated"}} — {{$metadata["lastTimeCheckedSeconds"] ? "Last check: " + new Date($metadata["lastTimeCheckedSeconds"] * 1000).toLocaleString() : "Polling..."}}',
        description:
			'Triggers when new prospects or contacts are found or existing ones are updated in ProspectPro.',
        defaults: {
            name: 'ProspectPro Trigger',
        },
        polling: true,
        inputs: [],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'prospectproApi',
                required: true,
            },
        ],
        properties: [
            {
				displayName: 'Trigger On',
				name: 'event',
				type: 'options',
				description: 'What event should trigger the workflow',
				options: [
					{
						name: 'Prospect Added or Updated',
						value: 'prospectUpsert',
					},
					{
						name: 'Prospect Added',
						value: 'prospectInsert',
					},
					{
						name: 'Contact Added or Updated',
						value: 'contactUpsert',
					},
					{
						name: 'Contact Added',
						value: 'contactInsert',
					},
				],
				default: 'prospectUpsert',
				required: true,
			},
            {
                displayName: 'Qualification Status',
                name: 'label',
                type: 'options',
                default: 666,
                options: [
                    { name: 'All', value: 666 },
                    { name: 'Qualified', value: 1 },
                    { name: 'Disqualified', value: 0 },
                    { name: 'Not Qualified', value: -1 },
                ],
                description: 'Filter Prospects by their qualification status',
				displayOptions: {
					show: {
						event: ['prospectUpsert', 'prospectInsert'],
					},
				},
            },
            {
                displayName: 'Tag Names or IDs',
                name: 'tags',
                type: 'multiOptions',
                typeOptions: {
                    loadOptionsMethod: 'getTags',
                },
                default: [],
                description: 'Filter Prospects by Tags. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				displayOptions: {
					show: {
						event: ['prospectUpsert', 'prospectInsert'],
					},
				},
            },
            {
                displayName: 'Audience Names or IDs',
                name: 'audiences',
                type: 'multiOptions',
                typeOptions: {
                    loadOptionsMethod: 'getAudiences',
                },
                default: [],
                description: 'Filter Prospects by Audiences (uses "lists" API parameter). Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				displayOptions: {
					show: {
						event: ['prospectUpsert', 'prospectInsert'],
					},
				},
            },
            {
                displayName: 'Owner Name or ID',
                name: 'owner',
                type: 'options',
                typeOptions: {
                    loadOptionsMethod: 'getOwners',
                },
                default: '',
                description: 'Filter Prospects by owner (uses "owner" API parameter). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				displayOptions: {
					show: {
						event: ['prospectUpsert', 'prospectInsert'],
					},
				},
            },
			{
				displayName: 'Company ID',
				name: 'companyId',
				type: 'string',
				default: '',
				description: 'Filter Contacts by Company/Prospect ID',
				displayOptions: {
					show: {
						event: ['contactUpsert', 'contactInsert'],
					},
				},
			},
        ],
    };

    methods = {
        loadOptions: {
            getTags: getProspectProTags,
            getAudiences: getProspectProAudiences,
            getOwners: getProspectProOwners,
        },
    };


    async poll(this: IPollFunctions): Promise<INodeExecutionData[][] | null> {
		const workflowData = this.getWorkflowStaticData('node') as ProspectProStaticData;
		const event = this.getNodeParameter('event') as string;
		const nowInSeconds = Math.floor(Date.now() / 1000);
		const isManualMode = this.getMode() === 'manual';

		// Helper function for parsing item times
		const parseItemTime = (item: IDataObject, timeField: string, isContact: boolean): number => {
			const time = item[timeField];
			return isContact ? (parseInt(time as string) || 0) : (time as number || 0);
		};

		// Helper function for fetching items from API
		const fetchItems = async (
			endpoint: '/prospects' | '/contacts',
			fromTime?: number,
			useInsertedTime = false,
			lastSeenIds: string[] = []
		): Promise<IDataObject[]> => {
			const maxRows = (isManualMode || !fromTime) ? 5 : 500;

			const qs: IDataObject = {
				no_header: 1,
				sort_by: useInsertedTime ? 'inserted_time' : 'changed_time',
				sort_order: 'asc',
				rows: maxRows,
			};

			if (!isManualMode && fromTime) {
				if (useInsertedTime) {
					// For insert events, use exclusive (original behavior) since items only inserted once
					qs.from_inserted_time = fromTime + 1;
				} else {
					// For upsert events, use inclusive to prevent missing same-timestamp items
					qs.from_changed_time = fromTime;
				}
			}

			// Add endpoint-specific filters
			if (endpoint === '/prospects') {
				const label = this.getNodeParameter('label', 666) as number;
				if (label !== 666) qs.label = label;

				const tags = this.getNodeParameter('tags', []) as string[];
				if (tags.length > 0) qs.tags = tags.join(',');

				const audiences = this.getNodeParameter('audiences', []) as string[];
				if (audiences.length > 0) qs.lists = audiences.join(',');

				const owner = this.getNodeParameter('owner', '') as string;
				if (owner !== '') qs.owner = owner;
			} else {
				const companyId = this.getNodeParameter('companyId', '') as string;
				if (companyId !== '') qs.company_id = companyId;
			}

			// const qsString = Object.entries(qs).map(([k, v]) => `${k}=${v}`).join('&');
			// this.logger.info(`API Request: ${endpoint}?${qsString}`);
			const response = await apiRequest.call(this, 'GET', endpoint, {}, qs);
			// this.logger.info(`API Response found: ${response?.found || response?.length || 0} items`);

			let items: IDataObject[];
			if (Array.isArray(response)) {
				items = response;
			} else if (endpoint === '/prospects') {
				items = response?.companies || response?.prospects || response?.data || [];
			} else {
				items = response?.contacts || response?.data || [];
			}

			if (!Array.isArray(items)) {
				this.logger.warn(`Unexpected response structure from ProspectPro API: ${JSON.stringify(response)}`);
				items = [];
			}

			// Manual sort as backup to ensure consistent ascending order
			const timeField = useInsertedTime ? 'inserted_time' : 'changed_time';
			const isContact = endpoint === '/contacts';
			items.sort((a, b) => {
				const timeA = parseItemTime(a, timeField, isContact);
				const timeB = parseItemTime(b, timeField, isContact);
				return timeA - timeB; // Ascending order (oldest first, newest last)
			});

			// For upsert events, filter out items we've already seen at the exact same timestamp
			if (!useInsertedTime && fromTime && lastSeenIds.length > 0) {
				items = items.filter(item => {
					const itemTime = parseItemTime(item, timeField, isContact);
					const itemId = String(item.id || item.company_id || item.contact_id || '');

					// If it's at the exact same timestamp as our last poll AND we've seen this ID before, skip it
					if (itemTime === fromTime && itemId && lastSeenIds.includes(itemId)) {
						return false;
					}
					return true;
				});
			}

			// After sorting ascending (oldest -> newest)
			// this.logger.info(`API items: ${items.length}`);

			// Return newest 5 in manual mode, otherwise oldest->newest window for polling
			return (isManualMode || !fromTime)
				? items.slice(-maxRows)   // newest N
				: items.slice(0, maxRows);
		};

		try {
			const isContactEvent = event === 'contactUpsert' || event === 'contactInsert';
			const isInsertMode = event === 'contactInsert' || event === 'prospectInsert';
			const endpoint = isContactEvent ? '/contacts' : '/prospects';
			const stateKey = isContactEvent
				? (isInsertMode ? 'contactsInserted' : 'contacts')
				: (isInsertMode ? 'prospectsInserted' : 'prospects');

			// Initialize state if needed
			if (!workflowData[stateKey]) {
				workflowData[stateKey] = { lastPolledTimeSeconds: nowInSeconds, lastIdsAtTime: [] };
			}

			const state = workflowData[stateKey]!;
			const lastPolledTime = state.lastPolledTimeSeconds || nowInSeconds;
			const lastSeenIds = state.lastIdsAtTime || [];

			// Fetch items using the helper function
			const items = await fetchItems(
				endpoint,
				isManualMode ? undefined : lastPolledTime,
				isInsertMode,
				lastSeenIds
			);

			// In manual mode, return items directly for testing
			if (isManualMode) {
				return items.length > 0 ? [this.helpers.returnJsonArray(items)] : null;
			}

			// First run - initialize with current time and return null (don't process historical data)
			if (lastPolledTime === nowInSeconds) {
				state.lastPolledTimeSeconds = nowInSeconds;
				state.lastIdsAtTime = [];
				return null;
			}

			if (!items || items.length === 0) {
				// Do not jump to "now" or you'll skip late arrivals at the same second.
				// If we're stuck on an upsert second where we've already seen all returned IDs,
				// nudge forward by one second to ensure progress without pagination.
				if (!isInsertMode && (state.lastIdsAtTime?.length ?? 0) > 0) {
					state.lastPolledTimeSeconds = (lastPolledTime || nowInSeconds) + 1;
					state.lastIdsAtTime = []; // reset to avoid cross-second filtering
				} else {
					state.lastPolledTimeSeconds = lastPolledTime || nowInSeconds;
					state.lastIdsAtTime = []; // also safe to clear when staying put
				}
				return null;
			}

			// After manual sort in ascending order, last item has the newest timestamp
			const timeField = isInsertMode ? 'inserted_time' : 'changed_time';
			const latestItem = items[items.length - 1];
			const newLastPolledTimeSeconds = parseItemTime(latestItem, timeField, isContactEvent);

			// Update timestamp and IDs for next poll
			if (newLastPolledTimeSeconds > lastPolledTime) {
				state.lastPolledTimeSeconds = newLastPolledTimeSeconds;
				// Track IDs at the newest timestamp (helps avoid dupes on upserts)
				state.lastIdsAtTime = !isInsertMode
					? items
							.filter(it => parseItemTime(it, timeField, isContactEvent) === newLastPolledTimeSeconds)
							.map(it => String(it.id || it.company_id || it.contact_id || ''))
							.filter(Boolean)
					: [];
			} else if (newLastPolledTimeSeconds === lastPolledTime) {
				// Stay on the same second and accumulate seen IDs (upserts only)
				if (!isInsertMode) {
					const seen = new Set(state.lastIdsAtTime || []);
					for (const it of items) {
						if (parseItemTime(it, timeField, isContactEvent) === lastPolledTime) {
							const id = String(it.id || it.company_id || it.contact_id || '');
							if (id) seen.add(id);
						}
					}
					state.lastIdsAtTime = Array.from(seen);
				}
				state.lastPolledTimeSeconds = lastPolledTime; // do NOT jump to now
			} else {
				// newLast < lastPolledTime: ignore
			}

			return [this.helpers.returnJsonArray(items)];

		} catch (error) {
			const node = this.getNode();
			const errorMessage = error instanceof Error ? error.message : String(error);
			this.logger.error(`API request failed in ${node.name}: ${errorMessage}`, { error });

			const stateKey = event === 'contactUpsert' ? 'contacts'
				: event === 'contactInsert' ? 'contactsInserted'
				: event === 'prospectInsert' ? 'prospectsInserted'
				: 'prospects';

			if (isManualMode || !workflowData[stateKey]?.lastPolledTimeSeconds) {
				if (error instanceof NodeOperationError) {
					throw error;
				}
				if (error instanceof Error) {
					throw new NodeOperationError(node, error, { description: error.message });
				}
				throw new NodeOperationError(
					node,
					new Error('Unknown API error during ProspectPro request.'),
					{ description: 'Unknown API error during ProspectPro request.' },
				);
			}
			return null;
		}
	}
}
