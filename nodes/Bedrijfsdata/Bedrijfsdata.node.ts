import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class Bedrijfsdata implements INodeType {
	description: INodeTypeDescription = {
		name: 'bedrijfsdata',
		displayName: 'Bedrijfsdata',
		icon: 'file:logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from Bedrijfsdata API',
		defaults: {
			name: 'Bedrijfsdata',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'bedrijfsdataApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.bedrijfsdata.nl/v1.1',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Company',
						value: 'company',
					},
				],
				default: 'company',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get',
						value: 'get',
						action: "Get companies",
						description: "Get companies from Bedrijfsdata API",
						routing: {
							request: {
								method: 'GET',
								url: '/companies',
								qs: {
									country: 'nl',
									text: '%3Cstring%3E',
									office_type: '%3Cenum%3E',
									orgtype: '%3Cenum%3E',
									employees: '%3Crange%3E',
									revenue: '%3Crange%3E',
									founded: '%3Crange%3E',
									sbi: '%3Cenum%3E',
									apps: '%3Cenum%3E',
									rating: '%3Crange%3E',
									reviews: '%3Crange%3E',
									data_exists: '%3Cenum%3E',
									social_exists: '%3Cenum%3E',
									id: '%3Cstring%3E',
									coc: '%3Cstring%3E',
									domain: '%3Cstring%3E',
									vat: '%3Cstring%3E',
									name: '%3Cstring%3E',
									names: '%3Cstring%3E',
									postcode: '%3Cstring%3E',
									city: '%3Cstring%3E',
									province: '%3Cstring%3E',
									addressid: '%3Cstring%3E',
									location: '%3Cstring%3E',
									geo: '%3Cstring%3E',
									distance: '%3Cinteger%3E',
									linked_by: '%3Cstring%3E',
									linkdomain: '%3Cstring%3E',
									mentioned_by: '%3Cstring%3E',
									relation: '%3Cstring%3E',
									monthly_visits: '%3Crange%3E',
									social_interactions: '%3Crange%3E',
									pagerank: '%3Crange%3E',
									crux_rank: '%3Crange%3E',
									tranco_rank: '%3Crange%3E',
									front: '30',
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: [
							'company',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
										{
						displayName: 'Amount of Companies',
						name: 'amount',
						type: 'number',
						default: '',
						routing: {
							request: {
								qs: {
									rows: '={{ $value }}',
								},
							},
						},
					},
				],
			},
		],
	};
}