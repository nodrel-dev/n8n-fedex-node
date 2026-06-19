import type { Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';
import {
	FEDEX_OAUTH2_PROPERTIES,
	FEDEX_TEST_BASE_URL,
	fedexCredentialNotice,
} from './fedexOAuth2Shared';

/**
 * Credential for the FedEx shipping project (Rate, Ship, and Address Validation APIs). Use on
 * Get Rates, Create, and Validate. The credential test calls the lightweight Address Validation
 * endpoint (no account number required), which any shipping-entitled client can reach — proving
 * the client_id / secret (FedEx API Key / Secret Key) are valid.
 */
export class FedexShippingOAuth2Api implements ICredentialType {
	name = 'fedexShippingOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'FedEx Shipping OAuth2 API';

	documentationUrl = 'https://github.com/nodrel-dev/n8n-fedex-node#credentials';

	icon: Icon = { light: 'file:fedex.svg', dark: 'file:fedex.dark.svg' };

	properties: INodeProperties[] = [
		fedexCredentialNotice('Rate / Ship / Address Validation', 'FedEx Track OAuth2 API'),
		...FEDEX_OAUTH2_PROPERTIES,
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: FEDEX_TEST_BASE_URL,
			url: '/address/v1/addresses/resolve',
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'X-locale': 'en_US' },
			body: {
				addressesToValidate: [
					{
						address: {
							streetLines: ['7372 PARKRIDGE BLVD'],
							postalCode: '75063',
							countryCode: 'US',
						},
					},
				],
			},
		},
	};
}
