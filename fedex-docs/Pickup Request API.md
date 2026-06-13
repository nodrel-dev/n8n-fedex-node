# FedEx APIs and Developer Portal

    

 [![ Sign Up or Log In](https://developer.fedex.com/api/content/dam/fedex-com/irc/leftnav/login-icon_white.svg) Sign Up or Log In](#)

---

[](https://www.fedex.com/en-ca/developer.html)

# 

Pickup Request API

[DOWNLOAD JSON SCHEMA](blob:https://developer.fedex.com/2d91c925-3723-4748-aa8a-5cd8b3d98be7)

-   Introduction-   Pickup Request API Details-   How Pickup Request API works-   Business Rules-   JSON API Collection

-   Error Codes

### Introduction

The Pickup Request API allows you to check for pickup availability, schedule a courier to pick up, and cancel a pickup request.

The Pickup Request API is applicable for new or previously processed packages across all regions for FedEx Express and FedEx Ground (return and outbound) shipments. This detailed guide will get you up to speed and teach you everything you need to know about Pickup Request API.

### Pickup Request API Details

The following are the key features associated with the Pickup Request API:

**Pickup Availability**

With pickup availability, you can check the availability of the pickup service based on the input request. The pickup availability depends on two factors: the cutoff time and the access time.

**Cutoff time** - The latest allowed time for a pickup to be scheduled. The time is local to the pickup postal code.

**Access time** - The time between the pickup ready time (when the package is ready to be picked up) and the time when the driver is ready to pick up the package.

**Create Pickup**  

This option allows you to schedule a pickup and applies to FedEx Express® and FedEx Ground® domestic and international shipments. The FedEx Ground and Express pickup request API returns a pickup confirmation number and additionally location code is returned with Express pickup request for the scheduled pickup. You can also schedule pickup for a return shipment using this API.

Additional recipient address line (Address line 3) allows you to provide more complete and accurate location details to achieve faster delivery of FedEx Express® shipments. You can save your time and effort by scheduling a FedEx courier to pick up shipments from your location or from another location at an extra charge.  

**Cancel Pickup**  

This option allows you to cancel a previously scheduled pickup. This option applies to FedEx Express and FedEx Ground domestic and international shipments. FedEx Express domestic and International pickups can be cancelled on the same day. FedEx Ground domestic and international shipments will be available for cancellation 24 hrs. after the pickup request is submitted. If your shipment has already been picked-up, please contact FedEx Customer Service at 800 FedEx (800 3339) to proceed with the cancellation.

**Pickup Request Details**  

FedEx Express Pickup Requests  

-   The time that your packages will be ready to be picked up must be no later than the postal code cutoff time for your location.
-   The length of time from when your packages will be ready to the time at which the courier will no longer be able to enter the premises to pick up the packages must be no less than the “access time,” which can also be retrieved with the Pickup Availability request.

For example: ‘PT4H0M’ indicates the pickup time is 4 hours and 0 minutes.

-   FedEx Express pickups can be scheduled for the current or next business day.
-   If you already have a regular scheduled pickup, it is not necessary to schedule a one-time pickup or add another regular scheduled pickup.
-   You cannot change a pickup request. To change a request, you must cancel the original request and enter a new request.
-   FedEx systems now support domestic UK Pickup functionality.

FedEx Ground Pickup Requests

-   Pickup can be scheduled for the next business day or any business day up to 2 weeks in advance.
-   If you already have a regular scheduled pickup, it is not necessary to schedule a one-time pickup or add another regular scheduled pickup.
-   Pickup at a residential address is available for an additional surcharge.
-   You cannot change a pickup request. To change a request, you must cancel the original request and enter a new request.

**Pickup Request API Service Types**

FedEx Express Pickup

A courier pickup charge applies when you request a FedEx Express Pickup, including requests made through fedex.com and FedEx Customer Service.

FedEx Ground Pickup

FedEx Ground provides pickup service upon request for an additional charge. For regular scheduled pickup customers, we assess the weekly pickup fee to the account number associated with the regular scheduled pickup.

-   For customers that do not have a regular scheduled pickup, we assess a per-package on-call pickup charge. On-call pickup charges do not apply if you drop off your package at a FedEx shipping location. Additionally, on-call pickup charges do not apply to FedEx Ground® Economy (Formerly known as FedEx SmartPost®) Print Return Label, FedEx Ground® Economy (Formerly known as FedEx SmartPost®) Email Return Label and FedEx Ground® Package Returns Program pickups.
-   For regular scheduled pickup customers, FedEx Ground provides pickup service upon request from an address other than the shipping location of the FedEx Ground account number. An additional alternate address pickup charge per unique address per week is applicable for this service.

FedEx Extra Hours

FedEx Extra Hours services are available for pickup with overnight 1-day transit Monday through Friday, enabling retailers to fulfill evening orders with FedEx Express next-day local delivery.

For more information on available services, visit fedex.com.

### How Pickup Request API works

Following are the pickup options available with Pickup Request API:

**Check Pickup Availability**

Use this endpoint to request available pickup schedule details.

The key input information associated with this request are:

-   Pickup address/postal details.
-   Pickup request type (ex: same day/future day).
-   FedEx transportation carrier for pickup (ex: express/ground).
-   Whether or not domestic/international pickup.

The successful response to this request will return available pickup schedule details, such as the cutoff time of the pickup, pickup date, access time for the pickup, default ready time, and other pickup availability scheduled details. It also returns errors and the descriptions in case of any failures.

**Create Pickup**

Use this endpoint to create a pickup request for a package to be picked up.

The key input information associated with this request are:

-   FedEx account number, which will be invoiced for the pickup.
-   Origin details (address, location and pickup address type such as account/shipper/other).
-   FedEx transportation carrier for pickup (express/ground).
-   Address details for the associated account.

The successful pickup request will return a pickup confirmation number, pickup notification and location code for the pickup being scheduled. It also returns errors and the descriptions in case of any failures.

**Cancel Pickup**

Use this request to cancel an already scheduled pickup request for a package.

The key input information associated with this request are:

-   Pickup Confirmation Code (obtained while submitting a pickup request)
-   FedEx transportation carrier for pickup (Express/Ground)
-   Scheduled Date (Date the pickup dispatch occurs)
-   Location (FedEx Express location responsible for processing the pickup request)

The successful pickup cancellation will return a confirmation number and a pickup cancellation confirmation message. It also returns errors and the descriptions in case of any failures.

_Note: Submit the pickup confirmation number and the corresponding location code (only applies to FDXE)to cancel the pickup that was scheduled. Pickup confirmation number and the corresponding location code (only applies to FDXE) information are obtained while submitting a pickup request. A failure notification will be sent if you attempt to cancel a pickup after the FedEx courier has been dispatched to the pickup location_

### Business Rules 

-   To request a pickup for a different country, include the country element with the appropriate country code where you would like FedEx to pick up your shipment.
-   FedEx returns a dispatch confirmation number for a successful dispatch request. Dispatch requests should be limited to one request per day unless you add packages that exceed the dimensions or weight for the original request.
-   Dispatch requests may fail if you enter an insufficient time window between package ready and business close. If you have questions about pickup times, contact your regional FedEx Support Hotline.
-   Pickup Request API supports weight types as ″LB″ and ″KG″. The unit of weight for package and the commodity should be same else the request will result into error.
-   If you need to schedule a pickup for both FedEx Express (including intra-Mexico shipping) and FedEx Ground packages, you are required to schedule one pickup for each of the carriers individually.
-   If your pickup location is in a remote area, make sure your packages are ready earlier to accommodate remote pickup schedule.
-   Always include the latest time your package can be picked up (or your company’s close time).
-   Saturday pickup service is offered in select locations worldwide for your FedEx Express packages. Saturday dropoff is also available at many FedEx locations. Use the Locations Service endpoint to receive a list of Saturday dropoff locations.
-   For FedEx Ground and FedEx Express pickups, you may request an alternate pickup address other than the shipping location attached to your FedEx account number.
-   If you want a regular FedEx Express or FedEx Ground pickup service, contact your FedEx account executive.
-   You may cancel a FedEx Express or FedEx Ground pickup only if:
    -   The request package ready time has not already been met, and
    -   Courier has not been dispatched.

### JSON API Collection

Explore our JSON API collection to see how we can deliver on your business needs. Test your integration with these sample requests.

[Learn more about sandbox virtualization guide](https://developer.fedex.com/api/en-ca/guides/sandboxvirtualization.html)

[Documentation Powered by ReDoc](https://github.com/Redocly/redoc)

# Pickup Request API (1.0.0)

## [](#operation/Create Pickup)Create Pickup

Use this endpoint to create a pickup request for a package.  
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

-   Full\_Schema\_Create\_Pickup
-   Create\_Pickup\_Ground
-   Create\_Pickup\_Express
-   MinimumSamplePayload-ExpressFreightPickup

associatedAccountNumber

required

object (AccountNumber)

This is the FedEx account number.  
Example: Your account number

originDetail

required

object

The origin address if different than the one associated with the shipper account. This element value is required when the package is to be picked up from an address other than the shipper account address.

associatedAccountNumberType

string

This enumeration represents a kind of legacy account number from a FedEx operating entity for the account number associated to the pickup.  
Valid values are: FEDEX\_EXPRESS  
FEDEX\_GROUND  

totalWeight

object

Specify The total weight of the packages for the pickup. Unit of measure is LB.

packageCount

integer <int32>

Specify the total number of packages for the pickup.  
Example: 5

carrierCode

required

string

Enum: "FDXE" "FDXG"

Specify the four letter code of a FedEx operating company that meets your requirements.  
Examples of FedEx Operating Comapnies are :

-   FDXE- FedEx Express
-   FDXG- FedEx Ground

requestedExpressPickupDetail

object (RequestedExpressPickupDetail)

accountAddressOfRecord

object

The city name, state or province code and the address classification associated with the customer account which requested the pickup.

remarks

string

Placeholder for any message to be passed to the FedEx pickup courier.  
Note:Maximum length is 60 characters.  
Example: Please ring bell at loading dock.

countryRelationships

string

Enum: "DOMESTIC" "INTERNATIONAL"

Describes the country relationship among the shipments being picked up. This element is not mandatory for this request, but when added, the mandatory values are DOMESTIC or INTERNATIONAL. Empty or incorrect values will result in to errors.

pickupType

string

Indicate the pickup type method by which the shipment to be tendered to FedEx.  
_Note: The value of this element does not specify dispatching the courier for package pickup._  
Example: ON\_CALL, PACKAGE\_RETURN\_PROGRAM, REGULAR\_STOP  
Click here for more information on Pickup Types.

trackingNumber

string

This is a Tracking number for FedEx packages used for tracking a single package or group of packages.  
Example: 795803657326  
Click here to see mock tracking numbers for FedEx Express and FedEx Ground.

commodityDescription

string

Description of the commodity being shipped.  
Example:This field contains Commodity Description.  
Click here to see Vague commodity descriptions

expressFreightDetail

object

Placeholder for Express Freight pickup details.

oversizePackageCount

integer <int32>

Specify the number of oversize packages that are tendered to FedEx Ground.

pickupNotificationDetail

object

This object allows user to request for pickup confirmation email. User can specify upto 5 email addresses.

pickupChargesPayment

object

Specifies how the pickup charges will be paid.

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

post /pickup/v1/pickups

Sandbox Server

https://apis-sandbox.fedex.com/pickup/v1/pickups

Production Server

https://apis.fedex.com/pickup/v1/pickups

### Request samples - Create Pickup

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

Full\_Schema\_Create\_Pickup

Copy

Expand all Collapse all

{

-   "associatedAccountNumber":
    
    {
    
    -   "value": "Your account number"
        
    
    },
    
-   "originDetail":
    
    {
    
    -   "pickupAddressType": "ACCOUNT",
        
    -   "pickupLocation":
        
        {
        
        -   "contact":
            
            {
            
            -   "companyName": "Fedex",
                
            -   "personName": "John Taylor",
                
            -   "phoneNumber": "7194446666",
                
            -   "phoneExtension": "phone extension"
                
            
            },
            
        -   "address":
            
            {
            
            -   "streetLines":
                
                \[
                
                -   "123 Ship Street",
                    
                -   "Suite 302"
                    
                
                \],
                
            -   "urbanizationCode": "URB FAIR OAKS",
                
            -   "city": "Memphis",
                
            -   "stateOrProvinceCode": "TN",
                
            -   "postalCode": "38017",
                
            -   "countryCode": "US",
                
            -   "residential": false,
                
            -   "addressClassification": "MIXED"
                
            
            },
            
        -   "accountNumber":
            
            {
            
            -   "value": "XXX289837"
                
            
            },
            
        -   "deliveryInstructions": "deliveryInstructions"
            
        
        },
        
    -   "readyDateTimestamp": "2020-04-02T11:00:00Z",
        
    -   "customerCloseTime": "18:00:00",
        
    -   "pickupDateType": "SAME\_DAY",
        
    -   "packageLocation": "FRONT",
        
    -   "buildingPart": "APARTMENT",
        
    -   "buildingPartDescription": "111",
        
    -   "earlyPickup": false,
        
    -   "suppliesRequested": "Supplies requested by customer",
        
    -   "geographicalPostalCode": "geographicalPostalCode"
        
    
    },
    
-   "associatedAccountNumberType": "FEDEX\_GROUND",
    
-   "totalWeight":
    
    {
    
    -   "units": "KG",
        
    -   "value": 20
        
    
    },
    
-   "packageCount": 5,
    
-   "carrierCode": "FDXE",
    
-   "requestedExpressPickupDetail":
    
    {
    
    -   "serviceType": "FEDEX\_FREIGHT\_PRIORITY"
        
    
    },
    
-   "accountAddressOfRecord":
    
    {
    
    -   "streetLines":
        
        \[
        
        -   "123 Ship Street"
            
        
        \],
        
    -   "city": "Memphis",
        
    -   "stateOrProvinceCode": "TN",
        
    -   "postalCode": "38017",
        
    -   "countryCode": "US",
        
    -   "residential": false,
        
    -   "addressClassification": "MIXED"
        
    
    },
    
-   "remarks": "Please ring bell at loading dock.",
    
-   "countryRelationships": "DOMESTIC",
    
-   "pickupType": "ON\_CALL, PACKAGE\_RETURN\_PROGRAM, REGULAR\_STOP.",
    
-   "trackingNumber": "795803657326",
    
-   "commodityDescription": "This field contains CommodityDescription",
    
-   "expressFreightDetail":
    
    {
    
    -   "truckType": "DROP\_TRAILER\_AGREEMENT",
        
    -   "service": "FEDEX\_1\_DAY\_FREIGHT",
        
    -   "trailerLength": "TRAILER\_28\_FT",
        
    -   "bookingNumber": "1234AGTT",
        
    -   "dimensions":
        
        {
        
        -   "length": 20,
            
        -   "width": 15,
            
        -   "height": 12,
            
        -   "units": "CM"
            
        
        }
        
    
    },
    
-   "oversizePackageCount": 2,
    
-   "pickupNotificationDetail":
    
    {
    
    -   "emailDetails":
        
        \[
        
        -   {
            
            -   "address": "sample@gmail.com",
                
            -   "locale": "en\_US"
                
            
            }
            
        
        \],
        
    -   "format": "HTML",
        
    -   "userMessage": "This is the user message"
        
    
    },
    
-   "pickupChargesPayment":
    
    {
    
    -   "paymentType": "ACCOUNT",
        
    -   "payor":
        
        {
        
        -   "responsibleParty":
            
            {
            
            -   "accountNumber":
                
                {
                
                -   "value": "XXXXXX789",
                    
                -   "key": "d53b8011d262ae762da1c9a5a71XXXXX"
                    
                
                }
                
            
            }
            
        
        },
        
    -   "payorType": "SENDER"
        
    
    },
    
-   "version":
    
    {
    
    -   "major": "1",
        
    -   "minor": "1",
        
    -   "patch": "1"
        
    
    }
    

}

### Response samples - Create Pickup

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
    
    -   "pickupConfirmationCode": "3001",
        
    -   "location": "COSA",
        
    -   "alerts":
        
        \[
        
        -   {
            
            -   "code": "SHIP.RECIPIENT.POSTALCITY.MISMATCH",
                
            -   "alertType": "NOTE",
                
            -   "message": "Recipient Postal-City Mismatch."
                
            
            }
            
        
        \]
        
    
    }
    

}

## [](#operation/Check Pickup Availability)Check Pickup Availability

Use this endpoint to check the availability of a pickup service.  
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

-   Full\_Schema\_Pickup\_Availability
-   Check\_Pickup\_Availability\_Domestic\_Express
-   Check\_Pickup\_Availability\_Domestic\_Ground
-   Check\_Pickup\_Availability\_International\_Express

pickupAddress

required

object (PickupAddress)

Specify the address for which pickup availability inquiry has been made.

dispatchDate

string

Specify the date the package is to be picked up. The format is YYYY-MM-DD. If left blank, the system considers current date as dispatch date.  
Example: 2020-01-01

packageReadyTime

string

Specify the time that the package will be ready for pickup. The time format is HH:MM:SS and it refers to the local timezone. The driver should pick up the package/shipment by the given pickup time.  
Example: 15:00:00

customerCloseTime

string

Specify the latest time the driver gets access to pick up the package. The time format is in HH:MM:SS and it refers to the local timezone. The driver should pick up the package by the given pickup time.  
Example: 18:00:00

pickupType

string

Enum: "ON\_CALL" "TAG"

Indicate the pickup type method by which the shipment to be tendered to FedEx.  
_Note: The value of this element does not specify dispatching the courier for package pickup._  
Click here for more information on Pickup Types.

pickupRequestType

required

Array of strings

Items Enum: "SAME\_DAY" "FUTURE\_DAY"

Specify pickup request type.

shipmentAttributes

object (ShipmentAttributes)

Specify the shipment details, such as service type, packaging type, weight and dimensions.  
  
_Note: serviceType is required for domestic or international pickup availabilities._

numberOfBusinessDays

integer <int32>

Specify number of business days to consider when checking availability.  
For example if you are indicating pickupDate for a Saturday and you indicate 3, Saturday, Sunday and Monday will be considered.  
Example: 3

packageDetails

Array of objects (RequestedPickupPackageDetail)

This object is used to specify the package details.

associatedAccountNumber

string

The associated account number, which will be invoiced for the pickup.  
Example:613787364.

associatedAccountNumberType

string

Enum: "FEDEX\_EXPRESS" "FEDEX\_GROUND"

This represents a kind of legacy account number from a FedEx operating entity for the account number associated to the pickup.  
Valid values are: FEDEX\_EXPRESS  
FEDEX\_GROUND  

carriers

required

Array of strings

Items Enum: "FDXE" "FDXG"

Specify the four letter code of a FedEx operating company thet meets your requirements.  
Examples of FedEx Operating Companies are:

-   FDXE - FedEx Express
-   FDXG - FedEx Ground

countryRelationship

required

string

Enum: "DOMESTIC" "INTERNATIONAL"

Specify the country relationship among the shipments being picked up. Empty or incorrect values will result in to errors.  
  
_Note: **shipmentAttributes/serviceType** is required for domestic or international pickup availabilities._

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

post /pickup/v1/pickups/availabilities

Sandbox Server

https://apis-sandbox.fedex.com/pickup/v1/pickups/availabilities

Production Server

https://apis.fedex.com/pickup/v1/pickups/availabilities

### Request samples - Check Pickup Availability

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

Full\_Schema\_Pickup\_Availability

Copy

Expand all Collapse all

{

-   "pickupAddress":
    
    {
    
    -   "streetLines":
        
        \[
        
        -   "123 Ship Street"
            
        
        \],
        
    -   "urbanizationCode": "URB FAIR OAKS",
        
    -   "city": "Memphis",
        
    -   "stateOrProvinceCode": "TN",
        
    -   "postalCode": "38017",
        
    -   "countryCode": "US",
        
    -   "residential": false,
        
    -   "addressClassification": "MIXED"
        
    
    },
    
-   "dispatchDate": "2020-10-14",
    
-   "packageReadyTime": "15:30:00",
    
-   "customerCloseTime": "18:00:00",
    
-   "pickupType": "ON\_CALL",
    
-   "pickupRequestType":
    
    \[
    
    -   "SAME\_DAY"
        
    
    \],
    
-   "shipmentAttributes":
    
    {
    
    -   "serviceType": "FEDEX\_FREIGHT\_PRIORITY",
        
    -   "weight":
        
        {
        
        -   "units": "KG",
            
        -   "value": 20
            
        
        },
        
    -   "packagingType": "YOUR\_PACKAGING",
        
    -   "dimensions":
        
        {
        
        -   "length": 7,
            
        -   "width": 8,
            
        -   "units": "CM",
            
        -   "height": 9
            
        
        }
        
    
    },
    
-   "numberOfBusinessDays": 1,
    
-   "packageDetails":
    
    \[
    
    -   {
        
        -   "packageSpecialServices":
            
            {
            
            -   "specialServiceTypes":
                
                \[
                
                -   "SIGNATURE\_OPTION"
                    
                
                \]
                
            
            }
            
        
        }
        
    
    \],
    
-   "associatedAccountNumber": "613787364",
    
-   "associatedAccountNumberType": "FEDEX\_EXPRESS",
    
-   "carriers":
    
    \[
    
    -   "FDXE"
        
    
    \],
    
-   "countryRelationship": "INTERNATIONAL",
    
-   "version":
    
    {
    
    -   "major": "1",
        
    -   "minor": "1",
        
    -   "patch": "1"
        
    
    }
    

}

### Response samples - Check Pickup Availability

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
    
    -   "requestTimestamp": "2020-04-02T04:19:00",
        
    -   "options":
        
        \[
        
        -   {
            
            -   "carrier": "FDXE",
                
            -   "available": true,
                
            -   "pickupDate": "2019-01-20",
                
            -   "cutOffTime": "18:30:00",
                
            -   "accessTime":
                
                {
                
                -   "hours": 1,
                    
                -   "minutes": 30
                    
                
                },
                
            -   "residentialAvailable": true,
                
            -   "countryRelationship": "INTERNATIONAL",
                
            -   "scheduleDay": "SAME\_DAY",
                
            -   "defaultReadyTime": "14:00:00",
                
            -   "defaultLatestTimeOptions": "19:00:00",
                
            -   "earlyCutOffTime": "14:30:00",
                
            -   "earlyAccessTime":
                
                {
                
                -   "hours": 1,
                    
                -   "minutes": 30
                    
                
                },
                
            -   "earlyPickupLocationId": "PITA",
                
            -   "readyTimeOptions":
                
                \[
                
                -   "11:00:00"
                    
                
                \],
                
            -   "latestTimeOptions":
                
                \[
                
                -   "12:00:00"
                    
                
                \]
                
            
            }
            
        
        \],
        
    -   "alerts":
        
        \[
        
        -   {
            
            -   "code": "SHIP.RECIPIENT.POSTALCITY.MISMATCH",
                
            -   "alertType": "NOTE",
                
            -   "message": "Recipient Postal-City Mismatch."
                
            
            }
            
        
        \]
        
    
    }
    

}

## [](#operation/Cancel Pickup)Cancel Pickup

Use this endpoint to cancel the already scheduled pickup request.  
Note: A failure notification will be sent if you attempt to cancel a pickup after the FedEx courier has been dispatched to the pickup location.  
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

-   Full\_Schema\_Cancel\_Pickup
-   Cancel\_Pickup\_Ground
-   Cancel\_Pickup\_Express

associatedAccountNumber

required

object (AccountNumber)

This is the FedEx account number.  
Example: Your account number

pickupConfirmationCode

required

string

The confirmation number provided by FedEx to the customer when the pickup was scheduled or requested.  
Example: 7

remarks

string

Placeholder for any message to be passed to the FedEx pickup courier.  
Note:Maximum length is 60 characters.  
Example: Please ring bell at loading dock.

carrierCode

string

Enum: "FDXE" "FDXG"

This is a placeholder to provide the FedEx operating company (transportation) code used for package delivery. Required for FedEx Ground.  
Optional for FedEx Express.  
The Default is FedEx Express i.e. FDXE.

scheduledDate

required

string

Indicates the date the pickup dispatch occurs.  
Format YYYY-MM-DD  
Example: 2019-10-15

location

string

The FedEx Express location identifier responsible for processing the pickup request. This is returned in the CreatePickup response and is required to cancel a FedEx Express dispatch.Required only for FedEx Express Pickups. Optional for FedEx Ground. Example: LOSA

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

put /pickup/v1/pickups/cancel

Sandbox Server

https://apis-sandbox.fedex.com/pickup/v1/pickups/cancel

Production Server

https://apis.fedex.com/pickup/v1/pickups/cancel

### Request samples - Cancel Pickup

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

Full\_Schema\_Cancel\_Pickup

Copy

Expand all Collapse all

{

-   "associatedAccountNumber":
    
    {
    
    -   "value": "Your account number"
        
    
    },
    
-   "pickupConfirmationCode": "7",
    
-   "remarks": "Please ring bell at loading dock.",
    
-   "carrierCode": "FDXE",
    
-   "scheduledDate": "2019-10-15",
    
-   "location": "LOSA",
    
-   "version":
    
    {
    
    -   "major": "1",
        
    -   "minor": "1",
        
    -   "patch": "1"
        
    
    }
    

}

### Response samples - Cancel Pickup

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
    
    -   "pickupConfirmationCode": "NQAA97",
        
    -   "cancelConfirmationMessage": "Requested pickup has been cancelled Successfully.",
        
    -   "alerts":
        
        \[
        
        -   {
            
            -   "code": "SHIP.RECIPIENT.POSTALCITY.MISMATCH",
                
            -   "alertType": "NOTE",
                
            -   "message": "Recipient Postal-City Mismatch."
                
            
            }
            
        
        \]
        
    
    }
    

}

## Error Codes

-   FDSDMINIMUM.HOUR.REQUIRED
    
    Make sure you allow a minimum of xx hours between ready time and latest available time.
    
-   LATEST.TIME.INVALID
    
    Invalid latest time available
    
-   LOCATIONTYPE.VALUE.INVALID
    
    The service selected is not available for this location.
    
-   PICKUPCONFIRMATION.CODE.ALREADYEXIST
    
    Pickup already made, cannot cancel or update.
    
-   ORIGINDETAIL.READYDATETIMESTAMP.PROHIBITED
    
    Provided pickup ready date time stamp is not allowed. Please update and try again.
    
-   PACKAGE.ACCESS.NEEDED
    
    Package is not accessible for request pickup time.
    
-   PICKUP.LOCATION.UNAVAILABLE
    
    We cannot schedule a pickup for your location. Please contact FedEx Customer Service to schedule a pickup or select Drop-off to drop your package off at a FedEx location.
    
-   POSTAL.CODE.ERROR
    
    We are not able to schedule your pickup for the postal code entered, please correct your postal code or contact FedEx Customer Service for more help.
    
-   POSTALCODE.INFO.INVALID
    
    There is a missing or invalid postal code, or the postal code and country do not match. Please verify the information and try again.
    
-   SHIPDATE.VALUE.INVALID
    
    The ship date is invalid. Please select the next available date to ship.
    
-   ERROR.INACTIVE.ACCOUNTNUMBER
    
    Unable to process request. Inactive/bad account number entered.
    
-   PACKAGE.COUNT.INVALID
    
    Invalid or blank package count.
    
-   PICKUPREQUESTTYPE.VALUE.REQUIRED
    
    PickupRequestType array missing or empty
    
-   PICKUP.WEIGHT.VALUE.INVALID
    
    Invalid or missing weight value.
    
-   PICKUP.WEIGHT.UNITS.INVALID
    
    Invalid or missing weight units.
    
-   PICKUP.REQUESTED.PREVIOUS.DAY
    
    Cannot schedule a pickup requested for a previous day.
    
-   PICKUP.COUNTRY.NOT.SERVED
    
    COUNTRY NOT SERVED
    
-   PICKUP.NUMBER.INVALID
    
    PICKUP MORE THAN 4 DAYS OLD
    
-   PICKUP.NUMBER.EXPIRED
    
    PREVIOUS DAY PICKUP, CANNOT CANCEL OR UPDATE
    
-   PICKUP.COUNTRY.CODE.INVALID
    
    MISSING OR INVALID COUNTRYCODE
    
-   PICKUP.CARRIERCODE.INVALID
    
    Pickup CarrierCode is missing or invalid.
    
-   READY.TIME.INVALID
    
    Invalid ready time
    
-   DUPLICATE.REQUEST.CANCEL
    
    Duplicate cancel request
    
-   SERVICETYPE.NOT.FOUND
    
    Service type is not provided or is invalid. Please provide a valid service type.
    
-   PACKAGINGTYPE.NOT.FOUND
    
    Package type is not provided or is invalid. Please provide a valid package type.
    
-   PICKUP.STREETLINE.MISSING
    
    Street line is missing
    
-   PICKUP.CITY.MISSING
    
    City is missing.
    
-   PICKUP.POSTALCODE.MISSING
    
    PostalCode is missing.
    
-   PICKUP.STATEORPROVINCECODE.MISSING
    
    StateOrProvinceCode is missing.
    
-   PICKUP.TRUCKTYPE.INVALID
    
    Please provide truck type value.
    
-   PICKUP.TRAILERLENGTH.INVALID
    
    Please provide trailer length value.
    
-   PICKUP.PACKAGE.LENGTH.INVALID
    
    Invalid or missing package length.
    
-   PICKUP.PACKAGE.WIDTH.INVALID
    
    Invalid or missing package width.
    
-   PICKUP.PACKAGE.HEIGHT.INVALID
    
    Invalid or missing package height.
    
-   PICKUP.DIMENSIONS.UNITS.INVALID
    
    Invalid or missing dimensions units.
    
-   PICKUPDATE.NOT.WORKINGDAY
    
    Pickup Date not a working day.
    
-   UNABLE.TO.PICKUP
    
    Unable To Pickup before Close time.
    
-   PICKUP.ALREADY.EXISTS
    
    A pickup already exists.
    
-   PICKUPDATE.TOO.FAR
    
    Pickup Date too far in future.
    
-   PICKUP.SERVICEANDPACKAGING.REQUIRED
    
    Service and Packaging are required for Express Tag.
    
-   PICKUP.RESTRICTED.COUNTRY
    
    FedEx does not support pickup in the country that you requested.
    
-   PICKUP.CARRIERCODE.REQUIRED
    
    Carrier code is required
    
-   INCORRECT.DISPATCHDATE.FORMAT
    
    Please use the required dispatch date format: YYYY-MM-DD.
    
-   PICKUP.UNAUTHORIZEDUSAGE.ERROR
    
    We are unable to process your request at the moment. Please try again later or contact FedEx Customer Service
    
-   ACCOUNT.VALIDATION.ERROR
    
    We are unable to process this request. Please try again later or contact FedEx Customer Service.
    
-   INCORRECT.SCHEDULEDDATE.FORMAT
    
    Please use the required scheduled date format: YYYY-MM-DD.
    
-   PICKUP.CANCELLATION.NOTALLOWED
    
    Pickup cancellation requested for an already completed/past date pickup with confirmation ID {0} is not allowed.
    
-   UNAUTHORIZED.USAGE
    
    new msg: UNAUTHORIZED.USAGE key should be valid
    
-   INCORRECT.READYTIMESTAMP.FORMAT
    
    Please provide a valid date time format for ex 2019-02-07T10:00:00Z
    
-   INCORRECT.COMPANYCLOSETIME.FORMAT
    
    Please use the required company close time format: HH:MM:SS.
    
-   INTERNAL.SERVER.ERROR
    
    We encountered an unexpected error and are working to resolve the issue. We apologize for any inconvenience. Please check back at a later time.
    
-   COUNTRY.RELATIONSHIP.REQUIRED
    
    Country relationship is missing
    
-   PICKUP.TRACKINGNUMBER.REQUIRED
    
    Tracking number is required while creating pickups anonymously.
    
-   PICKUPCREATE.PACKAGELOCATION.INVALID
    
    Location is missing or invalid.
    
-   WEIGHT.NONNUMERIC.ERROR
    
    Commodity weight is missing or invalid.Please update and try again.
    
-   NO.DISPATCH.FOUND
    
    No Dispatch found for this account.
    
-   PICKUP.NUMBEROFBUSINESSDAYS.INVALID
    
    Pickup number of business days is invalid. Please update and try again.
    
-   ACCOUNT.NUMBER.INVALID
    
    Account number not found. Please provide a valid account number.
    
-   PICKUP.ACCOUNTNUMBERGROUND.INVALID
    
    Account not ground enabled.
    
-   PICKUP.ACCOUNTNUMBER.MISMATCH
    
    Requested account does not match existing account.
    
-   PICKUPCHARGESPAYMENT.PAYORACCOUNTNUMBER.INVALID
    
    Payor account number is invalid.
    
-   PAYMENT.TYPE.INVALID
    
    Payment type is invalid.
    
-   PICKUPCHARGESPAYMENT.PAYORACCOUNTNUMBER.REQUIRED
    
    Payor account number is missing.
    
-   PICKUPCHARGESPAYMENT.PAYMENTTYPE.REQUIRED
    
    Payment type is missing.
    
-   PICKUPCHARGESPAYMENT.PAYOR.REQUIRED
    
    Payor is missing.
    
-   PICKUPCHARGESPAYMENT.PAYORTYPE.REQUIRED
    
    Payor type is missing.
    
-   PICKUP.ACCOUNTNUMBER.UKSERVICESNOTSUPPORTED
    
    Account not eligible for domestic UK service.
    
-   PICKUP.ACCOUNTNUMBER.MXSERVICESNOTSUPPORTED
    
    Account not eligible for domestic MX service.
    
-   ACCOUNT.NUMBER.INVALID
    
    Account number is invalid.
    

    

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