import type { IDataObject } from 'n8n-workflow';

export interface ProspectResponse {
	status: string;
	found: number;
	last_visit?: number;
	companies?: Prospect[];
	prospects?: Prospect[];
	message?: string;
}

export interface Prospect extends IDataObject {
	id: string;
	changed_time: number;
	inserted_time?: number;
	label?: number;
	tags?: string[] | null;
	name?: string;
	last_visit?: number;
	last_visit_date?: string;
	total_visits?: number;
	pageviews?: number;
	total_contacts?: number;
	address?: string;
	postcode?: string;
	city?: string;
	country_code?: string;
	phone?: string;
	url?: string;
	domain?: string;
	email?: string;
	province?: string;
	industry?: string[];
	employees?: number;
	revenue?: number;
	linkedin_link?: string;
	facebook_link?: string;
	twitter_link?: string;
	instagram_link?: string;
	vat?: string;
	coc?: string;
}

export interface ContactResponse {
	status: string;
	found: number;
	contacts?: Contact[];
	message?: string;
}

export interface Contact extends IDataObject {
	id: string;
	company_id: string;
	changed_date: string;
	changed_time: string;
	inserted_date?: string;
	inserted_time?: string;
	name_first?: string;
	name_last?: string;
	email?: string;
	phone?: string;
	function?: string;
	linkedin?: string;
	department?: string;
}

export interface ProspectProStaticData {
	prospects?: {
		lastPolledTimeSeconds?: number;
		lastIdsAtTime?: string[];
	};
	contacts?: {
		lastPolledTimeSeconds?: number;
		lastIdsAtTime?: string[];
	};
	prospectsInserted?: {
		lastPolledTimeSeconds?: number;
		lastIdsAtTime?: string[];
	};
	contactsInserted?: {
		lastPolledTimeSeconds?: number;
		lastIdsAtTime?: string[];
	};
}

export interface FilterOptions {
	label?: number;
	tags?: string[];
	audiences?: string[];
	owner?: string;
	companyId?: string;
}
