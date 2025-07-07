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

export class ProspectproTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'ProspectPro Trigger',
        name: 'prospectproTrigger',
        icon: 'file:logo.svg',
        group: ['trigger'],
        version: 1,
        subtitle: '={{$metadata["lastTimeCheckedSeconds"] ? "Last check: " + new Date($metadata["lastTimeCheckedSeconds"] * 1000).toLocaleString() : "Polling for prospects"}}',
        description: 'Triggers when new prospects are found or existing ones are updated in ProspectPro.',
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
				description:
					"Triggered when a prospect is added or updated.",
				options: [
					{
						name: 'Prospect Added or Updated',
						value: 'prospectUpsert',
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
            },
            {
                displayName: 'Owner Name or ID',
                name: 'owner',
                type: 'options',
                required: false,
                typeOptions: {
                    loadOptionsMethod: 'getOwners',
                },
                default: '',
                description: 'Filter Prospects by owner (uses "owner" API parameter). Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
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
        const workflowData = this.getWorkflowStaticData('node');
        let lastPolledTimeSeconds = workflowData.lastPolledTimeSeconds as number | undefined;
        const nowInSeconds = Math.floor(Date.now() / 1000);
        lastPolledTimeSeconds = lastPolledTimeSeconds || nowInSeconds;

        const qs: IDataObject = {
            no_header: 1,
            sort_by: 'changed_time',
            sort_order: 'asc',
            rows: 100,
        };

        if (this.getMode() === 'manual') {
            qs.rows = 5;
        } else if (lastPolledTimeSeconds) {
            qs.from_changed_time = lastPolledTimeSeconds;
        }

        const label = this.getNodeParameter('label', 666) as number;
        if (label !== 666) {
            qs.label = label;
        }

        const tags = this.getNodeParameter('tags', []) as string[];
        if (tags.length > 0) {
            qs.tags = tags.join(',');
        }

        const audiences = this.getNodeParameter('audiences', []) as string[];
        if (audiences.length > 0) {
            qs.lists = audiences.join(',');
        }

        const owner = this.getNodeParameter('owner', '') as string;
        if (owner !== '') {
            qs.owner = owner;
        }

        let prospects: IDataObject[] = [];

        try {
            const response = await apiRequest.call(this, 'GET', '/prospects', {}, qs);

            if (Array.isArray(response)) {
                prospects = response as IDataObject[];
            } else if (response && typeof response === 'object' && Array.isArray((response as IDataObject).data)) {
                prospects = (response as IDataObject).data as IDataObject[];
            } else if (response && typeof response === 'object' && Array.isArray((response as IDataObject).prospects)) {
                 prospects = (response as IDataObject).prospects as IDataObject[];
            } else if (response === null || (typeof response === 'object' && Object.keys(response).length === 0) ) {
                prospects = [];
            } else {
                this.logger.warn(`Unexpected response structure from ProspectPro API: ${JSON.stringify(response)}`);
                prospects = [];
            }

        } catch (error) {
            const node = this.getNode();
            const errorMessage = (error instanceof Error) ? error.message : String(error);
            this.logger.error(`API request failed in ${node.name}: ${errorMessage}`, { error });

            if (this.getMode() === 'manual' || !lastPolledTimeSeconds) {
                if (error instanceof NodeOperationError) {
                    throw error;
                }
                if (error instanceof Error) {
                    throw new NodeOperationError(node, error, {description: error.message});
                }
                throw new NodeOperationError(node, new Error('Unknown API error during ProspectPro request.'), {description: 'Unknown API error during ProspectPro request.'});
            }
            return null;
        }

        if (this.getMode() === 'manual') {
            return [this.helpers.returnJsonArray(prospects)];
        }

        if (!prospects || prospects.length === 0) {
            workflowData.lastPolledTimeSeconds = nowInSeconds;
            return null;
        }

        const latestProspectInBatch = prospects[prospects.length - 1];
        const newLastPolledTimeSeconds = (latestProspectInBatch.changed_time as number) || 0;

        let itemsToReturn = prospects;

        if (lastPolledTimeSeconds) {
            itemsToReturn = prospects.filter(prospect => {
                const changedTime = prospect.changed_time as number;
                return changedTime && changedTime > lastPolledTimeSeconds!;
            });
        }

        if (newLastPolledTimeSeconds > lastPolledTimeSeconds) {
            workflowData.lastPolledTimeSeconds = newLastPolledTimeSeconds;
        } else {
            workflowData.lastPolledTimeSeconds = nowInSeconds;
        }

        if (itemsToReturn.length === 0) {
            return null;
        }
        return [this.helpers.returnJsonArray(itemsToReturn)];
    }
}