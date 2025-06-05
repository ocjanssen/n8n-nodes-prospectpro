import { INodeProperties } from 'n8n-workflow';

export const prospectsGetManyOperationProperties: INodeProperties[] = [
    {
		displayName: 'Detailed Output',
        name: 'details',
        type: 'boolean',
        default: false,
        description: 'Whether to add details such as the total number of prospects found. WARNING: This returns 1 item in stead of an array of items.',
        displayOptions: {
            show: {
                resource: ['prospects'],
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
    {
        displayName: 'Filter Options',
		name: 'filterOptions',
		placeholder: 'Add filter options',
		type: 'collection',
		default: {},
        displayOptions: {
            show: {
                resource: ['prospects'],
                operation: ['get_many'],
            },
        },
		options: [
            {
                displayName: 'Audience Names or IDs',
                name: 'audiences',
                type: 'multiOptions',
                typeOptions: {
                    loadOptionsMethod: 'getAudiences',
                },
                default: [],
                description: 'Filter Prospects by Audience. Select multiple by clicking again. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                routing: {
                    request: {
                        qs: {
                            lists: '={{ $value.length > 0 ? $value.join(",") : undefined }}',
                        },
                    },
                },
            },
            {
                displayName: 'Contacts',
                name: 'total_contacts',
                type: 'options',
                default: '666',
                options: [
                    { name: 'All', value: '666' },
                    { name: 'With Contacts', value: '1' },
                    { name: 'Without Contacts', value: '0:0' },
                ],
                routing: {
                    request: {
                        qs: {
                            total_contacts: '={{ $value && $value !== "666" ? $value : undefined }}',
                        },
                    },
                },
                description: 'Filter Prospects by contacts',
            },
            {
                displayName: 'Created Since',
                name: 'from_inserted_date',
                type: 'dateTime',
                default: '',
                description: 'Get Prospects created since a specific date and time',
                routing: {
                    request: {
                        qs: {
                            from_inserted_date: '={{ $value ? Math.floor(new Date($value).getTime() / 1000) : undefined }}',
                        },
                    },
                },
            },
            {
                displayName: 'Modified Since',
                name: 'from_changed_time',
                type: 'dateTime',
                default: '',
                description: 'Get Prospects modified since a specific date and time',
                routing: {
                    request: {
                        qs: {
                            from_changed_time: '={{ $value ? Math.floor(new Date($value).getTime() / 1000) : undefined }}',
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
                description: 'Filter Prospects by owner. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                routing: {
                    request: {
                        qs: {
                            owner: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
            },
            {
                displayName: 'Qualification Status',
                name: 'label',
                type: 'options',
                default: 666,
                options: [
                    { name: 'All', value: 666 },
                    { name: 'Qualified', value: 1 },
                    { name: 'Disqualified', value: 0 },
                    { name: 'Not Qualified', value: -1 },
                ],
                routing: {
                    request: {
                        qs: {
                            label: '={{ $value && $value !== 666 ? $value : undefined }}',
                        },
                    },
                },
                description: 'Filter Prospects by their qualification status',
            },
            {
                displayName: 'Search',
                name: 'search',
                type: 'string',
                default: '',
                routing: {
                    request: {
                        qs: {
                            search: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Search Prospects by keyword',
            },
            {
                displayName: 'Tag Names or IDs',
                name: 'tags',
                type: 'multiOptions',
                typeOptions: {
                    loadOptionsMethod: 'getTags',
                },
                default: [],
                description: 'Filter Prospects by Tags. Select multiple by clicking again. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                routing: {
                    request: {
                        qs: {
                            tags: '={{ $value.length > 0 ? $value.join(",") : undefined }}',
                        },
                    },
                },
            },
            {
                displayName: 'Website Visits',
                name: 'total_visits',
                type: 'options',
                default: '666',
                options: [
                    { name: 'All', value: '666' },
                    { name: 'With Website Visits', value: '1' },
                    { name: 'Without Website Visits', value: '0:0' },
                ],
                routing: {
                    request: {
                        qs: {
                            total_visits: '={{ $value && $value !== "666" ? $value : undefined }}',
                        },
                    },
                },
                description: 'Filter Prospects by website visits',
            }
        ],
    },
    {
        displayName: 'Sorting Options',
		name: 'sortingOptions',
		placeholder: 'Add sorting options',
		type: 'collection',
		default: {},
        displayOptions: {
            show: {
                resource: ['prospects'],
                operation: ['get_many'],
            },
        },
		options: [
            {
                displayName: 'Sort By',
                name: 'sort_by',
                type: 'options',
                default: 'changed_time',
                options: [
                    { name: 'Company Name', value: 'company_name' },
                    { name: 'Last Update Date', value: 'changed_time' },
                    { name: 'Created Date', value: 'inserted_date' }
                ],
                routing: {
                    request: {
                        qs: {
                            sort_by: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Define the sorting type',
            },
            {
                displayName: 'Sort Order',
                name: 'sort_order',
                type: 'options',
                default: 'desc',
                options: [
                    { name: 'Ascending', value: 'asc' },
                    { name: 'Descending', value: 'desc' },
                ],
                routing: {
                    request: {
                        qs: {
                            sort_order: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Define the sorting order',
            },
        ],
    },
    {
        displayName: 'Pagination Options',
		name: 'paginationOptions',
		placeholder: 'Add pagination options',
		type: 'collection',
		default: {},
        displayOptions: {
            show: {
                resource: ['prospects'],
                operation: ['get_many'],
            },
        },
		options: [
            {
                displayName: 'Results per Page',
                name: 'limit',
                type: 'number',
																typeOptions: {
																	minValue: 1,
																},
                default: 50,
                routing: {
                    request: {
                        qs: {
                            rows: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Max number of results to return',
            },
            {
                displayName: 'Page',
                name: 'page',
                type: 'number',
                default: '',
                routing: {
                    request: {
                        qs: {
                            page: '={{ $value ? $value : undefined }}',
                        },
                    },
                },
                description: 'Page to return (given the number of results per page)',
            },
        ],
    },
];
