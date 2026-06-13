# FedEx APIs and Developer Portal

    

 [![ Sign Up or Log In](https://developer.fedex.com/api/content/dam/fedex-com/irc/leftnav/login-icon_white.svg) Sign Up or Log In](#)

---

[](https://www.fedex.com/en-ca/developer.html)

# 

Rates and Transit Times API

[DOWNLOAD JSON SCHEMA](blob:https://developer.fedex.com/63d1ccab-caf6-4899-94c2-1b8e4a81d2d5)

-   Introduction-   FedEx Rates and Transit Times API Details-   How FedEx Rates and Transit Times API Works-   FedEx Special Rates-   Variable Handling Fees and Charges-   Business Rules-   JSON API Collection

-   Error Codes

### Introduction

This detailed guide will help you to learn all that you need to know about rates and transit times. FedEx provides you the estimated delivery date/time and rate quotes for each service offered.

When requesting rate quotes, it is important to specify the details of the shipment. This will include the date, detailed origin address, destination address, dimensions, and the package weight. By providing these accurate details, you can ensure that you receive the correct quote for your shipment. If you have any special requirements, such as shipping hazardous goods, you must specify these requirements in the shipment details.

_Note: The Rate API does not provide the rate quotes for FedEx freight services._

### FedEx Rates and Transit Times API Details

When planning your budget, it helps you to know the estimated cost of shipping. FedEx offers a variety of rates to cater to your needs. You can request rates for your FedEx shipments. Apart from that there are list rates, discounts, surcharges, fees and other factors that can affect your shipping rates.

Following are the features associated with this API:

-   **Get Quick Rate Quote**
    
    Get quick rate quotes and transit times without entering detailed package descriptions.
    
-   **Transit time**
    
    Get transit times for services between source and destination.
    
-   **Detailed Rate Quote**
    
    Get rate quotes, transit times, including duty and tax estimates for domestic as well as international shipment. Customers must input detailed shipment information, including package dimensions, declared value (DV) amounts, and additional service options. Duty and tax estimates are only available to FedEx customers who are shipping products/commodities, and not documents.
    

### **Benefits of the FedEx Rates and Transit Times API:**

-   Simplifies shipment planning by determining costs and transit times from any origin to any destination worldwide.
-   Provides both standard list and account-specific rate quotes for various FedEx services.
-   Saves time with quick access to account-specific rates.
-   Saves money by comparing rates by service and allowing you to make decisions based on your shipping needs.
-   Saves time with quick answers to shipment cost and delivery date questions.

This API provides a shipping rate quote for a specific service combination depending on the origin and destination information supplied in the request. The following details apply:

-   Discount rates are available for all services and origin/destination pairs.
-   This API returns rate for the origin and destination for the requested service and will not validate whether that service is available for your ship date as well as origin and destination.
-   Rates can also be retrieved for intra-Mexico FedEx Express shipping.
-   Rates are also available for FedEx Ground® Economy (Formerly known as FedEx SmartPost®) Shipping.
-   Service-specific commitment and rate information may also be specified.

For more detailed information about the services offered by FedEx, see the electronic [FedEx Service Guide](https://www.fedex.com/en-us/service-guide.html).

### How FedEx Rates and Transit Times API Works

**Rate and Transit Times**

Request a list of all possible rates quotes and optional transit information based on input details. The required input information associated with this request are:

-   Account Number
-   Shipment details.

When requesting rates and transit times:

-   Include as much detail as possible about your shipment. This information is important for calculating the correct shipping costs with surcharges.
-   Use the _RateRequestTypes_ element to request specific rates whether LIST or account specific. If you choose LIST as the element value, you receive both account specific and list rates.
-   For requesting rate quotes for a single service, specify the service to ensure rate data for the service is returned. Multiple services rates are returned, if you do not include the ServiceType value.
-   For carrier specific detailed rates, specify the carrier by using CarrierCode in your request and rate data for all services for the input carrier will be returned, or do not specify a CarrierCode to receive all available services from all carriers in the return.
-   Use the _returnTransitTimes_ element to include transit time information in the reply. FedEx Express, FedEx Ground and FedEx Home Delivery do include the estimated days and date the package will be delivered, based on the ship date you specified.
-   Use the processingOptions element to receive on call pickup rates in the response. The INCLUDE\_PICKUPRATES enumeration value must be selected for this request.
-   Use the requestType field to receive pick up rate quotes for a future date and same date. If you plan to schedule a pickup for a future date, set the requestType field to FUTURE\_DAY, and provide details for the following two fields to get accurate pickup rate quotes back.
    -   requestedShipment.pickupDetail.readyDate
    -   requestedShipment.pickupDetail.latestPickupDate
-   The response for the transit times request for FedEx Ground® Economy (Formerly known as FedEx SmartPost®) will include specific delivery date and day of the week, based on the values specified in the request.
-   Information such as carrier code, service type or service option can be used to filter the results.
-   Results can be sorted (Element: _rateSortOrder_) in order to get the rate quote data in a desired way/format.

**Rates and Transit Times Response**

Result of this request will provide a list of all possible rate quotes and optional transit information with service code, service types, packaging types and commitment details such as days/time in transit and any specific day delivery (Saturday delivery).

The following are the rates and charges returned in response:

-   **LIST Rates** – returns published list rates in addition to account-based (if applicable).
-   **PREFERRED Rates** – returns rates in Preferred Currency provided in the request.
-   **INCENTIVE Rates** – promotional pricing.
-   **ACCOUNT Rates** – account assigned rates
-   **Surcharges**
-   **Discounts**
-   **Fees and Taxes**

_Note: A rate request does not return route. All rate quotes are estimates only and may differ from the actual invoiced amount._

For more information on discount programs refer to [Discounts.](https://developer.fedex.com/api/en-ca/guides/api-reference.html#discounts)

### FedEx Special Rates

**Multiple-Piece Shipment Rates**

This option is available with FedEx Domestic, FedEx International multiple-piece shipments (MPS), FedEx domestic as well as International Ground® MPS, FedEx Express international C.O.D. multiple-piece shipments, and FedEx Ground international C.O.D. multiple-piece shipments.

**U.S. Package Rates: FedEx Express Multiweight®**

FedEx Express multiple-piece shipments may receive a rate on a total-shipment-weight basis if the total shipment weighs 100 lbs. or more (200 lbs. or more for FedEx Express Saver® shipments). A 15-lbs. average minimum package weight for the shipment applies. Multiply the per-pound rate by total shipment weight. The lowest rate out of the FedEx Express Multiweight shipment rate or the sum of the individual price per package will be selected and automatically applied in the billing.

**FedEx One Rate**

FedEx One Rate is flat-rate shipping that does not require you to weigh or measure shipments under 50 lbs. You can choose the box or tube that best fits the size of what they need to ship and fill the package to capacity, as long as the shipment doesn’t exceed 50 pounds. It gives you a simple, predictable, flat rate shipping option for your FedEx Express packages. FedEx One Rate a shipping portfolio based on six FedEx Express Service options, combined with seven FedEx proprietary (white) packaging types.

**FedEx One Rate Packaging**

The FedEx packaging types that are valid/available with the One Rate pricing option are:

-   FEDEX\_ENVELOPE
-   FEDEX\_EXTRA\_SMALL\_BOX
-   FEDEX\_SMALL\_BOX
-   FEDEX\_MEDIUM\_BOX
-   FEDEX\_LARGE\_BOX
-   FEDEX\_EXTRA\_LARGE\_BOX
-   FEDEX\_PAK
-   FEDEX\_TUBE

Your own packaging is not available for the One Rate pricing option.

For more information about packaging services refer to [Packaging Types](https://developer.fedex.com/api/en-ca/guides/api-reference.html#packagetypes)

**How to Specify One Rate Pricing**

To specify FedEx One Rate Pricing Option, perform the following steps:

-   Specify the \\"FEDEX\_ONE\_RATE\\" Shipment Special Service.
-   Specify one of the Packaging Types.
-   Specify a U.S. origin and a U.S. destination.

_Note: Intra-Hawaii shipments are not allowed for One Rate pricing._

-   Specify one of the following FedEx Express service types:
    -   FIRST\_OVERNIGHT
    -   PRIORITY\_OVERNIGHT
    -   STANDARD\_OVERNIGHT
    -   FEDEX\_2\_DAY
    -   FEDEX\_2\_DAY\_AM
    -   EXPRESS\_SAVER

_Note: FedEx customers can request both One Rate and weight based (non-One Rate) rates in a single Rate Request by specifying \\"FEDEX\_ONE\_RATE\\" as a Service Option Type in the request._

### Variable Handling Fees and Charges

**Variable handling fee**

Any additional handling fees charged in addition to shipping charges for your shipping operation are added to your total shipment charge. These charges are returned in the Rate reply and can be configured to print on the Doc-Tab. For more information refer to [Variable Handling Fees](https://developer.fedex.com/api/en-ca/guides/api-reference.html#variablehandlingfees)

**Rate Surcharge Return**

For any additional special handling or services the surcharges are charged in addition to shipping charges for your shipment. These charges are returned in the Rate reply.

The rate quote returns the available surcharges along with the rate details.

Surcharges returned in the Rate reply are as follows:

-   Total surcharge
-   Total taxes (for Canadian origin shipments)
-   Itemized surcharge

For more information refer to [Surcharges](https://developer.fedex.com/api/en-ca/guides/api-reference.html#surcharges)

**Fees and Other Shipping Information**

Your shipment may incur fees in addition to its base rate.

-   For FedEx Express U.S. import shipments, fees vary depending on origin country; however, each fee works the same as for U.S. export.
-   U.S. Express Package Services includes FedEx First Overnight®, FedEx Priority Overnight®, FedEx Standard Overnight®, FedEx 2Day® A.M., FedEx 2Day® and FedEx Express Saver®.
-   U.S. Ground Services includes FedEx Ground® and FedEx Home Delivery®.
-   International Express Package Services includes FedEx International First®, FedEx International Priority®, FedEx International Economy®, and Fedex Deferred Freight.
-   International Ground Service includes FedEx International Ground® .\[Service ENUM : FEDEX\_GROUND\]

_Please note that when entering decimal values for length, width, or height in Web Services, only the whole number portion is used for rate calculations. For example, if you enter 9.4, the system will use 9 in the calculation._

### Business Rules

-   Do not assume a particular service will be available for all scenarios. For example, STANDARD\_OVERNIGHT (among others) is not available between all postal codes.
-   If a specific service is being requested for rating, include the Service Type in the request. This will decrease the size of the reply and reduce transaction response time.
-   Multiple piece shipments (MPS) are not eligible for FedEx One Rate.
-   For a special service to be included on a shipment, both the special service type and its detail must be included. If the special service details are not included, then there may be no indication that the special services are not included.
-   The timestamp for a rate or shipment should be the time the package is expected to be tendered to FedEx or a FedEx agent. This is not necessarily the time at which the ship or rate transaction is performed. For example, a shipment generated late Friday night for a package that will not be picked up by FedEx until Monday should have a Monday timestamp. Use the correct timestamp if it is known, or the delivery estimation and rates may not be correct.
-   The rate and transit time application only uses city name or zip/postal code to define transit time. FedEx only displays the city or zip/postal code served by FedEx in the destination and origin countries you selected.
-   FedEx does not deliver to Post Office Box addresses in the U.S. Please enter a Zip Code to find the transit time for your shipment or click on Find Zip/Postal code.
-   Packages picked up from a residence may have one additional transit day. For faster returns please drop off at a staffed FedEx location.
-   Pharmacy delivery is not valid with Hold at location.

### JSON API Collection

Explore our JSON API collection to see how we can deliver on your business needs. Test your integration with these sample requests.

[Learn more about sandbox virtualization guide](https://developer.fedex.com/api/en-ca/guides/sandboxvirtualization.html)

[Documentation Powered by ReDoc](https://github.com/Redocly/redoc)

# Rates and Transit Times API (1.0.0)

## [](#operation/Rate and Transit times)Rate and Transit times

This endpoint provides the ability to retrieve rate quotes and optionalll transit information. The rate is calculated based on the origin and destination of the shipment. Additional information such as carrier code, service type, or service option can be used to filter the results. If carrier code is provided, the response includes the rate quotes for the specific transportation carrier. This endpoint provides the rates for FedEx Ground and FedEx Express and does not offer rates for FedEx Freight.  
_Note: FedEx APIs do not support Cross-Origin Resource Sharing (CORS) mechanism._

  

EXPAND ALLCOLLAPSE ALL

To learn more about how to get OAuth access token, refer to [API Authorization documentation.](/api/en-ca/catalog/authorization/v1/docs.html)

##### header Parameters

x-customer-transaction-id

string

Example: 624deea6-b709-470c-8c39-4b5511281492

This element allows you to assign a unique identifier to your transaction. This element is also returned in the reply and helps you match the request to the reply.

content-type

required

string

Example: application/json

This is used to indicate the media type of the resource. The media type is a string sent along with the file indicating format of the file.

x-locale

string

Example: en\_US

This indicates the combination of language code and country code. Click here to see Locales

authorization

required

string

Example: Bearer XXX

This indicates the authorization token for the input request.

##### Request Body schema: application/json

One of

-   Full\_Schema\_Quote\_Rate
-   MinimumSamplePayload\_1
-   FreightSamplePayload-RateResourceDetails\_1
-   US\_Domestic\_Rate\_shop
-   FDGSamplePayload-RateResourceDetails-IntraEurope
-   Alternate\_Currency\_Rate\_Quote
-   Express\_Freight\_Rate\_Quote
-   International\_Hold\_At\_Location\_with\_Adult\_Signature\_Option
-   International\_Multi\_Piece\_Rate\_Quote
-   International\_Return\_Rate\_Quote
-   Intra\_Canada\_Rate\_Quote
-   Intra\_Europe\_Rate\_Quote
-   Intra\_India\_Cash\_On\_Delivery\_Rate\_Quote
-   Intra\_Mexico\_Express\_Saver\_Rate\_Quote
-   Priority\_Alert\_Rate\_Quote
-   Express\_Freight\_Saturday\_Pickup\_Rate\_Quote
-   SmartPost\_Rate\_Quote
-   International\_Dry\_Ice\_Rate\_Quote
-   US\_Domestic\_Multi\_Piece\_Rate\_Quote
-   US\_Domestic\_Priority\_Overnight\_Rate\_Quote
-   Ground\_Home\_Delivery\_Appointment\_Delivery\_Rate\_Quote
-   International\_Ground\_Rate\_Quote
-   International\_Priority\_Rate\_Quote

accountNumber

required

object (AccountNumber)

This is the Account number details.  
_Note:_

-   _If the paymentType is Sender, then the account number is optional in shippingChargesPayment._

rateRequestControlParameters

object (RateRequestControlParameters)

Specify the return transit times, services needed on rate failure, choice of variable option and order to sort rate options to filter and sort the expected response.

requestedShipment

required

object (RequestedShipment)

This is shipment data for which a rate quote (or rate-shipping comparison) is requested.

processingOptions

Array of strings

Items Value: "INCLUDE\_PICKUPRATES"

Array of processing options for the shipment.

carrierCodes

Array of strings

Specify the four letter code of a FedEx operating company that meets your requirements.  
Example: FDXE  

-   FDXE - FedEx Express
-   FDXG - FedEx Ground
-   FXSP - FedEx SmartPost
-   FXCC - FedEx Custom Critical.

version

object (Version)

### Responses

**200**

Success

**400**

Bad Request

**401**

Unauthorized

**403**

Forbidden

**404**

Not Found

**500**

Failure

**503**

Service Unavailable

post /rate/v1/rates/quotes

Sandbox Server

https://apis-sandbox.fedex.com/rate/v1/rates/quotes

Production Server

https://apis.fedex.com/rate/v1/rates/quotes

### Request samples - Rate and Transit times

-   Payload
-   C#
-   JAVA
-   JAVASCRIPT
-   PHP
-   PYTHON
-   RUST
-   SWIFT

Content type

application/json

Example

Full\_Schema\_Quote\_Rate

Copy

Expand all Collapse all

{

-   "accountNumber":
    
    {
    
    -   "value": "Your account number"
        
    
    },
    
-   "rateRequestControlParameters":
    
    {
    
    -   "returnTransitTimes": false,
        
    -   "servicesNeededOnRateFailure": true,
        
    -   "variableOptions": "FREIGHT\_GUARANTEE",
        
    -   "rateSortOrder": "SERVICENAMETRADITIONAL"
        
    
    },
    
-   "requestedShipment":
    
    {
    
    -   "shipper":
        
        {
        
        -   "address":
            
            {
            
            -   "streetLines":
                
                \[
                
                -   "1550 Union Blvd",
                    
                -   "Suite 302"
                    
                
                \],
                
            -   "city": "Beverly Hills",
                
            -   "stateOrProvinceCode": "TN",
                
            -   "postalCode": "65247",
                
            -   "countryCode": "US",
                
            -   "residential": false
                
            
            }
            
        
        },
        
    -   "pickupDetail":
        
        {
        
        -   "readyDateTime": "2025-06-17",
            
        -   "latestPickupDateTime": "2025-06-17",
            
        -   "courierInstructions": "Leave package at reception",
            
        -   "requestType": "FUTURE\_DAY",
            
        -   "requestSource": "AUTOMATION"
            
        
        },
        
    -   "recipient":
        
        {
        
        -   "address":
            
            {
            
            -   "streetLines":
                
                \[
                
                -   "1550 Union Blvd",
                    
                -   "Suite 302"
                    
                
                \],
                
            -   "city": "Beverly Hills",
                
            -   "stateOrProvinceCode": "TN",
                
            -   "postalCode": "65247",
                
            -   "countryCode": "US",
                
            -   "residential": false
                
            
            }
            
        
        },
        
    -   "serviceType": "STANDARD\_OVERNIGHT",
        
    -   "preferredCurrency": "USD",
        
    -   "rateRequestType":
        
        \[
        
        -   "ACCOUNT",
            
        -   "LIST"
            
        
        \],
        
    -   "shipDateStamp": "2019-09-05",
        
    -   "pickupType": "DROPOFF\_AT\_FEDEX\_LOCATION",
        
    -   "requestedPackageLineItems":
        
        \[
        
        -   {
            
            -   "subPackagingType": "BAG",
                
            -   "groupPackageCount": 1,
                
            -   "declaredValue":
                
                {
                
                -   "amount": "100",
                    
                -   "currency": "USD"
                    
                
                },
                
            -   "weight":
                
                {
                
                -   "units": "LB",
                    
                -   "value": 22
                    
                
                },
                
            -   "dimensions":
                
                {
                
                -   "length": 10,
                    
                -   "width": 8,
                    
                -   "height": 2,
                    
                -   "units": "IN"
                    
                
                },
                
            -   "variableHandlingChargeDetail":
                
                {
                
                -   "rateType": "ACCOUNT",
                    
                -   "percentValue": 0,
                    
                -   "rateLevelType": "BUNDLED\_RATE",
                    
                -   "fixedValue":
                    
                    {
                    
                    -   "amount": "100",
                        
                    -   "currency": "USD"
                        
                    
                    },
                    
                -   "rateElementBasis": "NET\_CHARGE"
                    
                
                },
                
            -   "packageSpecialServices":
                
                {
                
                -   "specialServiceTypes":
                    
                    \[
                    
                    -   "DANGEROUS\_GOODS"
                        
                    
                    \],
                    
                -   "signatureOptionType":
                    
                    \[
                    
                    -   "NO\_SIGNATURE\_REQUIRED"
                        
                    
                    \],
                    
                -   "alcoholDetail":
                    
                    {
                    
                    -   "alcoholRecipientType": "LICENSEE",
                        
                    -   "shipperAgreementType": "Retailer"
                        
                    
                    },
                    
                -   "dangerousGoodsDetail":
                    
                    {
                    
                    -   "accessibility": "ACCESSIBLE",
                        
                    -   "options":
                        
                        \[
                        
                        -   "BATTERY"
                            
                        
                        \],
                        
                    -   "containers":
                        
                        \[
                        
                        -   {
                            
                            -   "offeror": "Offeror Name",
                                
                            -   "hazardousCommodities":
                                
                                \[
                                
                                -   {
                                    
                                    -   "quantity":
                                        
                                        {
                                        
                                        -   "quantityType": "GROSS",
                                            
                                        -   "amount": 0,
                                            
                                        -   "units": "LB"
                                            
                                        
                                        },
                                        
                                    -   "innerReceptacles":
                                        
                                        \[
                                        
                                        -   {
                                            
                                            -   "quantity":
                                                
                                                {
                                                
                                                -   "quantityType": "GROSS",
                                                    
                                                -   "amount": 0,
                                                    
                                                -   "units": "LB"
                                                    
                                                
                                                }
                                                
                                            
                                            }
                                            
                                        
                                        \],
                                        
                                    -   "options":
                                        
                                        {
                                        
                                        -   "labelTextOption": "Override",
                                            
                                        -   "customerSuppliedLabelText": "LabelText"
                                            
                                        
                                        },
                                        
                                    -   "description":
                                        
                                        {
                                        
                                        -   "sequenceNumber": 0,
                                            
                                        -   "processingOptions":
                                            
                                            \[
                                            
                                            -   "INCLUDE\_SPECIAL\_PROVISIONS"
                                                
                                            
                                            \],
                                            
                                        -   "subsidiaryClasses": "subsidiaryClass",
                                            
                                        -   "labelText": "labelText",
                                            
                                        -   "technicalName": "technicalName",
                                            
                                        -   "packingDetails":
                                            
                                            {
                                            
                                            -   "packingInstructions": "instruction",
                                                
                                            -   "cargoAircraftOnly": false
                                                
                                            
                                            },
                                            
                                        -   "authorization": "Authorization Information",
                                            
                                        -   "reportableQuantity": false,
                                            
                                        -   "percentage": 10,
                                            
                                        -   "id": "ID",
                                            
                                        -   "packingGroup": "DEFAULT",
                                            
                                        -   "properShippingName": "ShippingName",
                                            
                                        -   "hazardClass": "hazardClass"
                                            
                                        
                                        }
                                        
                                    
                                    }
                                    
                                
                                \],
                                
                            -   "numberOfContainers": 10,
                                
                            -   "containerType": "Copper Box",
                                
                            -   "emergencyContactNumber":
                                
                                {
                                
                                -   "areaCode": "202",
                                    
                                -   "extension": "3245",
                                    
                                -   "countryCode": "US",
                                    
                                -   "personalIdentificationNumber": "9545678",
                                    
                                -   "localNumber": "23456"
                                    
                                
                                },
                                
                            -   "packaging":
                                
                                {
                                
                                -   "count": 20,
                                    
                                -   "units": "Liter"
                                    
                                
                                },
                                
                            -   "packingType": "ALL\_PACKED\_IN\_ONE",
                                
                            -   "radioactiveContainerClass": "EXCEPTED\_PACKAGE"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "regulation": "ADR"
                        
                    
                    },
                    
                -   "packageCODDetail":
                    
                    {
                    
                    -   "codCollectionAmount":
                        
                        {
                        
                        -   "amount": 12.45,
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "codCollectionType": "ANY"
                        
                    
                    },
                    
                -   "pieceCountVerificationBoxCount": 0,
                    
                -   "batteryDetails":
                    
                    \[
                    
                    -   {
                        
                        -   "material": "LITHIUM\_METAL",
                            
                        -   "regulatorySubType": "IATA\_SECTION\_II",
                            
                        -   "packing": "CONTAINED\_IN\_EQUIPMENT"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "dryIceWeight":
                    
                    {
                    
                    -   "units": "LB",
                        
                    -   "value": 10
                        
                    
                    },
                    
                -   "standaloneBatteryDetails":
                    
                    \[
                    
                    -   {
                        
                        -   "batteryMaterialType": "LITHIUM\_METAL"
                            
                        
                        }
                        
                    
                    \]
                    
                
                }
                
            
            }
            
        
        \],
        
    -   "documentShipment": false,
        
    -   "variableHandlingChargeDetail":
        
        {
        
        -   "rateType": "ACCOUNT",
            
        -   "percentValue": 0,
            
        -   "rateLevelType": "BUNDLED\_RATE",
            
        -   "fixedValue":
            
            {
            
            -   "amount": "100",
                
            -   "currency": "USD"
                
            
            },
            
        -   "rateElementBasis": "NET\_CHARGE"
            
        
        },
        
    -   "packagingType": "YOUR\_PACKAGING",
        
    -   "totalPackageCount": 3,
        
    -   "totalWeight": 87.5,
        
    -   "shipmentSpecialServices":
        
        {
        
        -   "returnShipmentDetail":
            
            {
            
            -   "returnType": "PRINT\_RETURN\_LABEL"
                
            
            },
            
        -   "deliveryOnInvoiceAcceptanceDetail":
            
            {
            
            -   "recipient":
                
                {
                
                -   "accountNumber":
                    
                    {
                    
                    -   "value": 123456789
                        
                    
                    },
                    
                -   "address":
                    
                    {
                    
                    -   "streetLines":
                        
                        \[
                        
                        -   "10 FedEx Parkway",
                            
                        -   "Suite 30"
                            
                        
                        \],
                        
                    -   "countryCode": "US"
                        
                    
                    },
                    
                -   "contact":
                    
                    {
                    
                    -   "companyName": "FedEx",
                        
                    -   "faxNumber": "9013577890",
                        
                    -   "personName": "John Taylor",
                        
                    -   "phoneNumber": "9013577890"
                        
                    
                    }
                    
                
                }
                
            
            },
            
        -   "internationalTrafficInArmsRegulationsDetail":
            
            {
            
            -   "licenseOrExemptionNumber": "432345"
                
            
            },
            
        -   "holdAtLocationDetail":
            
            {
            
            -   "locationId": "YBZA",
                
            -   "locationContactAndAddress":
                
                {
                
                -   "address":
                    
                    {
                    
                    -   "streetLines":
                        
                        \[
                        
                        -   "10 FedEx Parkway",
                            
                        -   "Suite 302"
                            
                        
                        \],
                        
                    -   "city": "Beverly Hills",
                        
                    -   "stateOrProvinceCode": "CA",
                        
                    -   "postalCode": "38127",
                        
                    -   "countryCode": "US",
                        
                    -   "residential": false
                        
                    
                    },
                    
                -   "contact":
                    
                    {
                    
                    -   "personName": "person name",
                        
                    -   "emailAddress": "email address",
                        
                    -   "phoneNumber": "phone number",
                        
                    -   "phoneExtension": "phone extension",
                        
                    -   "companyName": "company name",
                        
                    -   "faxNumber": "fax number"
                        
                    
                    }
                    
                
                },
                
            -   "locationType": "FEDEX\_ONSITE"
                
            
            },
            
        -   "shipmentCODDetail":
            
            {
            
            -   "addTransportationChargesDetail":
                
                {
                
                -   "rateType": "ACCOUNT",
                    
                -   "rateLevelType": "BUNDLED\_RATE",
                    
                -   "chargeLevelType": "CURRENT\_PACKAGE",
                    
                -   "chargeType": "COD\_SURCHARGE"
                    
                
                },
                
            -   "codRecipient":
                
                {
                
                -   "accountNumber":
                    
                    {
                    
                    -   "value": 123456789
                        
                    
                    }
                    
                
                },
                
            -   "remitToName": "FedEx",
                
            -   "codCollectionType": "ANY",
                
            -   "financialInstitutionContactAndAddress":
                
                {
                
                -   "address":
                    
                    {
                    
                    -   "streetLines":
                        
                        \[
                        
                        -   "10 FedEx Parkway",
                            
                        -   "Suite 302"
                            
                        
                        \],
                        
                    -   "city": "Beverly Hills",
                        
                    -   "stateOrProvinceCode": "CA",
                        
                    -   "postalCode": "38127",
                        
                    -   "countryCode": "US",
                        
                    -   "residential": false
                        
                    
                    },
                    
                -   "contact":
                    
                    {
                    
                    -   "personName": "person name",
                        
                    -   "emailAddress": "email address",
                        
                    -   "phoneNumber": "phone number",
                        
                    -   "phoneExtension": "phone extension",
                        
                    -   "companyName": "company name",
                        
                    -   "faxNumber": "fax number"
                        
                    
                    }
                    
                
                },
                
            -   "returnReferenceIndicatorType": "INVOICE"
                
            
            },
            
        -   "shipmentDryIceDetail":
            
            {
            
            -   "totalWeight":
                
                {
                
                -   "units": "LB",
                    
                -   "value": 10
                    
                
                },
                
            -   "packageCount": 12
                
            
            },
            
        -   "internationalControlledExportDetail":
            
            {
            
            -   "type": "DEA\_036"
                
            
            },
            
        -   "homeDeliveryPremiumDetail":
            
            {
            
            -   "shipTimestamp": "2020-04-24",
                
            -   "homedeliveryPremiumType": "APPOINTMENT"
                
            
            },
            
        -   "specialServiceTypes":
            
            \[
            
            -   "BROKER\_SELECT\_OPTION"
                
            
            \]
            
        
        },
        
    -   "customsClearanceDetail":
        
        {
        
        -   "brokers":
            
            \[
            
            -   {
                
                -   "broker":
                    
                    {
                    
                    -   "accountNumber":
                        
                        {
                        
                        -   "value": 123456789
                            
                        
                        },
                        
                    -   "address": null,
                        
                    -   "contact": null
                        
                    
                    },
                    
                -   "type": "IMPORT"
                    
                
                }
                
            
            \],
            
        -   "commercialInvoice":
            
            {
            
            -   "shipmentPurpose": "GIFT"
                
            
            },
            
        -   "freightOnValue": "CARRIER\_RISK",
            
        -   "dutiesPayment":
            
            {
            
            -   "payor":
                
                {
                
                -   "responsibleParty":
                    
                    {
                    
                    -   "address":
                        
                        {
                        
                        -   "streetLines":
                            
                            \[
                            
                            -   "10 FedEx Parkway",
                                
                            -   "Suite 302"
                                
                            
                            \],
                            
                        -   "city": "Beverly Hills",
                            
                        -   "stateOrProvinceCode": "CA",
                            
                        -   "postalCode": "90210",
                            
                        -   "countryCode": "US",
                            
                        -   "residential": false
                            
                        
                        },
                        
                    -   "contact":
                        
                        {
                        
                        -   "personName": "John Taylor",
                            
                        -   "emailAddress": "sample@company.com",
                            
                        -   "phoneNumber": "1234567890",
                            
                        -   "phoneExtension": "phone extension",
                            
                        -   "companyName": "Fedex",
                            
                        -   "faxNumber": "fax number"
                            
                        
                        },
                        
                    -   "accountNumber":
                        
                        {
                        
                        -   "value": "123456789"
                            
                        
                        }
                        
                    
                    }
                    
                
                },
                
            -   "paymentType": "SENDER"
                
            
            },
            
        -   "commodities":
            
            \[
            
            -   {
                
                -   "description": "DOCUMENTS",
                    
                -   "weight":
                    
                    {
                    
                    -   "units": "LB",
                        
                    -   "value": 22
                        
                    
                    },
                    
                -   "quantity": 1,
                    
                -   "customsValue":
                    
                    {
                    
                    -   "amount": "100",
                        
                    -   "currency": "USD"
                        
                    
                    },
                    
                -   "unitPrice":
                    
                    {
                    
                    -   "amount": "100",
                        
                    -   "currency": "USD"
                        
                    
                    },
                    
                -   "numberOfPieces": 1,
                    
                -   "countryOfManufacture": "US",
                    
                -   "quantityUnits": "PCS",
                    
                -   "name": "DOCUMENTS",
                    
                -   "harmonizedCode": "080211",
                    
                -   "partNumber": "P1"
                    
                
                }
                
            
            \]
            
        
        },
        
    -   "smartPostInfoDetail":
        
        {
        
        -   "ancillaryEndorsement": "ADDRESS\_CORRECTION",
            
        -   "hubId": "5531",
            
        -   "indicia": "MEDIA\_MAIL",
            
        -   "specialServices": "USPS\_DELIVERY\_CONFIRMATION"
            
        
        }
        
    
    },
    
-   "processingOptions":
    
    \[
    
    -   "INCLUDE\_PICKUPRATES"
        
    
    \],
    
-   "carrierCodes":
    
    \[
    
    -   "FDXE",
        
    -   "FDXG"
        
    
    \],
    
-   "version":
    
    {
    
    -   "major": "1",
        
    -   "minor": "1",
        
    -   "patch": "1"
        
    
    }
    

}

### Response samples - Rate and Transit times

-   200
-   400
-   401
-   403
-   404
-   500
-   503

Content type

application/json

Copy

Expand all Collapse all

{

-   "transactionId": "624deea6-b709-470c-8c39-4b5511281492",
    
-   "customerTransactionId": "AnyCo\_order123456789",
    
-   "output":
    
    {
    
    -   "rateReplyDetails":
        
        \[
        
        -   {
            
            -   "serviceType": "INTERNATIONAL\_FIRST",
                
            -   "serviceName": "FedEx International First",
                
            -   "packagingType": "YOUR\_PACKAGING",
                
            -   "customerMessages":
                
                \[
                
                -   {
                    
                    -   "code": "SERVICE.TYPE.INTERNATIONAL.MESSAGE",
                        
                    -   "message": "Rate does not include duties & taxes, clearance entry fees or other import fees. The payor of duties/taxes/fees will be responsible for any applicable Clearance Entry Fees."
                        
                    
                    },
                    
                -   {
                    
                    -   "code": "EDT.DETAILS.MISSING",
                        
                    -   "message": "The harmonized code for the commodity at array index 1 is missing or invalid; estimated duties and taxes were not returned."
                        
                    
                    }
                    
                
                \],
                
            -   "ratedShipmentDetails":
                
                \[
                
                -   {
                    
                    -   "rateType": "ACCOUNT",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 403.2,
                        
                    -   "totalNetCharge": 445.54,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 445.54,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetTransportationAndPickupCharge":
                        
                        {
                        
                        -   "amount": 12.45,
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "totalNetFedExTransportationAndPickupCharge":
                        
                        {
                        
                        -   "amount": 12.45,
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "pickupRateDetail":
                        
                        {
                        
                        -   "rateType": "INCENTIVE",
                            
                        -   "ratingBasis": "PACK\_WEIGHT\_BASED",
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "fuelSurchargePercent": 90.8
                            
                        
                        },
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 445.54,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "CA003O",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 10.5,
                            
                        -   "totalSurcharges": 42.34,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "amount": 42.34
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "CAD",
                                
                            -   "rate": 1
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "valu": 22
                                
                            
                            },
                            
                        -   "currency": "CAD"
                            
                        
                        },
                        
                    -   "currency": "CAD"
                        
                    
                    },
                    
                -   {
                    
                    -   "rateType": "LIST",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 403.2,
                        
                    -   "totalNetCharge": 445.54,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 445.54,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetTransportationAndPickupCharge":
                        
                        {
                        
                        -   "amount": 12.45,
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "totalNetFedExTransportationAndPickupCharge":
                        
                        {
                        
                        -   "amount": 12.45,
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "pickupRateDetail":
                        
                        {
                        
                        -   "rateType": "INCENTIVE",
                            
                        -   "ratingBasis": "PACK\_WEIGHT\_BASED",
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "fuelSurchargePercent": 90.8
                            
                        
                        },
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 445.54,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "CA003O",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 10.5,
                            
                        -   "totalSurcharges": 42.34,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "amount": 42.34
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "CAD",
                                
                            -   "rate": 1
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "CAD"
                            
                        
                        },
                        
                    -   "currency": "CAD"
                        
                    
                    },
                    
                -   {
                    
                    -   "rateType": "PREFERRED\_INCENTIVE",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 308.71,
                        
                    -   "totalNetCharge": 341.13,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 341.13,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetTransportationAndPickupCharge":
                        
                        {
                        
                        -   "amount": 12.45,
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "totalNetFedExTransportationAndPickupCharge":
                        
                        {
                        
                        -   "amount": 12.45,
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "pickupRateDetail":
                        
                        {
                        
                        -   "rateType": "INCENTIVE",
                            
                        -   "ratingBasis": "PACK\_WEIGHT\_BASED",
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "fuelSurchargePercent": 90.8
                            
                        
                        },
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 341.13,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "CA003O",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 10.5,
                            
                        -   "totalSurcharges": 32.42,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "amount": 32.42
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "USD",
                                
                            -   "rate": 0.77
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "currency": "USD"
                        
                    
                    },
                    
                -   {
                    
                    -   "rateType": "PREFERRED\_CURRENCY",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 308.71,
                        
                    -   "totalNetCharge": 341.13,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 341.13,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetTransportationAndPickupCharge":
                        
                        {
                        
                        -   "amount": 12.45,
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "totalNetFedExTransportationAndPickupCharge":
                        
                        {
                        
                        -   "amount": 12.45,
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "pickupRateDetail":
                        
                        {
                        
                        -   "rateType": "INCENTIVE",
                            
                        -   "ratingBasis": "PACK\_WEIGHT\_BASED",
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "fuelSurchargePercent": 90.8
                            
                        
                        },
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 341.13,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "CA003O",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 10.5,
                            
                        -   "totalSurcharges": 32.42,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "amount": 32.42
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "USD",
                                
                            -   "rate": 0.77
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "currency": "USD"
                        
                    
                    }
                    
                
                \],
                
            -   "anonymouslyAllowable": true,
                
            -   "operationalDetail":
                
                {
                
                -   "originLocationIds": "COSA",
                    
                -   "commitDays": "",
                    
                -   "serviceCode": "92",
                    
                -   "airportId": "MEM",
                    
                -   "scac": "",
                    
                -   "originServiceAreas": "AM",
                    
                -   "deliveryDay": "TUE",
                    
                -   "originLocationNumbers": 1162,
                    
                -   "destinationPostalCode": "38125",
                    
                -   "commitDate": "2019-07-22T08:30:00",
                    
                -   "astraDescription": "INTL1ST",
                    
                -   "deliveryDate": "",
                    
                -   "deliveryEligibilities": "",
                    
                -   "ineligibleForMoneyBackGuarantee": false,
                    
                -   "maximumTransitTime": "",
                    
                -   "astraPlannedServiceLevel": "",
                    
                -   "destinationLocationIds": "EHTA",
                    
                -   "destinationLocationStateOrProvinceCodes": "CT",
                    
                -   "transitTime": "THREE\_DAYS",
                    
                -   "packagingCode": "02",
                    
                -   "destinationLocationNumbers": 892,
                    
                -   "publishedDeliveryTime": "06:30:00",
                    
                -   "countryCodes": "US",
                    
                -   "stateOrProvinceCodes": "TX",
                    
                -   "ursaPrefixCode": "82",
                    
                -   "ursaSuffixCode": "EHTA",
                    
                -   "destinationServiceAreas": "AA",
                    
                -   "originPostalCodes": "75063",
                    
                -   "customTransitTime": ""
                    
                
                },
                
            -   "signatureOptionType": "SERVICE\_DEFAULT",
                
            -   "serviceDescription":
                
                {
                
                -   "serviceId": "EP1000000007",
                    
                -   "serviceType": "INTERNATIONAL\_FIRST",
                    
                -   "code": "06",
                    
                -   "names":
                    
                    \[
                    
                    -   {
                        
                        -   "type": "long",
                            
                        -   "encoding": "utf-8",
                            
                        -   "value": "FedEx International First®"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "long",
                            
                        -   "encoding": "ascii",
                            
                        -   "value": "FedEx International First"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "medium",
                            
                        -   "encoding": "utf-8",
                            
                        -   "value": "FedEx International First®"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "medium",
                            
                        -   "encoding": "ascii",
                            
                        -   "value": "FedEx International First"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "short",
                            
                        -   "encoding": "utf-8",
                            
                        -   "value": "FO"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "short",
                            
                        -   "encoding": "ascii",
                            
                        -   "value": "FO"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "abbrv",
                            
                        -   "encoding": "ascii",
                            
                        -   "value": "FO"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "operatingOrgCodes":
                    
                    \[
                    
                    -   "FXE"
                        
                    
                    \],
                    
                -   "serviceCategory": "parcel",
                    
                -   "description": "International First",
                    
                -   "astraDescription": "INTL1ST"
                    
                
                },
                
            -   "commit":
                
                {
                
                -   "dateDetail":
                    
                    {
                    
                    -   "dayOfWeek": "THU",
                        
                    -   "dayCxsFormat": "2020-07-16T10:30:00"
                        
                    
                    }
                    
                
                }
                
            
            },
            
        -   {
            
            -   "serviceType": "INTERNATIONAL\_PRIORITY",
                
            -   "serviceName": "FedEx International Priority",
                
            -   "packagingType": "YOUR\_PACKAGING",
                
            -   "customerMessages":
                
                \[
                
                -   {
                    
                    -   "code": "SERVICE.TYPE.INTERNATIONAL.MESSAGE",
                        
                    -   "message": "Rate does not include duties & taxes, clearance entry fees or other import fees. The payor of duties/taxes/fees will be responsible for any applicable Clearance Entry Fees."
                        
                    
                    },
                    
                -   {
                    
                    -   "code": "EDT.DETAILS.MISSING",
                        
                    -   "message": "The harmonized code for the commodity at array index 1 is missing or invalid; estimated duties and taxes were not returned."
                        
                    
                    }
                    
                
                \],
                
            -   "ratedShipmentDetails":
                
                \[
                
                -   {
                    
                    -   "rateType": "ACCOUNT",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 312.35,
                        
                    -   "totalNetCharge": 345.15,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 345.15,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 345.15,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "CA003O",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 10.5,
                            
                        -   "totalSurcharges": 32.8,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "amount": 32.8
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "CAD",
                                
                            -   "rate": 1
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "CAD"
                            
                        
                        },
                        
                    -   "currency": "CAD"
                        
                    
                    },
                    
                -   {
                    
                    -   "rateType": "LIST",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 78.99,
                        
                    -   "totalNetCharge": 87.28,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 87.28,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 87.28,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "CA1520",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 10.5,
                            
                        -   "totalSurcharges": 8.29,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "amount": 8.29
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "CAD",
                                
                            -   "rate": 1
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "CAD"
                            
                        
                        },
                        
                    -   "currency": "CAD"
                        
                    
                    },
                    
                -   {
                    
                    -   "rateType": "PREFERRED\_INCENTIVE",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 60.48,
                        
                    -   "totalNetCharge": 66.83,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 66.83,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 66.83,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "CA1520",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 10.5,
                            
                        -   "totalSurcharges": 6.3,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "amount": 6.35
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "USD",
                                
                            -   "rate": 0.77
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "currency": "USD"
                        
                    
                    },
                    
                -   {
                    
                    -   "rateType": "PREFERRED\_CURRENCY",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 239.15,
                        
                    -   "totalNetCharge": 264.26,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 264.26,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 264.26,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "CA003O",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 10.5,
                            
                        -   "totalSurcharges": 25.11,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "amount": 25.11
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "USD",
                                
                            -   "rate": 0.77
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "currency": "USD"
                        
                    
                    }
                    
                
                \],
                
            -   "anonymouslyAllowable": true,
                
            -   "operationalDetail":
                
                {
                
                -   "ineligibleForMoneyBackGuarantee": false,
                    
                -   "astraDescription": "IP",
                    
                -   "airportId": "MEM",
                    
                -   "serviceCode": "01",
                    
                -   "originLocationIds": "COSA",
                    
                -   "commitDays": "",
                    
                -   "scac": "",
                    
                -   "originServiceAreas": "AM",
                    
                -   "deliveryDay": "TUE",
                    
                -   "originLocationNumbers": 1162,
                    
                -   "destinationPostalCode": "38125",
                    
                -   "commitDate": "2019-07-22T08:30:00",
                    
                -   "deliveryDate": "",
                    
                -   "deliveryEligibilities": "",
                    
                -   "maximumTransitTime": "",
                    
                -   "astraPlannedServiceLevel": "",
                    
                -   "destinationLocationIds": "EHTA",
                    
                -   "destinationLocationStateOrProvinceCodes": "CT",
                    
                -   "transitTime": "THREE\_DAYS",
                    
                -   "packagingCode": "02",
                    
                -   "destinationLocationNumbers": 892,
                    
                -   "publishedDeliveryTime": "06:30:00",
                    
                -   "countryCodes": "US",
                    
                -   "stateOrProvinceCodes": "TX",
                    
                -   "ursaPrefixCode": "82",
                    
                -   "ursaSuffixCode": "EHTA",
                    
                -   "destinationServiceAreas": "AA",
                    
                -   "originPostalCodes": "75063",
                    
                -   "customTransitTime": ""
                    
                
                },
                
            -   "signatureOptionType": "SERVICE\_DEFAULT",
                
            -   "serviceDescription":
                
                {
                
                -   "serviceId": "EP1000000001",
                    
                -   "serviceType": "INTERNATIONAL\_PRIORITY",
                    
                -   "code": "01",
                    
                -   "names":
                    
                    \[
                    
                    -   {
                        
                        -   "type": "long",
                            
                        -   "encoding": "utf-8",
                            
                        -   "value": "FedEx International Priority®"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "long",
                            
                        -   "encoding": "ascii",
                            
                        -   "value": "FedEx International Priority"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "medium",
                            
                        -   "encoding": "utf-8",
                            
                        -   "value": "FedEx International Priority®"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "medium",
                            
                        -   "encoding": "ascii",
                            
                        -   "value": "FedEx International Priority"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "short",
                            
                        -   "encoding": "utf-8",
                            
                        -   "value": "IP"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "short",
                            
                        -   "encoding": "ascii",
                            
                        -   "value"": "IP"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "abbrv",
                            
                        -   "encoding": "ascii",
                            
                        -   "value": "IP"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "operatingOrgCodes":
                    
                    \[
                    
                    -   "FXE"
                        
                    
                    \],
                    
                -   "serviceCategory": "parcel",
                    
                -   "description": "International Priority",
                    
                -   "astraDescription": "IP"
                    
                
                },
                
            -   "commit":
                
                {
                
                -   "dateDetail":
                    
                    {
                    
                    -   "dayOfWeek": "FRI",
                        
                    -   "dayCxsFormat": "2020-07-16T10:30:00"
                        
                    
                    }
                    
                
                }
                
            
            },
            
        -   {
            
            -   "serviceType": "INTERNATIONAL\_ECONOMY",
                
            -   "serviceName": "FedEx International Economy",
                
            -   "packagingType": "YOUR\_PACKAGING",
                
            -   "customerMessages":
                
                \[
                
                -   {
                    
                    -   "code": "SERVICE.TYPE.INTERNATIONAL.MESSAGE",
                        
                    -   "message": "Rate does not include duties & taxes, clearance entry fees or other import fees. The payor of duties/taxes/fees will be responsible for any applicable Clearance Entry Fees."
                        
                    
                    },
                    
                -   {
                    
                    -   "code": "EDT.DETAILS.MISSING",
                        
                    -   "message": "The harmonized code for the commodity at array index 1 is missing or invalid; estimated duties and taxes were not returned."
                        
                    
                    }
                    
                
                \],
                
            -   "ratedShipmentDetails":
                
                \[
                
                -   {
                    
                    -   "rateType": "ACCOUNT",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 189.65,
                        
                    -   "totalNetCharge": 209.56,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 209.56,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 209.56,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "CA003O",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 10.5,
                            
                        -   "totalSurcharges": 19.91,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "amount": 19.91
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "CAD",
                                
                            -   "rate": 1
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "CAD"
                            
                        
                        },
                        
                    -   "currency": "CAD"
                        
                    
                    },
                    
                -   {
                    
                    -   "rateType": "LIST",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 48.56,
                        
                    -   "totalNetCharge": 53.66,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 53.66,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 53.66,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "CA1520",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 10.5,
                            
                        -   "totalSurcharges": 5.1,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "amount": 5.1
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "CAD",
                                
                            -   "rate": 1
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "CAD"
                            
                        
                        },
                        
                    -   "currency": "CAD"
                        
                    
                    },
                    
                -   {
                    
                    -   "rateType": "PREFERRED\_INCENTIVE",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 37.18,
                        
                    -   "totalNetCharge": 41.08,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 41.08,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 41.08,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "CA1520",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 10.5,
                            
                        -   "totalSurcharges": 3.9,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "amount": 3.9
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "USD",
                                
                            -   "rate": 0.77
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "currency": "USD"
                        
                    
                    },
                    
                -   {
                    
                    -   "rateType": "PREFERRED\_CURRENCY",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 145.21,
                        
                    -   "totalNetCharge": 160.45,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 160.45,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 160.45,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "CA003O",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 10.5,
                            
                        -   "totalSurcharges": 15.24,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "amount": 15.24
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "pricingCode": "ACTUAL",
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "USD",
                                
                            -   "rate": 0.77
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "currency": "USD"
                        
                    
                    }
                    
                
                \],
                
            -   "anonymouslyAllowable": true,
                
            -   "operationalDetail":
                
                {
                
                -   "ineligibleForMoneyBackGuarantee": false,
                    
                -   "astraDescription": "IE",
                    
                -   "airportId": "MEM",
                    
                -   "serviceCode": "03",
                    
                -   "originLocationIds": "COSA",
                    
                -   "originServiceAreas": "AM",
                    
                -   "deliveryDay": "TUE",
                    
                -   "originLocationNumbers": 1162,
                    
                -   "destinationPostalCode": "38125",
                    
                -   "destinationLocationIds": "EHTA",
                    
                -   "destinationLocationStateOrProvinceCodes": "CT",
                    
                -   "transitTime": "THREE\_DAYS",
                    
                -   "packagingCode": "02",
                    
                -   "destinationLocationNumbers": 892,
                    
                -   "publishedDeliveryTime": "06:30:00",
                    
                -   "countryCodes": "US",
                    
                -   "stateOrProvinceCodes": "TX",
                    
                -   "ursaPrefixCode": "82",
                    
                -   "ursaSuffixCode": "EHTA",
                    
                -   "destinationServiceAreas": "AA",
                    
                -   "originPostalCodes": "75063"
                    
                
                },
                
            -   "signatureOptionType": "SERVICE\_DEFAULT",
                
            -   "serviceDescription":
                
                {
                
                -   "serviceId": "EP1000000004",
                    
                -   "serviceType": "INTERNATIONAL\_ECONOMY",
                    
                -   "code": "03",
                    
                -   "names":
                    
                    \[
                    
                    -   {
                        
                        -   "type": "long",
                            
                        -   "encoding": "utf-8",
                            
                        -   "value": "FedEx International Economy®"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "long",
                            
                        -   "encoding": "ascii",
                            
                        -   "value": "FedEx International Economy"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "medium",
                            
                        -   "encoding": "utf-8",
                            
                        -   "value": "FedEx International Economy®"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "medium",
                            
                        -   "encoding": "ascii",
                            
                        -   "value": "FedEx International Economy"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "short",
                            
                        -   "encoding": "utf-8",
                            
                        -   "value": "IE"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "short",
                            
                        -   "encoding": "ascii",
                            
                        -   "value": "IE"
                            
                        
                        },
                        
                    -   {
                        
                        -   "type": "abbrv",
                            
                        -   "encoding": "ascii",
                            
                        -   "value": "IE"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "operatingOrgCodes":
                    
                    \[
                    
                    -   "FXE"
                        
                    
                    \],
                    
                -   "serviceCategory": "parcel",
                    
                -   "description": "International Two Day",
                    
                -   "astraDescription": "IE"
                    
                
                }
                
            
            },
            
        -   {
            
            -   "serviceType": "FEDEX\_GROUND",
                
            -   "serviceName": "FedEx International Ground ",
                
            -   "packagingType": "YOUR\_PACKAGING",
                
            -   "customerMessages":
                
                \[
                
                -   {
                    
                    -   "code": "SERVICE.TYPE.INTERNATIONAL.MESSAGE",
                        
                    -   "message": "Rate does not include duties & taxes, clearance entry fees or other import fees. The payor of duties/taxes/fees will be responsible for any applicable Clearance Entry Fees."
                        
                    
                    },
                    
                -   {
                    
                    -   "code": "EDT.DETAILS.MISSING",
                        
                    -   "message": "The harmonized code for the commodity at array index 1 is missing or invalid; estimated duties and taxes were not returned."
                        
                    
                    }
                    
                
                \],
                
            -   "ratedShipmentDetails":
                
                \[
                
                -   {
                    
                    -   "rateType": "ACCOUNT",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 2.79,
                        
                    -   "totalBaseCharge": 49.85,
                        
                    -   "totalNetCharge": 53.59,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 53.59,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 53.59,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "52",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 7.5,
                            
                        -   "totalSurcharges": 3.74,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "level": "PACKAGE",
                                    
                                -   "amount": 3.74
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "CAD"
                            
                        
                        },
                        
                    -   "ratedPackages":
                        
                        \[
                        
                        -   {
                            
                            -   "groupNumber": 0,
                                
                            -   "effectiveNetDiscount": 2.79,
                                
                            -   "packageRateDetail":
                                
                                {
                                
                                -   "rateType": "PAYOR\_ACCOUNT\_PACKAGE",
                                    
                                -   "ratedWeightMethod": "ACTUAL",
                                    
                                -   "baseCharge": 49.85,
                                    
                                -   "netFreight": 49.85,
                                    
                                -   "totalSurcharges": 3.74,
                                    
                                -   "netFedExCharge": 53.59,
                                    
                                -   "totalTaxes": 0,
                                    
                                -   "netCharge": 53.59,
                                    
                                -   "totalRebates": 0,
                                    
                                -   "billingWeight":
                                    
                                    {
                                    
                                    -   "units": "LB",
                                        
                                    -   "value": 22
                                        
                                    
                                    },
                                    
                                -   "totalFreightDiscounts": 0,
                                    
                                -   "surcharges":
                                    
                                    \[
                                    
                                    -   {
                                        
                                        -   "type": "FUEL",
                                            
                                        -   "description": "Fuel Surcharge",
                                            
                                        -   "level": "PACKAGE",
                                            
                                        -   "amount": 3.74
                                            
                                        
                                        }
                                        
                                    
                                    \],
                                    
                                -   "currency": "CAD"
                                    
                                
                                }
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "currency": "CAD"
                        
                    
                    },
                    
                -   {
                    
                    -   "rateType": "PREFERRED\_INCENTIVE",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 40.16,
                        
                    -   "totalNetCharge": 43.17,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 43.17,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 43.17,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "52",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 7.5,
                            
                        -   "totalSurcharges": 3.01,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "level": "PACKAGE",
                                    
                                -   "amount": 3.01
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "USD",
                                
                            -   "rate": 0.77
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "ratedPackages":
                        
                        \[
                        
                        -   {
                            
                            -   "groupNumber": 0,
                                
                            -   "effectiveNetDiscount": 0,
                                
                            -   "packageRateDetail":
                                
                                {
                                
                                -   "rateType": "PREFERRED\_LIST\_PACKAGE",
                                    
                                -   "ratedWeightMethod": "ACTUAL",
                                    
                                -   "baseCharge": 40.16,
                                    
                                -   "netFreight": 40.16,
                                    
                                -   "totalSurcharges": 3.01,
                                    
                                -   "netFedExCharge": 43.17,
                                    
                                -   "totalTaxes": 0,
                                    
                                -   "netCharge": 43.17,
                                    
                                -   "totalRebates": 0,
                                    
                                -   "billingWeight":
                                    
                                    {
                                    
                                    -   "units": "LB",
                                        
                                    -   "value": 22
                                        
                                    
                                    },
                                    
                                -   "totalFreightDiscounts": 0,
                                    
                                -   "surcharges":
                                    
                                    \[
                                    
                                    -   {
                                        
                                        -   "type": "FUEL",
                                            
                                        -   "description": "Fuel Surcharge",
                                            
                                        -   "level": "PACKAGE",
                                            
                                        -   "amount"": 3.01
                                            
                                        
                                        }
                                        
                                    
                                    \],
                                    
                                -   "currency": "USD"
                                    
                                
                                }
                                
                            
                            }
                            
                        
                        \]
                        
                    
                    },
                    
                -   {
                    
                    -   "rateType": "PREFERRED\_CURRENCY",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 38.17,
                        
                    -   "totalNetCharge": 41.03,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 41.03,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 41.03,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "52",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 7.5,
                            
                        -   "totalSurcharges": 2.86,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "level": "PACKAGE",
                                    
                                -   "amount": 2.86
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "currencyExchangeRate":
                            
                            {
                            
                            -   "fromCurrency": "CAD",
                                
                            -   "intoCurrency": "USD",
                                
                            -   "rate": 0.77
                                
                            
                            },
                            
                        -   "totalBillingWeight":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 22
                                
                            
                            },
                            
                        -   "currency": "USD"
                            
                        
                        },
                        
                    -   "ratedPackages":
                        
                        \[
                        
                        -   {
                            
                            -   "groupNumber": 0,
                                
                            -   "effectiveNetDiscount": 0,
                                
                            -   "packageRateDetail": null,
                                
                            -   "rateType": "PREFERRED\_ACCOUNT\_PACKAGE",
                                
                            -   "ratedWeightMethod": "ACTUAL",
                                
                            -   "baseCharge": 38.17,
                                
                            -   "netFreight": 38.17,
                                
                            -   "totalSurcharges": 2.86,
                                
                            -   "netFedExCharge": 41.03,
                                
                            -   "totalTaxes": 0,
                                
                            -   "netCharge": 41.03,
                                
                            -   "totalRebates": 0,
                                
                            -   "billingWeight"":
                                
                                {
                                
                                -   "units": "LB",
                                    
                                -   "value": 22
                                    
                                
                                },
                                
                            -   "totalFreightDiscounts": 0,
                                
                            -   "surcharges":
                                
                                \[
                                
                                -   {
                                    
                                    -   "type": "FUEL",
                                        
                                    -   "description": "Fuel Surcharge",
                                        
                                    -   "level": "PACKAGE",
                                        
                                    -   "amount": 2.86
                                        
                                    
                                    }
                                    
                                
                                \],
                                
                            -   "currency": "USD"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "currency": "USD"
                        
                    
                    },
                    
                -   {
                    
                    -   "rateType": "LIST",
                        
                    -   "ratedWeightMethod": "ACTUAL",
                        
                    -   "totalDiscounts": 0,
                        
                    -   "totalBaseCharge": 52.45,
                        
                    -   "totalNetCharge": 56.38,
                        
                    -   "totalVatCharge": 0,
                        
                    -   "totalNetFedExCharge": 56.38,
                        
                    -   "totalDutiesAndTaxes": 0,
                        
                    -   "totalNetChargeWithDutiesAndTaxes": 56.38,
                        
                    -   "totalDutiesTaxesAndFees": 0,
                        
                    -   "totalAncillaryFeesAndTaxes": 0,
                        
                    -   "shipmentRateDetail":
                        
                        {
                        
                        -   "rateZone": "52",
                            
                        -   "dimDivisor": 0,
                            
                        -   "fuelSurchargePercent": 7.5,
                            
                        -   "totalSurcharges": 3.93,
                            
                        -   "totalFreightDiscount": 0,
                            
                        -   "surCharges":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "FUEL",
                                    
                                -   "description": "Fuel Surcharge",
                                    
                                -   "level": "PACKAGE",
                                    
                                -   "amount": 3.93
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "totalBillingWeight"":
                            
                            {
                            
                            -   "units": "LB",
                                
                            -   "value": 2
                                
                            
                            },
                            
                        -   "currency": "CAD"
                            
                        
                        },
                        
                    -   "ratedPackages":
                        
                        \[
                        
                        -   {
                            
                            -   "groupNumber": 0,
                                
                            -   "effectiveNetDiscount": 0,
                                
                            -   "packageRateDetail": null,
                                
                            -   "rateType": "PAYOR\_LIST\_PACKAGE",
                                
                            -   "ratedWeightMethod": "ACTUAL",
                                
                            -   "baseCharge": 52.45,
                                
                            -   "netFreight": 52.45,
                                
                            -   "totalSurcharges": 3.93,
                                
                            -   "netFedExCharge": 56.38,
                                
                            -   "totalTaxes": 0,
                                
                            -   "netCharge": 56.38,
                                
                            -   "totalRebates": 0,
                                
                            -   "billingWeight":
                                
                                {
                                
                                -   "units": "LB",
                                    
                                -   "value": 22
                                    
                                
                                },
                                
                            -   "totalFreightDiscounts": 0,
                                
                            -   "surcharges":
                                
                                \[
                                
                                -   {
                                    
                                    -   "type": "FUEL",
                                        
                                    -   "description": "Fuel Surcharge",
                                        
                                    -   "level": "PACKAGE",
                                        
                                    -   "amount": 3.93
                                        
                                    
                                    }
                                    
                                
                                \],
                                
                            -   "currency": "CAD"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "currency": "CAD",
                        
                    -   "anonymouslyAllowable": true,
                        
                    -   "operationalDetail":
                        
                        {
                        
                        -   "ineligibleForMoneyBackGuarantee": false,
                            
                        -   "astraDescription": "FXG",
                            
                        -   "airportId": "MEM",
                            
                        -   "serviceCode": "92",
                            
                        -   "originLocationIds": "COSA",
                            
                        -   "commitDays": "",
                            
                        -   "scac": "",
                            
                        -   "originServiceAreas": "AM",
                            
                        -   "deliveryDay": "TUE",
                            
                        -   "originLocationNumbers": 1162,
                            
                        -   "destinationPostalCode": "38125",
                            
                        -   "commitDate": "2019-07-22T08:30:00",
                            
                        -   "deliveryDate": "",
                            
                        -   "deliveryEligibilities": "",
                            
                        -   "maximumTransitTime": "",
                            
                        -   "astraPlannedServiceLevel": "",
                            
                        -   "destinationLocationIds": "EHTA",
                            
                        -   "destinationLocationStateOrProvinceCodes": "CT",
                            
                        -   "transitTime": "THREE\_DAYS",
                            
                        -   "packagingCode": "02",
                            
                        -   "destinationLocationNumbers": 892,
                            
                        -   "publishedDeliveryTime": "06:30:00",
                            
                        -   "countryCodes": "US",
                            
                        -   "stateOrProvinceCodes": "TX",
                            
                        -   "ursaPrefixCode": "82",
                            
                        -   "ursaSuffixCode": "EHTA",
                            
                        -   "destinationServiceAreas": "AA",
                            
                        -   "originPostalCodes": "75063",
                            
                        -   "customTransitTime": ""
                            
                        
                        },
                        
                    -   "signatureOptionType": "SERVICE\_DEFAULT",
                        
                    -   "serviceDescription":
                        
                        {
                        
                        -   "serviceId": "EP1000000135",
                            
                        -   "serviceType": "FEDEX\_GROUND",
                            
                        -   "code": "92",
                            
                        -   "names":
                            
                            \[
                            
                            -   {
                                
                                -   "type": "long",
                                    
                                -   "encoding": "utf-8",
                                    
                                -   "value": "FedEx International Ground®"
                                    
                                
                                },
                                
                            -   {
                                
                                -   "type": "long",
                                    
                                -   "encoding": "ascii",
                                    
                                -   "value": "FedEx International Ground"
                                    
                                
                                },
                                
                            -   {
                                
                                -   "type": "medium",
                                    
                                -   "encoding": "utf-8",
                                    
                                -   "value": "International Ground®"
                                    
                                
                                },
                                
                            -   {
                                
                                -   "type": "medium",
                                    
                                -   "encoding": "ascii",
                                    
                                -   "value": "International Ground"
                                    
                                
                                },
                                
                            -   {
                                
                                -   "type": "short",
                                    
                                -   "encoding": "utf-8",
                                    
                                -   "value": "IG"
                                    
                                
                                },
                                
                            -   {
                                
                                -   "type": "short",
                                    
                                -   "encoding": "ascii",
                                    
                                -   "value": "IG"
                                    
                                
                                },
                                
                            -   {
                                
                                -   "type": "abbrv",
                                    
                                -   "encoding": "ascii",
                                    
                                -   "value": "SG"
                                    
                                
                                }
                                
                            
                            \],
                            
                        -   "operatingOrgCodes":
                            
                            \[
                            
                            -   "FXG"
                                
                            
                            \],
                            
                        -   "description": "FedEx Ground",
                            
                        -   "astraDescription": "FXG"
                            
                        
                        }
                        
                    
                    }
                    
                
                \]
                
            
            }
            
        
        \],
        
    -   "quoteDate": "2019-09-06",
        
    -   "encoded": false,
        
    -   "alerts":
        
        \[
        
        -   {
            
            -   "code": "MONEYBACKGUARANTEE.NOT.ELIGIBLE",
                
            -   "message": "We are unable to process this request. Please try again later or contact FedEx Customer Service.",
                
            -   "alertType": "NOTE"
                
            
            }
            
        
        \]
        
    
    }
    

}

## Error Codes

-   COUNTRY.POSTALCODEORZIP.INVALID
    
    Invalid postal code/ZIP for the country selected. Please correct and try again.
    
-   CURRENCY.TYPE.INVALID
    
    The currency type you selected is invalid. Please select another currency type.
    
-   CURRENCYTYPE.CADORUSD.REQUIRED
    
    CAD or USD are the only currency types available. Please select CAD or USD as your currency type.
    
-   CUSTOMVALUE.LIMITEXCEEDS.ERROR
    
    The total declared value for customs entered exceeds the limit for FedEx® international services.For additional information, including other services that may be available, please contact FedEx Customer Service.
    
-   DIMENSIONS.EXCEEDS.LIMITS
    
    Dimensions exceeds the maximum dimensions for this service. Please refer to the FedEx Service Guide.
    
-   POSTALCODE.ZIPCODE.REQUIRED
    
    Postal code/ZIP is required
    
-   CURRENCY.TYPE.MISMATCH
    
    Declared value currency type must be equal to customs value currency type.
    
-   ACCOUNT.NUMBER.INVALID
    
    Invalid account number.
    
-   ACCOUNTNUMBER.ENROLLED.INVALID
    
    The shipping account number is not enrolled in FedEx Priority Alert(TM) service.
    
-   ACCOUNTNUMBER.ONERATE.NOTAVBL
    
    FedEx One Rate® is not available for this account. Please use FedEx Standard Rate.
    
-   CARRIAGE.VALUE.EXCEEDSMAXIMUM
    
    The declared value for carriage entered exceeds the maximum. Please verify and reenter
    
-   CARRIAGEVALUE.CUSTOMVALUE.VALIDATION
    
    Rates and transit times are not available for the account number entered. For immediate assistance, please contact your local FedEx Customer Service.
    
-   CITY.REQUIRED
    
    A valid city is required
    
-   COUNTRY.POSTALCODE.INVALID
    
    Origin postal code is required or invalid.
    
-   SHIPPER.POSTALSTATE.MISMATCH
    
    Shipper Postal-State Mismatch. Please correct and try again.
    
-   CURRENCY.MISSMATCH.ERROR
    
    Package insured value currency {CURRENCY\_TYPE\_1} does not match the customs value currency {CURRENCY\_TYPE\_2}.
    
-   CURRENCY.TYPE.SELECT
    
    Please enter Currency
    
-   CURRENCYAMOUNT.CURRENCYTYPE.INVALID
    
    The maximum declared value is {CURRENCY\_AMOUNT} {CURRENCY\_TYPE}. Contact FedEx Customer Service for more information.
    
-   CURRENCYTYPE.CADORUSD.ONLYAVAILABLEERROR
    
    Based on the information entered this shipment qualifies for FedEx Home Delivery®. Please resubmit your request as FedEx Home Delivery to continue with the shipment.
    
-   DELIVERY.DAY.ERROR
    
    Please choose either Saturday Pickup or Saturday Delivery.
    
-   DIMENSION.EXCEEDS.MAXMUM
    
    The dimensions entered exceed the maximum dimensions for this service. Please refer to the FedEx Service Guide.
    
-   DIMENSION.TYPE.ERROR
    
    The dimensions you have entered exceed the limit for the origin and/or destination selected; please verify and reenter.
    
-   DIMENSIONS.EXCEEDS.LIMIT
    
    The dimensions you have entered exceed the height limit allowed; please verify and reenter.
    
-   ENTERED.ZIPCODE.NOTFOUND
    
    The state or province and ZIP or postal code entered was not found, or the state or province and ZIP or postal code are not served by FedEx in this country.
    
-   SERVICE.PACKAGECOMBINATION.INVALID
    
    Invalid service and packaging combination.
    
-   FEDEXHOMEDELIVERY.SERVICE.QUALIFICATIONERROR
    
    Based on the information entered this shipment qualifies for FedEx Home Delivery®. Please resubmit your request as FedEx Home Delivery to continue with the shipment.
    
-   FEDEXSERVICE.NOT.AVAILABLE
    
    FedEx does not provide services to the destination country or from the origin country at this time. Contact FedEx Customer Service.
    
-   FREIGHTGUARANTEE.TIMEVALUE.REQUIRED
    
    A valid Freight Guarantee time value is required.
    
-   FREIGHTGUARANTEEE.TIME.REQUIRED
    
    {PACKAGING\_TYPE} cannot exceed {weight}{weight\_units}. Select another packaging type.
    
-   DECLAREDVALUE.NOT.ALLOWED.FOR.SMARTPOST
    
    Declared Value is not allowed for SmartPost.
    
-   LOCATION.PICKUP.NOTAVAILABLE
    
    Your location does not allow pickup. Select Drop-off to drop your package off at a FedEx location or contact FedEx Customer Service.
    
-   MAXIMUMWEIGHT.TYPE.ERROR
    
    Maximum weight allowed for this application is 68kg/150lbs. Please re-enter weight or contact FedEx Customer Service.
    
-   ORIGIN.COUNTRY.REQUIRED
    
    A valid origin country is required
    
-   ORIGIN.PICKUP.ERROR
    
    The origin selected does not allow pickup for FedEx Express Freight services. You may contact your local FedEx Customer Service (U.S. and Canada, please dial 1.800.GoFedEx 1.800.463.3339) for other shipment collection options.
    
-   ORIGIN.PICKUP.NOTALLOWED
    
    The declared value for carriage entered exceeds the maximum. Please verify and re-enter.
    
-   PACKAGE.INVALID.TYPE
    
    Section II Lithium Batteries/Cells are not allowed with a document shipment.
    
-   PACKAGE.WEIGHT.INVALID
    
    Package weight is missing or invalid.
    
-   PACKAGEDIMENSION.TYPE.ERROR
    
    Package dimensions must be at least 1 cm/inch for length, width and height. If you''re not sure of the dimensions, you can leave these fields blank.
    
-   RATE.SPECIALSERVICETYPE.NOTALLOWED
    
    Special Service {0} is not allowed.
    
-   PICKUPTYPE.NOT.AVAILABLE
    
    Pickup is not available. Please change the service type, the ship date or select dropoff to complete the shipment.
    
-   RATING.CARRIAGE.EXCEEDSLIMITS
    
    Declared value for carriage exceeds limit allowed based on the information entered.
    
-   RATING.CARRIAGLIMITS.EXCEED
    
    Dimensions exceed the maximum dimensions for this service. Please refer to the FedEx Service Guide.
    
-   RATING.DIMENSIONSEXCEEDS.LIMITS
    
    Customs Value exceeds limit of {CURRENCY\_AMOUNT} {CURRENCY\_TYPE}.
    
-   RATING.DIMENSIONSTYPE.EXCEEDSLIMITS
    
    Dangerous Goods shipping has not been enabled for your account. Please call your local FedEx customer service for assistance.
    
-   RATING.ZIPCODE.INVALID
    
    Information about rates and delivery times is not available. Try again later or contact FedEx Customer Service
    
-   RATE.PACKAGES.WEIGHT.UNIT.MISMATCH
    
    Weight unit of measure must be the same for all packages.
    
-   RESIDENTIAL.DELIVERY.NOTAVAILABLE
    
    Residential delivery is not available for the selected service.
    
-   SERVICE.LOCATION.UNAVAILABLE
    
    FedEx service is not currently available to this origin / destination combination. Enter new information or contact FedEx Customer Service (U.S. and Canada, please dial 1.800.GoFedEx 1.800.463.3339).
    
-   SERVICETYPE.FORPOSTALCODE.NOTALLOWED
    
    The declared value for carriage entered exceeds the maximum. Please verify and re-enter.
    
-   SHIPMENT.DGDIVIOLATIONS.NOTALLOWED
    
    Your shipment is not allowed because of dangerous goods or dry ice violations that limit your shipping options. If you have any questions, please call your local FedEx customer service.
    
-   SHIPMENT.DGVIOLATIONS.NOTALLOWED
    
    Your shipment is not allowed because of dangerous goods violations that limit your shipping options. If you have any questions, please call 1.800.463.339 and press "81" for the FedEx Dangerous Goods/Hazardous Materials hotline.
    
-   WEIGHT.BELOWMINIMUMLIMIT.ERROR
    
    The weight entered is below the standard minimum for FedEx {package} Express services. Please enter a weight of at least {WEIGHT} {WEIGHT\_UNITS}.
    
-   SHIPMENTPROCESSING.ACCOUNTVIOLATIONS.ERROR
    
    There are no services returned due to dangerous goods, hazardous materials, or dry ice violations on your account.
    
-   STATE.TYPE.INVALID
    
    A valid State/Province is required
    
-   STATE.TYPE.REQUIRED
    
    State/Province is required
    
-   SUBTYPE.SELECT.FORBATTERIES
    
    Section II Lithium Batteries/Cells and one of the sub-types must be selected.
    
-   WEIGHT.TYPE.INVALID
    
    Please enter a valid weight.
    
-   RATE.QUOTENO.NOTFOUND
    
    Rate quote number could not be found
    
-   ACCOUNTNBR.MISSING.ORINVALID
    
    The condition type ACCOUNT\_NUMBER value is missing or invalid
    
-   SPECIAL.SERVICE.CONFLICT
    
    Special service conflict.Hold At Location is not valid with Residential Delivery.
    
-   DRYICEWEIGHT.REQUIRED.INKGS
    
    Package {0} - Dry Ice weight (in kilograms) is required with Dry Ice special service.
    
-   SERVICETYPE.PICKUPMETHOD.NOT.ALLOWED
    
    {0} is not allowed with the pickup method.
    
-   FXSPRETURN.RATES.ERROR
    
    Rates for SmartPost return shipments are not currently available.
    
-   RATE.SPECIALSERVICE.NOTALLOWED.ORIGIN
    
    {0} is not allowed for the origin.
    
-   PACKAGINGTYPE.MISSING.OR.INVALID
    
    Packaging type missing or invalid.
    
-   RATE.SPECIALSERVICE.NOT.ALLOWED
    
    Package {0} – Special Service {1} is not allowed.
    
-   SMARTPOST.HUBID.INVALID
    
    SmartPost hub id is invalid.
    
-   SPECIALSERVICE.NOT.ALLOWED.SHIPMENTORPACKAGE
    
    Special Service {0} not allowed at {1} level.
    
-   SPECIALSERVICE.NOT.SUPPORTED.REQUESTED.SHIPDAY
    
    {0} is not supported for the requested ship day of the week. Please update and try again.
    
-   CODDETAIL.EMPTY.ORNULL
    
    Package {0} - CodDetail object cannot be null.
    
-   DESTINATION.POSTALCODE.MISSING.ORINVALID
    
    Destination postal code missing or invalid.
    
-   TOTALCUSTOMSVALUE.CURRENCYTYPE.INVALID
    
    Invalid currency type for total customs value.
    
-   RATE.PACKAGES.DIMENSION.UNIT.MISMATCH
    
    Dimension unit of measure must be the same for all packages.
    
-   COMMODITY.NUMBEROFPIECES.REQUIRED
    
    Commodity {COMMODITY\_INDEX} - Number of pieces is required and cannot be a negative value or exceed 9,999.
    
-   PICKUPTYPE.REQUIRED
    
    PickupType element is required in input request.
    
-   ORIGIN.COUNTRY.INVALID
    
    Origin country code is invalid or missing. Please refer to documentation for valid format.
    
-   DESTINATION.COUNTRY.INVALID
    
    Destination country code is invalid or missing. Please refer to documentation for valid format.
    
-   MAXIMUM.WEIGHT.EXCEEDED
    
    The package weight in the request is not supported. Maximum package weight across all services is 2200 lbs or 998 kgs.
    
-   ACCOUNT.NUMBER.MISMATCH
    
    When payment Type is SENDER, ShippingChargesPayment Payor AccountNumber should match the shipper account number.
    
-   SHIPDATESTAMP.FORMAT.INVALID
    
    Please provide a valid shipDatestamp format YYYY-MM-DD
    
-   INTERNAL.SERVER.ERROR
    
    We encountered an unexpected error and are working to resolve the issue. We apologize for any inconvenience. Please check back at a later time.
    
-   RATING.DESTINATIONSTATEPOSTAL.MISMATCH
    
    Destination state postal code mismatch.
    
-   ACCOUNT.NUMBERORKEY.INVALID
    
    Invalid account information. Account number and/or key is invalid.
    
-   RATING.QUOTE.NOTAVAILABLE
    
    Rates and transit times are not available for the account number entered. For immediate assistance, please contact your local FedEx Customer Service.
    
-   SHIPPER.COUNTRY.INVALID
    
    Shipper country code is invalid or missing. Please update and try again.
    
-   FREIGHTSERVICEORIGIN.FREIGHT.NOTALLOWED
    
    The origin is not served for Freight services.
    
-   FREIGHTSERVICEORIGIN.PICKUP.NOTALLOWED
    
    The origin does not allow pickup for Freight services.
    
-   REGIONAL.MAILPICKUP.NOTALLOWED
    
    Regional Mail Pickup is not allowed.
    
-   REGIONAL.MAILDELIVERY.NOTALLOWED
    
    Regional Mail Delivery is not allowed.
    
-   FREIGHT.GUARANTEE.NOTALLOWED
    
    Freight Guarantee is not allowed.
    
-   SHIPMENT.CUSTOMSVALUE.REQUIRED
    
    Commodity {COMMODITY\_INDEX} - Customs value is required.Please update and try again.
    
-   ORIGINZIPCODE.SERVICE.ERROR
    
    This origin postal code is not serviced.
    
-   SERVICETYPE.NOT.ALLOWED
    
    Selected Service Type is not allowed between origin and destination. Please update and try again.
    
-   ACCOUNT.HAZARDOUSMATERIALS.NOTALLOWED
    
    Hazardous material shipping is not enabled for your account.
    
-   DECLAREDVALUE.EXCEEDS.LIMIT
    
    Declared value exceeds allowed limit. Please update and try again.
    
-   ENTERED.AMOUNT.INVALID
    
    The entered amount for COD for Package {PACKAGE\_INDEX} has exceeded the maximum limit. Please update and try again.
    
-   PACKAGE.DECLAREDVALUE.EXCEEDED
    
    Package {PACKAGE\_INDEX} - Declared value exceeds limit of {CURRENCY\_AMOUNT} {CURRENCY\_TYPE} for the packaging type.
    
-   PACKAGETYPE.DECLAREDVALUE.EXCEEDED
    
    Declared value exceeds limit of {CURRENCY\_AMOUNT} {CURRENCY\_TYPE} for package {PACKAGE\_INDEX}. Please update and try again.
    
-   SERVICE.TYPE.NOTAVAILABLE
    
    The requested service type is not supported. Please update and try again.
    
-   SPECIALSERVICE.PICKUPMETHOD.NOT.ALLOWED
    
    {SPECIAL\_SERVICE\_TYPE} is not allowed with the pickup method. Please update and try again.
    
-   SHIPMENT.DGHMDIVIOLATIONS.NOTALLOWED
    
    {SERVICE\_TYPE} service is not allowed because of dangerous goods or dry ice violations that limit your shipping options. Please update and try again.
    
-   CURRENCYAMOUNT.CURRENCYTYPE.EXCEEDSLIMIT
    
    The total declared value for customs entered exceeds the limit of {CURRENCY\_AMOUNT} {CURRENCY\_TYPE} for {SPECIAL\_SERVICE\_TYPE}. Please update and try again.
    

    

CLOSE ![](https://developer.fedex.com/api/content/dam/fedex-com/irc/tryout/close.svg)

-   Request
-   Response

Payload:

Header Parameters

[EDIT HEADER](#)

---

[RESET](#) [SAVE](#)

Query Parameters

Path Parameters

Body

SEND

Response

Copy

## Enter your user ID and password to log in

LOG IN

[FORGOT PASSWORD OR USER ID?](https://www.fedex.com/fcl/web/jsp/forgotPassword.jsp?appName=fclfsm&locale=en_ca)

---

Get access to FedEx APIs by creating a user ID.

SIGN UP

  

 

## Embedded Content

The page you are looking for is not found.  

## Please visit our [Home Page](https://developer.fedex.com/)