import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType
} from 'n8n-workflow';

import {
	getProspectProTags,
	getProspectProAudiences,
	getProspectProOwners,
} from './GenericFunctions';

import { prospectsGetOperationProperties } from './ProspectsGet.properties';
import { prospectsPatchOperationProperties } from './ProspectsPatch.properties';
import { prospectsGetManyOperationProperties } from './ProspectsGetMany.properties';
import { pageviewsGetManyOperationProperties } from './PageviewsGetMany.properties';
import { contactsGetManyOperationProperties } from './ContactsGetMany.properties';
import { contactsCreateOperationProperties } from './ContactsCreate.properties';
import { contactsUpdateOperationProperties } from './ContactsUpdate.properties';
import { contactsDeleteOperationProperties } from './ContactsDelete.properties';
import { eventsGetManyOperationProperties } from './EventsGetMany.properties';
import { eventsCreateOperationProperties } from './EventsCreate.properties';
import { eventsDeleteOperationProperties } from './EventsDelete.properties';

export class Prospectpro implements INodeType {
	description: INodeTypeDescription = {
		name: 'prospectpro',
		displayName: 'ProspectPro',
		icon: 'file:logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from the ProspectPro API.',
		defaults: {
			name: 'ProspectPro',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
        usableAsTool: true,
		credentials: [
			{
				name: 'prospectproApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.prospectpro.nl/v1.2',
            qs: {
                front: 30,
            },
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Prospect',
						value: 'prospects',
					},
                    {
						name: 'Contact',
						value: 'contacts',
					},
                    {
                        name: 'Event',
                        value: 'events'
                    },
                    {
						name: 'Pageview',
						value: 'pageviews',
					},
				],
				default: 'prospects',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['prospects'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get prospect',
						description: 'Retrieve a prospect from ProspectPro',
						routing: {
							request: {
								method: 'GET',
								url: '/prospects'
							},
						},
					},
                    {
						name: 'Get Many',
						value: 'get_many',
						action: 'Get prospects',
						description: 'Retrieve prospects from ProspectPro',
						routing: {
							request: {
								method: 'GET',
								url: '/prospects'
							},
						},
					},
                    {
						name: 'Update',
						value: 'patch',
						action: 'Update prospect',
						description: 'Update a prospect in ProspectPro',
						routing: {
							request: {
								method: 'PATCH',
								url: '/prospects',
                                qs: {
                                    no_header: 1
                                },
							},
						},
					}
				],
				default: 'get_many',
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['pageviews'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'get_many',
						action: 'Get pageviews',
						description: 'Retrieve pageviews from ProspectPro',
						routing: {
							request: {
								method: 'GET',
								url: '/pageviews'
							}
						},
					},
				],
				default: 'get_many',
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contacts'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'get_many',
						action: 'Get contacts',
						description: 'Retrieve contacts from ProspectPro',
						routing: {
							request: {
								method: 'GET',
								url: '/contacts'
							}
						},
					},
                    {
						name: 'Create',
						value: 'create',
						action: 'Create contact',
						description: 'Create a contact in ProspectPro',
						routing: {
							request: {
								method: 'POST',
								url: '/contacts',
                                qs: {
                                    no_header: '={{ $value && $value === true ? undefined : 1 }}'
                                },
							}
						},
					},
                    {
						name: 'Update',
						value: 'update',
						action: 'Update contact',
						description: 'Update a contact in ProspectPro',
						routing: {
							request: {
								method: 'PATCH',
								url: '/contacts',
                                qs: {
                                    no_header: '={{ $value && $value === true ? undefined : 1 }}'
                                },
							}
						},
					},
                    {
						name: 'Delete',
						value: 'delete',
						action: 'Delete contact',
						description: 'Delete a contact in ProspectPro',
						routing: {
							request: {
								method: 'DELETE',
								url: '/contacts'
							}
						},
					},
				],
				default: 'get_many',
			},
            {
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['events'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'get_many',
						action: 'Get events',
						description: 'Retrieve events from ProspectPro',
						routing: {
							request: {
								method: 'GET',
								url: '/events'
							}
						},
					},
                    {
						name: 'Create',
						value: 'create',
						action: 'Create event',
						description: 'Create an event in ProspectPro',
						routing: {
							request: {
								method: 'POST',
								url: '/events',
                                qs: {
                                    no_header: '={{ $value && $value === true ? undefined : 1 }}'
                                },
							}
						},
					},
                    {
						name: 'Delete',
						value: 'delete',
						action: 'Delete event',
						description: 'Delete an event in ProspectPro',
						routing: {
							request: {
								method: 'DELETE',
								url: '/events'
							}
						},
					},
				],
				default: 'get_many',
			},
            ...prospectsGetOperationProperties,
            ...prospectsPatchOperationProperties,
			...prospectsGetManyOperationProperties,
            ...pageviewsGetManyOperationProperties,
            ...contactsGetManyOperationProperties,
            ...contactsCreateOperationProperties,
            ...contactsUpdateOperationProperties,
            ...contactsDeleteOperationProperties,
            ...eventsGetManyOperationProperties,
            ...eventsCreateOperationProperties,
            ...eventsDeleteOperationProperties,
		],
	};

	methods = {
        loadOptions: {
			getTags: getProspectProTags,
			getAudiences: getProspectProAudiences,
			getOwners: getProspectProOwners,
		},
    };
}
