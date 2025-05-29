import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { foundationGetOperationProperties } from './FoundationGet.properties';

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
						name: 'Foundation',
						value: 'foundation',
					},
				],
				default: 'foundation',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['foundation'],
					},
				},
				options: [
					{
						name: 'Get Companies',
						value: 'get',
						action: 'Get companies',
						description: 'Get companies from Bedrijfsdata API',
						routing: {
							request: {
								method: 'GET',
								url: '/companies',
								qs: {
									front: 30,
								},
							},
						},
					},
				],
				default: 'get',
			},
			// Spread the imported Foundation Get operation properties
			...foundationGetOperationProperties,
		],
	};
}
