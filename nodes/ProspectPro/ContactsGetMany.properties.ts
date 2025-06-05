import { INodeProperties } from 'n8n-workflow';

export const contactsGetManyOperationProperties: INodeProperties[] = [
    {
        displayName: 'Prospect ID',
        name: 'id',
        type: 'string',
        default: '',
        description: 'The ID of the prospect you want to retrieve contacts for',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['get_many'],
            },
        },
        routing: {
            request: {
                qs: {
                    company_id: '={{ $value ? $value : undefined }}',
                },
            },
        },
    },
    {
        displayName: 'Modified Since',
        name: 'from_changed_time',
        type: 'dateTime',
        default: '',
        description: 'Get Contacts modified since a specific date and time',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['get_many'],
            },
        },
        routing: {
            request: {
                qs: {
                    from_changed_time: '={{ $value ? Math.floor(new Date($value).getTime() / 1000) : undefined }}',
                },
            },
        },
    },
    {
		displayName: 'Detailed Output',
        name: 'details',
        type: 'boolean',
        default: false,
        description: 'Whether to add details such as the total number of contact found. WARNING: This returns 1 item in stead of an array of items.',
        displayOptions: {
            show: {
                resource: ['contacts'],
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
