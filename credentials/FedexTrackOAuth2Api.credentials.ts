import type { Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';
import { FEDEX_OAUTH2_PROPERTIES, FEDEX_TEST_BASE_URL } from './fedexOAuth2Shared';

/**
 * Credential for the FedEx Track API project. Use on the Track operation. The credential test
 * calls the Track endpoint with a FedEx mock tracking number, which any Track-entitled client
 * can reach — proving the client_id / secret (FedEx API Key / Secret Key) are valid.
 */
export class FedexTrackOAuth2Api implements ICredentialType {
	name = 'fedexTrackOAuth2Api';

	extends = ['oAuth2Api'];

	displayName = 'FedEx Track OAuth2 API';

	documentationUrl = 'https://github.com/nodrel-dev/n8n-fedex-node#credentials';

	icon: Icon = { light: 'file:fedex.svg', dark: 'file:fedex.dark.svg' };

	properties: INodeProperties[] = FEDEX_OAUTH2_PROPERTIES;

	test: ICredentialTestRequest = {
		request: {
			baseURL: FEDEX_TEST_BASE_URL,
			url: '/track/v1/trackingnumbers',
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'X-locale': 'en_US' },
			body: {
				includeDetailedScans: false,
				trackingInfo: [{ trackingNumberInfo: { trackingNumber: '128667043726' } }],
			},
		},
	};
}
