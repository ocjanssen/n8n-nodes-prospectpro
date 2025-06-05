import {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class prospectproApi implements ICredentialType {
	icon = 'file:logo.svg' as Icon;
	name = 'prospectproApi';
	displayName = 'ProspectPro API';
	documentationUrl = 'https://docs.prospectpro.nl/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
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
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.prospectpro.nl/v1.2',
			method: 'GET',
			url: '/prospects',
			qs: {
				front: 30,
                rows: 0
			}
		},
	};
}
