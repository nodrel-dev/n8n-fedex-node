import { describe, it, expect } from 'vitest';
import { toFedexAddress } from './toFedexAddress';

describe('toFedexAddress', () => {
	it('splits multi-line street input, trims, drops blanks, and caps at three lines', () => {
		const address = toFedexAddress({
			streetLines: '  7372 PARKRIDGE BLVD \n\nAPT 286\n2903 sprank\nLINE FOUR',
			city: ' IRVING ',
			stateOrProvinceCode: 'TX',
			postalCode: ' 75063 ',
			countryCode: 'US',
		});

		expect(address.streetLines).toEqual(['7372 PARKRIDGE BLVD', 'APT 286', '2903 sprank']);
		expect(address.city).toBe('IRVING');
		expect(address.stateOrProvinceCode).toBe('TX');
		expect(address.postalCode).toBe('75063');
		expect(address.countryCode).toBe('US');
	});

	it('defaults country to US and omits an empty state', () => {
		const address = toFedexAddress({ streetLines: '1 Main St', city: 'Memphis', postalCode: '38116' });

		expect(address.countryCode).toBe('US');
		expect('stateOrProvinceCode' in address).toBe(false);
	});

	it('omits residential entirely unless explicitly supplied', () => {
		const shipper = toFedexAddress({ city: 'Memphis', postalCode: '38116' });
		const recipient = toFedexAddress({ city: 'Memphis', postalCode: '38116', residential: true });

		expect('residential' in shipper).toBe(false);
		expect(recipient.residential).toBe(true);
	});

	it('preserves an explicit residential:false', () => {
		const address = toFedexAddress({ city: 'Memphis', postalCode: '38116', residential: false });
		expect(address.residential).toBe(false);
	});
});
