import { INodeProperties } from 'n8n-workflow';

export const contactsDeleteOperationProperties: INodeProperties[] = [
    {
        displayName: 'Prospect ID',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        description: 'Enter the ID of the prospect the contact is associated with',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['delete'],
            },
        },
        routing: {
            request: {
                qs: {
                    company_id: '={{$value}}',
                },
            },
        },
    },
    {
        displayName: 'Contact ID',
        name: 'contact_id',
        type: 'string',
        default: '',
        required: true,
        description: 'Enter the ID of the contact you want to delete. WARNING: This action cannot be undone.',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['delete'],
            },
        },
        routing: {
            request: {
                qs: {
                    contact_id: '={{$value}}'
                },
            },
        },
    }
];
