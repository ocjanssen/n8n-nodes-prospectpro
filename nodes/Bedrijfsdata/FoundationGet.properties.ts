import { INodeProperties } from 'n8n-workflow';

export const foundationGetOperationProperties: INodeProperties[] = [
	{
		displayName: 'Country',
		name: 'country',
		type: 'options',
		default: 'nl',
		options: [{ name: 'Netherlands', value: 'nl' }],
		displayOptions: {
			show: {
				resource: ['foundation'],
				operation: ['get'],
			},
		},
		routing: {
			request: {
				qs: {
					country: '={{ $value }}',
				},
			},
		},
		required: true,
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['foundation'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Address ID',
				name: 'addressid',
				type: 'string',
				default: '',
				placeholder: 'e.g., NL1234AB-150',
				routing: {
					request: {
						qs: {
							addressid: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by Dutch address. Format: NL{postcode}-{house number}, e.g., "NL1234AB-150".',
			},
			{
				displayName: 'All Names',
				name: 'names',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							names: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by all known names, such as trade names',
			},
			{
				displayName: 'Apps',
				name: 'apps',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							apps: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by apps they use. Comma separate multiple values.',
			},
			{
				displayName: 'Chamber of Commerce Number',
				name: 'coc',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							coc: '={{ $value }}',
						},
					},
				},
				description: 'Chamber of Commerce number of a specific company',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						placeholder: 'Search for a city',
						typeOptions: {
							searchListMethod: 'getCities',
							searchable: true,
							searchFilterRequired: true,
						},
					},
				],
				routing: {
					request: {
						qs: {
							city: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by Dutch city. Must exact-match the official name (case sensitive).',
			},
			{
				displayName: 'Company ID',
				name: 'id',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							id: '={{ $value }}',
						},
					},
				},
				description: 'Bedrijfsdata.nl ID of a specific company. IDs are persistent and perfect for use as unique identifiers.',
			},
			{
				displayName: 'Company Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							name: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by official name',
			},
			{
				displayName: 'Crux Rank',
				name: 'crux_rank',
				type: 'string',
				default: '',
				placeholder: 'e.g., 100:500 or 100: or :500',
				routing: {
					request: {
						qs: {
							crux_rank: '={{ $value }}',
						},
					},
				},
				description: 'Search by Crux rank (1 to 50m). Format: Range (100:500), Minimum only (100:), Maximum only (:500).',
			},
			{
				displayName: 'Data Exists',
				name: 'data_exists',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Address', value: 'address' },
					{ name: 'Email', value: 'email' },
					{ name: 'Employees', value: 'employees' },
					{ name: 'Fax', value: 'fax' },
					{ name: 'Phone', value: 'phone' },
					{ name: 'Revenue', value: 'revenue' },
					{ name: 'URL', value: 'url' },
					{ name: 'VAT', value: 'vat' },
				],
				routing: {
					request: {
						qs: {
							data_exists: '={{ $value.join(",") }}',
						},
					},
				},
				description: 'Search companies by available data types',
			},
			{
				displayName: 'Distance (Km)',
				name: 'distance',
				type: 'number',
				default: '',
				routing: {
					request: {
						qs: {
							distance: '={{ $value }}',
						},
					},
				},
				description: 'Number of kilometers around "location" or "geo" to search. Cannot be combined with city/province/addressid.',
			},
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							domain: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by domain name',
			},
			{
				displayName: 'Employees',
				name: 'employees',
				type: 'string',
				default: '',
				placeholder: 'e.g., 5:10 or 5: or :10',
				routing: {
					request: {
						qs: {
							employees: '={{ $value }}',
						},
					},
				},
				description: 'Search by number of employees. Format: Range (5:10), Minimum only (5:), Maximum only (:10).',
			},
			{
				displayName: 'Founded',
				name: 'founded',
				type: 'string',
				default: '',
				placeholder: 'e.g., 2010:2020 or 2010: or :2020',
				routing: {
					request: {
						qs: {
							founded: '={{ $value }}',
						},
					},
				},
				description: 'Search by year of establishment. Format: Range (2010:2020), Minimum only (2010:), Maximum only (:2020).',
			},
			{
				displayName: 'Geo Coordinates',
				name: 'geo',
				type: 'string',
				default: '',
				placeholder: 'e.g., 52.3676,4.9041',
				routing: {
					request: {
						qs: {
							geo: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by coordinates [lat],[long]. Combine with "distance". Alternative to location',
			},
			{
				displayName: 'Link Domain',
				name: 'linkdomain',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							linkdomain: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by domains they link to on their website. Powerful for finding partners.',
			},
			{
				displayName: 'Linked By',
				name: 'linked_by',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							linked_by: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by domains that link to their website. Powerful for finding partners of large companies.',
			},
			{
				displayName: 'Location',
				name: 'location',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							location: '={{ $value }}',
						},
					},
				},
				description: 'Search companies in an area by city/municipality. Combine with "distance". Alternative to city/province/addressid',
			},
			{
				displayName: 'Mentioned By',
				name: 'mentioned_by',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							mentioned_by: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by domains that mention their company name. Powerful for finding partners.',
			},
			{
				displayName: 'Monthly Visits',
				name: 'monthly_visits',
				type: 'string',
				default: '',
				placeholder: 'e.g., 100:5000 or 100: or :5000',
				routing: {
					request: {
						qs: {
							monthly_visits: '={{ $value }}',
						},
					},
				},
				description: 'Search by estimated website visitors. Format: Range (100:5000), Minimum only (100:), Maximum only (:5000).',
			},
			{
				displayName: 'Office Type',
				name: 'office_type',
				type: 'options',
				default: 'Hoofdvestiging',
				options: [
					{ name: 'Hoofdvestiging', value: 'Hoofdvestiging' },
					{ name: 'Nevenvestiging', value: 'Nevenvestiging' },
				],
				routing: {
					request: {
						qs: {
							office_type: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by registration type. Values are case sensitive.',
			},
			{
				displayName: 'Organization Type',
				name: 'orgtype',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Besloten Vennootschap', value: 'Besloten Vennootschap' },
					{ name: 'Buitenlandse Rechtsvorm', value: 'Buitenlandse Rechtsvorm' },
					{ name: 'Commanditaire Vennootschap', value: 'Commanditaire Vennootschap' },
					{ name: 'Coöperatie', value: 'Coöperatie' },
					{ name: 'Eenmanszaak', value: 'Eenmanszaak' },
					{ name: 'Kerkgenootschap', value: 'Kerkgenootschap' },
					{ name: 'Maatschap', value: 'Maatschap' },
					{ name: 'Naamloze Vennootschap', value: 'Naamloze Vennootschap' },
					{ name: 'Onderlinge Waarborg Maatschappij', value: 'Onderlinge Waarborg Maatschappij' },
					{ name: 'Publiekrechtelijke Rechtspersoon', value: 'Publiekrechtelijke Rechtspersoon' },
					{ name: 'Rechtspersoon In Oprichting', value: 'Rechtspersoon in oprichting' },
					{ name: 'Rederij', value: 'Rederij' },
					{ name: 'Stichting', value: 'Stichting' },
					{ name: 'Vennootschap Onder Firma', value: 'Vennootschap Onder Firma' },
					{ name: 'Vereniging', value: 'Vereniging' },
				],
				routing: {
					request: {
						qs: {
							orgtype: '={{ $value.join(",") }}',
						},
					},
				},
				description: 'Search companies by organisation type. Values are case sensitive.',
			},
			{
				displayName: 'PageRank',
				name: 'pagerank',
				type: 'string',
				default: '',
				placeholder: 'e.g., 1:10 or 1: or :10',
				routing: {
					request: {
						qs: {
							pagerank: '={{ $value }}',
						},
					},
				},
				description: 'Search by DomCop pagerank (0-10). Format: Range (1:10), Minimum only (1:), Maximum only (:10).',
			},
			{
				displayName: 'Postcode',
				name: 'postcode',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							postcode: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by Dutch postcode',
			},
			{
				displayName: 'Province',
				name: 'province',
				type: 'resourceLocator',
				default: { mode: 'list', value: '' },
				modes: [
					{
						displayName: 'From List',
						name: 'list',
						type: 'list',
						placeholder: 'Search for a province',
						typeOptions: {
							searchListMethod: 'getProvinces',
							searchable: true,
							searchFilterRequired: true,
						},
					},
				],
				routing: {
					request: {
						qs: {
							province: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by Dutch province. Must match official name (case sensitive).',
			},
			{
				displayName: 'Rating',
				name: 'rating',
				type: 'string',
				default: '',
				placeholder: 'e.g., 3:4 or 3: or :4',
				routing: {
					request: {
						qs: {
							rating: '={{ $value }}',
						},
					},
				},
				description: 'Search by average review rating (0-5). Format: Range (3:4), Minimum only (3:), Maximum only (:4).',
			},
			{
				displayName: 'Relation',
				name: 'relation',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							relation: '={{ $value }}',
						},
					},
				},
				description: 'Combination of linked_by, mentioned_by and linkdomain',
			},
			{
				displayName: 'Revenue',
				name: 'revenue',
				type: 'string',
				default: '',
				placeholder: 'e.g., 500000:1000000 or 500000: or :1000000',
				routing: {
					request: {
						qs: {
							revenue: '={{ $value }}',
						},
					},
				},
				description: 'Search by annual revenue. Format: Range (500000:1000000), Minimum only (500000:), Maximum only (:1000000).',
			},
			{
				displayName: 'Reviews',
				name: 'reviews',
				type: 'string',
				default: '',
				placeholder: 'e.g., 50:100 or 50: or :100',
				routing: {
					request: {
						qs: {
							reviews: '={{ $value }}',
						},
					},
				},
				description: 'Search by number of reviews. Format: Range (50:100), Minimum only (50:), Maximum only (:100).',
			},
			{
				displayName: 'Rows',
				name: 'rows',
				type: 'number',
				default: '',
				routing: {
					request: {
						qs: {
							rows: '={{ $value }}',
						},
					},
				},
				description: 'Amount of companies to return',
			},
			{
				displayName: 'SBI Code',
				name: 'sbi',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							sbi: '={{ $value }}',
						},
					},
				},
				description: 'Search by industry SBI-code. Use numerical codes without dots (e.g., "01303"). Comma separate multiple values',
			},
			{
				displayName: 'Social Exists',
				name: 'social_exists',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Facebook', value: 'facebook' },
					{ name: 'Instagram', value: 'instagram' },
					{ name: 'LinkedIn', value: 'linkedin' },
					{ name: 'Pinterest', value: 'pinterest' },
					{ name: 'Twitter', value: 'twitter' },
					{ name: 'YouTube', value: 'youtube' },
				],
				routing: {
					request: {
						qs: {
							social_exists: '={{ $value.join(",") }}',
						},
					},
				},
				description: 'Search companies by social media channels they have',
			},
			{
				displayName: 'Social Interactions',
				name: 'social_interactions',
				type: 'string',
				default: '',
				placeholder: 'e.g., 10:50 or 10: or :50',
				routing: {
					request: {
						qs: {
							social_interactions: '={{ $value }}',
						},
					},
				},
				description: 'Search by Social Media likes received. Format: Range (10:50), Minimum only (10:), Maximum only (:50).',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							text: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by keyword. Companies with matching industries, activities, names and website content are returned. Complex queries are available through Solr operators, such as "OR", "AND", "(", ")", etc. See Utilities -> "suggest" for auto suggest',
			},
			{
				displayName: 'Tranco Rank',
				name: 'tranco_rank',
				type: 'string',
				default: '',
				placeholder: 'e.g., 100:500 or 100: or :500',
				routing: {
					request: {
						qs: {
							tranco_rank: '={{ $value }}',
						},
					},
				},
				description: 'Search by Tranco rank (1 to 3m). Format: Range (100:500), Minimum only (100:), Maximum only (:500).',
			},
			{
				displayName: 'VAT Number',
				name: 'vat',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							vat: '={{ $value }}',
						},
					},
				},
				description: 'Search companies by tax registration number (btw nummer)',
			},
		],
	},
];
