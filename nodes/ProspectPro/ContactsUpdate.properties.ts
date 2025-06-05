import { INodeProperties } from 'n8n-workflow';

export const contactsUpdateOperationProperties: INodeProperties[] = [
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
                operation: ['update'],
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
        description: 'Enter the ID of the contact you want to update',
        hint: 'Contacts have two ID\'s. Here you need either contact_id or id.split(\'_\')[1].',
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['update'],
            },
        },
        routing: {
            request: {
                qs: {
                    contact_id: '={{$value}}',
                },
            },
        },
    },
    {
        displayName: 'Fields to Update',
		name: 'paginationOptions',
		placeholder: 'Add field to update',
		type: 'collection',
		default: {},
        displayOptions: {
            show: {
                resource: ['contacts'],
                operation: ['update'],
            },
        },
		options: [
            {
                displayName: 'Contact First Name',
                name: 'name_first',
                type: 'string',
                default: '',
                description: 'Enter the first name of your contact. Leave empty to not update.',
                routing: {
                    request: {
                        qs: {
                            name_first: '={{$value ? $value : undefined}}',
                        },
                    },
                },
            },
            {
                displayName: 'Contact Last Name',
                name: 'name_last',
                type: 'string',
                default: '',
                description: 'Enter the last name of your contact. Leave empty to not update.',
                routing: {
                    request: {
                        qs: {
                            name_last: '={{$value ? $value : undefined}}',
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
                description: 'Enter the email address of your contact. Leave empty to not update.',
                routing: {
                    request: {
                        qs: {
                            email: '={{$value ? $value : undefined}}',
                        },
                    },
                },
            },
            {
                displayName: 'Job Title',
                name: 'job_title',
                type: 'string',
                default: '',
                description: 'Enter the job title of your contact. Leave empty to not update.',
                routing: {
                    request: {
                        qs: {
                            job_title: '={{$value ? $value : undefined}}',
                        },
                    },
                },
            },
            {
                displayName: 'LinkedIn URL',
                name: 'linkedin_link',
                type: 'string',
                default: '',
                description: 'Enter the LinkedIn Profile URL of your contact. Leave empty to not update.',
                routing: {
                    request: {
                        qs: {
                            linkedin_link: '={{$value ? $value : undefined}}',
                        },
                    },
                },
            },
            {
                displayName: 'Phone Number',
                name: 'phone',
                type: 'string',
                default: '',
                description: 'Enter the phone number of your contact. Leave empty to not update.',
                routing: {
                    request: {
                        qs: {
                            phone: '={{$value ? $value : undefined}}',
                        },
                    },
                },
            },
        ],
    },
];
