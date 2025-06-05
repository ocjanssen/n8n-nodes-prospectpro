import { INodeProperties } from 'n8n-workflow';

export const prospectsPatchOperationProperties: INodeProperties[] = [
    {
        displayName: 'Prospect ID',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        description: 'The ID of the prospect to retrieve',
        displayOptions: {
            show: {
                resource: ['prospects'],
                operation: ['patch'],
            },
        },
        routing: {
            request: {
                qs: {
                    id: '={{$value}}',
                },
            },
        },
    },
    {
        displayName: 'Update Fields',
		name: 'updateOptions',
		placeholder: 'Add field to update',
		type: 'collection',
		default: {},
        displayOptions: {
            show: {
                resource: ['prospects'],
                operation: ['patch'],
            },
        },
		options: [
            {
                displayName: 'Qualification Status',
                name: 'label',
                type: 'options',
                default: 1,
                options: [
                    { name: 'Qualified', value: 1 },
                    { name: 'Disqualified', value: 0 },
                    { name: 'Not Qualified', value: -1 },
                ],
                routing: {
                    request: {
                        qs: {
                            label: '={{ ($value || $value === 0) ? $value : undefined }}',
                        },
                    },
                },
                description: 'Update a Prospect\'s qualification status',
            },
            {
                displayName: 'Tag Names or IDs',
                name: 'tags',
                type: 'multiOptions',
                typeOptions: {
                    loadOptionsMethod: 'getTags',
                },
                default: [],
                description: 'Update a Prospect\'s Tags. Select multiple by clicking again. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                routing: {
                    request: {
                        qs: {
                            tags: '={{ $value.length > 0 ? $value.join(",") : undefined }}',
                        },
                    },
                },
            },
            {
                displayName: 'Owners Name or ID',
                name: 'owner',
                type: 'options',
                typeOptions: {
                    loadOptionsMethod: 'getOwners',
                },
                default: '',
                description: 'Update a Prospect\'s Owner. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                routing: {
                    request: {
                        qs: {
                            owner: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
            },
        ],
    },
];
