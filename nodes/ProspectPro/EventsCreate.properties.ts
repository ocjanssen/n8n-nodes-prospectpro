import { INodeProperties } from 'n8n-workflow';

export const eventsCreateOperationProperties: INodeProperties[] = [
    {
        displayName: 'Prospect ID',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        description: 'Enter the ID of the prospect you want to create an event for',
        displayOptions: {
            show: {
                resource: ['events'],
                operation: ['create'],
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
        displayName: 'Event Type',
        name: 'event',
        type: 'options',
        default: 'user-note',
        required: true,
        options: [
            { name: 'Phone Call', value: 'user-phone' },
            { name: 'Email', value: 'user-email' },
            { name: 'Meeting', value: 'user-meeting' },
            { name: 'Note', value: 'user-note' }
        ],
        routing: {
            request: {
                qs: {
                    event: '={{ $value ? $value : "user-note" }}',
                },
            },
        },
        displayOptions: {
            show: {
                resource: ['events'],
                operation: ['create'],
            },
        },
        description: 'Choose an event type',
    },
    {
        displayName: 'Content',
        name: 'message',
        type: 'string',
        default: '',
        required: true,
        description: 'Enter the content of your event',
        displayOptions: {
            show: {
                resource: ['events'],
                operation: ['create'],
            },
        },
        routing: {
            request: {
                qs: {
                    message: '={{$value ? $value : undefined}}',
                },
            },
        },
    },
];
