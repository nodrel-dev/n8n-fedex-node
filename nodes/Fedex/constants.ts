import type { INodePropertyOptions } from 'n8n-workflow';

// FedEx domestic service types. serviceType is a free string in the spec; these are the
// common domestic values. An empty value on Get Rates asks FedEx for all eligible services.
export const SERVICE_TYPE_OPTIONS: INodePropertyOptions[] = [
	{ name: 'FedEx Ground', value: 'FEDEX_GROUND' },
	{ name: 'FedEx Home Delivery', value: 'GROUND_HOME_DELIVERY' },
	{ name: 'FedEx Express Saver', value: 'FEDEX_EXPRESS_SAVER' },
	{ name: 'FedEx 2Day', value: 'FEDEX_2_DAY' },
	{ name: 'FedEx 2Day A.M.', value: 'FEDEX_2_DAY_AM' },
	{ name: 'FedEx Standard Overnight', value: 'STANDARD_OVERNIGHT' },
	{ name: 'FedEx Priority Overnight', value: 'PRIORITY_OVERNIGHT' },
	{ name: 'FedEx First Overnight', value: 'FIRST_OVERNIGHT' },
];

export const PACKAGING_TYPE_OPTIONS: INodePropertyOptions[] = [
	{ name: 'Your Packaging', value: 'YOUR_PACKAGING' },
	{ name: 'FedEx Envelope', value: 'FEDEX_ENVELOPE' },
	{ name: 'FedEx Pak', value: 'FEDEX_PAK' },
	{ name: 'FedEx Small Box', value: 'FEDEX_SMALL_BOX' },
	{ name: 'FedEx Medium Box', value: 'FEDEX_MEDIUM_BOX' },
	{ name: 'FedEx Large Box', value: 'FEDEX_LARGE_BOX' },
	{ name: 'FedEx Extra Large Box', value: 'FEDEX_EXTRA_LARGE_BOX' },
	{ name: 'FedEx Tube', value: 'FEDEX_TUBE' },
];

export const PICKUP_TYPE_OPTIONS: INodePropertyOptions[] = [
	{ name: 'Use Scheduled Pickup', value: 'USE_SCHEDULED_PICKUP' },
	{ name: 'Drop Off at FedEx Location', value: 'DROPOFF_AT_FEDEX_LOCATION' },
	{ name: 'Contact FedEx to Schedule', value: 'CONTACT_FEDEX_TO_SCHEDULE' },
];

// imageType enum confirmed in ship.json; drives both the request and the binary MIME type.
export const LABEL_IMAGE_OPTIONS: INodePropertyOptions[] = [
	{ name: 'PDF', value: 'PDF' },
	{ name: 'PNG', value: 'PNG' },
	{ name: 'Thermal (ZPLII)', value: 'ZPLII' },
	{ name: 'Thermal (EPL2)', value: 'EPL2' },
];

export const LABEL_STOCK_OPTIONS: INodePropertyOptions[] = [
	{ name: 'Paper 4x6', value: 'PAPER_4X6' },
	{ name: 'Paper 4x8', value: 'PAPER_4X8' },
	{ name: 'Paper Letter', value: 'PAPER_LETTER' },
	{ name: 'Stock 4x6.75', value: 'STOCK_4X675' },
	{ name: 'Stock 4x8', value: 'STOCK_4X8' },
];

export const WEIGHT_UNIT_OPTIONS: INodePropertyOptions[] = [
	{ name: 'Pounds (LB)', value: 'LB' },
	{ name: 'Kilograms (KG)', value: 'KG' },
];

export const DIMENSION_UNIT_OPTIONS: INodePropertyOptions[] = [
	{ name: 'Inches (IN)', value: 'IN' },
	{ name: 'Centimeters (CM)', value: 'CM' },
];
