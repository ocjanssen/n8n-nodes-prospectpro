import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class bedrijfsdataApi implements ICredentialType {
	name = 'bedrijfsdataApi';
	displayName = 'Bedrijfsdata API';
	documentationUrl = 'https://docs.bedrijfsdata.nl/';
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
			url: '/companies?country=nl&rows=0',
		},
	};
}
