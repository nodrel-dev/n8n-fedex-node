import type { INodeProperties } from 'n8n-workflow';
import { validateFields, validatePreSend } from './validate';

const showForAddress = { resource: ['address'] };

export const addressDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showForAddress },
		options: [
			{
				name: 'Validate',
				value: 'validate',
				action: 'Validate an address',
				description: 'Standardize an address and classify it residential vs commercial',
				routing: {
					request: { method: 'POST', url: '/address/v1/addresses/resolve' },
					send: { preSend: [validatePreSend] },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'output.resolvedAddresses' } }] },
				},
			},
		],
		default: 'validate',
	},
	...validateFields,
];
