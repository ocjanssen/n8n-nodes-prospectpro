import { INodeProperties } from 'n8n-workflow';

export const eventsGetManyOperationProperties: INodeProperties[] = [
    {
        displayName: 'Prospect ID',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        description: 'The ID of the prospect you want to retrieve events for',
        displayOptions: {
            show: {
                resource: ['events'],
                operation: ['get_many'],
            },
        },
        routing: {
            request: {
                qs: {
                    id: '={{ $value ? $value : undefined }}',
                },
            },
        },
    },
    {
		displayName: 'Detailed Output',
        name: 'details',
        type: 'boolean',
        default: false,
        description: 'Whether to add details such as the total number of events found. WARNING: This returns 1 item in stead of an array of items.',
        displayOptions: {
            show: {
                resource: ['events'],
                operation: ['get_many']
            },
        },
        routing: {
            request: {
                qs: {
                    no_header: '={{ $value && $value === true ? undefined : 1 }}'
                },
            },
        },
	},
];
