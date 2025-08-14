import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	IPollFunctions,
	IHttpRequestOptions,
} from 'n8n-workflow';

import { NodeOperationError } from 'n8n-workflow';

export async function apiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: object = {},
	query?: IDataObject,
): Promise<any> {
	query = query || {};
	query.front = 30;

	const options: IHttpRequestOptions = {
		method,
		body,
		qs: query,
		url: `https://api.prospectpro.nl/v1.2/${endpoint.startsWith('/') ? endpoint.substring(1) : endpoint}`,
		json: true,
	};

	if (method === 'GET') {
		delete options.body;
	}
	return await this.helpers.httpRequestWithAuthentication.call(this, 'prospectproApi', options);
}

export async function getProspectProTags(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	try {
		type TagsApiResponse = {
			status: string;
			found: number;
			tags: Record<string, number>;
			message?: string;
		};

		const response = (await apiRequest.call(
			this,
			'GET',
			'prospects',
			{},
			{
				taglist: 'map',
			},
		)) as TagsApiResponse;

		if (response?.tags && response.status === 'ok' && Object.keys(response.tags).length > 0) {
			return Object.entries(response.tags).map(([key, count]) => ({
				name: `${key} (${count})`,
				value: key,
			}));
		} else {
			const errorMessage =
				response?.message || 'Unexpected API response from /prospects endpoint (for tags)';
			throw new NodeOperationError(
				this.getNode(),
				`Failed to fetch tags: ${errorMessage}. Response: ${JSON.stringify(response)}`,
			);
		}
	} catch (error) {
		if (error instanceof NodeOperationError) {
			throw error;
		}
		const message = (error as Error).message || 'Unknown error during API request for tags';
		throw new NodeOperationError(this.getNode(), `Error fetching tags: ${message}`);
	}
}

export async function getProspectProAudiences(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	try {
		type AudiencesApiResponse = {
			status: string;
			found: number;
			audiences: Array<{ qid: string; name: string }>;
			message?: string;
		};

		const response = (await apiRequest.call(
			this,
			'GET',
			'audiences',
			{},
			{
				add_stats: 0,
			},
		)) as AudiencesApiResponse;

		if (response.status === 'ok' && response?.audiences?.length > 0) {
			return response.audiences.map((audience) => ({
				name: audience.name,
				value: audience.qid,
			}));
		} else {
			const errorMessage = response?.message || 'Unexpected API response from /audiences endpoint';
			throw new NodeOperationError(
				this.getNode(),
				`Failed to fetch audiences: ${errorMessage}. Response: ${JSON.stringify(response)}`,
			);
		}
	} catch (error) {
		if (error instanceof NodeOperationError) {
			throw error;
		}
		const message = (error as Error).message || 'Unknown error during API request for audiences';
		throw new NodeOperationError(this.getNode(), `Error fetching audiences: ${message}`);
	}
}

export async function getProspectProOwners(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	try {
		type OwnersApiResponse = {
			status: string;
			found: number;
			users: Array<{ uid: string; name: string; email: string }>;
			message?: string;
		};

		const response = (await apiRequest.call(this, 'GET', 'user', {}, {})) as OwnersApiResponse;

		if (response.status === 'ok' && response?.users?.length > 0) {
			const options = [{ name: '', value: '' }];
			options.push(
				...response.users.map((user) => ({
					name: user.email || user.name || user.uid,
					value: user.email,
				})),
			);
			return options;
		} else {
			const errorMessage =
				response?.message || 'Unexpected API response from /user endpoint (for owners)';
			throw new NodeOperationError(
				this.getNode(),
				`Failed to fetch owners: ${errorMessage}. Response: ${JSON.stringify(response)}`,
			);
		}
	} catch (error) {
		if (error instanceof NodeOperationError) {
			throw error;
		}
		const message = (error as Error).message || 'Unknown error during API request for owners';
		throw new NodeOperationError(this.getNode(), `Error fetching owners: ${message}`);
	}
}

export function dateToEpochSeconds(dateString: string): number {
	return Math.floor(new Date(dateString).getTime() / 1000);
}

export function epochSecondsToDate(epochSeconds: number): string {
	const date = new Date(epochSeconds * 1000);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
