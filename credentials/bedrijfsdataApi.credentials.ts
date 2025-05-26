import {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class bedrijfsdataApi implements ICredentialType {
	name = 'bedrijfsdataApi';
	displayName = 'Bedrijfsdata API';
	documentationUrl = 'https://docs.bedrijfsdata.nl/';
	icon = 'file:logo.svg' as Icon;
	properties: INodeProperties[] = [
		{
			displayName: 'APIs Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				'api_key': '={{$credentials.apiKey}}'
			}
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.bedrijfsdata.nl/v1.1',
			method: 'GET',
			url: '/companies?country=nl&text=%3Cstring%3E&office_type=%3Cenum%3E&orgtype=%3Cenum%3E&employees=%3Crange%3E&revenue=%3Crange%3E&founded=%3Crange%3E&sbi=%3Cenum%3E&apps=%3Cenum%3E&rating=%3Crange%3E&reviews=%3Crange%3E&data_exists=%3Cenum%3E&social_exists=%3Cenum%3E&id=%3Cstring%3E&coc=%3Cstring%3E&domain=%3Cstring%3E&vat=%3Cstring%3E&name=%3Cstring%3E&names=%3Cstring%3E&postcode=%3Cstring%3E&city=%3Cstring%3E&province=%3Cstring%3E&addressid=%3Cstring%3E&location=%3Cstring%3E&geo=%3Cstring%3E&distance=%3Cinteger%3E&linked_by=%3Cstring%3E&linkdomain=%3Cstring%3E&mentioned_by=%3Cstring%3E&relation=%3Cstring%3E&monthly_visits=%3Crange%3E&social_interactions=%3Crange%3E&pagerank=%3Crange%3E&crux_rank=%3Crange%3E&tranco_rank=%3Crange%3E&rows=0&front=30',
		},
	};
}