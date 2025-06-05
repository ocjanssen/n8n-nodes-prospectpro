import { INodeProperties } from 'n8n-workflow';

export const contactsCreateOperationProperties: INodeProperties[] = [
    {
        displayName: 'Prospect ID',
        name: 'id',
        type: 'string',
        default: '',
        required: true,
        description: 'Enter the ID of the prospect you want to create a contact for',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['create'],
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
        displayName: 'First Name',
        name: 'name_first',
        type: 'string',
        default: '',
        required: true,
        description: 'Enter the first name of your contact',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['create'],
            },
        },
        routing: {
            request: {
                qs: {
                    name_first: '={{$value ? $value : undefined}}',
                },
            },
        },
    },
    {
        displayName: 'Last Name',
        name: 'name_last',
        type: 'string',
        default: '',
        required: true,
        description: 'Enter the last name of your contact',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['create'],
            },
        },
        routing: {
            request: {
                qs: {
                    name_last: '={{$value ? $value : undefined}}',
                },
            },
        },
    },
    {
        displayName: 'Job Title',
        name: 'job_title',
        type: 'string',
        default: '',
        description: 'Enter the job title of your contact',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['create'],
            },
        },
        routing: {
            request: {
                qs: {
                    job_title: '={{$value ? $value : undefined}}',
                },
            },
        },
    },
    {
        displayName: 'Email Address',
        name: 'email',
        type: 'string',
								placeholder: 'name@email.com',
        default: '',
        description: 'Enter the email address of your contact',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['create'],
            },
        },
        routing: {
            request: {
                qs: {
                    email: '={{$value ? $value : undefined}}',
                },
            },
        },
    },
    {
        displayName: 'Phone Number',
        name: 'phone',
        type: 'string',
        default: '',
        description: 'Enter the phone number of your contact',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['create'],
            },
        },
        routing: {
            request: {
                qs: {
                    phone: '={{$value ? $value : undefined}}',
                },
            },
        },
    },
    {
        displayName: 'LinkedIn URL',
        name: 'linkedin_link',
        type: 'string',
        default: '',
        description: 'Enter the LinkedIn Profile URL of your contact',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['create'],
            },
        },
        routing: {
            request: {
                qs: {
                    linkedin_link: '={{$value ? $value : undefined}}',
                },
            },
        },
    },
];
