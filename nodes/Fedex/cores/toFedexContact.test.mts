import { describe, it, expect } from 'vitest';
import { toFedexContact } from './toFedexContact';

describe('toFedexContact', () => {
	it('always carries a trimmed phone number and omits blank identity fields', () => {
		const contact = toFedexContact({ phoneNumber: ' 9015551234 ', personName: '', companyName: '   ' });

		expect(contact.phoneNumber).toBe('9015551234');
		expect('personName' in contact).toBe(false);
		expect('companyName' in contact).toBe(false);
		expect('emailAddress' in contact).toBe(false);
	});

	it('includes the identity fields that are supplied', () => {
		const contact = toFedexContact({
			phoneNumber: '9015551234',
			personName: ' John Taylor ',
			companyName: 'FedEx',
			emailAddress: ' sample@company.com ',
		});

		expect(contact).toEqual({
			phoneNumber: '9015551234',
			personName: 'John Taylor',
			companyName: 'FedEx',
			emailAddress: 'sample@company.com',
		});
	});
});
