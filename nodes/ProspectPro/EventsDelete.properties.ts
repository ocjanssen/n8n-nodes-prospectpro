import { INodeProperties } from 'n8n-workflow';

export const eventsDeleteOperationProperties: INodeProperties[] = [
    {
        displayName: 'Event ID',
        name: 'event_id',
        type: 'string',
        default: '',
        required: true,
        description: 'Enter the ID of the event you want to delete. WARNING: This action cannot be undone.',
        displayOptions: {
            show: {
                resource: ['events'],
                operation: ['delete'],
            },
        },
        routing: {
            request: {
                qs: {
                    event_id: '={{$value}}'
                },
            },
        },
    }
];
