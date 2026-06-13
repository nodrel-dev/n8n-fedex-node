# FedEx APIs and Developer Portal

    

 [![ Sign Up or Log In](https://developer.fedex.com/api/content/dam/fedex-com/irc/leftnav/login-icon_white.svg) Sign Up or Log In](#)

---

[](https://www.fedex.com/en-ca/developer.html)

# 

Service Availability API

[DOWNLOAD JSON SCHEMA](blob:https://developer.fedex.com/b704a5bc-0ebe-4fed-8d1b-9a8be5fd379f)

-   Introduction-   Service Availability API Details-   How Service Availability API Works-   FedEx Services-   FedEx Service Options-   FedEx Packaging-   Business Rules-   JSON API Collection

-   Error Codes

### Introduction

Service Availability API enables you to determine different available FedEx® services, special services, and packaging types for FedEx Express® and FedEx Ground® for the input origin and destination location details.

### Service Availability API Details

The following are the features associated with service availability API:

-   Retrieve all FedEx Express® and FedEx Ground® services and respective packaging type combinations available between input origin and destination.
-   Retrieve all available special service options, along with delivery signature options, and return shipment types that are available for FedEx Express and FedEx Ground services between the origin and destination.
-   Get Transit time for the services available in the given origin and destination location. 

### How Service Availability API Works

Use this service to retrieve available FedEx services, special services (service options) and the packaging types.

**Retrieve Services And Packaging Options**

This request is used to return a list of all available services and package type for outbound, return and import shipment types based on input details. 

The key input information associated with this request are:

-   Shipment details with address
-   Recipient details with address
-   Account number and the ship dates
-   Commodities to be shipped

The result of this request is a list of all FedEx services, service options and the package options available with the input provided. The request would fail if address details are not valid for example City, State/Province and ZIP/Postal code combination is not valid.

**Retrieve Special Service Options**

This request is used to return a list of all available special services based on input details. The key input information associated with this request are:

-   Shipment details with address
-   Recipient details with address
-   Account number and the ship dates
-   Commodities to be shipped

The result of this request is a list of all FedEx service options available along with delivery signature options and return shipment types that are available between an origin and destination. The client can filter the results with carrier code(s) and/or service type(s) to view the more specific service availability. This service is valid for carrier codes FedEx Express (FDXE), FedEx Ground (FDXG) and FedEx Ground® Economy (Formerly known as FedEx SmartPost®) (FXSP).

**Retrieve Services And Transit Times**

This request is used to return a list of all available services with transit time for outbound, return and import shipment types based on input details. 

The key input information associated with this request are:

-   Shipment details with address
-   Recipient details with address
-   Account number and the ship dates
-   Commodities to be shipped

The result of this request is a list of all FedEx services available along with the transit time details. The request would fail if address details are not valid for example City, State/Province and ZIP/Postal code combination is not valid.

### FedEx Services

FedEx offers a range of shipping services to accommodate different timelines and budgets with full–service choices and a robust support system for effective package delivery.

Following are the FedEx services:

**FedEx Express®**

FedEx Express is fast, comes with a time–specific delivery commitment with a money–back guarantee, and the white shipping packages and boxes are included.

-   In the U.S., specify 1, 2 or 3 business day delivery by a certain time for documents and packages weighing up to 150 lbs.

**FedEx Ground®**

This is a cost–effective ground delivery to businesses and residences, which provides day–definite ground delivery in 1 to 7 business days to every U.S. business address in the contiguous U.S. (3 to 7 business days to Alaska and Hawaii), based on the distance to the destination. Internationally, FedEx Ground provides day–definite ground delivery in 2 to 7 business days to every business and residential address in Canada, based on the distance to the destination.

**FedEx Home Delivery®**

This service allows residential deliveries 7 days a week, with delivery to most locations on Saturday and many on Sunday.

FedEx Home Delivery shipments allows you to ship packages up to 150 lbs.

**FedEx Ground® Economy (Formerly known as FedEx SmartPost®)**

This service provides cost–effective consolidation and delivery of low–weight business–to–consumer packages via an alliance with the U.S. Postal Service®.

**FedEx Office®**

For business and document solutions, including access to FedEx Express and FedEx Ground shipping services. The FedEx Office network of digitally connected locations can help you effectively manage a full range of business–service needs for your workforce and locations, while also helping you control and reduce costs.

**FedEx Logistics**

For reliable, efficient, end–to–end solutions that help with the complexities of global shipping, regardless of your shipping mode or carrier preference.

-   Comprehensive customs brokerage, tariff and duty minimization, and export documentation.
-   Global Ocean and air cargo distribution, cargo insurance, and multimode distribution.
-   Direct–drop shipment, distribution–center bypass and vendor/ supplier management programs available.

**U.S. Package Services**

**Your Shipping Need**

**FedEx Service**

First thing the next–business–day morning

FedEx First Overnight®

Next–business–day morning

FedEx Priority Overnight®

Next–business–day afternoon

FedEx Standard Overnight®

2 business days in the morning

FedEx 2Day® A.M.

2 business days

FedEx 2Day®

3 business days

FedEx Express Saver®

Economical ground delivery to businesses

FedEx Ground®

Economical ground delivery to residences

FedEx Home Delivery®

Low–weight packages to residences

FedEx Ground® Economy (Formerly known as FedEx SmartPost®)

Overnight 1–day transit Monday through Friday

FedEx Extra Hours®

**International Package Services**

**Your Shipping Need**

**FedEx Service**

Early–day delivery to key global markets

FedEx International First®

In 1, 2 or 3 business days worldwide

FedEx International Priority®  
FedEx International Priority Express (2A)  
FedEx International Priority (2P)

Within 5 business days worldwide

FedEx International Economy®

5 - 10 business day delivery shipments

FedEx® International Deferred Freight

Direct–distribution shipments

FedEx International Priority DirectDistribution®  
  
FedEx International Economy DirectDistributionSM

Economical ground delivery to Canada

FedEx International Ground®

**Service Types Enumeration values**

The list of available FedEx transportation services. For more information on Service Types refer to [Service Types](https://developer.fedex.com/api/en-ca/guides/api-reference.html#servicetypes)

### FedEx Service Options

**FedEx Express® Domestic (U.S., CA) Service Options**

-   **Alcohol (U.S. only) –** FedEx alcohol shipping requirements apply to wine, liquor, and beer. Each type is listed separately when regulations differ by beverage type. Wine is the only alcohol type that can be shipped directly to consumers, depending on selected shipping service. Alcohol may be FedEx Express Dangerous Goods (DG), depending on the percentage of alcohol per volume. This feature is only available for those FedEx account holders enrolled in the FedEx alcoholic beverage shipping program.
-   **Dangerous Goods –** Shipments with dangerous goods must be tendered to FedEx Express in accordance with current International Air Transport Association (IATA) regulations for air transport and the FedEx Express Terms and Conditions. This is required regardless of the routing and whether the shipment ends up physically moving by air transportation, ground transportation or a combination of these. For added confidence, use a FedEx DG Ready solution to generate your dangerous goods declaration. Your solution will transmit your information to FedEx to pre–validate your shipment before you offer it to FedEx Express.
-   **Dry ice** **–** You can ship packages containing dry ice, as long as the specifics for the dry ice shipment are included in the shipping transaction. Dry ice is considered a Dangerous Goods material.
-   **Hold at Location –** FedEx Express Hold at FedEx Location (HAL) service is available to customers who want to pick up a package at a designated FedEx location. For example, approved wine shippers may want to use the FedEx Express Hold at FedEx Location service for consumers who prefer to pick up their wine shipments from a FedEx Office or FedEx Express counter location.
-   **Inside Pickup (U.S. Only) –** Request pickup inside your building.
-   **Inside Delivery (U.S. Only) –** Request delivery inside the recipient’s building.
-   **Return Label (U.S. only) –** Service option to print a return shipping label.
-   **Saturday Pickup/Delivery –** FedEx picks up and delivers packages on Saturday, depending on service, pickup/delivery location, and other options.
-   **Signature Options –** Based on the special service selected, the appropriate signature options display in the list. Signature options are available for U.S. destinations and from a Canadian origin. The available signature options are as follows:
    -   None – Signature not required.
    -   Deliver without signature. For deliveries to a commercial location, a shipper must have a signature release number on file with FedEx. For deliveries to a residential location, a shipper is not required to have a signature release number on file with FedEx.
    -   Indirect Signature Required.
    -   Direct Signature Required.
    -   Adult Signature Required (U.S. Only).

The shipment will be delivered as per the standard operating procedure for the selected shipment type. See the FedEx Service Guide for more details.

**FedEx Ground® Domestic (U.S., CA) Service Options**

**Hazardous Materials (U.S. only)** – For detailed hazardous materials shipping information, go to the Transportation of Hazardous Materials screen on fedex.com.  

**FedEx Home Delivery® Special Services**

-   **U.S. Shipments up to 150 lbs.**
-   **Appointment Delivery (U.S. Only)  
    **Available to every U.S. residential address Monday – Saturday from 9 a.m. to 8 p.m.
-   **Date Certain Delivery (U.S. Only)  
    **Deliver packages to residents’ homes Monday–Saturday, excluding holidays. The selected date cannot be before the standard delivery date and must be within 14 days from the pickup date.
-   **Evening Delivery (U.S. Only)  
    **If delivery must be made in person and your recipient is not available during the day. Use it to specify delivery between 5 and 8 p.m. on the scheduled day of delivery.
-   **7–day Delivery**  
    FedEx Home Delivery® allows residential deliveries 7 days a week, with delivery to most locations on Saturday and many on Sunday.

**Non–standard Packaging**  
If you ship a package that FedEx Ground has regulated as “non–standard,” then additional handling surcharge is automatically applied to that shipment.  
A non–standard FedEx Ground package is any package that:

-   Measures greater than 60 inches in length but is equal to or less than 108 inches in length
-   Is not fully encased in an outer shipping container
-   Is encased in an outer shipping container made of metal or wood
-   Any drum or pail (less than 5 gallons) that is not fully encased in an outer shipping container made of corrugated cardboard

**Return Label**  
Create return shipping labels on your computer or shipping system. Then simply print and provide the label to your customer or send it via email.  
  
**Signature Options**  
FedEx provides a range of delivery options to meet FedEx customer’s needs. Whether signature required to prove the safe arrival of FedEx customers valuable goods, the signature of an adult, or perhaps no signature at all.  
The availability of these FedEx Delivery Signature Options varies based on the special service(s) and shipment type used for your shipment.  
  
The available signature options are as follows:

-   No Signature Required: FedEx will attempt to obtain a signature at the delivery address. If no one is available to sign, FedEx will deliver the package in a safe place without obtaining signature.
-   Indirect Signature Required: FedEx will obtain a signature from someone at the delivery address, from a neighbor or from a building manager. If no one is available to sign, FedEx will attempt to redeliver the package on another date. This option is available for Residential deliveries only.
-   Direct Signature Required: FedEx will obtain a signature from someone at the delivery address only. If no one is available to sign, FedEx will attempt redelivery of the package on another date.
-   Adult Signature Required: FedEx obtains a signature from someone at the delivery address who is at least the age of majority (no longer a minor) in the destination country. Government–issued photo identification or other identification customarily accepted by local authorities is required. If there is no eligible recipient at the address, FedEx may reattempt the delivery. For U.S. deliveries, the recipient must be 21 years of age and present government–issued photo identification.

**Monitoring and Intervention (MI) and Healthcare Identifiers (HCID)**

Monitoring and intervention (MI) and HealthCare Identifier (HCID) special service options help proactively monitor critical healthcare shipments, mitigate risk, and provide intervention support to protect healthcare shipments. The HCID special services identifies time sensitive healthcare shipments and facilitates their prioritization in the FedEx network.

Healthcare Options are only valid for Express Premium Services. You must choose M&I special service option first to ship these health care options. Refer to the [MI and HCID special service](https://developer.fedex.com/api/en-us/guides/api-reference.html#monitoringandinterventionoptions) options to view the list of available services.

When this service type is specified in the retrieve special services request, the API will return a list of all healthcare services available for your origin and destination pair. The API will also return the _**sequenceNumber**_ and _**sequenceDisplay**_ for the services in response, that determines the sequence and the display order of the healthcare services in the labels.

**Dangerous Goods by Road**

The Dangerous Goods (DG) by road is a package level special service option that allows shippers to ship their dangerous goods packages via road as per ADR regulations within Europe. The option to ship Dry Ice, Lithium Batteries, Limited Quantity Dangerous Goods, etc., for intra-country shipping through FedEx Regional Economy, FedEx Regional Economy Freight, and FedEx Express Domestics, etc. will be available for the DG by road service within key European markets.

Below special services are included to enable additional shipment capabilities for DG by road:

-   Standalone Lithium battery shipments
-   Fully Regulated DG by Road
-   Limited Quantity Shipments by Road
-   Genetically Modified (Micro) Organisms
-   Biological Substances Category B
-   Excepted Quantities
-   Radioactive Materials

_Note:_

-   _The enum STANDALONE\_BATTERY must be specified under **specialServiceTypes** to get the option to select the battery details under the element **standaloneBatteryDetails**. This special service type is applicable only for Intra-European regions._
-   _For Fully Regulated Dangerous Goods (FDG) and Limited Quantities Dangerous Goods (LDG) shipments, you need to specify the **regulation** as ADR under **dangerousGoodsDetail** object in the request for the shipment to be processed successfully._

**Service Options Enumeration values**

There are types of special services which can be requested for a shipment. For more information on Shipment Special Services refer to [Shipment Level Special Service types](https://developer.fedex.com/api/en-ca/guides/api-reference.html#shipmentlevelspecialservicetypes).

### FedEx Packaging

FedEx offers specially designed packaging solutions to meet customers' document, diagnostic, heavy–duty, security, and temperature–control needs. Packaging is vital to the swift delivery of shipment. FedEx have therefore developed their own range of ready–to–use, self–sealing packaging in a choice of shapes and sizes.

**FedEx One Rate**

FedEx One Rate is flat–rate shipping that does not require you to weigh or measure shipments under 50 lbs. You can choose the box or tube that best fits the size of what they need to ship and fill the package to capacity, as long as the shipment doesn’t exceed 50 pounds. It gives you a simple, predictable, flat rate shipping option for their express packages. FedEx One Rate a shipping portfolio based on Six Express Service options, combined with seven FedEx proprietary (white) packaging types.

**FedEx One Rate Packaging**

The FedEx Packaging Types that are valid/available with the One Rate pricing option are the following:

-   FEDEX\_ENVELOPE
-   FEDEX\_EXTRA\_SMALL\_BOX
-   FEDEX\_SMALL\_BOX
-   FEDEX\_MEDIUM\_BOX
-   FEDEX\_LARGE\_BOX
-   FEDEX\_EXTRA\_LARGE\_BOX
-   FEDEX\_PAK
-   FEDEX\_TUBE

Your own packaging is not available for the One Rate pricing option.

For more information on Packaging Services refer to [Packaging Types](https://developer.fedex.com/api/en-ca/guides/api-reference.html#packagetypes)

### Business Rules

-   You cannot specify multiple carrier codes. If you want to see results for multiple carriers, then you must either omit this element or send separate service availability requests.
-   Individual skids of 151 lbs. or more. Skids exceeding 2,200 lbs. require prior approval.
-   To locate FedEx services that allow dangerous goods shipping for your origin/destination pair, use the Service Availability Service.
-   The maximum number of packages in an MPS request is 300.
-   The shipper's account number must be enabled for Ground Residential functionality. Once the account number is enabled, the customer may specify a service type of Ground instead of Ground Home Delivery for a shipment weighing less than 150 pounds and destined to a residential address.
-   If you specify SATURDAY\_DELIVERY for Variable Options, you will get both Saturday Delivery options and regular options for all services where Saturday delivery is an option. Do not specify SATURDAY\_DELIVERY for Special Services or it will only return any applicable Saturday Delivery options.

### JSON API Collection

Explore our JSON API collection to see how we can deliver on your business needs. Test your integration with these sample requests.

[Learn more about sandbox virtualization guide](https://developer.fedex.com/api/en-ca/guides/sandboxvirtualization.html)

[Documentation Powered by ReDoc](https://github.com/Redocly/redoc)

# Service Availability API (1.0.0)

## [](#operation/Retrieve Services and Transit Times)Retrieve Services and Transit Times

This endpoint gives the estimated transit times for a particular shipment.  
_Note: FedEx APIs do not support Cross-Origin Resource Sharing (CORS) mechanism._

  

EXPAND ALLCOLLAPSE ALL

To learn more about how to get OAuth access token, refer to [API Authorization documentation.](/api/en-ca/catalog/authorization/v1/docs.html)

##### header Parameters

x-customer-transaction-id

string

Example: 0e671149-016f-1000-941f-ef4dbabadd2e

This element allows you to assign a unique identifier to your transaction. This element is also returned in the reply and helps you match the request to the reply. It also helps you to track the transaction with APIF.

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

-   Full\_Schema\_TransitTime
-   TransitTimes\_Domestic
-   TransitTimes\_International

requestedShipment

object (TransitTimeRequestedShipment)

Provide shipment data details for which a transit time is desired.

carrierCodes

Array of strings

Items Enum: "FDXE" "FDXG" "FXSP"

Specify the four letter code of a FedEx operating company that meets your requirements  
Examples of FedEx Operating Companies are:

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

post /availability/v1/transittimes

Sandbox Server

https://apis-sandbox.fedex.com/availability/v1/transittimes

Production Server

https://apis.fedex.com/availability/v1/transittimes

### Request samples - Retrieve Services and Transit Times

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

Full\_Schema\_TransitTime

Copy

Expand all Collapse all

{

-   "requestedShipment":
    
    {
    
    -   "shipper":
        
        {
        
        -   "address":
            
            {
            
            -   "city": "Collierville",
                
            -   "stateOrProvinceCode": "TN",
                
            -   "postalCode": "38127",
                
            -   "countryCode": "US",
                
            -   "residential": false
                
            
            }
            
        
        },
        
    -   "recipients":
        
        \[
        
        -   {
            
            -   "address":
                
                {
                
                -   "city": "Collierville",
                    
                -   "stateOrProvinceCode": "TN",
                    
                -   "postalCode": "38127",
                    
                -   "countryCode": "US",
                    
                -   "residential": false
                    
                
                }
                
            
            }
            
        
        \],
        
    -   "serviceType": "FEDEX\_GROUND",
        
    -   "packagingType": "YOUR\_PACKAGING",
        
    -   "shipDatestamp": "2019-09-01",
        
    -   "pickupType": "DROPOFF\_AT\_FEDEX\_LOCATION",
        
    -   "shippingChargesPayment":
        
        {
        
        -   "payor":
            
            {
            
            -   "responsibleParty":
                
                {
                
                -   "address":
                    
                    {
                    
                    -   "city": "Collierville",
                        
                    -   "stateOrProvinceCode": "TN",
                        
                    -   "postalCode": "38127",
                        
                    -   "countryCode": "US",
                        
                    -   "residential": false
                        
                    
                    },
                    
                -   "accountNumber":
                    
                    {
                    
                    -   "value": "60xxxxxx2"
                        
                    
                    }
                    
                
                }
                
            
            },
            
        -   "paymentType": "COLLECT"
            
        
        },
        
    -   "smartPostInfoDetail":
        
        {
        
        -   "ancillaryEndorsement": "RETURN\_SERVICE",
            
        -   "hubId": "5015",
            
        -   "indicia": "PRESORTED\_STANDARD",
            
        -   "specialServices": "USPS\_DELIVERY\_CONFIRMATION"
            
        
        },
        
    -   "requestedPackageLineItems":
        
        \[
        
        -   {
            
            -   "declaredValue":
                
                {
                
                -   "amount": 12,
                    
                -   "currency": "USD"
                    
                
                },
                
            -   "weight":
                
                {
                
                -   "units": "LB",
                    
                -   "value": 68.25
                    
                
                },
                
            -   "dimensions":
                
                {
                
                -   "length": 100,
                    
                -   "width": 50,
                    
                -   "height": 30,
                    
                -   "units": "CM"
                    
                
                },
                
            -   "packageSpecialServices":
                
                {
                
                -   "specialServiceTypes":
                    
                    \[
                    
                    -   "DANGEROUS\_GOODS",
                        
                    -   "COD"
                        
                    
                    \],
                    
                -   "codDetail":
                    
                    {
                    
                    -   "codCollectionAmount":
                        
                        {
                        
                        -   "amount": 12.45,
                            
                        -   "currency": "USD"
                            
                        
                        }
                        
                    
                    },
                    
                -   "dryIceWeight":
                    
                    {
                    
                    -   "units": "LB",
                        
                    -   "value": 10
                        
                    
                    },
                    
                -   "dangerousGoodsDetail":
                    
                    {
                    
                    -   "accessibility": "ACCESSIBLE",
                        
                    -   "options":
                        
                        \[
                        
                        -   "BATTERY"
                            
                        
                        \]
                        
                    
                    },
                    
                -   "alcoholDetail":
                    
                    {
                    
                    -   "alcoholRecipientType": "LICENSEE",
                        
                    -   "shipperAgreementType": "retailer"
                        
                    
                    },
                    
                -   "pieceCountVerificationBoxCount": 2,
                    
                -   "batteryDetails":
                    
                    {
                    
                    -   "batteryMaterialType": "LITHIUM\_METAL",
                        
                    -   "batteryPackingType": "CONTAINED\_IN\_EQUIPMENT",
                        
                    -   "batteryRegulatoryType": "IATA\_SECTION\_II"
                        
                    
                    }
                    
                
                }
                
            
            }
            
        
        \],
        
    -   "shipmentSpecialServices":
        
        {
        
        -   "specialServiceTypes":
            
            \[
            
            -   "BROKER\_SELECT\_OPTION"
                
            
            \],
            
        -   "codDetail":
            
            {
            
            -   "codCollectionAmount":
                
                {
                
                -   "amount": 12.45,
                    
                -   "currency": "USD"
                    
                
                },
                
            -   "codCollectionType": "PERSONAL\_CHECK"
                
            
            },
            
        -   "internationalControlledExportDetail":
            
            {
            
            -   "type": "DSP\_LICENSE\_AGREEMENT"
                
            
            },
            
        -   "homeDeliveryPremiumDetail":
            
            {
            
            -   "homedeliveryPremiumType": "EVENING"
                
            
            },
            
        -   "holdAtLocationDetail":
            
            {
            
            -   "locationId": "YBZA",
                
            -   "locationType": "FEDEX\_ONSITE",
                
            -   "locationContactAndAddress":
                
                {
                
                -   "contact":
                    
                    {
                    
                    -   "personName": "John Taylor",
                        
                    -   "emailAddress": "sample@company.com",
                        
                    -   "phoneNumber": "1234567890",
                        
                    -   "phoneExtension": "1234",
                        
                    -   "faxNumber": "1234567890",
                        
                    -   "companyName": "Fedex"
                        
                    
                    },
                    
                -   "address":
                    
                    {
                    
                    -   "city": "Collierville",
                        
                    -   "stateOrProvinceCode": "TN",
                        
                    -   "postalCode": "38127",
                        
                    -   "countryCode": "US",
                        
                    -   "residential": false
                        
                    
                    }
                    
                
                }
                
            
            },
            
        -   "shipmentDryIceDetail":
            
            {
            
            -   "totalWeight":
                
                {
                
                -   "units": "LB",
                    
                -   "value": 10
                    
                
                },
                
            -   "packageCount": 12
                
            
            }
            
        
        },
        
    -   "customsClearanceDetail":
        
        {
        
        -   "commodities":
            
            \[
            
            -   {
                
                -   "description": "DOCUMENTS",
                    
                -   "quantity": 1,
                    
                -   "unitPrice":
                    
                    {
                    
                    -   "amount": 12.45,
                        
                    -   "currency": "USD"
                        
                    
                    },
                    
                -   "weight":
                    
                    {
                    
                    -   "units": "LB",
                        
                    -   "value": 10
                        
                    
                    },
                    
                -   "customsValue":
                    
                    {
                    
                    -   "amount": 12.45,
                        
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
            
        
        }
        
    
    },
    
-   "carrierCodes":
    
    \[
    
    -   "FDXG"
        
    
    \],
    
-   "version":
    
    {
    
    -   "major": "1",
        
    -   "minor": "1",
        
    -   "patch": "1"
        
    
    }
    

}

### Response samples - Retrieve Services and Transit Times

-   200
-   400
-   401
-   403
-   404
-   500

Content type

application/json

Copy

Expand all Collapse all

{

-   "transactionId": "624deea6-b709-470c-8c39-4b5511281492",
    
-   "customerTransactionId": "AnyCo\_order123456789",
    
-   "output":
    
    {
    
    -   "alerts":
        
        \[
        
        -   {
            
            -   "code": "string",
                
            -   "alertType": "NOTE",
                
            -   "message": "string"
                
            
            }
            
        
        \],
        
    -   "transitTimes":
        
        \[
        
        -   {
            
            -   "transitTimeDetails":
                
                \[
                
                -   {
                    
                    -   "serviceType": "GROUND\_HOME\_DELIVERY",
                        
                    -   "customerMessages":
                        
                        \[
                        
                        -   {
                            
                            -   "code": "SERVICE.TYPE.INTERNATIONAL.MESSAGE",
                                
                            -   "message": "Rate does not include dities & taxes, clearance entry fees or other import fees. The payor of duties/taxes/fees will be responsible for any applicable Clearance Entry Fees"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "distance":
                        
                        {
                        
                        -   "units": "KM",
                            
                        -   "value": 1.2315135367772556
                            
                        
                        },
                        
                    -   "commit":
                        
                        {
                        
                        -   "brokerCommitTimestamp": "2020-03-05T00:00:00-06:00",
                            
                        -   "cutOffTime": "18:30:00",
                            
                        -   "commodityName": "copper",
                            
                        -   "transitDays":
                            
                            {
                            
                            -   "description": "2-7 Business Days",
                                
                            -   "minimumTransitTime": "TWO\_DAYS",
                                
                            -   "maximumTransitTime": "SEVEN\_DAYS"
                                
                            
                            },
                            
                        -   "commitMessageDetails": "string",
                            
                        -   "derivedDestinationDetail":
                            
                            {
                            
                            -   "serviceArea": "100015",
                                
                            -   "countryCode": "US",
                                
                            -   "locationId": "631278456",
                                
                            -   "airportId": "CA4562",
                                
                            -   "postalCode": "685423",
                                
                            -   "stateOrProvinceCode": "TN",
                                
                            -   "locationNumber": 7856
                                
                            
                            },
                            
                        -   "dateDetail":
                            
                            {
                            
                            -   "dayOfWeek": "THU",
                                
                            -   "time": "09:30:00",
                                
                            -   "day": "Apr-13-2021"
                                
                            
                            }
                            
                        
                        },
                        
                    -   "destinationLocation":
                        
                        {
                        
                        -   "geoPositionalCoordinates": "{\\"latitude\\":5.637376656633329,\\"longitude\\":3.616076749251911}"
                            
                        
                        },
                        
                    -   "serviceName": "FedEx Home Delivery"
                        
                    
                    }
                    
                
                \]
                
            
            }
            
        
        \],
        
    -   "encoded": false
        
    
    }
    

}

## [](#operation/Get Package and Service Options)Retrieve Services and Packaging Options

Use this endpoint to return a list of all FedEx Express or FedEx Ground services and packaging type combinations that are available between the input origin and destination and subpackaging information.  
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

-   Full\_Schema\_Package\_And\_Service\_Options
-   Package\_and\_Service\_Options\_Domestic
-   Package\_and\_Service\_Options\_International

requestedShipment

required

object

The descriptive data for the requested shipment.

carrierCodes

Array of strings

Items Enum: "FDXE" "FDXG" "FXFR" "FXSP"

"Specify the four letter code of a FedEx operating company that meets your requirements  
Examples of FedEx Operating Companies are:

-   FDXE - FedEx Express
-   FDXG - FedEx Ground
-   FXSP - FedEx SmartPost
-   FXCC - FedEx Custom Critical.

"

accountNumber

object

This is a Payor account number associated with the shipment. Account number is required, for SmartPost shipments (i.e. Carrier code: FXSP)

systemOfMeasureType

string

Enum: "IMPERIAL" "METRIC"

This is system measurement type, such as Imperial or Metric.

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

post /availability/v1/packageandserviceoptions

Sandbox Server

https://apis-sandbox.fedex.com/availability/v1/packageandserviceoptions

Production Server

https://apis.fedex.com/availability/v1/packageandserviceoptions

### Request samples - Retrieve Services and Packaging Options

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

Full\_Schema\_Package\_And\_Service\_Options

Copy

Expand all Collapse all

{

-   "requestedShipment":
    
    {
    
    -   "shipper":
        
        {
        
        -   "address":
            
            {
            
            -   "streetLines":
                
                \[
                
                -   "Bldg. 10",
                    
                -   "10 FedEx Parkway"
                    
                
                \],
                
            -   "city": "Collierville",
                
            -   "stateOrProvinceCode": "TN",
                
            -   "postalCode": "38127",
                
            -   "countryCode": "US",
                
            -   "residential": false
                
            
            },
            
        -   "contact":
            
            {
            
            -   "personName": "John Taylor",
                
            -   "emailAddress": "sample@company.com",
                
            -   "phoneNumber": "1234567890",
                
            -   "phoneExtension": "phoneExtension",
                
            -   "companyName": "Fedex",
                
            -   "faxNumber": "faxNumber"
                
            
            },
            
        -   "accountNumber":
            
            {
            
            -   "value": "Your account number"
                
            
            }
            
        
        },
        
    -   "recipients":
        
        \[
        
        -   {
            
            -   "address":
                
                {
                
                -   "streetLines":
                    
                    \[
                    
                    -   "Bldg. 10",
                        
                    -   "10 FedEx Parkway"
                        
                    
                    \],
                    
                -   "postalCode": "m1m1m1",
                    
                -   "countryCode": "CA",
                    
                -   "city": "Beverly Hills",
                    
                -   "stateOrProvinceCode": "CA",
                    
                -   "residential": false
                    
                
                }
                
            
            }
            
        
        \],
        
    -   "shipDateStamp": "2020-02-28",
        
    -   "requestedPackageLineItems":
        
        \[
        
        -   {
            
            -   "physicalPackaging": "FEDEX\_ENVELOPE",
                
            -   "groupPackageCount": 0,
                
            -   "itemDescriptionForClearance": "Item Description for Clearence",
                
            -   "customerReferences":
                
                \[
                
                -   {
                    
                    -   "customerReferenceType": "DEPARTMENT\_NUMBER",
                        
                    -   "value": "3686"
                        
                    
                    }
                    
                
                \],
                
            -   "contentRecord":
                
                {
                
                -   "itemNumber": "45673289",
                    
                -   "receivedQuantity": 2,
                    
                -   "description": "This is the part number.",
                    
                -   "partNumber": "123"
                    
                
                },
                
            -   "declaredValue":
                
                {
                
                -   "amount": 12.45,
                    
                -   "currency": "USD"
                    
                
                },
                
            -   "weight":
                
                {
                
                -   "units": "KG",
                    
                -   "value": 68.25
                    
                
                },
                
            -   "dimensions":
                
                {
                
                -   "length": 100,
                    
                -   "width": 50,
                    
                -   "height": 30,
                    
                -   "units": "CM"
                    
                
                },
                
            -   "packageSpecialServices":
                
                {
                
                -   "signatureOptionType": "NO\_SIGNATURE\_REQUIRED",
                    
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
                        
                        -   "HAZARDOUS\_MATERIALS",
                            
                        -   "LIMITED\_QUANTITIES\_COMMODITIES"
                            
                        
                        \]
                        
                    
                    },
                    
                -   "pieceCountVerificationBoxCount": 0,
                    
                -   "batteryDetails":
                    
                    \[
                    
                    -   {
                        
                        -   "batteryPackingType": "CONTAINED\_IN\_EQUIPMENT",
                            
                        -   "batteryRegulatoryType": "IATA\_SECTION\_II",
                            
                        -   "batteryMaterialType": "LITHIUM\_METAL"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "specialServiceTypes":
                    
                    \[
                    
                    -   "BATTERY",
                        
                    -   "DANGEROUS\_GOODS"
                        
                    
                    \],
                    
                -   "codDetail":
                    
                    {
                    
                    -   "codCollectionType": "CASH",
                        
                    -   "codCollectionAmount":
                        
                        {
                        
                        -   "amount": 100.5,
                            
                        -   "currency": "USD"
                            
                        
                        }
                        
                    
                    },
                    
                -   "dryIceWeight":
                    
                    {
                    
                    -   "units": "KG",
                        
                    -   "value": 68.25
                        
                    
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
        
    -   "freightShipmentDetail":
        
        {
        
        -   "shipmentDimensions":
            
            {
            
            -   "length": 100,
                
            -   "width": 30,
                
            -   "height": 50,
                
            -   "units": "CM"
                
            
            },
            
        -   "alternateBilling": true,
            
        -   "lineItem":
            
            \[
            
            -   {
                
                -   "pieces": 1,
                    
                -   "volume":
                    
                    {
                    
                    -   "units": "CUBIC\_FT",
                        
                    -   "value": 9.965781217890562
                        
                    
                    },
                    
                -   "handlingUnits": 1,
                    
                -   "freightClass": "CLASS\_050",
                    
                -   "description": "Description",
                    
                -   "weight":
                    
                    {
                    
                    -   "units": "KG",
                        
                    -   "value": 68.25
                        
                    
                    },
                    
                -   "packaging": "SELFPACKAGE",
                    
                -   "classProvidedByCustomer": true,
                    
                -   "hazardousMaterials": "HAZARDOUS\_MATERIALS",
                    
                -   "dimensions":
                    
                    {
                    
                    -   "length": 100,
                        
                    -   "width": 50,
                        
                    -   "height": 30,
                        
                    -   "units": "CM"
                        
                    
                    }
                    
                
                }
                
            
            \],
            
        -   "role": "SHIPPER",
            
        -   "clientDiscountPercent": 10.5,
            
        -   "fedExFreightBillingContactAndAddress":
            
            {
            
            -   "contactAncillaryDetail":
                
                {
                
                -   "emailAddresses": null,
                    
                -   "prefix": "prefix",
                    
                -   "phoneNumberDetails":
                    
                    \[
                    
                    -   {
                        
                        -   "number":
                            
                            {
                            
                            -   "areaCode": "areaCode",
                                
                            -   "extension": "extension",
                                
                            -   "countryCode": "countryCode",
                                
                            -   "personalIdentificationNumber": "personalIdentificationNumber",
                                
                            -   "localNumber": "localNumber"
                                
                            
                            },
                            
                        -   "permissions":
                            
                            {
                            
                            -   "CALL": "GRANT"
                                
                            
                            },
                            
                        -   "usage": "PRIMARY",
                            
                        -   "type": "FAX"
                            
                        
                        },
                        
                    -   {
                        
                        -   "number":
                            
                            {
                            
                            -   "areaCode": "areaCode",
                                
                            -   "extension": "extension",
                                
                            -   "countryCode": "countryCode",
                                
                            -   "personalIdentificationNumber": "personalIdentificationNumber",
                                
                            -   "localNumber": "localNumber"
                                
                            
                            },
                            
                        -   "permissions":
                            
                            {
                            
                            -   "CALL": "GRANT"
                                
                            
                            },
                            
                        -   "usage": "PRIMARY",
                            
                        -   "type": "FAX"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "companyName":
                    
                    {
                    
                    -   "division": "division",
                        
                    -   "companyCd": "companyCd",
                        
                    -   "name": "name",
                        
                    -   "department": "department",
                        
                    -   "storeId": "storeId"
                        
                    
                    },
                    
                -   "title": "title"
                    
                
                },
                
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
                    
                
                },
                
            -   "addressAncillaryDetail":
                
                {
                
                -   "locationInCity": "location in the city",
                    
                -   "suite": "suite",
                    
                -   "locationInProperty": "location in the property",
                    
                -   "addtionalDescriptions": "addtional descriptions",
                    
                -   "department": "department",
                    
                -   "roomFloor": "room or floor",
                    
                -   "crossStreet": "cross street",
                    
                -   "building": "building",
                    
                -   "apartment": "apartment",
                    
                -   "room": "room",
                    
                -   "addressVerificationOverrideReason": "CUSTOMER\_PROVIDED\_PROOF"
                    
                
                }
                
            
            },
            
        -   "aliasID": "36839",
            
        -   "liabilityCoverageDetail":
            
            {
            
            -   "coverageType": "NEW",
                
            -   "coverageAmount":
                
                {
                
                -   "amount": 12.45,
                    
                -   "currency": "USD"
                    
                
                }
                
            
            },
            
        -   "fedExFreightAccountNumber":
            
            {
            
            -   "value": "Your account number"
                
            
            },
            
        -   "totalHandlingUnits": 0
            
        
        },
        
    -   "specialServicesRequested":
        
        {
        
        -   "internationalControlledExportDetail":
            
            {
            
            -   "type": "DEA\_036"
                
            
            },
            
        -   "returnShipmentDetail":
            
            {
            
            -   "returnType": "PENDING"
                
            
            },
            
        -   "homeDeliveryPremiumDetail":
            
            {
            
            -   "homedeliveryPremiumType": "APPOINTMENT"
                
            
            },
            
        -   "returnEmailDetail":
            
            {
            
            -   "merchantPhoneNumber": "1234567890",
                
            -   "allowedSpecialService":
                
                \[
                
                -   "SATURDAY\_DELIVERY"
                    
                
                \]
                
            
            },
            
        -   "specialServiceTypes":
            
            \[
            
            -   "HOME\_DELIVERY\_PREMIUM"
                
            
            \],
            
        -   "saturdayDeliveryDetail":
            
            {
            
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
                    
                    -   "personName":
                        
                        {
                        
                        -   "firstName": "first name",
                            
                        -   "lastName": "last name",
                            
                        -   "middleName": "middle name",
                            
                        -   "suffix": "suffix"
                            
                        
                        },
                        
                    -   "emailAddress": "email address",
                        
                    -   "phoneNumber": "phone number",
                        
                    -   "companyName": "company name",
                        
                    -   "faxNumber": "fax number",
                        
                    -   "title": "title"
                        
                    
                    }
                    
                
                }
                
            
            },
            
        -   "holdAtLocationDetail":
            
            {
            
            -   "locationId": "YBZA",
                
            -   "locationContactAndAddress":
                
                {
                
                -   "contactAncillaryDetail":
                    
                    {
                    
                    -   "emailAddresses":
                        
                        \[
                        
                        -   {
                            
                            -   "emailNotificationFormatType": "EMAIL",
                                
                            -   "address": "address",
                                
                            -   "permissions":
                                
                                {
                                
                                -   "EMAIL": "GRANT"
                                    
                                
                                }
                                
                            
                            },
                            
                        -   {
                            
                            -   "emailNotificationFormatType": "TEXT",
                                
                            -   "address": "address",
                                
                            -   "permissions":
                                
                                {
                                
                                -   "EMAIL": "GRANT"
                                    
                                
                                }
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "prefix": "prefix",
                        
                    -   "phoneNumberDetails":
                        
                        \[
                        
                        -   {
                            
                            -   "number":
                                
                                {
                                
                                -   "areaCode": "areaCode",
                                    
                                -   "extension": "extension",
                                    
                                -   "countryCode": "countryCode",
                                    
                                -   "personalIdentificationNumber": "personalIdentificationNumber",
                                    
                                -   "localNumber": "localNumber"
                                    
                                
                                },
                                
                            -   "permissions":
                                
                                {
                                
                                -   "CALL": "GRANT"
                                    
                                
                                },
                                
                            -   "usage": "PRIMARY",
                                
                            -   "type": "FAX"
                                
                            
                            },
                            
                        -   {
                            
                            -   "number":
                                
                                {
                                
                                -   "areaCode": "areaCode",
                                    
                                -   "extension": "extension",
                                    
                                -   "countryCode": "countryCode",
                                    
                                -   "personalIdentificationNumber": "personalIdentificationNumber",
                                    
                                -   "localNumber": "localNumber"
                                    
                                
                                },
                                
                            -   "permissions":
                                
                                {
                                
                                -   "CALL": "GRANT"
                                    
                                
                                },
                                
                            -   "usage": "PRIMARY",
                                
                            -   "type": "FAX"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "companyName":
                        
                        {
                        
                        -   "division": "division",
                            
                        -   "companyCd": "companyCd",
                            
                        -   "name": "name",
                            
                        -   "department": "department",
                            
                        -   "storeId": "storeId"
                            
                        
                        },
                        
                    -   "title": "title"
                        
                    
                    },
                    
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
                        
                    
                    },
                    
                -   "addressAncillaryDetail":
                    
                    {
                    
                    -   "locationInCity": "location in the city",
                        
                    -   "suite": "suite",
                        
                    -   "locationInProperty": "location in the property",
                        
                    -   "addtionalDescriptions": "addtional descriptions",
                        
                    -   "department": "department",
                        
                    -   "roomFloor": "room or floor",
                        
                    -   "crossStreet": "cross street",
                        
                    -   "building": "building",
                        
                    -   "apartment": "apartment",
                        
                    -   "room": "room",
                        
                    -   "addressVerificationOverrideReason": "CUSTOMER\_PROVIDED\_PROOF"
                        
                    
                    }
                    
                
                },
                
            -   "locationType": "FEDEX\_ONSITE"
                
            
            },
            
        -   "codDetail":
            
            {
            
            -   "codCollectionType": "CASH",
                
            -   "codCollectionAmount":
                
                {
                
                -   "amount": 100.5,
                    
                -   "currency": "USD"
                    
                
                }
                
            
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
            
        -   "freightDirectDetail":
            
            {
            
            -   "freightDirectDataDetails":
                
                \[
                
                -   {
                    
                    -   "type": "STANDARD",
                        
                    -   "transportationType": "DELIVERY",
                        
                    -   "eMailAddress": "raj.osv@fedex.com",
                        
                    -   "phoneNumberDetails":
                        
                        \[
                        
                        -   {
                            
                            -   "phoneNumberType": "MOBILE",
                                
                            -   "phoneNumber": "XXXXXXXXX12"
                                
                            
                            }
                            
                        
                        \]
                        
                    
                    }
                    
                
                \]
                
            
            }
            
        
        },
        
    -   "pickupType": "DROPOFF\_AT\_FEDEX\_LOCATION"
        
    
    },
    
-   "carrierCodes":
    
    \[
    
    -   "FDXE"
        
    
    \],
    
-   "accountNumber":
    
    {
    
    -   "value": "123456789"
        
    
    },
    
-   "systemOfMeasureType": "METRIC",
    
-   "version":
    
    {
    
    -   "major": "1",
        
    -   "minor": "1",
        
    -   "patch": "1"
        
    
    }
    

}

### Response samples - Retrieve Services and Packaging Options

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
    
    -   "packageOptions":
        
        \[
        
        -   {
            
            -   "serviceType":
                
                {
                
                -   "displayText": "FedEx Ground",
                    
                -   "key": "FEDEX\_GROUND"
                    
                
                },
                
            -   "oneRateMaxWeightAllowed":
                
                {
                
                -   "units": "KG",
                    
                -   "value": 68
                    
                
                },
                
            -   "maxWeightAllowed":
                
                {
                
                -   "units": "KG",
                    
                -   "value": 68
                    
                
                },
                
            -   "rateTypes":
                
                \[
                
                -   "WEIGHT\_BASED",
                    
                -   "FLAT\_BASED"
                    
                
                \],
                
            -   "packagingInfoList":
                
                \[
                
                -   {
                    
                    -   "dimensionText": "9-1/2” x 12-1/2",
                        
                    -   "description": "Letter"
                        
                    
                    }
                    
                
                \],
                
            -   "packageType":
                
                {
                
                -   "displayText": "FedEx Box",
                    
                -   "key": "FEDEX\_BOX"
                    
                
                },
                
            -   "maxMetricWeightAllowed":
                
                {
                
                -   "units": "KG",
                    
                -   "value": 68
                    
                
                },
                
            -   "oneRateMaxMetricWeightAllowed":
                
                {
                
                -   "units": "KG",
                    
                -   "value": 68
                    
                
                }
                
            
            }
            
        
        \],
        
    -   "oneRate": true,
        
    -   "advancedRegulatoryPackages":
        
        \[
        
        -   {
            
            -   "displayText": "FedEx Ground",
                
            -   "key": "FEDEX\_GROUND"
                
            
            }
            
        
        \],
        
    -   "serviceOptions":
        
        \[
        
        -   {
            
            -   "key": "FEDEX\_GROUND",
                
            -   "displayText": "FedEx Ground"
                
            
            }
            
        
        \],
        
    -   "alerts":
        
        \[
        
        -   {
            
            -   "code": "code",
                
            -   "alertType": "NOTE",
                
            -   "message": "alert message"
                
            
            }
            
        
        \]
        
    
    }
    

}

## [](#operation/Get Special Service Options)Retrieve Special Service Options

Use this endpoint to request list of all available FedEx services, shipment special, service options along with delivery signature options and return shipment types that are available between an origin and destination. You can filter the results using FedEx carrier code(s) and/or service type(s) for specific services.  
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

-   Full\_Schema\_Special\_Service\_Options
-   Special\_Service\_Options\_Domestic\_Ground
-   Special\_Service\_Options\_Domestic\_Express
-   Special\_Service\_Options\_International\_Express
-   Special\_Service\_Options\_International\_Express\_Freight

requestedShipment

required

object (SpecialServicesRequestedShipment)

The shipment details for which special service availability is requested.

accountNumber

object

Account number associated with a Payor object. Example: Your account number

carrierCodes

Array of strings

Items Enum: "FDXE" "FDXG" "FXSP" "FXFR"

Optionally supplied to restrict the results to services for a specific carrier. Valid values are: FDXE, FDXG, FXSP.  
Example: \["FDXG", "FDXE"\]

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

post /availability/v1/specialserviceoptions

Sandbox Server

https://apis-sandbox.fedex.com/availability/v1/specialserviceoptions

Production Server

https://apis.fedex.com/availability/v1/specialserviceoptions

### Request samples - Retrieve Special Service Options

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

Full\_Schema\_Special\_Service\_Options

Copy

Expand all Collapse all

{

-   "requestedShipment":
    
    {
    
    -   "shipper":
        
        {
        
        -   "address":
            
            {
            
            -   "streetLines":
                
                \[
                
                -   "Bldg. 10",
                    
                -   "10 FedEx Parkway"
                    
                
                \],
                
            -   "city": "Collierville",
                
            -   "stateOrProvinceCode": "TN",
                
            -   "postalCode": "38127",
                
            -   "countryCode": "US",
                
            -   "residential": false
                
            
            },
            
        -   "contact":
            
            {
            
            -   "personName": "John Ryan Taylor",
                
            -   "emailAddress": "sample@fedex.com",
                
            -   "phoneNumber": "1234567890",
                
            -   "phoneExtension": "91",
                
            -   "companyName": "Fedex",
                
            -   "faxNumber": "123456789"
                
            
            },
            
        -   "accountNumber":
            
            {
            
            -   "value": "123456789"
                
            
            }
            
        
        },
        
    -   "recipient":
        
        {
        
        -   "address":
            
            {
            
            -   "streetLines":
                
                \[
                
                -   "Bldg. 10",
                    
                -   "10 FedEx Parkway"
                    
                
                \],
                
            -   "city": "Collierville",
                
            -   "stateOrProvinceCode": "TN",
                
            -   "postalCode": "38127",
                
            -   "countryCode": "US",
                
            -   "residential": false
                
            
            },
            
        -   "contact":
            
            {
            
            -   "personName": "John Ryan Taylor",
                
            -   "emailAddress": "sample@fedex.com",
                
            -   "phoneNumber": "1234567890",
                
            -   "phoneExtension": "91",
                
            -   "companyName": "Fedex",
                
            -   "faxNumber": "123456789"
                
            
            },
            
        -   "accountNumber":
            
            {
            
            -   "value": "123456789"
                
            
            }
            
        
        },
        
    -   "serviceType": "STANDARD\_OVERNIGHT",
        
    -   "packagingType": "FEDEX\_BOX",
        
    -   "shipDateStamp": "2019-09-01",
        
    -   "requestedPackageLineItems":
        
        \[
        
        -   {
            
            -   "physicalPackaging": "FEDEX\_ENVELOPE",
                
            -   "groupPackageCount": 0,
                
            -   "itemDescriptionForClearance": "Item Description for Clearence",
                
            -   "customerReferences":
                
                \[
                
                -   {
                    
                    -   "customerReferenceType": "DEPARTMENT\_NUMBER",
                        
                    -   "value": "3686"
                        
                    
                    }
                    
                
                \],
                
            -   "contentRecord":
                
                {
                
                -   "itemNumber": "45673289",
                    
                -   "receivedQuantity": 2,
                    
                -   "description": "This is the part number.",
                    
                -   "partNumber": "123"
                    
                
                },
                
            -   "declaredValue":
                
                {
                
                -   "amount": 12.45,
                    
                -   "currency": "USD"
                    
                
                },
                
            -   "weight":
                
                {
                
                -   "units": "KG",
                    
                -   "value": 68.25
                    
                
                },
                
            -   "dimensions":
                
                {
                
                -   "length": 100,
                    
                -   "width": 50,
                    
                -   "height": 30,
                    
                -   "units": "CM"
                    
                
                },
                
            -   "packageSpecialServices":
                
                {
                
                -   "signatureOptionType": "NO\_SIGNATURE\_REQUIRED",
                    
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
                        
                        -   "HAZARDOUS\_MATERIALS",
                            
                        -   "LIMITED\_QUANTITIES\_COMMODITIES"
                            
                        
                        \]
                        
                    
                    },
                    
                -   "pieceCountVerificationBoxCount": 0,
                    
                -   "batteryDetails":
                    
                    \[
                    
                    -   {
                        
                        -   "batteryPackingType": "CONTAINED\_IN\_EQUIPMENT",
                            
                        -   "batteryRegulatoryType": "IATA\_SECTION\_II",
                            
                        -   "batteryMaterialType": "LITHIUM\_METAL"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "specialServiceTypes":
                    
                    \[
                    
                    -   "BATTERY",
                        
                    -   "DANGEROUS\_GOODS"
                        
                    
                    \],
                    
                -   "codDetail":
                    
                    {
                    
                    -   "codCollectionType": "CASH",
                        
                    -   "codCollectionAmount":
                        
                        {
                        
                        -   "amount": 100.5,
                            
                        -   "currency": "USD"
                            
                        
                        }
                        
                    
                    },
                    
                -   "dryIceWeight":
                    
                    {
                    
                    -   "units": "KG",
                        
                    -   "value": 68.25
                        
                    
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
        
    -   "dropoffType": "DROP\_BOX",
        
    -   "variableHandlingChargeDetail":
        
        {
        
        -   "percentValue": 25.67,
            
        -   "fixedValue":
            
            {
            
            -   "amount": 12.45,
                
            -   "currency": "USD"
                
            
            },
            
        -   "rateElementBasis": "NET\_CHARGE",
            
        -   "rateTypeBasis": "ACCOUNT"
            
        
        },
        
    -   "freightShipmentDetail":
        
        {
        
        -   "shipmentDimensions":
            
            {
            
            -   "length": 100,
                
            -   "width": 30,
                
            -   "height": 50,
                
            -   "units": "CM"
                
            
            },
            
        -   "alternateBilling": true,
            
        -   "lineItem":
            
            \[
            
            -   {
                
                -   "pieces": 1,
                    
                -   "volume":
                    
                    {
                    
                    -   "units": "CUBIC\_FT",
                        
                    -   "value": 9.965781217890562
                        
                    
                    },
                    
                -   "handlingUnits": 1,
                    
                -   "freightClass": "CLASS\_050",
                    
                -   "description": "Description",
                    
                -   "weight":
                    
                    {
                    
                    -   "units": "KG",
                        
                    -   "value": 68.25
                        
                    
                    },
                    
                -   "packaging": "SELFPACKAGE",
                    
                -   "classProvidedByCustomer": true,
                    
                -   "hazardousMaterials": "HAZARDOUS\_MATERIALS",
                    
                -   "dimensions":
                    
                    {
                    
                    -   "length": 100,
                        
                    -   "width": 50,
                        
                    -   "height": 30,
                        
                    -   "units": "CM"
                        
                    
                    }
                    
                
                }
                
            
            \],
            
        -   "role": "SHIPPER",
            
        -   "clientDiscountPercent": 10.5,
            
        -   "fedExFreightBillingContactAndAddress":
            
            {
            
            -   "contactAncillaryDetail":
                
                {
                
                -   "emailAddresses": null,
                    
                -   "prefix": "prefix",
                    
                -   "phoneNumberDetails":
                    
                    \[
                    
                    -   {
                        
                        -   "number":
                            
                            {
                            
                            -   "areaCode": "areaCode",
                                
                            -   "extension": "extension",
                                
                            -   "countryCode": "countryCode",
                                
                            -   "personalIdentificationNumber": "personalIdentificationNumber",
                                
                            -   "localNumber": "localNumber"
                                
                            
                            },
                            
                        -   "permissions":
                            
                            {
                            
                            -   "CALL": "GRANT"
                                
                            
                            },
                            
                        -   "usage": "PRIMARY",
                            
                        -   "type": "FAX"
                            
                        
                        },
                        
                    -   {
                        
                        -   "number":
                            
                            {
                            
                            -   "areaCode": "areaCode",
                                
                            -   "extension": "extension",
                                
                            -   "countryCode": "countryCode",
                                
                            -   "personalIdentificationNumber": "personalIdentificationNumber",
                                
                            -   "localNumber": "localNumber"
                                
                            
                            },
                            
                        -   "permissions":
                            
                            {
                            
                            -   "CALL": "GRANT"
                                
                            
                            },
                            
                        -   "usage": "PRIMARY",
                            
                        -   "type": "FAX"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "companyName":
                    
                    {
                    
                    -   "division": "division",
                        
                    -   "companyCd": "companyCd",
                        
                    -   "name": "name",
                        
                    -   "department": "department",
                        
                    -   "storeId": "storeId"
                        
                    
                    },
                    
                -   "title": "title"
                    
                
                },
                
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
                    
                
                },
                
            -   "addressAncillaryDetail":
                
                {
                
                -   "locationInCity": "location in the city",
                    
                -   "suite": "suite",
                    
                -   "locationInProperty": "location in the property",
                    
                -   "addtionalDescriptions": "addtional descriptions",
                    
                -   "department": "department",
                    
                -   "roomFloor": "room or floor",
                    
                -   "crossStreet": "cross street",
                    
                -   "building": "building",
                    
                -   "apartment": "apartment",
                    
                -   "room": "room",
                    
                -   "addressVerificationOverrideReason": "CUSTOMER\_PROVIDED\_PROOF"
                    
                
                }
                
            
            },
            
        -   "aliasID": "36839",
            
        -   "liabilityCoverageDetail":
            
            {
            
            -   "coverageType": "NEW",
                
            -   "coverageAmount":
                
                {
                
                -   "amount": 12.45,
                    
                -   "currency": "USD"
                    
                
                }
                
            
            },
            
        -   "fedExFreightAccountNumber":
            
            {
            
            -   "value": "Your account number"
                
            
            },
            
        -   "totalHandlingUnits": 0
            
        
        },
        
    -   "specialServicesRequested":
        
        {
        
        -   "internationalControlledExportDetail":
            
            {
            
            -   "type": "DEA\_036"
                
            
            },
            
        -   "returnShipmentDetail":
            
            {
            
            -   "returnType": "PENDING"
                
            
            },
            
        -   "homeDeliveryPremiumDetail":
            
            {
            
            -   "homedeliveryPremiumType": "APPOINTMENT"
                
            
            },
            
        -   "returnEmailDetail":
            
            {
            
            -   "merchantPhoneNumber": "1234567890",
                
            -   "allowedSpecialService":
                
                \[
                
                -   "SATURDAY\_DELIVERY"
                    
                
                \]
                
            
            },
            
        -   "specialServiceTypes":
            
            \[
            
            -   "HOME\_DELIVERY\_PREMIUM"
                
            
            \],
            
        -   "saturdayDeliveryDetail":
            
            {
            
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
                    
                    -   "personName":
                        
                        {
                        
                        -   "firstName": "first name",
                            
                        -   "lastName": "last name",
                            
                        -   "middleName": "middle name",
                            
                        -   "suffix": "suffix"
                            
                        
                        },
                        
                    -   "emailAddress": "email address",
                        
                    -   "phoneNumber": "phone number",
                        
                    -   "companyName": "company name",
                        
                    -   "faxNumber": "fax number",
                        
                    -   "title": "title"
                        
                    
                    }
                    
                
                }
                
            
            },
            
        -   "holdAtLocationDetail":
            
            {
            
            -   "locationId": "YBZA",
                
            -   "locationContactAndAddress":
                
                {
                
                -   "contactAncillaryDetail":
                    
                    {
                    
                    -   "emailAddresses":
                        
                        \[
                        
                        -   {
                            
                            -   "emailNotificationFormatType": "EMAIL",
                                
                            -   "address": "address",
                                
                            -   "permissions":
                                
                                {
                                
                                -   "EMAIL": "GRANT"
                                    
                                
                                }
                                
                            
                            },
                            
                        -   {
                            
                            -   "emailNotificationFormatType": "TEXT",
                                
                            -   "address": "address",
                                
                            -   "permissions":
                                
                                {
                                
                                -   "EMAIL": "GRANT"
                                    
                                
                                }
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "prefix": "prefix",
                        
                    -   "phoneNumberDetails":
                        
                        \[
                        
                        -   {
                            
                            -   "number":
                                
                                {
                                
                                -   "areaCode": "areaCode",
                                    
                                -   "extension": "extension",
                                    
                                -   "countryCode": "countryCode",
                                    
                                -   "personalIdentificationNumber": "personalIdentificationNumber",
                                    
                                -   "localNumber": "localNumber"
                                    
                                
                                },
                                
                            -   "permissions":
                                
                                {
                                
                                -   "CALL": "GRANT"
                                    
                                
                                },
                                
                            -   "usage": "PRIMARY",
                                
                            -   "type": "FAX"
                                
                            
                            },
                            
                        -   {
                            
                            -   "number":
                                
                                {
                                
                                -   "areaCode": "areaCode",
                                    
                                -   "extension": "extension",
                                    
                                -   "countryCode": "countryCode",
                                    
                                -   "personalIdentificationNumber": "personalIdentificationNumber",
                                    
                                -   "localNumber": "localNumber"
                                    
                                
                                },
                                
                            -   "permissions":
                                
                                {
                                
                                -   "CALL": "GRANT"
                                    
                                
                                },
                                
                            -   "usage": "PRIMARY",
                                
                            -   "type": "FAX"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "companyName":
                        
                        {
                        
                        -   "division": "division",
                            
                        -   "companyCd": "companyCd",
                            
                        -   "name": "name",
                            
                        -   "department": "department",
                            
                        -   "storeId": "storeId"
                            
                        
                        },
                        
                    -   "title": "title"
                        
                    
                    },
                    
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
                        
                    
                    },
                    
                -   "addressAncillaryDetail":
                    
                    {
                    
                    -   "locationInCity": "location in the city",
                        
                    -   "suite": "suite",
                        
                    -   "locationInProperty": "location in the property",
                        
                    -   "addtionalDescriptions": "addtional descriptions",
                        
                    -   "department": "department",
                        
                    -   "roomFloor": "room or floor",
                        
                    -   "crossStreet": "cross street",
                        
                    -   "building": "building",
                        
                    -   "apartment": "apartment",
                        
                    -   "room": "room",
                        
                    -   "addressVerificationOverrideReason": "CUSTOMER\_PROVIDED\_PROOF"
                        
                    
                    }
                    
                
                },
                
            -   "locationType": "FEDEX\_ONSITE"
                
            
            },
            
        -   "codDetail":
            
            {
            
            -   "codCollectionType": "CASH",
                
            -   "codCollectionAmount":
                
                {
                
                -   "amount": 100.5,
                    
                -   "currency": "USD"
                    
                
                }
                
            
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
            
        -   "freightDirectDetail":
            
            {
            
            -   "freightDirectDataDetails":
                
                \[
                
                -   {
                    
                    -   "type": "STANDARD",
                        
                    -   "transportationType": "DELIVERY",
                        
                    -   "eMailAddress": "raj.osv@fedex.com",
                        
                    -   "phoneNumberDetails":
                        
                        \[
                        
                        -   {
                            
                            -   "phoneNumberType": "MOBILE",
                                
                            -   "phoneNumber": "XXXXXXXXX12"
                                
                            
                            }
                            
                        
                        \]
                        
                    
                    }
                    
                
                \]
                
            
            }
            
        
        },
        
    -   "pickupType": "DROPOFF\_AT\_FEDEX\_LOCATION",
        
    -   "shippingDocumentSpecification": "shippingDocumentSpecification"
        
    
    },
    
-   "accountNumber":
    
    {
    
    -   "value": "123456789"
        
    
    },
    
-   "carrierCodes":
    
    \[
    
    -   "FDXG",
        
    -   "FDXE"
        
    
    \],
    
-   "version":
    
    {
    
    -   "major": "1",
        
    -   "minor": "1",
        
    -   "patch": "1"
        
    
    }
    

}

### Response samples - Retrieve Special Service Options

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
    
    -   "alerts":
        
        \[
        
        -   {
            
            -   "code": "code",
                
            -   "alertType": "NOTE",
                
            -   "message": "alert message"
                
            
            }
            
        
        \],
        
    -   "serviceOptionsList":
        
        \[
        
        -   {
            
            -   "serviceType": "INTERNATIONAL\_FIRST",
                
            -   "issEnabled": true,
                
            -   "signatureOptionsList":
                
                \[
                
                -   {
                    
                    -   "displayText": "Indirect Signature",
                        
                    -   "code:": "INDIRECT"
                        
                    
                    }
                    
                
                \],
                
            -   "packageSpecialServicesList":
                
                \[
                
                -   {
                    
                    -   "displayText": "DANGEROUS\_GOODS",
                        
                    -   "subType": "ACCESSIBLE",
                        
                    -   "specialServiceType": "DANGEROUS\_GOODS",
                        
                    -   "customerIntegrationMode": "CUSTOM",
                        
                    -   "value": 10
                        
                    
                    },
                    
                -   {
                    
                    -   "displayText": "BATTERY",
                        
                    -   "specialServiceType": "BATTERY",
                        
                    -   "subType": "ACCESSIBLE",
                        
                    -   "customerIntegrationMode": "CUSTOM",
                        
                    -   "value": 10
                        
                    
                    },
                    
                -   {
                    
                    -   "displayText": "NON\_STANDARD\_CONTAINER",
                        
                    -   "specialServiceType": "NON\_STANDARD\_CONTAINER",
                        
                    -   "subType": "ACCESSIBLE",
                        
                    -   "customerIntegrationMode": "STANDARD",
                        
                    -   "value": 10
                        
                    
                    },
                    
                -   {
                    
                    -   "displayText": "DRY\_ICE",
                        
                    -   "specialServiceType": "DRY\_ICE",
                        
                    -   "subType": "ACCESSIBLE",
                        
                    -   "customerIntegrationMode": "CUSTOM",
                        
                    -   "value": 10
                        
                    
                    },
                    
                -   {
                    
                    -   "displayText": "DANGEROUS\_GOODS",
                        
                    -   "subType": "INACCESSIBLE",
                        
                    -   "specialServiceType": "DANGEROUS\_GOODS",
                        
                    -   "customerIntegrationMode"": "CUSTOM",
                        
                    -   "value": 10
                        
                    
                    }
                    
                
                \],
                
            -   "returnShipmentList":
                
                \[
                
                -   "EMAIL\_LABEL",
                    
                -   "PRINT\_RETURN\_LABEL"
                    
                
                \],
                
            -   "carrierCode": "FDXE",
                
            -   "batteryOptionList":
                
                \[
                
                -   {
                    
                    -   "batteryMaterialType": "LITHIUM\_METAL",
                        
                    -   "batteryPackingType": "CONTAINED\_IN\_EQUIPMENT",
                        
                    -   "batteryRegulatoryType": "IATA\_SECTION\_II"
                        
                    
                    },
                    
                -   {
                    
                    -   "batteryMaterialType": "LITHIUM\_METAL",
                        
                    -   "batteryPackingType": "PACKED\_WITH\_EQUIPMENT",
                        
                    -   "batteryRegulatoryType": "IATA\_SECTION\_II"
                        
                    
                    },
                    
                -   {
                    
                    -   "batteryMaterialType": "LITHIUM\_ION",
                        
                    -   "batteryPackingType": "CONTAINED\_IN\_EQUIPMENT",
                        
                    -   "batteryRegulatoryType": "IATA\_SECTION\_II"
                        
                    
                    },
                    
                -   {
                    
                    -   "batteryMaterialType": "LITHIUM\_ION",
                        
                    -   "batteryPackingType": "PACKED\_WITH\_EQUIPMENT",
                        
                    -   "batteryRegulatoryType": "IATA\_SECTION\_II"
                        
                    
                    }
                    
                
                \],
                
            -   "alertList":
                
                \[
                
                -   {
                    
                    -   "displayText": "FedEx Ground",
                        
                    -   "key": "FEDEX\_GROUND"
                        
                    
                    }
                    
                
                \],
                
            -   "shipmentSpecialServicesList":
                
                \[
                
                -   {
                    
                    -   "value": "Returns Clearance",
                        
                    -   "specialServiceType": "RETURNS\_CLEARANCE",
                        
                    -   "customerIntegrationMode": "CUSTOM",
                        
                    -   "astraDescription": "RC",
                        
                    -   "subType": "ACCESSIBLE",
                        
                    -   "ltlPaymentTerms":
                        
                        \[
                        
                        -   "PREPAID",
                            
                        -   "COLLECT"
                            
                        
                        \]
                        
                    
                    },
                    
                -   {
                    
                    -   "value": "Broker Select Option",
                        
                    -   "specialServiceType": "BROKER\_SELECT\_OPTION",
                        
                    -   "customerIntegrationMode": "CUSTOM",
                        
                    -   "astraDescription": "BSO",
                        
                    -   "subType": "ACCESSIBLE",
                        
                    -   "ltlPaymentTerms":
                        
                        \[
                        
                        -   "COLLECT\_SECTION\_7\_SIGNED",
                            
                        -   "COLLECT"
                            
                        
                        \]
                        
                    
                    },
                    
                -   {
                    
                    -   "value": "International Mail Service",
                        
                    -   "specialServiceType": "INTERNATIONAL\_MAIL\_SERVICE",
                        
                    -   "customerIntegrationMode": "CUSTOM",
                        
                    -   "astraDescription": "IMS",
                        
                    -   "subType": "ACCESSIBLE",
                        
                    -   "ltlPaymentTerms":
                        
                        \[
                        
                        -   "COLLECT\_SECTION\_9\_SIGNED",
                            
                        -   "COLLECT"
                            
                        
                        \]
                        
                    
                    }
                    
                
                \],
                
            -   "alerts":
                
                \[
                
                -   {
                    
                    -   "code": "code",
                        
                    -   "alertType": "NOTE",
                        
                    -   "message": "alert message"
                        
                    
                    }
                    
                
                \]
                
            
            }
            
        
        \]
        
    
    }
    

}

## Error Codes

-   DRYICE.DESTINATIONLIMIT.EXCEEDS
    
    Dry Ice weight over limit of 2.5 Kg for destination.
    
-   DESTINATION.LOCATIONIDCHARACTER.REQUIRED
    
    Destination LocationId is required and must not exceed the limit of 5 characters.
    
-   SHIPMENT.SPECIALSERVICE.NOTALLOWED
    
    For {CARRIER\_CODE} carrier, {SPECIAL\_SERVICE\_TYPE} is not allowed because of violations that limit your shipping options.
    
-   ORIGINROUTINGCODE.POSTALCODE.DERIVED
    
    The routing code was derived from the postal code for the origin.
    
-   PACKAGE.PALLETWEIGHTALLOWANCE.INVALID
    
    Package {PACKAGE\_INDEX} - Pallet Weight Allowance cannot be entered at the package level.
    
-   CARRIAGEVALUE.EXCEEDS.CUSTOMVALUE
    
    The carriage value cannot exceed the customs value. The carriage value is optional. Please refer to the FedEx Service Guide.
    
-   COUNTRY.LOCATION.REQUIRED
    
    Select a Country/Location.
    
-   COUNTRY.POSTALCODEORZIP.INVALID
    
    Invalid postal code/ZIP for the country selected. Please correct and try again.
    
-   CURRENCY.TYPE.INVALID
    
    The currency type you selected is invalid. Please select another currency type.
    
-   DECLAREDVALUE.EXCEEDS.ERROR
    
    The maximum declared value is USD50,000. Contact FedEx Customer Service for more information.
    
-   DIMENSIONS.EXCEEDS.LIMITS
    
    Dimensions exceeds the maximum dimensions for this service. Please refer to the FedEx Service Guide.
    
-   FEDEXINTLEXPRESS.WEIGHT.BELOWSTANDARDLIMIT
    
    Your shipment weight is below minimum required.
    
-   POSTALCODE.ZIPCODE.REQUIRED
    
    Postal code/ZIP is required
    
-   SHIPPER.POSTALSTATE.MISMATCH
    
    Shipper Postal-State Mismatch. Please correct and try again.
    
-   SPECIAL.SERVICE.CONFLICT
    
    Special service conflict.Hold At Location is not valid with Residential Delivery.
    
-   COMMODITY.NUMBEROFPIECES.REQUIRED
    
    Commodity {COMMODITY\_INDEX} - Number of pieces is required and cannot be a negative value or exceed 9,999.
    
-   ADULTSIGNATURE.NOT.ALLOWED
    
    Adult Signature is not allowed.
    
-   ADULTSIGNATURE.SERVICESELECTED.NOTALLOWED
    
    Adult Signature is not allowed with the service selected.
    
-   AIRBILL.NOT.ALLOWED
    
    Airbill is not allowed.
    
-   ANCILLARYENDORSEMENT.TYPE.ERROR
    
    Ancillary endorsement type must be ADDRESS\_CORRECTION or RETURN\_SERVICE for PRESORTED\_STANDARD SmartPost shipment with USPS\_DELIVERY\_CONFIRMATION.
    
-   APPOINTMENT.DELIVERY.NOTNULL
    
    Appointment Delivery is not allowed.
    
-   APPOINTMENTDELIVERYCANNOT.SHIPMENTLEVEL.NOTENTERED
    
    Appointment Delivery cannot be entered at the shipment level.
    
-   APPOINTMENTDELIVERYIS.SERVICESELECTED.NOTALLOWED
    
    Appointment Delivery is not allowed with the service selected.
    
-   AVAILABILITY.CARGOLABLE.REQUIRED
    
    Missing Cargo Label.
    
-   AVAILABILITY.DESTINATIONCOUNTRY.NOTSERVED
    
    FedEx services are not available from this origin ZIP or postal code to this destination ZIP or postal code.
    
-   AVAILABILITY.DESTINATIONSTATE.REQUIRED
    
    State/Province is required
    
-   AVAILABILITYPACKAGE.WEIGHT.INVALID
    
    Package {PACKAGE\_INDEX} - An invalid weight was entered.
    
-   BATTERY.MATERIALTYPE.INVALID
    
    Package {PACKAGE\_INDEX} - BatteryMaterialType is invalid.
    
-   BLINDSHIPMENT.NOT.ALLOWED
    
    Blind Shipment is not allowed.
    
-   BROKER.ADDRESS.REQUIRED
    
    Service availability could not be obtained for FedEx Express services because Broker Select Option requires broker address.
    
-   BROKER.SELECTOPTION.NOTALLOWED
    
    Broker Select Option is not allowed.
    
-   BROKERCITYPOSTAL.LENGTH.ENTERED
    
    The length of the broker postal code exceeds the limit of 9 characters.
    
-   BROKERCITYPOSTAL.MUST.PROVIDED
    
    Broker city, postal code or location must be provided.
    
-   BROKERCOUNTRY.LENGTH.EXCEEDED
    
    The length of the broker country exceeds the limit of 2 characters.
    
-   BROKERLOCATION.LENGTH.EXCEEDED
    
    The length of the broker location exceeds the limit of 5 characters.
    
-   BROKERSELECT.SERVICE.NOTALLOWED
    
    Broker Select Option is not allowed with the service selected.
    
-   BROKERSTATEPROVINCE.LENGTH.EXCEEDED
    
    The length of the broker state or province exceeds the limit of 2 characters.
    
-   CADALLOWED.CURRENCYTYPE.INVALID
    
    The currency type you selected is invalid. Please select another currency type
    
-   CARRIERCODE.IS.INVALID
    
    CarrierCodeType {OPERATING\_COMPANY} is invalid or not supported.
    
-   COD.DELIVERYONACCEPTANCE.REQUIRED
    
    COD and/or DELIVERY\_ON\_ACCEPTANCE must be entered.
    
-   COD.SERVICE.NOTALLOWED
    
    COD is not allowed with the service selected.
    
-   COLLECTION.AMOUNT.REQUIRED
    
    COD collection amount is required and cannot be a negative value.
    
-   COLLECTION.CURRENCY.REQUIRED
    
    COD collection currency type is required and must be 3 characters.
    
-   COMMODITY.CURRENCYTYPE.REQUIRED
    
    Commodity {COMMODITY\_INDEX} - Customs value currency type is required and must be 3 characters.
    
-   COMMODITY.CUSTOMS.INVALID
    
    Commodity {COMMODITY\_INDEX} - Customs value is invalid.
    
-   COMMODITY.IS.INVALID
    
    Commodity is invalid.
    
-   COMMODITY.IS.REQUIRED
    
    Commodity is required.
    
-   COMMODITY.NAME.INVALID
    
    Commodity {COMMODITY\_NAME} is invalid.
    
-   COMMODITY.NAME.NOTALLOWED
    
    Commodity {COMMODITY\_NAME} is not allowed.
    
-   COMMODITY.NOT.ALLOWED
    
    Commodity is not allowed.
    
-   COMMODITY.NOT.NULL
    
    Commodity object cannot be null.
    
-   COMMODITY.VALUE.REQUIRED
    
    Commodity {COMMODITY\_INDEX} - Commodity is required.
    
-   COMMODITYCURRENCY.CUSTOMS.INVALID
    
    Commodity {COMMODITY\_INDEX} - Invalid currency for customs.
    
-   CONVENIENCE.MPS.NOTALLOWED
    
    Convenience MPS is not allowed for this request.
    
-   CURRENCY.MAX.DECLAREDVALUE
    
    The maximum declared value is {CURRENCY\_TYPE}{CURRENCY\_AMOUNT}. Contact FedEx Customer Service for more information.
    
-   CURRENCYTYPE.INSURED.REQUIRED
    
    Currency type for Insured Value is required.
    
-   CURRENCYTYPE.PACKAGES.MUST
    
    Customs Value currency type must be the same for all packages.
    
-   CURRENCYTYPE.TOTALCUSTOMS.INVALID
    
    Invalid currency type for total customs value.
    
-   CURRENCYTYPE.TOTALINSURED.INVALID
    
    Invalid currency type for total insured value.
    
-   CURRENCYTYPE.USDCAD.INVALID
    
    Invalid currency type for validation. Only USD or CAD is allowed.
    
-   CUSTOMER.HAZARDOUS.NOTELIGIBLE
    
    Customer is not eligible for Hazardous Materials Dangerous Goods.
    
-   CUSTOMER.INTERNATIONALDDFREIGHT.NOTELIGIBLE
    
    Customer not eligible for International DirectDistribution Freight.
    
-   CUSTOMER.INTERNATIONALECONOMYDISTRIBUTION.NOTELIGIBLE
    
    Customer not eligible for International Economy Distribution.
    
-   CUSTOMER.INTERNATIONALPRIORITYDISTRIBUTION.NOTELIGIBLE
    
    Customer not eligible for International Priority Distribution.
    
-   CUSTOMER.PRIORITYALERT.NOTELIGIBLE
    
    Customer not eligible for Priority Alert.
    
-   CUSTOMER.SMARTPOST.NOTELIGIBLE
    
    Customer not eligible for SmartPost.
    
-   CUSTOMER.SMARTPOSTRETURNS.NOTELIGIBLE
    
    Customer not eligible for SmartPost Returns.
    
-   CUSTOMER.THIRDPARTYCONSIGNEE.NOTELIGIBLE
    
    Customer not eligible for Third Party Consignee.
    
-   CUSTOMERSMARTPOST.INDICIA.NOTENTERED
    
    Customer not eligible for the SmartPost indicia entered.
    
-   CUSTOMS.CLEARANCE.NOTNULL
    
    CustomsClearanceDetail object cannot be null.
    
-   CUSTOMS.IS.INVALID
    
    Enter a numeric value for customs value
    
-   CUSTOMS.IS.REQUIRED
    
    Enter a numeric value for customs value.
    
-   CUSTOMSVALUE.LIMIT.EXCEEDED
    
    Customs Value exceeds limit of {CURRENCY\_AMOUNT} {CURRENCY\_TYPE}.
    
-   CUTFLOWERES.NOT.ALLOWED
    
    Cut Flowers is not allowed.
    
-   CUTFLOWERSIS.SERVICESELECTED.NOTALLOWED
    
    Cut Flowers is not allowed with the service selected.
    
-   DANGEROUS.GOODSACCESSIBILITY.INVALID
    
    Dangerous goods accessibility type is invalid.
    
-   DANGEROUS.GOODSACCESSIBILITY.REQUIRED
    
    Dangerous goods accessibility type is required and cannot be null.
    
-   DANGEROUSGOODS.ACCESSIBLILITYTYPE.INVALID
    
    Package {PACKAGE\_INDEX} - Dangerous goods accessibility type is invalid.
    
-   DANGEROUSGOODS.ACCESSIBLILITYTYPE.NOTNULLREQUIRED
    
    Package {PACKAGE\_INDEX} - Dangerous goods accessibility type is required and cannot be null.
    
-   DANGEROUSGOODS.HAZARDOUS.INVALID
    
    Package {PACKAGE\_INDEX} - Dangerous goods hazardous commodity option type is invalid.
    
-   DANGEROUSGOODS.MUST.ENTERED
    
    Dangerous Goods must be entered on all packages.
    
-   DANGEROUSGOODS.NOTNULL.REQUIRED
    
    Package {PACKAGE\_INDEX} - Dangerous goods hazardous commodity option type is required and cannot be null.
    
-   DANGEROUSGOODSIS.NHESELECTED.ALLOWED
    
    Dangerous Goods is not allowed with the service selected.
    
-   DANGEROUSGOODSIS.SHIPMENT.NOTENTERED
    
    Dangerous Goods cannot be entered at the shipment level for the service selected.
    
-   DANGEROUSGOODSTYPE.PACKAGES.NOTDIFFERENT
    
    The Dangerous Goods type cannot be different across packages.
    
-   DATE.FORMAT.REQUIRED
    
    The date is required. Format is CCYY-MM-DD.
    
-   DATE.IS.INVALID
    
    Invalid Date.
    
-   DECLAREDVALUE.MAXEXCEEDS.ERROR
    
    The maximum declared value is {1}{0}. Contact FedEx Customer Service for more information.
    
-   DELIVERY.DATE.SELECTVALID
    
    Please select a valid Date Certain delivery date : {DATE\_1}; {DATE\_2}; {DATE\_3}; {DATE\_4}; {DATE\_5}; {DATE\_6}; {DATE\_7}; {DATE\_8}; {DATE\_9}; {DATE\_10}; {DATE\_11}
    
-   DERIVEDRECOMMENDED.SIGNATUREOPTION.NOTAPPLICABLE
    
    Derived and/or recommended signature options are not applicable.
    
-   DESTINATION.CITY.INVALID
    
    Invalid ZIP/Postal code.
    
-   DESTINATION.CITY.REQUIRED
    
    City is required
    
-   DESTINATION.POSTAL.REQUIRED
    
    Postal code/ZIP is required
    
-   DESTINATION.POSTALCITY.MISMATCH
    
    The Destination Postal Code is not valid for the Destination City entered. Please verify the information and try again.
    
-   DESTINATION.POSTALCODE.EXCEEDED
    
    Invalid postal code/ZIP for the country selected. Please correct and try again
    
-   DESTINATION.SERVICETYPE.NOTALLOWED
    
    FedEx services are not available from this origin ZIP or postal code to this destination ZIP or postal code.
    
-   DESTINATION.STATECODE.INVALID
    
    Invalid destination state code.
    
-   DESTINATIONSTATE.PROVINCE.EXCEEDED
    
    The length of the destination state or province exceeds the limit of 2 characters.
    
-   DIM.MEASURE.SAME
    
    Dim unit of measure must be the same for all packages.
    
-   DIMENSIONS.EXCEEDS.MAXIMUM
    
    Dimensions exceeds the maximum dimensions for this service. Please refer to the FedEx Service Guide.
    
-   DIRECT.SIGNATURE.NOTALLOWED
    
    Direct Signature is not allowed.
    
-   DIRECTSIGNATURE.SERVICESELECTED.NOTALLOWED
    
    Direct Signature is not allowed with the service selected.
    
-   DOCUMENTSHIPMENT.SPECIALSERVICETYPE.NOTALLOWED
    
    {SPECIAL\_SERVICE\_TYPE} is not allowed with a document shipment.
    
-   DRIICE.PACKAGE.REQUIRED
    
    Dry Ice package count is required and cannot be a negative value.
    
-   DROP.OFFTYPE.INVALID
    
    Invalid drop off type.
    
-   DROP.OFFTYPE.NOTALLOWED
    
    Drop off type is not allowed.
    
-   DROPOFFTYPE.NULLOREMPTY.REQUIRED
    
    The drop off type is required and cannot be null or empty.
    
-   DROPOFFTYPE.SERVICE.INVALID
    
    Invalid drop off type for service selected.
    
-   DRY.ICE.NOTALLOWED
    
    Dry Ice is not allowed.
    
-   DRYICE.SHIPMENT.NOTENTERED
    
    Dry Ice cannot be entered at the shipment level.
    
-   EAST.COASTSPECIAL.NOTALLOWED
    
    East Coast Special is not allowed.
    
-   ELECTRONIC.TRADEDOCUMENTS.NOT
    
    Electronic Trade Documents is not allowed.
    
-   EXCLUSIVEUSE.NOT.ALLOWED
    
    Exclusive Use is not allowed.
    
-   EXCLUSIVEUSE.SERVICESELECTED.NOTALLOWED
    
    Exclusive Use is not allowed with the service selected.
    
-   EXHIBITION.DELIVERY.NOTALLOWED
    
    Exhibition Delivery is not allowed.
    
-   EXHIBITIONPICKUP.NOT.ALLOWED
    
    Exhibition Pickup is not allowed.
    
-   EXHIBITIONPICKUP.SERVICESELECTED.NOTALLOWED
    
    Exhibition Pickup is not allowed with the service selected.
    
-   EXPFREIGHT.NOT.MIXED
    
    Express and Freight packages cannot be mixed in the same shipment.
    
-   EXPRESS.SERVICE.INVALID
    
    FedEx services are not available from this origin ZIP or postal code to this destination ZIP or postal code.
    
-   EXPSERVICEORIGIN.PICKUP.NOTALLOWED
    
    The origin does not allow pickup for Express services.
    
-   EXPSERVICEORIGIN.SERVED.NOTALLOWED
    
    The origin is not served for Express services.
    
-   EXTRALABOR.SERVICESELECTED.NOTALLOWED
    
    Extra Labor is not allowed with the service selected.
    
-   FLATBET.TRAILER.NOTALLOWED
    
    Flatbed Trailer is not allowed.
    
-   FORM.ID.INVALID
    
    Invalid form ID.
    
-   FREIGHT.GUARANTEETYPE.NOTALLOWED
    
    The Freight Guarantee Type is not allowed for the service selected.
    
-   FREIGHT.SERVICES.INVALID
    
    There are no valid freight services available.
    
-   FREIGHT.VALUETYPE.INVALID
    
    An invalid Freight On Value type was entered.
    
-   FREIGHTGUARANTEE.ORIGINDEST.NOTALLOWED
    
    The Freight Guarantee Type is not allowed for the origin/destination pair.
    
-   FREIGHTGUARANTEE.TIMEVALUE.INVALID
    
    Invalid Freight Guarantee time value.
    
-   FRIEGHT.GUARANTEE.NOTALLOWED
    
    Freight Guarantee is not allowed.
    
-   FRIEGHTSERVICEORIGIN.FRIEGHT.NOTALLOWED
    
    The origin is not served for Freight services.
    
-   FRIEGHTSERVICEORIGIN.PICKUP.NOTALLOWED
    
    The origin does not allow pickup for Freight services.
    
-   GROUND.SERVICES.INVALID
    
    There are no valid FedEx Ground services available as weight exceeds allowed limit.
    
-   GROUPPACKAGE.COUNTATLEAST.ONE
    
    Package {PACKAGE\_INDEX} – Group package count must be at least a value of 1.
    
-   HAZARDOUS.MATERIALS.NOTALLOWED
    
    Hazardous Materials Dangerous Goods is not allowed with the service selected.
    
-   HOLD.SATURDAY.NOTALLOWED
    
    Hold Saturday is not allowed.
    
-   HOLDALLOWED.SERVICE.NCATIONISSELECTED
    
    Hold At Location is not allowed with the service selected.
    
-   HOLDAT.LOCATION.NOTALLOWED
    
    Hold At Location is not allowed with Residential Delivery.
    
-   HOLDLOCATION.NOT.ALLOWED
    
    Hold at Location is not allowed.
    
-   HOLIDAYGUARANTEE.NOT.ALLOWED
    
    Holiday Guarantee is not allowed.
    
-   HOLIDAYGUARANTEE.SERVICESELECTED.NOTALLOWED
    
    Holiday Guarantee is not allowed with the service selected.
    
-   HOME.DELIVERY.NOTALLOWED
    
    Home Delivery Premium Appointment is not allowed with the service selected.
    
-   HOME.DELIVERYDATE.FORMAT
    
    The format for Home Delivery Date Certain delivery date is CCYY-MM-DD.
    
-   HOME.DELIVERYPREMIUM.INVALID
    
    Home Delivery premium type is invalid.
    
-   HOMEDELIVERY.SERVICE.NOTALLOWED
    
    Home Delivery Premium is not allowed with the service selected.
    
-   HOMEDELIVERYPREMIUM.REQUIRED.INVALID
    
    Home Delivery premium type is required and cannot be null.
    
-   HOMEDELIVERYPREMIUM.REQUIRED.NOTNULL
    
    HomeDeliveryPremiumDetail object cannot be null.
    
-   INACCESSIBLE.DANGEROUSGOODS.NOTALLOWED
    
    Inaccessible Dangerous Goods is not allowed.
    
-   INACCESSIBLEALLOWED.DANGEROUSSELECTED.NOTALLOWED
    
    Inaccessible Dangerous Goods is not allowed with the service selected.
    
-   INDIRECT.SIGNATURE.NOTALLOWED
    
    Indirect Signature is not allowed.
    
-   INDIRECTSIGNATURE.SERVICESELECTED.NOTALLOWED
    
    Indirect Signature is not allowed with the service selected.
    
-   INSIDE.DELIVERY.NOTALLOWED
    
    Inside Delivery is not allowed.
    
-   INSIDE.PICKUP.NOTALLOWED
    
    Inside Pickup is not allowed.
    
-   INSIDEDELIVERYIS.NHESELECTED.NOTALLOWED
    
    Inside Delivery is not allowed with the service selected.
    
-   INSIDEPICKUPIS.NSELECTED.NOTALLOWED
    
    Inside Pickup is not allowed with the service selected.
    
-   INSURED.NOT.NEGATIVE
    
    Enter a numeric value for declared/carriage value
    
-   INSUREDVALUE.CUSTOMSVALUE.EQUALS
    
    Raw/The type of currency used for insurance value must be the same type used for customs value.
    
-   INTL.CONTEXPORT.NOTALLOWED
    
    Intl Controlled Export Service is not allowed.
    
-   INTL.MAILSERVICE.NOTALLOWED
    
    Intl Mail Service is not allowed.
    
-   LENGHTSTATE.PROVINCE.EXCEEDED
    
    The length of the state or province exceeds the limit of 2 characters.
    
-   LIFTGATE.DELIVERY.NOTALLOWED
    
    Liftgate Delivery is not allowed.
    
-   LIFTGATE.PICKUP.NOTALLOWED
    
    Liftgate Pickup is not allowed.
    
-   LIMITEDACCESS.DELIVERY.NOTALLOWED
    
    Limited Access Delivery is not allowed.
    
-   LIMITEDACCESS.PICKUP.NOTALLOWED
    
    Limited Access Pickup is not allowed.
    
-   LINEAR.UNITS.ONLYINCM
    
    Package {PACKAGE\_INDEX} - Only "IN" and "CM" are valid values for LinearUnits.
    
-   LINEARUNITS.INCM.NOTNULL
    
    Only "IN" and "CM" are valid values for LinearUnits.
    
-   LITHIUMBATTERY.DANGEROUSGOODS.EXCEPTION
    
    Package {PACKAGE\_INDEX} - Lithium Battery Exception Dangerous Goods is not allowed for the origin/destination pair.
    
-   LITHIUMFEDEXTAG.CONFLICT.EXCEPTION
    
    Package {PACKAGE\_INDEX} - Special service conflict. Lithium Battery Exception Dangerous Goods is not valid with Return Shipment FedEx Tag.
    
-   MARKING.TAGGING.NOTALLOWED
    
    Marking or Tagging is not allowed.
    
-   MAX.DECLARED.VALUEUSDFIFTY
    
    Package {PACKAGE\_INDEX} - Insured Value exceeds limit allowed.
    
-   MAXIMUM.WEIGHT.EXCEEDS
    
    Package {PACKAGE\_INDEX} - Please select a valid Date Certain delivery date : {DATE\_1}; {DATE\_2}; {DATE\_3}; {DATE\_4}; {DATE\_5}; {DATE\_6}; {DATE\_7}; {DATE\_8}; {DATE\_9}; {DATE\_10}; {DATE\_11}
    
-   MAXIMUMSPECIAL.SERVICE.ALLOWED
    
    The maximum special services allowed is 6.
    
-   MIN.WEIGHT.REQUIRED
    
    We are unable to process this request. Please try again later or contact FedEx Customer Service.
    
-   NONBUSINESSTIME.NOT.ALLOWED
    
    Non Business Time is not allowed.
    
-   NONBUSINESSTIME.SERVICE.NOTALLOWED
    
    Non Business Time is not allowed with the service selected.
    
-   NUMBEROF.COMMODITY.REQUIRED
    
    Commodity number of pieces is required and cannot be a negative value or exceed 9,999.
    
-   ORIGIN.AIRPORTID.REQUIRED
    
    The origin airport Id is required and must be 3 characters.
    
-   ORIGIN.CITY.INVALID
    
    Invalid ZIP/Postal code.
    
-   ORIGIN.CITY.REQUIRED
    
    City is required
    
-   ORIGIN.POBOX.ZIP
    
    Origin P.O. Box Zip.
    
-   ORIGIN.POSTAL.REQUIRED
    
    Postal code/ZIP is required
    
-   ORIGIN.POSTALCODE.EXCEEDED
    
    Invalid postal code/ZIP for the country selected. Please correct and try again
    
-   ORIGIN.SERVICETYPE.NOTALLOWED
    
    FedEx services are not available from this origin ZIP or postal code to this destination ZIP or postal code.
    
-   ORIGIN.STATECODE.INVALID
    
    Invalid origin state code.
    
-   ORIGIN.STATEPROVINCE.EXCEEDED
    
    State/Province is required
    
-   ORIGINCOUNTRY.INVALID.ENTERED
    
    An invalid origin country was entered.
    
-   ORIGINDESTINATION.COD.NOTALLOWED
    
    COD is not allowed for the origin/destination pair.
    
-   ORIGINZIPTO.DESTZIP.NOTALLOWED
    
    FedEx services are not available from this origin ZIP or postal code to this destination ZIP or postal code.
    
-   ORIGN.STATE.REQUIRED
    
    State/Province is required
    
-   PACKAE.COD.ENTERED
    
    COD must be entered on all packages.
    
-   PACKAGE.ACCESSIBLEDANGEROUSGOODS.NSALLOWED
    
    Package {PACKAGE\_INDEX} - Accessible Dangerous Goods is not allowed with the service selected.
    
-   PACKAGE.ACCESSIBLEDANGEROUSGOODS.NSDANGEROUS
    
    Package {PACKAGE\_INDEX} - Accessible Dangerous Goods is not allowed.
    
-   PACKAGE.ADULT.NOTNULL
    
    Package {PACKAGE\_INDEX} - Adult Signature is not allowed.
    
-   PACKAGE.ADULTSIGNATURE.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Adult Signature is not allowed with the service selected.
    
-   PACKAGE.APPOINTMENT.NOTNULL
    
    Package {PACKAGE\_INDEX} - Appointment Delivery is not allowed.
    
-   PACKAGE.APPOINTMENTDELIVERY.NOTNULL
    
    Package {PACKAGE\_INDEX} - Appointment Delivery is not allowed with the service selected.
    
-   PACKAGE.BROKERSELECTOPTION.NALALLOWED
    
    Package {PACKAGE\_INDEX} - Broker Select Option is not allowed with the service selected.
    
-   PACKAGE.BROKERSELECTOPTION.NOTENTERED
    
    Package {PACKAGE\_INDEX} - Broker Select Option cannot be entered at the package level for the service selected.
    
-   PACKAGE.CERTAINDATE.REQUIRED
    
    Package {PACKAGE\_INDEX} - Insured value exceeds limit of {CURRENCY\_AMOUNT} {CURRENCY\_TYPE}.
    
-   PACKAGE.COD.COLLECTIONTYPE
    
    Package {PACKAGE\_INDEX} - COD collection type is invalid.
    
-   PACKAGE.CODAMOUNT.COLLECTIONTYPE
    
    Package {PACKAGE\_INDEX} - COD amount is not within the limits for this collection type.
    
-   PACKAGE.CODAMOUNT.CURRENCYTYPE
    
    Package {PACKAGE\_INDEX} - COD collection currency type is required and must be 3 characters.
    
-   PACKAGE.CODAMOUNT.NEGATIVEVALUE
    
    Package {PACKAGE\_INDEX} - COD collection amount is required and cannot be a negative value.
    
-   PACKAGE.CODCOLLECTION.NOTDIFFERENT
    
    The COD collection type cannot be different across packages.
    
-   PACKAGE.CODDETAIL.NOTNULL
    
    Package {PACKAGE\_INDEX} - CodDetail object cannot be null.
    
-   PACKAGE.CODNOTNULL.REQUIRED
    
    Package {PACKAGE\_INDEX} - COD collection type is required and cannot be null.
    
-   PACKAGE.CODREMITTANCE.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - COD Remittance is not allowed with the service selected.
    
-   PACKAGE.CODREMITTANCE.NOTNULL
    
    Package {PACKAGE\_INDEX} - COD Remittance cannot be entered at the package level.
    
-   PACKAGE.CODSERVICE.NOTENTERED
    
    Package {PACKAGE\_INDEX} - COD cannot be entered at the package level for the service selected.
    
-   PACKAGE.COUNTVERIFICATION.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Piece Count Verification is not allowed.
    
-   PACKAGE.CURRENCYTYPEINSURED.REQUIRED
    
    Package {PACKAGE\_INDEX} - Currency type for Insured Value is required.
    
-   PACKAGE.CUT.NOTNULL
    
    Package {PACKAGE\_INDEX} - Cut Flowers is not allowed.
    
-   PACKAGE.CUTFLOWERS.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Cut Flowers is not allowed with the service selected.
    
-   PACKAGE.CUTFLOWERS.NOTNULL
    
    Package {PACKAGE\_INDEX} - Cut Flowers cannot be entered at the package level.
    
-   PACKAGE.DANGEROUSGOODS.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Inaccessible Dangerous Goods is not allowed.
    
-   PACKAGE.DIRECT.NOTNULL
    
    Package {PACKAGE\_INDEX} - Direct Signature is not allowed.
    
-   PACKAGE.DIRECTSIGNATURE.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Direct Signature is not allowed with the service selected.
    
-   PACKAGE.DRY.NOTNULL
    
    Package {PACKAGE\_INDEX} - Dry Ice is not allowed.
    
-   PACKAGE.DRYICEWEIGHT.NERLIMIT
    
    Package {PACKAGE\_INDEX} - Dry Ice weight over limit of 2.5 Kg for destination.
    
-   PACKAGE.DRYICEWEIGHT.NOTNEGATIVE
    
    Package {PACKAGE\_INDEX} - Dry Ice weight (in kilograms) is required and cannot be a negative value with Dry Ice special service.
    
-   PACKAGE.EASTCOASTSPECIAL.NOTENTERED
    
    Package {PACKAGE\_INDEX} - East Coast Special cannot be entered at the package level.
    
-   PACKAGE.ELECTRONICTRADEDOCUMENTS.NANNOTENTERED
    
    Package {PACKAGE\_INDEX} - Electronic Trade Documents cannot be entered at the package level.
    
-   PACKAGE.EMAILNOTIFICATION.NOTNULL
    
    Package {PACKAGE\_INDEX} - Email Notification cannot be entered at the package level.
    
-   PACKAGE.ENVELOPENOT.EXCEEDED
    
    Enter a numeric value for weight
    
-   PACKAGE.EXHIBITIONDELIVERY.NOTENTERED
    
    Package {PACKAGE\_INDEX} - Exhibition Delivery cannot be entered at the package level.
    
-   PACKAGE.EXTRALABOR.REQUIRED
    
    Package {PACKAGE\_INDEX} – Extra Labor cannot be entered at the package level.
    
-   PACKAGE.EXTREMELENGTH.NOTENTERED
    
    Package {PACKAGE\_INDEX} - Extreme Length cannot be entered at the package level.
    
-   PACKAGE.FLATBEDTRAILER.NOTENTERED
    
    Package {PACKAGE\_INDEX} - Flatbed Trailer cannot be entered at the package level.
    
-   PACKAGE.FRIEGHTGAURANTEE.NOTENTERED
    
    Package {PACKAGE\_INDEX} - Freight Guarantee cannot be entered at the package level.
    
-   PACKAGE.FUTUREDAYSHIPMENT.NOTENTERED
    
    Package {PACKAGE\_INDEX} - Future Day Shipment cannot be entered at the package level.
    
-   PACKAGE.HAZARDOUS.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Hazardous Materials Dangerous Goods is not allowed with the service selected.
    
-   PACKAGE.HOLD.NOTNULL
    
    Package {PACKAGE\_INDEX} - Hold Saturday is not allowed.
    
-   PACKAGE.HOLDATLOCATION.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Hold At Location is not allowed.
    
-   PACKAGE.HOLDATLOCATION.NOTENTERED
    
    Package {PACKAGE\_INDEX} - Hold At Location cannot be entered at the package level.
    
-   PACKAGE.HOMEDELIVERYPREMIUM.NENTERED
    
    Package {PACKAGE\_INDEX} - Home Delivery Premium cannot be entered at the package level.
    
-   PACKAGE.HOMEDELIVERYPREMIUM.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Home Delivery Premium is not allowed with the service selected.
    
-   PACKAGE.INACCESSIBLEDANGEROUSGOODS.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Inaccessible Dangerous Goods is not allowed with the service selected.
    
-   PACKAGE.INDIRECT.NOTNULL
    
    Package {PACKAGE\_INDEX} - Indirect Signature is not allowed.
    
-   PACKAGE.INDIRECTSIGNATURE.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Indirect Signature is not allowed with the service selected.
    
-   PACKAGE.INSIDEDELIVERY.NOTNULL
    
    Package {PACKAGE\_INDEX} - Inside Delivery cannot be entered at the package level.
    
-   PACKAGE.INSIDEPICKUP.NOTNULL
    
    Package {PACKAGE\_INDEX} - Inside Pickup cannot be entered at the package level.
    
-   PACKAGE.INTLCONT.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Intl Controlled Export Service is not allowed.
    
-   PACKAGE.INTLMAILSERVICE.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Intl Mail Service is not allowed.
    
-   PACKAGE.LIFTGATEDELIVERY.NOTNULL
    
    Package {PACKAGE\_INDEX} - Liftgate Delivery cannot be entered at the package level.
    
-   PACKAGE.LIFTGATEPICKUP.NOTNULL
    
    Package {PACKAGE\_INDEX} - Liftgate Pickup cannot be entered at the package level.
    
-   PACKAGE.LIMITEDACCESSDELIVERY.NOTENTERED
    
    Package {PACKAGE\_INDEX} - Limited Access Delivery cannot be entered at the package level.
    
-   PACKAGE.LIMITEDACCESSPICKUP.NENTERED
    
    Package {PACKAGE\_INDEX} - Limited Access Pickup cannot be entered at the package level.
    
-   PACKAGE.NONSTANDARDCONTAINER.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Non Standard Container is not allowed with the service selected.
    
-   PACKAGE.NULLOREMPTY.REQUIRED
    
    The packaging is required and cannot be null or empty.
    
-   PACKAGE.PAKNOT.EXCEEDED
    
    Enter a numeric value for weight
    
-   PACKAGE.PENDINGCOMPLETE.NOTENTERED
    
    Package {PACKAGE\_INDEX} - Pending Complete cannot be entered at the package level.
    
-   PACKAGE.PENDINGSHIPMENT.NOTENTERED
    
    Package {PACKAGE\_INDEX} - Pending Shipment cannot be entered at the package level.
    
-   PACKAGE.PIECECOUNTVERIFICATION.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Piece Count Verification is not allowed with the service selected.
    
-   PACKAGE.PORTDELIVERY.NOTNULL
    
    Package {PACKAGE\_INDEX} - Port Delivery cannot be entered at the package level.
    
-   PACKAGE.PORTPICKUP.NOTNULL
    
    Package {PACKAGE\_INDEX} - Port Pickup cannot be entered at the package level.
    
-   PACKAGE.RETURNSHIPMENT.NOTNULL
    
    Package {PACKAGE\_INDEX} - Return Shipment cannot be entered at the package level.
    
-   PACKAGE.SATURDAY.NOTNULL
    
    Package {PACKAGE\_INDEX} - Saturday Delivery is not allowed.
    
-   PACKAGE.SATURDAYDELIVERY.NOTNULL
    
    Package {PACKAGE\_INDEX} - Saturday Delivery cannot be entered at the package level.
    
-   PACKAGE.SATURDAYPICKUP.NOTNULL
    
    Package {PACKAGE\_INDEX} - Saturday Pickup cannot be entered at the package level.
    
-   PACKAGE.SERVICETYPE.INVALID
    
    Package {PACKAGE\_INDEX} - Special service {SPECIAL\_SERVICE\_TYPE} is invalid.
    
-   PACKAGE.SORTANDSEGREGATE.NOTNULL
    
    Package {PACKAGE\_INDEX} - Sort and Segregate cannot be entered at the package level.
    
-   PACKAGE.SPECIALEQUIPMENT.NOTENTERED
    
    Package {PACKAGE\_INDEX} - Special Equipment cannot be entered at the package level.
    
-   PACKAGE.SPECIALSERVICE.CONFLICT
    
    Package {PACKAGE\_INDEX} - Special service conflict.
    
-   PACKAGE.STANDARDCONTAINER.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Non Standard Container is not allowed.
    
-   PACKAGE.STORAGE.NOTENTERED
    
    Package {PACKAGE\_INDEX} - Storage cannot be entered at the package level.
    
-   PACKAGE.THIRDPARTYCONSIGNEE.NENTERED
    
    Package {PACKAGE\_INDEX} - Third Party Consignee cannot be entered at the package level.
    
-   PACKAGE.THIRDPARTYCONSIGNEE.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Third Party Consignee is not allowed.
    
-   PACKAGE.TOO.LARGE
    
    Package {PACKAGE\_INDEX} - Package is too large.
    
-   PACKAGE.WEIGHTNOT.NULL
    
    Enter a numeric value for weight
    
-   PACKAGE.WEIGHTUNITS.NOTEXCEEDED
    
    Package {PACKAGE\_INDEX} - {PACKAGING\_TYPE} cannot exceed the limit of {WEIGHT} {WEIGHT\_UNITS}.
    
-   PACKAGECOD.SERVICE.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - COD is not allowed with the service selected.
    
-   PACKAGECURRENCY.INSURED.INVALID
    
    Package {PACKAGE\_INDEX} - Invalid currency for insured value.
    
-   PACKAGECURRENCY.IS.SAME
    
    Currency type must be the same for all packages.
    
-   PACKAGEDRYICE.SERVICESELECTED.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Dry Ice is not allowed with the service selected.
    
-   PACKAGEDRYICE.WEIGHT.NOTNULL
    
    Package {PACKAGE\_INDEX} - Dry Ice weight is required and cannot be null.
    
-   PACKAGEEXPORT.NOT.ENTERED
    
    Package {PACKAGE\_INDEX} - Intl Controlled Export Service cannot be entered at the package level.
    
-   PACKAGEHOLDATLOCATION.SERVICESELECTED.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Hold At Location is not allowed with the service selected.
    
-   PACKAGEHOME.DELIVERY.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Home Delivery Premium Appointment is not allowed with the service selected.
    
-   PACKAGEHOME.DELIVERYDATE.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Home Delivery Premium Date Certain is not allowed with the service selected.
    
-   PACKAGEING.AVAILABLE.INVALID
    
    No valid packaging available.
    
-   PACKAGEINSURED.NOT.NEGATIVE
    
    Enter a numeric value for declared/carriage value
    
-   PACKAGELEVEL.USPSDELIVERY.ERROR
    
    Package {PACKAGE\_INDEX} - USPS Delivery cannot be entered at the package level.
    
-   PACKAGELEVEL.USPSPICKUP.ERROR
    
    Package {PACKAGE\_INDEX} - USPS Pickup cannot be entered at the package level.
    
-   PACKAGELEVEL.WEIGHING.ERROR
    
    Package {PACKAGE\_INDEX} - Weighing cannot be entered at the package level.
    
-   PACKAGES.GROUNDTAG.EXCEEDED
    
    Total packages cannot exceed 99 for FedEx Ground Tag.
    
-   PACKAGESERVICE.EASTCOASTSPECIAL.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - East Coast Special is not allowed with the service selected.
    
-   PACKAGESERVICEEAST.COASTSPECIAL.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - East Coast Special is not allowed.
    
-   PACKAGESERVICEHOME.DELIVERYEVENING.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Home Delivery Premium Evening is not allowed with the service selected.
    
-   PACKAGESHIPMENT.SPECIAL.ENTERED
    
    Shipment special service entered at package level.
    
-   PACKAGESIGNATURE.OPTIONDETAIL.NOTNULL
    
    Package {PACKAGE\_INDEX} - SignatureOptionDetail object cannot be null.
    
-   PACKAGESIGNATURE.OPTIONTYPE.INVALID
    
    Package {PACKAGE\_INDEX} - Signature option type is invalid.
    
-   PACKAGESIGNATURE.OPTIONTYPE.NOTNULLREQUIRED
    
    Package {PACKAGE\_INDEX} - Signature option type is required and cannot be null.
    
-   PACKAGETHIRDPARTYCONSIGNEE.SERVICESELECTED.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Third Party Consignee is not allowed with the service selected.
    
-   PACKAGEWEIGHT.UNITS.SAME
    
    Weight unit of measure must be the same for all packages.
    
-   PACKAGING.IS.NOTALLOWED
    
    Packaging is not allowed.
    
-   PALLET.SERVICE.NOTALLOWED
    
    Pallet Weight Allowance is not allowed with the service selected.
    
-   PALLET.WEIGHTALLOWANCE.NOTALLOWED
    
    Pallet Weight Allowance is not allowed.
    
-   PALLETSHRINKWRAPIS.SERVICESELECTED.NOTALLOWED
    
    Pallet Shrinkwrap is not allowed with the service selected.
    
-   PALLETSPROVIDED.NOT.ALLOWED
    
    Pallets Provided is not allowed.
    
-   PALLETSPROVIDED.SELECTED.NOTALLOWED
    
    Pallets Provided is not allowed with the service selected.
    
-   PENDING.SHIPMENTDETAIL.NOTNULL
    
    PendingShipmentDetail object cannot be null.
    
-   PENDING.SHIPMENTTYPE.INVALID
    
    Pending shipment type is invalid.
    
-   PENDINGSHIPMENTDETAIL.NOTNULL.REQUIRED
    
    Pending shipment type is required and cannot be null.
    
-   PERMIT.NOT.ALLOWED
    
    Permit is not allowed.
    
-   PERMIT.SERVICE.NOTALLOWED
    
    Permit is not allowed with the service selected.
    
-   PIECE.COUNTVERIFICATION.NOTALLOWED
    
    Piece Count Verification is not allowed.
    
-   PIECECOUNT.SERVICE.NOTALLOWED
    
    Piece Count Verification is not allowed with the service selected.
    
-   PIECEENTERED.SHIPMENT.NTLEVEL
    
    Piece Count Verification cannot be entered at the shipment level.
    
-   POBOXES.NOT.ALLOWED
    
    FedEx does not provide services from or to P.O. Boxes.
    
-   PORT.PICKUP.NOTALLOWED
    
    Port Pickup is not allowed.
    
-   PORTDELIVERY.NOT.ALLOWED
    
    Port Delivery is not allowed.
    
-   PORTDELIVERY.SELECTED.NOTALLOWED
    
    Port Delivery is not allowed with the service selected.
    
-   PORTPICKUPIS.NERVICESELECTED.ALLOWED
    
    Port Pickup is not allowed with the service selected.
    
-   POSTAL.CODE.EXCEEDED
    
    Invalid postal code/ZIP for the country selected. Please correct and try again
    
-   PREDELIVERY.NOTIFICATION.NOTALLOWED
    
    Pre Delivery Notification is not allowed.
    
-   PRIORITY.OVERNIGHT.NOTALLOWED
    
    Priority Overnight is not allowed since the shipment contains commercial value.
    
-   PRODUCT.REQUEST.NOTNULL
    
    ValidateProductRequest object cannot be null.
    
-   PROTECTION.FREEZING.NOTALLOWED
    
    Protection From Freezing is not allowed.
    
-   REMITANCE.COD.NOTALLOWED
    
    COD Remittance is not allowed with the service selected.
    
-   REQUESTEDPACKAGE.LINEITEM.NOTNULLOREMPTY
    
    RequestedPackageLineItem object cannot be null or empty.
    
-   REQUESTEDSHIPMENT.OBJECTCANNOT.NULL
    
    RequestedShipment object cannot be null.
    
-   RESIDENTIAL.DELIVERY.NOTALLOWED
    
    Residential Delivery is not allowed.
    
-   RESIDENTIAL.PICKUP.NOTALLOWED
    
    Residential Pickup is not allowed.
    
-   RETURN.SHIPMENT.REQUIRED
    
    RETURN\_SHIPMENT is required for the indicia PARCEL\_RETURN.
    
-   RETURN.SHIPMENTDETAIL.NOTNULL
    
    ReturnShipmentDetail object cannot be null.
    
-   RETURN.TYPE.INVALID
    
    Return type is invalid.
    
-   RETURN.TYPE.REQUIRED
    
    Return type is required and cannot be null.
    
-   RETURNSHIPMENT.EMAILLABLE.NOTALLOWED
    
    Return Shipment Email Label is not allowed with the service selected.
    
-   RETURNSHIPMENT.PRINTLABLE.NOTALLOWED
    
    Return Shipment Printed Label is not allowed with the service selected.
    
-   RETURNSHIPMENTEMAILLABLE.ORIGINDESTINATION.NOTALLOWED
    
    Return Shipment Email Label is not allowed for the origin/destination pair.
    
-   RETURNSHIPMENTIS.SERVICESELECTED.NOTALLOWED
    
    Return Shipment is not allowed with the service selected.
    
-   SATURDAY.DELIVERY.NOTALLOWED
    
    Saturday Delivery is not allowed.
    
-   SATURDAY.PICKUP.NOTALLOWED
    
    Saturday Pickup is not allowed.
    
-   SATURDAYDELIVERY.SERVICESELECTED.NOTALLOWED
    
    Saturday Delivery is not allowed with the service selected.
    
-   SATURDAYPICKUPIS.SERVICESELECTED.NOTALLOWED
    
    Saturday Pickup is not allowed with the service selected.
    
-   SERVICE.COD.NOTENTERED
    
    COD cannot be entered at the shipment level for the service selected.
    
-   SERVICE.DANGEROUSSELECTED.ACCESSIBLEALLOWED
    
    Accessible Dangerous Goods is not allowed with the service selected.
    
-   SERVICE.IS.INVALID
    
    FedEx services are not available from this origin ZIP or postal code to this destination ZIP or postal code.
    
-   SERVICE.IS.REQUIRED
    
    Enter a numeric value for weight
    
-   SERVICECONFLICT.COD.INVALID
    
    Special service conflict. COD is not valid with Return Shipment Email Label.
    
-   SERVICECONFLICT.PRIORITY.INVALID
    
    Special service conflict. Priority Alert is not valid with Return Shipment Email Label.
    
-   SERVICEEAST.COASTSPECIAL.NOTALLOWED
    
    East Coast Special is not allowed with the service selected.
    
-   SERVICEEXHIBITION.DELIVERY.NOTALLOWED
    
    Exhibition Delivery is not allowed with the service selected.
    
-   SERVICEFLATBET.TRAILER.NOTALLOWED
    
    Flatbed Trailer is not allowed with the service selected.
    
-   SERVICEFRIEGHT.GUARANTEE.NOTALLOWED
    
    Freight Guarantee is not allowed with the service selected.
    
-   SERVICEHOME.DELIVERYDATE.NOTALLOWED
    
    Home Delivery Premium Date Certain is not allowed with the service selected.
    
-   SERVICEHOME.DELIVERYEVENING.NOTALLOWED
    
    Home Delivery Premium Evening is not allowed with the service selected.
    
-   SERVICEINTL.CONTEXPORT.NOTALLOWED
    
    Intl Controlled Export Service is not allowed with the service selected.
    
-   SERVICEINTL.MAILSERVICE.NOTALLOWED
    
    Intl Mail Service is not allowed with the service selected.
    
-   SERVICELIFTGATE.DELIVERY.NOTALLOWED
    
    Liftgate Delivery is not allowed with the service selected.
    
-   SERVICELIFTGATE.PICKUP.NOTALLOWED
    
    Liftgate Pickup is not allowed with the service selected.
    
-   SERVICELIMITEDACCESS.DELIVERY.NOTALLOWED
    
    Limited Access Delivery is not allowed with the service selected.
    
-   SERVICELIMITEDACCESS.PICKUP.NOTALLOWED
    
    Limited Access Pickup is not allowed with the service selected.
    
-   SERVICEPACKAGE.INSIDEPICKUP.NOTALLOWED
    
    Inside Pickup is not allowed with the service selected for Package {PACKAGE\_INDEX}. Please update and try again.
    
-   SERVICEPACKAGE.INTLMAILSERVICE.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Intl Mail Service is not allowed with the service selected.
    
-   SERVICEPACKAGE.PRIORITYALERT.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Priority Alert is not allowed with the service selected.
    
-   SERVICEPACKAGE.SATURDAYDELIVERY.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Saturday Delivery is not allowed with the service selected.
    
-   SERVICEPACKAGE.SATURDAYPICKUP.NOTALLOWED
    
    Saturday Pickup is not allowed with the service selected for package {PACKAGE\_INDEX}. Please update and try again.
    
-   SERVICEPREDELIVERY.NOTIFICATION.NOTALLOWED
    
    Pre Delivery Notification is not allowed with the service selected.
    
-   SERVICEPROTECTION.FREEZING.NOTALLOWED
    
    Protection From Freezing is not allowed with the service selected.
    
-   SERVICEREGINOL.MAILDELIVERY.NOTALLOWED
    
    Regional Mall Delivery is not allowed with the service selected.
    
-   SERVICEREGINOL.MAILPICKUP.NOTALLOWED
    
    Regional Mall Pickup is not allowed with the service selected.
    
-   SHIPDATE.HOLIDAY.ERROR
    
    Ship date cannot be Saturday, Sunday or Holiday.
    
-   SHIPMENT.CALLTAG.NOTALLOWED
    
    Return Shipment Voice Call Tag is not allowed with the service selected.
    
-   SHIPMENT.DATEFORMAT.REQUIRED
    
    The ship date is required. Format is YYYY-MM-DDThh:mm:ssTZD.
    
-   SHIPMENT.TAG.NOTALLOWED
    
    Return Shipment FedEx Tag is not allowed with the service selected.
    
-   SHIPMENTASSEMBLY.NOT.ALLOWED
    
    Shipment Assembly is not allowed.
    
-   SHIPMENTASSEMBLY.SELECTED.NOTALLOWED
    
    Shipment Assembly is not allowed with the service selected.
    
-   SHIPPINGOPTIONVIOLATIONS.SERVICETYPE.NOTALLOWED
    
    {SERVICE\_TYPE} service is not allowed because of {SPECIAL\_SERVICE\_TYPE} violations that limit your shipping options.
    
-   SIGNATURE.OPTION.INVALID
    
    There are no valid signature options
    
-   SIGNATURE.OPTIONDETAIL.NOTNULL
    
    SignatureOptionDetail object cannot be null.
    
-   SIGNATURE.OPTIONTYPE.INVALID
    
    Signature option type is invalid.
    
-   SIGNATUREOPTION.MUST.ENTERED
    
    Signature Option must be entered on all packages.
    
-   SIGNATUREOPTION.REQUEST.REQUIRED
    
    GetAllSignatureOptionsRequest cannot be null.
    
-   SIGNATUREOPTIONTYPE.NOTNULL.REQUIRED
    
    Signature option type is required and cannot be null.
    
-   SIGNTUAREOPTIONCANNOT.SIGNATURELEVEL.ENTERED
    
    Signtuare Option cannot be entered at the shipment level.
    
-   SMALLQUANTITY.DANGEROUSGOODS.NOTALLOWED
    
    Package {PACKAGE\_INDEX} - Small Quantity Exception Dangerous Goods is not allowed for the origin/destination pair.
    
-   SMARTPOST.ANCILLARYENDORSEMENT.INVALID
    
    SmartPost ancillary endorsement is invalid.
    
-   SMARTPOST.INDICIA.INVALID
    
    SmartPost indicia is invalid.
    
-   SMARTPOST.INDICIA.REQUIRED
    
    SmartPost indicia is required and cannot be null.
    
-   SMARTPOST.SERVICES.INVALID
    
    There are no valid SmartPost services available.
    
-   SMARTPOST.SHIPMENTDETIAL.NOTNULL
    
    SmartPostShipmentDetail object cannot be null.
    
-   SMARTPOSTHUBID.NOTNULL.REQUIRED
    
    SmartPost hub id is required and cannot be null.
    
-   SMARTPOSTINSURED.NOT.ALLOWED
    
    Insured Value is not allowed for SmartPost.
    
-   SMARTPOSTPACKAGE.MINDIM.ENTERED
    
    Package {PACKAGE\_INDEX} - Minimum dimensions of {DIMENSIONS\_VALUE\_1} x {DIMENSIONS\_VALUE\_2} x {DIMENSIONS\_VALUE\_3} {DIMENSIONS\_UNITS} must be entered for SmartPost.
    
-   SORTSEGREGATE.NOT.ALLOWED
    
    Sort and Segregate is not allowed.
    
-   SORTSEGREGATE.SERVICE.NOTALLOWED
    
    Sort and Segregate is not allowed with the service selected.
    
-   SPECIAL.ALCOHOL.INVALID
    
    Package {PACKAGE\_INDEX} - Special service conflict. Alcohol is not valid with Inaccessible Dangerous Goods.
    
-   SPECIAL.CODREMITTANCE.INVALID
    
    Special service conflict. COD Remittance is not valid with Return Shipment Email Label.
    
-   SPECIAL.SERVICE.INVALID
    
    FedEx services are not available from this origin ZIP or postal code to this destination ZIP or postal code.
    
-   SPECIAL.SERVICE.MISSING
    
    Special service is missing. {FAILURE\_CAUSE}
    
-   SPECIAL.SUNDAYDELIVERY.INVALID
    
    Special service conflict. Sunday Delivery is not valid with Hold At Location.
    
-   SPECIALEQUIPMENT.NOT.ALLOWED
    
    Special Equipment is not allowed.
    
-   SPECIALEQUIPMENT.SELECTED.NOTALLOWED
    
    Special Equipment is not allowed with the service selected.
    
-   SPECIALSERVICCONFLICT.RETURNSHIPMENTPRINTED.INVALID
    
    Special service conflict. COD is not valid with Return Shipment Printed Label.
    
-   SPECIALSERVICE.ALCOHOL.SIGOPTTYPE.INVALID
    
    Package {PACKAGE\_INDEX} - Special service conflict. Alcohol is not valid with Signature Option type.
    
-   SPECIALSERVICE.CODREMITTFEDEXTAG.INVALID
    
    Special service conflict. COD Remittance is not valid with Return Shipment FedEx Tag.
    
-   SPECIALSERVICE.CODREMITTPRINTEDLABLE.INVALID
    
    Special service conflict. COD Remittance is not valid with Return Shipment Printed Label.
    
-   SPECIALSERVICE.CONFLICT.INVALID
    
    Special service conflict. COD is not valid with COD Remittance.
    
-   SPECIALSERVICE.CONFLICTRETURNSHIPMENT.INVALID
    
    Special service conflict. COD is not valid with Return Shipment FedEx Tag.
    
-   SPECIALSERVICE.DELIVERYHOLDAT.INVALID
    
    Special service conflict. Inside Delivery is not valid with Hold At Location.
    
-   SPECIALSERVICE.IS.INVALID
    
    Special service is invalid.
    
-   SPECIALSERVICE.PRIORITYALERT.INVALID
    
    Special service conflict. Priority Alert is not valid with COD.
    
-   SPECIALSERVICE.PRIORITYALERTCODREMITT.INVALID
    
    Special service conflict. Priority Alert is not valid with COD Remittance.
    
-   SPECIALSERVICE.PRIORITYALERTFEDEXTAG.INVALID
    
    Special service conflict. Priority Alert is not valid with Return Shipment FedEx Tag.
    
-   SPECIALSERVICE.PRIORITYALERTPRINTEDLABLE.INVALID
    
    Special service conflict. Priority Alert is not valid with Return Shipment Printed Label.
    
-   SPECIALSERVICETYPE.NOT.ALLOWED
    
    {0} is not provided at the origin point.
    
-   SPECIALSERVICETYPE.NOT.AVAILABLE
    
    This special service type {SPECIAL\_SERVICE\_TYPE} is not available for {SERVICE\_TYPE}.
    
-   SPECIALSERVICETYPE.ORIGINDESTINATION.NOTALLOWED
    
    {SPECIAL\_SERVICE\_TYPE} is not allowed for the origin/destination pair.
    
-   SPECIALSERVICETYPE.PACKAGE.NOTENTERED
    
    Package {PACKAGE\_INDEX} - {SPECIAL\_SERVICE\_TYPE} cannot be entered at the package level.
    
-   SPECIALSERVICETYPE.RESTRICTED.ENTERED
    
    {SPECIAL\_SERVICE\_TYPE} is restricted in combination with the Freight Guarantee Type entered.
    
-   SPECIALSERVICETYPE.SERVICE.NOTALLOWED
    
    {SPECIAL\_SERVICE\_TYPE} is not allowed with the service selected.
    
-   SPECIALSERVICEVIOLATIONS.ACCOUNT.DISABLED
    
    For {CARRIER\_CODE} carrier, your account has {SPECIAL\_SERVICE\_TYPE} violations. Your account could be disabled for this special service if any further violations occur.
    
-   STATE.POSTALCODE.NOTFOUND
    
    State Postal Code mismatch
    
-   STORAGE.NOT.ALLOWED
    
    Storage is not allowed.
    
-   STORAGE.SERVICE.NOTALLOWED
    
    Storage is not allowed with the service selected.
    
-   THIRD.PARTYCONSIGNEE.NOTALLOWED
    
    Third Party Consignee is not allowed.
    
-   THIRDPARTYCONSIGNEE.SERVICESELECTED.NOTALLOWED
    
    Third Party Consignee is not allowed with the service selected.
    
-   TOTALPACKAGE.WEIGHTNOT.EXCEEDED
    
    Enter a numeric value for weight
    
-   USDALLOWED.CURRENCYTYPE.INVALID
    
    The currency type you selected is invalid. Please select another currency type
    
-   USPS.DELIVERY.NOTALLOWED
    
    USPS Delivery is not allowed.
    
-   USPS.PICKUP.NOTALLOWED
    
    USPS Pickup is not allowed.
    
-   USPSDELIVERY.SERVICE.NOTALLOWED
    
    USPS Delivery is not allowed with the service selected.
    
-   USPSPICKUP.SERVICE.NOTALLOWED
    
    USPS Pickup is not allowed with the service selected.
    
-   WEIGHT.INVALID.ENTERED
    
    An invalid origin country was entered.
    
-   WEIGHT.NOT.NULL
    
    Weight object cannot be null.
    
-   WEIGHT.UNITS.ONLYLBKG
    
    Package {PACKAGE\_INDEX} - Only "LB" and "KG" are valid values for WeightUnits.
    
-   WEIGHTUNITS.LBKG.NOTNULL
    
    Only "LB" and "KG" are valid values for WeightUnits.
    
-   PACKAGING.NOT.ALLOWED
    
    Packaging is not allowed.
    
-   ACCOUNT.VALIDATION.ERROR
    
    We are unable to process this request. Please try again later or contact FedEx Customer Service.
    
-   SHIPDATESTAMP.FORMAT.INVALID
    
    Please provide a valid shipDatestamp format YYYY-MM-DD
    
-   UNAUTHORIZED.USAGE
    
    new msg: UNAUTHORIZED.USAGE key should be valid
    
-   INTERNAL.SERVER.ERROR
    
    We encountered an unexpected error and are working to resolve the issue. We apologize for any inconvenience. Please check back at a later time.
    
-   DECLAREDVALUECUSTOMSVALUE.CURRENCYTYPE.MISMATCH
    
    The declared value currency type must match the customs value currency type for package {PACKAGE\_INDEX}. Please update and try again.
    
-   ORIGINROUTINGCODE.POSTALCODE.ERROR
    
    The routing code was derived from the postal code for the origin.
    
-   ORIGINSTATE.PROVINCECODE.CHANGED
    
    The origin state/province code has been changed.
    
-   POSTAL.COUNTRY.MISMATCH
    
    Postal code and country codes are not matching.
    
-   CARRIERCODE.INVALID.ENTERED
    
    An invalid or null CarrierCodeType was entered. Please update and try again.
    
-   CITY.SERVICE.VALIDATIONERROR
    
    Service was validated at the country level, but might not be valid for the actual intended city for the origin. Please update and try again.
    
-   COMMITMENT.SERVICE.ERROR
    
    Commitment cannot be obtained for service {SERVICE\_TYPE}. Please update and try again.
    
-   COMMODITIES.REQUEST.REQUIRED
    
    Commodities request is required. Please update and try again.
    
-   CUSTOMER.SERVICETYPE.NOTELIGIBLE
    
    Customer not eligible for {SERVICE\_TYPE}. Please update and try again.
    
-   DANGEROUSGOODS.DRYICE.NOTALLOWED
    
    {SERVICE\_TYPE} service is not allowed because of dangerous goods or dry ice violations that limit your shipping options. Please update and try again.
    
-   DELIVERYSHIPMENT.FEDEXHOME.REQUIRED
    
    FedEx Ground and FedEx Home Delivery shipments may require one additional day in transit to your destination zip code. Please update and try again.
    
-   DESTINATION.ADDRESS.REQUIRED
    
    Address object for the destination is required. Please update and try again.
    
-   DESTINATION.COUNTRYAIRBILL.NOTALLOWED
    
    Airbill is not allowed for the Destination Country. Please update and try again.
    
-   DESTINATIONCOUNTRY.CODE.CHANGED
    
    The destination country code has been changed.
    
-   DESTINATIONCOUNTRY.INVALID.ENTERED
    
    An invalid destination country was entered. Please update and try again.
    
-   FREIGHTELIGIBILITY.IS.REQUIRED
    
    Freight eligibility is required. Please update and try again.
    
-   HOMEDELIVERY.PREMIUM.NOTAVAILABLE
    
    FedEx Home Delivery premium services are not available to this destination. Please update and try again.
    
-   HOMEDELIVERY.SATURDAY.NOTAVAILABLE
    
    FedEx Home Delivery Saturday service is not available to destination zip code. Please update and try again.
    
-   HOMEDELIVERY.SERVICECODE.REQUIRED
    
    Home delivery service code is required. Please update and try again.
    
-   INSUREDVALUE.AMOUNT.EXCEEDED
    
    The declared value amount has exceed total customs value amount for package {PACKAGE\_INDEX}. Please update and try again.
    
-   MAXIMUM.WEIGHTEXCEEDS.ERROR
    
    Package weight exceeds maximum for requested service/packaging in Commodity {COMMODITY\_INDEX}. Please update and try again.
    
-   METHODOFPAYMENT.REQUIRED
    
    Duties Payor Account Number is required with THIRD\_PARTY as payment type. Please update and try again.
    
-   ORIGIN.POSTALCITY.MISMATCH
    
    There is a mismatch with Origin Postal code and City. Please update and try again.
    
-   PACKAGE.DECLAREDVALUE.EXCEEDED
    
    Package {PACKAGE\_INDEX} - Declared value exceeds limit of {CURRENCY\_AMOUNT} {CURRENCY\_TYPE} for the packaging type.
    
-   PACKAGE.INSIDE.NOTALLOWED
    
    Inside Delivery is not allowed for package {PACKAGE\_INDEX}. Please update and try again.
    
-   PACKAGE.INSIDEPICKUP.NOTALLOWED
    
    Inside Pickup is not allowed for package {PACKAGE\_INDEX}. Please update and try again.
    
-   PACKAGE.PALLETSPROVIDED.REQUIRED
    
    Pallets Provided cannot be entered at the package level for package {PACKAGE\_INDEX}. Please update and try again.
    
-   PACKAGE.SATURDAYPICKUP.NOTALLOWED
    
    Saturday Pickup is not allowed for package {PACKAGE\_INDEX}. Please update and try again.
    
-   PACKAGE.SHIPMENTASSEMBLY.REQUIRED
    
    Shipment Assembly cannot be entered at the package level for package {PACKAGE\_INDEX}. Please update and try again.
    
-   PALLETSHRINKWRAPIS.NOT.ALLOWED
    
    Pallet Shrinkwrap is not allowed. Please update and try again.
    
-   PACKAGESPECIALSERVICCONFLICTALCOHOL.RETURNSHIPMENTTYPE.INVALID
    
    Special service conflict where Alcohol is not valid with Return Shipment type for package {PACKAGE\_INDEX}. Please update and try again.
    
-   PACKAGETYPE.DECLAREDVALUE.EXCEEDED
    
    Declared value exceeds limit of {CURRENCY\_AMOUNT} {CURRENCY\_TYPE} for package {PACKAGE\_INDEX}. Please update and try again.
    
-   SERVICE.PACKAGECOMBINATION.INVALID
    
    Invalid service and packaging combination. Please update and try again.
    
-   VALIDDATE.IS.REQUIRED
    
    Valid date is required. Please update and try again.
    
-   SPECIAL.SERVICE.REQUIRED
    
    Special Service is required. Please update and try again.
    
-   SMARTPOST.HUBID.INVALID
    
    Smart Post Hub ID is invalid. Please update and try again.
    
-   SHIPDATE.IS.CHANGED
    
    The shipdate has been changed for commitment purposes.
    
-   SERVICEOPTIONTYPE.INCOMPATIBLE.ERROR
    
    The service option type {SERVICE\_OPTION\_TYPE} was incompatible with the request. Please update and try again.
    
-   SERVICEPACKAGE.INSIDEDELIVERY.NOTALLOWED
    
    Inside Delivery is not allowed with the service selected for package {PACKAGE\_INDEX}. Please update and try again.
    
-   SERVICES.OPTIONTYPE.INVALID
    
    Service option type {SERVICE\_OPTION\_TYPE} is invalid. Please update and try again.
    
-   SERVICETYPE.IS.INVALID
    
    Service {SERVICE\_TYPE} is invalid. Please update and try again.
    
-   USERDETAIL.NOT.REQUIRED
    
    We are unable to process this request. Please try again later or contact FedEx Customer Service.
    

    

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