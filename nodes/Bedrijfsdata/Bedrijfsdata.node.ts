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
									text: '',
									office_type: '',
									orgtype: '',
									employees: '',
									revenue: '',
									founded: '',
									sbi: '',
									apps: '',
									rating: '',
									reviews: '',
									data_exists: '',
									social_exists: '',
									id: '',
									coc: '',
									domain: '',
									vat: '',
									name: '',
									names: '',
									postcode: '',
									city: '',
									province: '',
									addressid: '',
									location: '',
									geo: '',
									distance: '',
									linked_by: '',
									linkdomain: '',
									mentioned_by: '',
									relation: '',
									monthly_visits: '',
									social_interactions: '',
									pagerank: '',
									crux_rank: '',
									tranco_rank: '',
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