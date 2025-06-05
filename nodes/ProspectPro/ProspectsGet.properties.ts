import { INodeProperties } from 'n8n-workflow';

export const prospectsGetOperationProperties: INodeProperties[] = [
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
                operation: ['get'],
            },
        },
        routing: {
            request: {
                qs: {
                    company: '={{$value}}',
                },
            },
        },
    },
    {
		displayName: 'Detailed Output',
        name: 'details',
        type: 'boolean',
        default: false,
        description: 'Whether to add request details. WARNING: This creates an output that needs to be parsed to process the company.',
        displayOptions: {
            show: {
                resource: ['prospects'],
                operation: ['get']
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
