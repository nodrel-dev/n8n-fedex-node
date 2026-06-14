import type { FedexContact } from './fedexTypes';

export interface ContactInput {
	personName?: string;
	companyName?: string;
	phoneNumber?: string;
	emailAddress?: string;
}

/**
 * Assemble the FedEx Contact shape (used by Ship shipper/recipient). phoneNumber is the
 * only field FedEx requires; the optional identity fields are omitted when blank so the
 * request stays minimal. Pure — knows nothing about n8n.
 */
export function toFedexContact(input: ContactInput): FedexContact {
	const personName = (input.personName ?? '').trim();
	const companyName = (input.companyName ?? '').trim();
	const emailAddress = (input.emailAddress ?? '').trim();

	return {
		phoneNumber: (input.phoneNumber ?? '').trim(),
		...(personName ? { personName } : {}),
		...(companyName ? { companyName } : {}),
		...(emailAddress ? { emailAddress } : {}),
	};
}
