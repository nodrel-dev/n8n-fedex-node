# FedEx APIs and Developer Portal

    

 [![ Sign Up or Log In](https://developer.fedex.com/api/content/dam/fedex-com/irc/leftnav/login-icon_white.svg) Sign Up or Log In](#)

---

[](https://www.fedex.com/en-ca/developer.html)

# 

FedEx Location Search API

[DOWNLOAD JSON SCHEMA](blob:https://developer.fedex.com/216c7431-e0c3-4478-b096-d677e0109c47)

-   Introduction-   FedEx Locations Search API Details-   FedEx Locations Search API Key Features-   FedEx Locations

-   Error Codes

## Introduction

FedEx locations are pickup and dropoff points managed by FedEx shipping providers. You can ship a package from a pickup to a dropoff location using any FedEx carrier. This API helps you search for supported and available shipping locations using address, geographic coordinates, or phone number.

FedEx Location Search API searches for and returns the addresses of the nearest FedEx locations, including FedEx Office® Print and Ship Centers and FedEx Drop Box locations available for FedEx Express® and FedEx Ground® package dropoff.

## FedEx Locations Search API Details

The FedEx Locations Search API lets you search for FedEx locations by address, geographic coordinates, or phone number.

FedEx Locations Search API allows you to search locations based on the following:

-   Authorized shipping centers
-   Authorized dropoff centers
-   Hold at Locations
-   FedEx Ship & Get (parcel lockers)
-   Drop box locations
-   Locations that accept dangerous goods shipments

### Features of the FedEx Locations Search API include:

-   Search for the nearest FedEx pickup and dropoff location.
-   Retrieve the location’s detailed address, including postal code, country code, etc.

The Location Search API helps to request FedEx locations available for FedEx Express and FedEx Ground® package drop-off. This transaction searches for and returns the addresses of the nearest FedEx location. You can also use this API to find FedEx locations that provide Hold at Location service.

**Find Locations**

This request is used to return a list of all available locations based on input details. The key input information associated with this request is:

-   Location address
-   Distance (value and units of the radius around the address to search for FedEx locations)

_Note: The postal code is mandatory for postal-aware countries. For non-postal-aware countries, a combination of city and country will fetch the valid FedEx locations._

The result of this request is a detailed list of all FedEx pickup and dropoff locations available along with key information such as distance, store hours, carrier details, location service and capabilities available for the weekdays, ability to drop off/pick up shipments, and ability to hold shipments for pickup, etc.

**Hold at Location (HAL)**

To optimize the FedEx Locations Search API performance and accuracy, include comprehensive shipment filtering parameters in your integration when searching for FedEx locations.

**Recommended Filtering Parameters:**

-   Weight
-   Dimensions
-   Total Customs Value
-   Declared Value
-   Package Type
-   Package Count
-   Special Handling

While the API will continue to function with only Weight and Dimensions, providing the full shipment context significantly improves the precision of the returned Hold at Location (HAL) list. This ensures that the suggested locations are fully equipped to handle the specific shipment requirements.

## FedEx Locations Search API Key Features

**Narrow your search by location**

You can narrow your search by type of location. One, multiple, or all types of FedEx locations listed may be specified in the search request:

-   FedEx Authorized ShipCenter® locations: Access the FedEx transportation network at over 5,800 independently owned and operated pack and ship locations (FASC) across the U.S. Stores participating in the FedEx Authorized ShipCenter program also provide other business services. FedEx Authorized ShipCenter locations may apply additional charges to the FedEx published rates.
-   FedEx ShipCenter®
-   Express Station
-   FedEx ShipSite
-   FedEx Office® location
-   FedEx self-service location: Drop off FedEx Express and FedEx Ground packages (up to 20” x 12” x 6”) at a FedEx Express® Drop Box.
-   FedEx Ship & Get (parcel lockers)
-   The following location types are supported for the service Hold at Location:
    -   FedEx OnSite – FedEx Express and FedEx Ground packages
    -   FedEx Office – FedEx Express and FedEx Ground packages
    -   Express stations – Only FedEx Express packages
    -   FedEx Ship centers – FedEx Express and FedEx Ground packages and approved dangerous goods
    -   FedEx Ship & Get - FedEx Express packages

**Location Capabilities**

Additionally, the search request supports an attribute to specify that the locations support FedEx Express or FedEx Ground Redirect to Hold capability and attributes to specify capabilities at the location such as:

-   Return services
-   Ground dropoffs
-   Cash
-   Pack and ship
-   Packaging supplies
-   Signs and banners service
-   Sony PictureStation
-   Direct mail services
-   Copy and print services
-   Dangerous goods services
-   Location is in airport
-   Notary services
-   Observes daylight saving times
-   Passport photo services
-   Drop box
-   Domestic shipping services
-   International shipping services

**Sort Results**  

The FedEx Location Search API lets you sort the results by:

-   Latest FedEx Express dropoff time
-   Latest FedEx Ground dropoff time
-   Location type
-   By distance in ascending order
-   By distance in descending order

**Additional Search Criteria**

You may also narrow your search by the following:

-   Saturday service available.
-   Packing service available (most FedEx Office locations): FedEx will pack your shipment for you (at an extra charge).
-   Packing supplies available (anywhere FedEx Express packing materials are supplied; it does not include FedEx Ground materials).
-   Latest FedEx Express dropoff locations: Returns locations with the latest dropoff time near you.
-   Express dropoff after: Drop a package off after a specific time, such as 5 p.m. Use this element to search for dropoff locations open after 5 p.m.

_Note: The FedEx Location Search API returns up to 75 locations within a 50-mile (80 km) radius of your address_

## FedEx Locations

**FedEx Ship Center® locations: Drop off packages and get shipping information**

The shipping specialists at FedEx Ship Center locations can help you choose a delivery service, complete documentation, and process your packages. Many locations are open late and on Saturdays to accommodate your schedule.

-   Drop off your shipments, or FedEx will process them for you at the counter.
-   Purchase boxes and other packaging supplies.
-   Check the FedEx Dropoff Locator for the list of services, such as Saturday service, offered at each location.
-   Charge your shipments to your FedEx account, or use checks, credit cards, or cash, which are accepted at most locations.

_Note: You must have a FedEx account number to ship FedEx International Ground® packages at a FedEx Ship Center and our other shipping locations._

**FedEx Authorized ShipCenter® locations: Independently owned pack-and-ship locations**

Stop by these independently owned locations for packaging and shipping services. Most also offer faxing, copying, and other business services.

-   Look for pack-and-ship retailers such as AIM Mail Center®, PakMail®, PostalAnnex+®and PostNet®, as well as locations affiliated with the Association of Mail and Business Centers and Retail Shipping Associates.
-   You can ship both FedEx Express and FedEx Ground packages at most of these locations. For more information, check the FedEx Dropoff Locator.

_Note: Rates for processing packages reflect each location's own pricing policies. These locations may apply additional charges to FedEx rates._

**FedEx ShipSite at Office Depot® and OfficeMax® locations: Convenient access to shipping services**

FedEx® Services are available at all Office Depot and OfficeMax locations. These locations offer FedEx Express and FedEx Ground U.S. and international shipping services, so you can drop off packages or process them at the counter, purchase packaging supplies, and handle other business needs, all at one convenient place.

**FedEx Drop Box locations: More than 35,000 locations**

There are more than 35,000 drop boxes in office buildings, shopping malls, airports, FedEx Office locations, grocery stores, and other convenient locations.

-   Drop off your FedEx Express, FedEx Ground and FedEx Ground® Economy (Formerly known as FedEx SmartPost®) shipments. FedEx Ground shipments may require an additional day for delivery.
-   All drop boxes accept packages up to 20\\" x 12\\" x 6\\" (many accept packages up to 20\\" x 12\\" x 9\\").
-   Most have a limited quantity of FedEx Express airbill and packaging supplies.
-   All offer Monday–Friday pickup, and some also offer pickup on Saturdays.
-   Do not place FedEx SameDay® packages in drop boxes.
-   IATA Section II lithium batteries and Biological Substance, Category B (UN 3373) are the only dangerous goods that may be placed in drop boxes.
-   No cash, check, or credit card payments are accepted.

**FedEx OnSite locations (U.S. and Puerto Rico): Pick up and drop off where you shop**

With FedEx OnSite locations, you can pick up and drop off your FedEx packages where it's most convenient for you. They're close to where you work, live, and play, and some are even open for extended hours. FedEx has nearly 9,000 Walgreens locations and select Dollar General, Albertsons and Kroger locations in the U.S. and Puerto Rico where you can:

-   Have packages held in a secure location for you to pick up at your convenience.
-   Drop off prepackaged, prelabeled FedEx Express and FedEx Ground U.S. and international shipments. Individual packages can weigh up to 55 lbs. and measure up to 48″ in length by 25\\" in width by 25\\" in height.

**Business Rules**

-   FedEx Office locations, FedEx OnSite locations, and select FedEx Authorized ShipCenter do not accept dangerous goods, live animals, tobacco, or other regulated material and hazardous shipments.
-   Weight Restrictions by Location Type
    -   FedEx Office and FedEx Ship Center locations may accept larger and heavier Hold at Location packages than select FedEx Authorized ShipCenter location and FedEx OnSite locations.
    -   FedEx Ship Center locations accept packages exceeding 150 lbs., 119″ length, and/or 165\\" length and girth (L+2W+2H) that cannot be delivered to other locations.
    -   FedEx Office locations accept packages with a maximum weight of 150 lbs., maximum length of 119″ and/or 165″ length and girth (L+2W+2H).
    -   FASCs and FedEx OnSite (e.g., Walgreens) locations accepts packages with a maximum weight of 55 lbs. and maximum size of 48\\" x 25\\" x 25\\".

**FedEx OnSite and FedEx Ship&Get locations (International): Pick up and drop off where you shop**

With FedEx OnSite locations, you can pick up and drop off your FedEx packages where it's most convenient for you. They're close to where you work, live, and play, and some are even open for extended hours. FedEx has thousands of locations where you can:

-   Have packages held in a secure location for you to pick up at your convenience.
-   Drop off prepackaged, prelabeled FedEx Express shipments. Individual package weight and size limits may vary.

**Business Rules**

-   FedEx OnSite and FedEx Ship & Get locations (parcel lockers) do not accept dangerous goods, live animals, tobacco, or other regulated material and hazardous shipments.
-   **Weight Restrictions by Location Type:**
    -   Restrictions vary per country.
-   **Other restrictions may vary by country:**
    -   Total Customs Value
    -   Total Declared Value
    -   Total Customs Value when Duties and Taxes Payor is the recipient
    -   Package Type (Example: FedEx Tube)
    -   Package Count
    -   Special Handling

Explore our JSON API collection to see how we can deliver on your business needs. Test your integration with these sample requests.

[Learn more about sandbox virtualization guide](https://developer.fedex.com/api/en-ca/guides/sandboxvirtualization.html)

[Documentation Powered by ReDoc](https://github.com/Redocly/redoc)

# FedEx Location Search API (1.0.0)

## [](#operation/Find Location)Find Locations

Use this endpoint to search for FedEx locations by address, geographic coordinates, or phone number. You can also narrow your search by type of location and services offered. It returns up to 75 locations within a 50-mile radius for the address used in the search criteria. Results are based on current date and time. Supports all FedEx operating companies and countries, dependent upon being able to get a valid geolocation for a given set of criteria.  
_Note: You must specify landline numbers only, when searching for the nearest FedEx locations using phone number._  
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

-   Full\_Schema\_Find\_Location
-   Search\_Location\_for\_Postal\_Aware\_Country
-   Search\_Location\_for\_Non\_Postal\_Aware\_Country
-   Search\_Location\_by\_US\_domestic\_Postal\_Address
-   Search\_Location\_by\_International\_Postal\_Address
-   Search\_Location\_by\_Geographic\_Coordinates
-   Search\_Location\_by\_Phone\_Number
-   Search\_Location\_HOLD\_AT\_LOCATION
-   Search\_Location\_OFFICE\_AND\_ONSITE
-   Search\_Location\_by\_RETURNS\_SERVICES

locationsSummaryRequestControlParameters

object

Use this object to specify all the inputs to get the locations details.

constraints

object

Specify the constraints to be applied to the location attributes.

locationSearchCriterion

string

Enum: "ADDRESS" "GEOGRAPHIC\_COORDINATES" "PHONE\_NUMBER"

Specify the criteria to be used to search for FedEx locations. Default value is ADDRESS if no value is passed.

Valid values:

-   ADDRESS – Search by address. Location detail data is required.
-   GEOGRAPHIC\_COORDINATES – Search by geocodes. Location geocodes are required.
-   PHONE\_NUMBER – Search by phone number. Location Phone number is required.

_Note: Country code is REQUIRED when searching by any of the LocationsSearchCriterion, even PhoneNumber and GeorgraphicCoordinates._

location

required

object

Based on the locationSearchCriterion value specified, the location element specifies the minimum requirement for address search like postalCode, countryCode, GeoCodes or city.Location phone number is required. Only landline number is allowed.  
  
_Note: Country code is REQUIRED for the search._

phoneNumber

string

Specify the phone number(Only LandLine allowed) if the locationSearchCriterion is set to 'PHONE\_NUMBER'.Given that is the case, the location search will be made based on the phone number value and the location object(postalCode&countryCode) will be completely ignored.  
Example: 9015551234

multipleMatchesAction

string

Enum: "RETURN\_ALL" "RETURN\_ERROR" "RETURN\_FIRST"

Specify the criterion to be used to return location results when there are multiple matches.  
Valid values: RETURN\_ALL,RETURN\_ERROR, RETURN\_FIRST.  
  
_Note: The 'maxResults' value takes precedence over RETURN\_ALL value._

sort

object (Sort)

Specifies how the location search results will be sorted in the reply.

trackingInfo

object (TrackingInfo)

Information uniquely identifying a shipment such as Tracking number, ShipDate, and Tracking number uniqueId. This tracking information helps to return the correct list of locations when REDIRECT\_TO\_HOLD\_AT\_LOCATION is requested

sameState

boolean

Filter to display locations within the same state as the search criteria.  
Valid values: True, False.

sameCountry

boolean

Filter to display locations within the same country as the search criteria.  
Valid values: True, False.

redirectToHoldType

string

Enum: "FEDEX\_EXPRESS" "FEDEX\_GROUND" "FEDEX\_GROUND\_HOME\_DELIVERY"

Specify the type of service supported by a FedEx location for redirect to hold.

locationAttrTypes

Array of strings

Items Enum: "ACCEPTS\_CASH" "FEDEX\_RETURNS\_TECHNOLOGY" "ALREADY\_OPEN" "COPY\_AND\_PRINT\_SERVICES" "DANGEROUS\_GOODS\_SERVICES" "DIRECT\_MAIL\_SERVICES" "LOCATION\_IS\_IN\_AIRPORT" "NOTARY\_SERVICES" "OPEN\_TWENTY\_FOUR\_HOURS" "PACK\_AND\_SHIP" "PACKAGING\_SUPPLIES" "PASSPORT\_PHOTO\_SERVICES" "RETURNS\_SERVICES" "SIGNS\_AND\_BANNERS\_SERVICE" "SONY\_PICTURE\_STATION" "DROP\_BOX" "DOMESTIC\_SHIPPING\_SERVICES" "INTERNATIONAL\_SHIPPING\_SERVICES" "CLEARANCE\_SERVICES"

Specify attributes to filter location types. If more than one value is specified, only those locations that have all the specified attributes will be returned.  
Note: In order to filter for DROP\_BOX location, need to add locationTypes as FEDEX\_SELF\_SERVICE\_LOCATION

locationCapabilities

Array of objects (LocationCapabilities)

Specify to filter the locations based on their capabilities.

packageAttributes

Array of objects (PackageAttribute)

Specify location supported package constraints to narrow the search.  
  
For example, a package weighing more than 151 pounds may not be supported at all location types. Drop box location would be excluded.

_Note: The package attributes inputs are only recognized/supported for FedEx OnSite Locations._

locationTypes

Array of strings

Items Enum: "FEDEX\_AUTHORIZED\_SHIP\_CENTER" "FEDEX\_OFFICE" "FEDEX\_SELF\_SERVICE\_LOCATION" "FEDEX\_ONSITE" "FEDEX\_EXPRESS\_STATION" "FEDEX\_SHIPSITE" "FEDEX\_SHIP\_AND\_GET"

Results filter which narrows the search to specific types of FedEx Locations.

includeHoliday

boolean

Indicates true if the location holiday list is desired in the results; otherwise false  
Valid values: True, False.

dropoffTime

string

Specifies the latest time by which you can drop-off a package at a location to process the shipment the same day. This limits the results to locations that support a specific drop-off time. The format is an ISO 8601 string in which only the time portion is used.  
Example: 16:00:00

dropOffServiceType

string

The drop-off service types supported by the specified location. If sort criteria is given as LATEST\_EXPRESS\_DROPOFF\_TIME and dropoffservicetype is GROUND then backend will take the SORT\_BY\_LATEST\_GROUND\_TIME as sort criteria.  
Example: FedEx Ground.

carrierCodes

Array of strings

Items Enum: "FDXE" "FDXG"

Unique code to identify the transporter.

getCall

boolean

Get a call.  
Valid values: True, False.

packagingType

string

The FedEx Package Type

totalDeclaredValue

object

This is the total declared value of all of the packages for the shipment

totalCustomsValue

object

This is the total customs value of all of the packages for the shipment

paymentType

string

Enum: "SENDER" "THIRD\_PARTY" "RECIPIENT" "COLLECT"

Duties and Taxes Payor Payment Type

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

post /location/v1/locations

Sandbox Server

https://apis-sandbox.fedex.com/location/v1/locations

Production Server

https://apis.fedex.com/location/v1/locations

### Request samples - Find Locations

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

Full\_Schema\_Find\_Location

Copy

Expand all Collapse all

{

-   "locationsSummaryRequestControlParameters":
    
    {
    
    -   "distance":
        
        {
        
        -   "units": "KM",
            
        -   "value": 3.5
            
        
        },
        
    -   "maxResults": 12
        
    
    },
    
-   "constraints":
    
    {
    
    -   "locationContentOptions":
        
        \[
        
        -   "LOCATION\_DROPOFF\_TIMES"
            
        
        \],
        
    -   "dropOffTimeNeeded": "16:30:00",
        
    -   "excludeUnavailableLocations": "true"
        
    
    },
    
-   "locationSearchCriterion": "ADDRESS",
    
-   "location":
    
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
        
    -   "longLat":
        
        {
        
        -   "latitude": 5.637376,
            
        -   "longitude": 3.61607
            
        
        }
        
    
    },
    
-   "phoneNumber": "9015551234",
    
-   "multipleMatchesAction": "RETURN\_ALL",
    
-   "sort":
    
    {
    
    -   "criteria": "DISTANCE",
        
    -   "order": "ASCENDING"
        
    
    },
    
-   "trackingInfo":
    
    {
    
    -   "uniqueTrackingId": "789645",
        
    -   "trackingNumber": "123456789012",
        
    -   "shipDate": "2019-10-13"
        
    
    },
    
-   "sameState": true,
    
-   "sameCountry": true,
    
-   "redirectToHoldType": "FEDEX\_GROUND",
    
-   "locationAttrTypes":
    
    \[
    
    -   "ACCEPTS\_CASH",
        
    -   "PACK\_AND\_SHIP"
        
    
    \],
    
-   "locationCapabilities":
    
    \[
    
    -   {
        
        -   "carrierCode": "FDXE",
            
        -   "serviceType": "PRIORITY\_OVERNIGHT",
            
        -   "transferOfPossessionType": "DROPOFF",
            
        -   "serviceCategory": "EXPRESS\_FREIGHT",
            
        -   "daysOfWeek":
            
            \[
            
            -   "MON",
                
            -   "TUE"
                
            
            \]
            
        
        }
        
    
    \],
    
-   "packageAttributes":
    
    \[
    
    -   {
        
        -   "weight":
            
            {
            
            -   "units": "LB",
                
            -   "value": 150
                
            
            },
            
        -   "dimensions":
            
            {
            
            -   "length": 20,
                
            -   "width": 40,
                
            -   "units": "IN",
                
            -   "height": 70
                
            
            },
            
        -   "serviceOptions":
            
            \[
            
            -   "DRY\_ICE"
                
            
            \]
            
        
        }
        
    
    \],
    
-   "locationTypes":
    
    \[
    
    -   "FEDEX\_AUTHORIZED\_SHIP\_CENTER"
        
    
    \],
    
-   "includeHoliday": true,
    
-   "dropoffTime": "09:30:00",
    
-   "dropOffServiceType": "GROUND",
    
-   "carrierCodes":
    
    \[
    
    -   "FDXE"
        
    
    \],
    
-   "getCall": false,
    
-   "packagingType": "FEDEX\_PAK",
    
-   "totalDeclaredValue":
    
    {
    
    -   "amount": 100,
        
    -   "currency": "USD"
        
    
    },
    
-   "totalCustomsValue":
    
    {
    
    -   "amount": 100,
        
    -   "currency": "USD"
        
    
    },
    
-   "paymentType": "SENDER"
    

}

### Response samples - Find Locations

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
    
    -   "totalResults": 13,
        
    -   "resultsReturned": 13,
        
    -   "matchedAddress":
        
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
        
    -   "matchedAddressGeoCoord":
        
        {
        
        -   "latitude": 5.637376,
            
        -   "longitude": 3.616076
            
        
        },
        
    -   "locationDetailList":
        
        \[
        
        -   {
            
            -   "distance":
                
                {
                
                -   "units": "KM",
                    
                -   "value": 3.5
                    
                
                },
                
            -   "contactAndAddress":
                
                {
                
                -   "address":
                    
                    {
                    
                    -   "streetLines":
                        
                        \[
                        
                        -   "1640 Union Blvd",
                            
                        -   "streetLine2"
                            
                        
                        \],
                        
                    -   "city": "Beverly Hills",
                        
                    -   "postalCode": "90210",
                        
                    -   "countryCode": "US",
                        
                    -   "residential": false
                        
                    
                    },
                    
                -   "displayName": "John Taylor",
                    
                -   "contact":
                    
                    {
                    
                    -   "personName": "John Taylor",
                        
                    -   "emailAddress": "xxxxlor@fedex.com",
                        
                    -   "phoneNumber": "xxxxxxxx12",
                        
                    -   "phoneExtension": "91",
                        
                    -   "companyName": "Fedex",
                        
                    -   "faxNumber": "fax number",
                        
                    -   "displayName": "jhon",
                        
                    -   "stateTaxId": "state tax identifier",
                        
                    -   "fedralTaxId": "federal tax identifier"
                        
                    
                    },
                    
                -   "addressAncillaryDetail":
                    
                    {
                    
                    -   "locationInCity": "Mill Heights",
                        
                    -   "suite": "suite",
                        
                    -   "displayName": "jhon",
                        
                    -   "adderssVerificationOverrideReason": "MANUAL\_OVERRIDE",
                        
                    -   "locationInProperty": "back building north",
                        
                    -   "addtionalDescriptions": "thru south guard gate",
                        
                    -   "department": "R&D",
                        
                    -   "roomFloor": 302,
                        
                    -   "crossStreet": "First and Main",
                        
                    -   "building": "G20",
                        
                    -   "apartment": "2b",
                        
                    -   "room": "1A"
                        
                    
                    }
                    
                
                },
                
            -   "locationId": "COSA",
                
            -   "storeHours":
                
                \[
                
                -   {
                    
                    -   "dayofweek": "MONDAY",
                        
                    -   "operationalHoursType": "OPEN\_BY\_HOURS",
                        
                    -   "operationalHours":
                        
                        \[
                        
                        -   {
                            
                            -   "begins": "08:00:00",
                                
                            -   "ends": "17:00:00"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "exceptionalHoursType": "CLOSED\_ALL\_DAY",
                        
                    -   "exceptionalHours":
                        
                        \[
                        
                        -   {
                            
                            -   "begins": "08:00:00",
                                
                            -   "ends": "17:00:00"
                                
                            
                            }
                            
                        
                        \]
                        
                    
                    },
                    
                -   {
                    
                    -   "dayofweek": "TUESDAY",
                        
                    -   "operationalHoursType": "OPEN\_BY\_HOURS",
                        
                    -   "operationalHours":
                        
                        \[
                        
                        -   {
                            
                            -   "begins": "08:00:00",
                                
                            -   "ends": "17:00:00"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "exceptionalHoursType": "CLOSED\_ALL\_DAY",
                        
                    -   "exceptionalHours":
                        
                        \[
                        
                        -   {
                            
                            -   "begins": "08:00:00",
                                
                            -   "ends": "17:00:00"
                                
                            
                            }
                            
                        
                        \]
                        
                    
                    }
                    
                
                \],
                
            -   "carrierDetailList":
                
                \[
                
                -   {
                    
                    -   "serviceType": "PRIORITY\_OVERNIGHT",
                        
                    -   "countryRelationshipType": "DOMESTIC",
                        
                    -   "carrierCodeType": "FDXE",
                        
                    -   "latestDropoffDetails":
                        
                        \[
                        
                        -   {
                            
                            -   "dayOfWeek": "MONDAY",
                                
                            -   "operationalOverlay":
                                
                                {
                                
                                -   "time": "time",
                                    
                                -   "type": "WEST\_COAST"
                                    
                                
                                },
                                
                            -   "exceptionalTime": "08:30:00",
                                
                            -   "exceptionalOverlay":
                                
                                {
                                
                                -   "time": "09:00:00",
                                    
                                -   "type": "WEST\_COAST"
                                    
                                
                                },
                                
                            -   "operationTime": "08:30:00"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "serviceCategory": "EXPRESS\_FREIGHT"
                        
                    
                    },
                    
                -   {
                    
                    -   "serviceType": "STANDARD\_OVERNIGHT",
                        
                    -   "countryRelationshipType": "DOMESTIC",
                        
                    -   "carrierCodeType": "FDXE",
                        
                    -   "latestDropoffDetails":
                        
                        \[
                        
                        -   {
                            
                            -   "dayOfWeek": "TUESDAY",
                                
                            -   "operationalOverlay":
                                
                                {
                                
                                -   "time": "09:00:00",
                                    
                                -   "type": "WEST\_COAST"
                                    
                                
                                },
                                
                            -   "exceptionalTime": "07:00:00",
                                
                            -   "exceptionalOverlay":
                                
                                {
                                
                                -   "time": "02:00:00",
                                    
                                -   "type": "WEST\_COAST"
                                    
                                
                                },
                                
                            -   "operationTime": "06:00:00"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "serviceCategory": "EXPRESS\_FREIGHT"
                        
                    
                    }
                    
                
                \],
                
            -   "geoPositionalCoordinates":
                
                {
                
                -   "latitude": 5.637376,
                    
                -   "longitude": 3.61607
                    
                
                },
                
            -   "locationType": "FEDEX\_AUTHORIZED\_SHIP\_CENTER",
                
            -   "locationAttributeTypes":
                
                \[
                
                -   "ACCEPTS\_CASH",
                    
                -   "COPY\_AND\_PRINT\_SERVICES"
                    
                
                \],
                
            -   "lockerAvailability": false,
                
            -   "packageMaximumLimits":
                
                {
                
                -   "weight":
                    
                    {
                    
                    -   "units": "KG",
                        
                    -   "value": 68
                        
                    
                    },
                    
                -   "dimensions":
                    
                    {
                    
                    -   "length": 2,
                        
                    -   "width": 4,
                        
                    -   "units": "IN",
                        
                    -   "height": 7
                        
                    
                    }
                    
                
                },
                
            -   "specialInstructions": "Store email: Packagingdeput@telus.net",
                
            -   "rthservice": "REDIRECT",
                
            -   "locationCapabilities":
                
                \[
                
                -   {
                    
                    -   "serviceType": "PRIORITY\_OVERNIGHT",
                        
                    -   "transferOfPossessionType": "DROP\_OFF",
                        
                    -   "carrierCode": "FDXE",
                        
                    -   "daysOfWeek":
                        
                        \[
                        
                        -   "MONDAY",
                            
                        -   "TUESDAY",
                            
                        -   "WEDNESDAY",
                            
                        -   "THURSDAY",
                            
                        -   "FRIDAY"
                            
                        
                        \],
                        
                    -   "serviceCategory": "GROUND\_HOME\_DELIVERY"
                        
                    
                    },
                    
                -   {
                    
                    -   "serviceType": "FEDEX\_GROUND",
                        
                    -   "transferOfPossessionType": "HOLD\_AT\_LOCATION",
                        
                    -   "carrierCode": "FDXG",
                        
                    -   "daysOfWeek":
                        
                        \[
                        
                        -   "MONDAY",
                            
                        -   "TUESDAY",
                            
                        -   "WEDNESDAY",
                            
                        -   "THURSDAY",
                            
                        -   "FRIDAY",
                            
                        -   "SATURDAY"
                            
                        
                        \],
                        
                    -   "serviceCategory": "GROUND"
                        
                    
                    }
                    
                
                \]
                
            
            }
            
        
        \],
        
    -   "alerts":
        
        \[
        
        -   {
            
            -   "code": "string",
                
            -   "alertType": "NOTE",
                
            -   "message": "string"
                
            
            }
            
        
        \],
        
    -   "nearestLocation":
        
        {
        
        -   "distance":
            
            {
            
            -   "units": "KM",
                
            -   "value": 3.5
                
            
            },
            
        -   "contactAndAddress":
            
            {
            
            -   "address":
                
                {
                
                -   "streetLines":
                    
                    \[
                    
                    -   "1640 Union Blvd",
                        
                    -   "streetLine2"
                        
                    
                    \],
                    
                -   "city": "Beverly Hills",
                    
                -   "postalCode": "90210",
                    
                -   "countryCode": "US",
                    
                -   "residential": false
                    
                
                },
                
            -   "displayName": "John Taylor",
                
            -   "contact":
                
                {
                
                -   "personName": "John Taylor",
                    
                -   "emailAddress": "xxxxlor@fedex.com",
                    
                -   "phoneNumber": "xxxxxxxx12",
                    
                -   "phoneExtension": "91",
                    
                -   "companyName": "Fedex",
                    
                -   "faxNumber": "fax number",
                    
                -   "displayName": "jhon",
                    
                -   "stateTaxId": "state tax identifier",
                    
                -   "fedralTaxId": "federal tax identifier"
                    
                
                },
                
            -   "addressAncillaryDetail":
                
                {
                
                -   "locationInCity": "Mill Heights",
                    
                -   "suite": "suite",
                    
                -   "displayName": "jhon",
                    
                -   "adderssVerificationOverrideReason": "MANUAL\_OVERRIDE",
                    
                -   "locationInProperty": "back building north",
                    
                -   "addtionalDescriptions": "thru south guard gate",
                    
                -   "department": "R&D",
                    
                -   "roomFloor": 302,
                    
                -   "crossStreet": "First and Main",
                    
                -   "building": "G20",
                    
                -   "apartment": "2b",
                    
                -   "room": "1A"
                    
                
                }
                
            
            },
            
        -   "locationId": "COSA",
            
        -   "storeHours":
            
            \[
            
            -   {
                
                -   "dayofweek": "MONDAY",
                    
                -   "operationalHoursType": "OPEN\_BY\_HOURS",
                    
                -   "operationalHours":
                    
                    \[
                    
                    -   {
                        
                        -   "begins": "08:00:00",
                            
                        -   "ends": "17:00:00"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "exceptionalHoursType": "CLOSED\_ALL\_DAY",
                    
                -   "exceptionalHours":
                    
                    \[
                    
                    -   {
                        
                        -   "begins": "08:00:00",
                            
                        -   "ends": "17:00:00"
                            
                        
                        }
                        
                    
                    \]
                    
                
                },
                
            -   {
                
                -   "dayofweek": "TUESDAY",
                    
                -   "operationalHoursType": "OPEN\_BY\_HOURS",
                    
                -   "operationalHours":
                    
                    \[
                    
                    -   {
                        
                        -   "begins": "08:00:00",
                            
                        -   "ends": "17:00:00"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "exceptionalHoursType": "CLOSED\_ALL\_DAY",
                    
                -   "exceptionalHours":
                    
                    \[
                    
                    -   {
                        
                        -   "begins": "08:00:00",
                            
                        -   "ends": "17:00:00"
                            
                        
                        }
                        
                    
                    \]
                    
                
                }
                
            
            \],
            
        -   "carrierDetailList":
            
            \[
            
            -   {
                
                -   "serviceType": "PRIORITY\_OVERNIGHT",
                    
                -   "countryRelationshipType": "DOMESTIC",
                    
                -   "carrierCodeType": "FDXE",
                    
                -   "latestDropoffDetails":
                    
                    \[
                    
                    -   {
                        
                        -   "dayOfWeek": "MONDAY",
                            
                        -   "operationalOverlay":
                            
                            {
                            
                            -   "time": "time",
                                
                            -   "type": "WEST\_COAST"
                                
                            
                            },
                            
                        -   "exceptionalTime": "08:30:00",
                            
                        -   "exceptionalOverlay":
                            
                            {
                            
                            -   "time": "09:00:00",
                                
                            -   "type": "WEST\_COAST"
                                
                            
                            },
                            
                        -   "operationTime": "08:30:00"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "serviceCategory": "EXPRESS\_FREIGHT"
                    
                
                },
                
            -   {
                
                -   "serviceType": "STANDARD\_OVERNIGHT",
                    
                -   "countryRelationshipType": "DOMESTIC",
                    
                -   "carrierCodeType": "FDXE",
                    
                -   "latestDropoffDetails":
                    
                    \[
                    
                    -   {
                        
                        -   "dayOfWeek": "TUESDAY",
                            
                        -   "operationalOverlay":
                            
                            {
                            
                            -   "time": "09:00:00",
                                
                            -   "type": "WEST\_COAST"
                                
                            
                            },
                            
                        -   "exceptionalTime": "07:00:00",
                            
                        -   "exceptionalOverlay":
                            
                            {
                            
                            -   "time": "02:00:00",
                                
                            -   "type": "WEST\_COAST"
                                
                            
                            },
                            
                        -   "operationTime": "06:00:00"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "serviceCategory": "EXPRESS\_FREIGHT"
                    
                
                }
                
            
            \],
            
        -   "geoPositionalCoordinates":
            
            {
            
            -   "latitude": 5.637376,
                
            -   "longitude": 3.61607
                
            
            },
            
        -   "locationType": "FEDEX\_AUTHORIZED\_SHIP\_CENTER",
            
        -   "locationAttributeTypes":
            
            \[
            
            -   "ACCEPTS\_CASH",
                
            -   "COPY\_AND\_PRINT\_SERVICES"
                
            
            \],
            
        -   "lockerAvailability": false,
            
        -   "packageMaximumLimits":
            
            {
            
            -   "weight":
                
                {
                
                -   "units": "KG",
                    
                -   "value": 68
                    
                
                },
                
            -   "dimensions":
                
                {
                
                -   "length": 2,
                    
                -   "width": 4,
                    
                -   "units": "IN",
                    
                -   "height": 7
                    
                
                }
                
            
            },
            
        -   "specialInstructions": "Store email: Packagingdeput@telus.net",
            
        -   "rthservice": "REDIRECT",
            
        -   "locationCapabilities":
            
            \[
            
            -   {
                
                -   "serviceType": "PRIORITY\_OVERNIGHT",
                    
                -   "transferOfPossessionType": "DROP\_OFF",
                    
                -   "carrierCode": "FDXE",
                    
                -   "daysOfWeek":
                    
                    \[
                    
                    -   "MONDAY",
                        
                    -   "TUESDAY",
                        
                    -   "WEDNESDAY",
                        
                    -   "THURSDAY",
                        
                    -   "FRIDAY"
                        
                    
                    \],
                    
                -   "serviceCategory": "GROUND\_HOME\_DELIVERY"
                    
                
                },
                
            -   {
                
                -   "serviceType": "FEDEX\_GROUND",
                    
                -   "transferOfPossessionType": "HOLD\_AT\_LOCATION",
                    
                -   "carrierCode": "FDXG",
                    
                -   "daysOfWeek":
                    
                    \[
                    
                    -   "MONDAY",
                        
                    -   "TUESDAY",
                        
                    -   "WEDNESDAY",
                        
                    -   "THURSDAY",
                        
                    -   "FRIDAY",
                        
                    -   "SATURDAY"
                        
                    
                    \],
                    
                -   "serviceCategory": "GROUND"
                    
                
                }
                
            
            \]
            
        
        },
        
    -   "latestLocation":
        
        {
        
        -   "distance":
            
            {
            
            -   "units": "KM",
                
            -   "value": 3.5
                
            
            },
            
        -   "contactAndAddress":
            
            {
            
            -   "address":
                
                {
                
                -   "streetLines":
                    
                    \[
                    
                    -   "1640 Union Blvd",
                        
                    -   "streetLine2"
                        
                    
                    \],
                    
                -   "city": "Beverly Hills",
                    
                -   "postalCode": "90210",
                    
                -   "countryCode": "US",
                    
                -   "residential": false
                    
                
                },
                
            -   "displayName": "John Taylor",
                
            -   "contact":
                
                {
                
                -   "personName": "John Taylor",
                    
                -   "emailAddress": "xxxxlor@fedex.com",
                    
                -   "phoneNumber": "xxxxxxxx12",
                    
                -   "phoneExtension": "91",
                    
                -   "companyName": "Fedex",
                    
                -   "faxNumber": "fax number",
                    
                -   "displayName": "jhon",
                    
                -   "stateTaxId": "state tax identifier",
                    
                -   "fedralTaxId": "federal tax identifier"
                    
                
                },
                
            -   "addressAncillaryDetail":
                
                {
                
                -   "locationInCity": "Mill Heights",
                    
                -   "suite": "suite",
                    
                -   "displayName": "jhon",
                    
                -   "adderssVerificationOverrideReason": "MANUAL\_OVERRIDE",
                    
                -   "locationInProperty": "back building north",
                    
                -   "addtionalDescriptions": "thru south guard gate",
                    
                -   "department": "R&D",
                    
                -   "roomFloor": 302,
                    
                -   "crossStreet": "First and Main",
                    
                -   "building": "G20",
                    
                -   "apartment": "2b",
                    
                -   "room": "1A"
                    
                
                }
                
            
            },
            
        -   "locationId": "COSA",
            
        -   "storeHours":
            
            \[
            
            -   {
                
                -   "dayofweek": "MONDAY",
                    
                -   "operationalHoursType": "OPEN\_BY\_HOURS",
                    
                -   "operationalHours":
                    
                    \[
                    
                    -   {
                        
                        -   "begins": "08:00:00",
                            
                        -   "ends": "17:00:00"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "exceptionalHoursType": "CLOSED\_ALL\_DAY",
                    
                -   "exceptionalHours":
                    
                    \[
                    
                    -   {
                        
                        -   "begins": "08:00:00",
                            
                        -   "ends": "17:00:00"
                            
                        
                        }
                        
                    
                    \]
                    
                
                },
                
            -   {
                
                -   "dayofweek": "TUESDAY",
                    
                -   "operationalHoursType": "OPEN\_BY\_HOURS",
                    
                -   "operationalHours":
                    
                    \[
                    
                    -   {
                        
                        -   "begins": "08:00:00",
                            
                        -   "ends": "17:00:00"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "exceptionalHoursType": "CLOSED\_ALL\_DAY",
                    
                -   "exceptionalHours":
                    
                    \[
                    
                    -   {
                        
                        -   "begins": "08:00:00",
                            
                        -   "ends": "17:00:00"
                            
                        
                        }
                        
                    
                    \]
                    
                
                }
                
            
            \],
            
        -   "carrierDetailList":
            
            \[
            
            -   {
                
                -   "serviceType": "PRIORITY\_OVERNIGHT",
                    
                -   "countryRelationshipType": "DOMESTIC",
                    
                -   "carrierCodeType": "FDXE",
                    
                -   "latestDropoffDetails":
                    
                    \[
                    
                    -   {
                        
                        -   "dayOfWeek": "MONDAY",
                            
                        -   "operationalOverlay":
                            
                            {
                            
                            -   "time": "time",
                                
                            -   "type": "WEST\_COAST"
                                
                            
                            },
                            
                        -   "exceptionalTime": "08:30:00",
                            
                        -   "exceptionalOverlay":
                            
                            {
                            
                            -   "time": "09:00:00",
                                
                            -   "type": "WEST\_COAST"
                                
                            
                            },
                            
                        -   "operationTime": "08:30:00"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "serviceCategory": "EXPRESS\_FREIGHT"
                    
                
                },
                
            -   {
                
                -   "serviceType": "STANDARD\_OVERNIGHT",
                    
                -   "countryRelationshipType": "DOMESTIC",
                    
                -   "carrierCodeType": "FDXE",
                    
                -   "latestDropoffDetails":
                    
                    \[
                    
                    -   {
                        
                        -   "dayOfWeek": "TUESDAY",
                            
                        -   "operationalOverlay":
                            
                            {
                            
                            -   "time": "09:00:00",
                                
                            -   "type": "WEST\_COAST"
                                
                            
                            },
                            
                        -   "exceptionalTime": "07:00:00",
                            
                        -   "exceptionalOverlay":
                            
                            {
                            
                            -   "time": "02:00:00",
                                
                            -   "type": "WEST\_COAST"
                                
                            
                            },
                            
                        -   "operationTime": "06:00:00"
                            
                        
                        }
                        
                    
                    \],
                    
                -   "serviceCategory": "EXPRESS\_FREIGHT"
                    
                
                }
                
            
            \],
            
        -   "geoPositionalCoordinates":
            
            {
            
            -   "latitude": 5.637376,
                
            -   "longitude": 3.61607
                
            
            },
            
        -   "locationType": "FEDEX\_AUTHORIZED\_SHIP\_CENTER",
            
        -   "locationAttributeTypes":
            
            \[
            
            -   "ACCEPTS\_CASH",
                
            -   "COPY\_AND\_PRINT\_SERVICES"
                
            
            \],
            
        -   "lockerAvailability": false,
            
        -   "packageMaximumLimits":
            
            {
            
            -   "weight":
                
                {
                
                -   "units": "KG",
                    
                -   "value": 68
                    
                
                },
                
            -   "dimensions":
                
                {
                
                -   "length": 2,
                    
                -   "width": 4,
                    
                -   "units": "IN",
                    
                -   "height": 7
                    
                
                }
                
            
            },
            
        -   "specialInstructions": "Store email: Packagingdeput@telus.net",
            
        -   "rthservice": "REDIRECT",
            
        -   "locationCapabilities":
            
            \[
            
            -   {
                
                -   "serviceType": "PRIORITY\_OVERNIGHT",
                    
                -   "transferOfPossessionType": "DROP\_OFF",
                    
                -   "carrierCode": "FDXE",
                    
                -   "daysOfWeek":
                    
                    \[
                    
                    -   "MONDAY",
                        
                    -   "TUESDAY",
                        
                    -   "WEDNESDAY",
                        
                    -   "THURSDAY",
                        
                    -   "FRIDAY"
                        
                    
                    \],
                    
                -   "serviceCategory": "GROUND\_HOME\_DELIVERY"
                    
                
                },
                
            -   {
                
                -   "serviceType": "FEDEX\_GROUND",
                    
                -   "transferOfPossessionType": "HOLD\_AT\_LOCATION",
                    
                -   "carrierCode": "FDXG",
                    
                -   "daysOfWeek":
                    
                    \[
                    
                    -   "MONDAY",
                        
                    -   "TUESDAY",
                        
                    -   "WEDNESDAY",
                        
                    -   "THURSDAY",
                        
                    -   "FRIDAY",
                        
                    -   "SATURDAY"
                        
                    
                    \],
                    
                -   "serviceCategory": "GROUND"
                    
                
                }
                
            
            \]
            
        
        },
        
    -   "ambiguousAddress":
        
        \[
        
        -   {
            
            -   "distance":
                
                {
                
                -   "units": "KM",
                    
                -   "value": 3.5
                    
                
                },
                
            -   "contactAndAddress":
                
                {
                
                -   "address":
                    
                    {
                    
                    -   "streetLines":
                        
                        \[
                        
                        -   "1640 Union Blvd",
                            
                        -   "streetLine2"
                            
                        
                        \],
                        
                    -   "city": "Beverly Hills",
                        
                    -   "postalCode": "90210",
                        
                    -   "countryCode": "US",
                        
                    -   "residential": false
                        
                    
                    },
                    
                -   "displayName": "John Taylor",
                    
                -   "contact":
                    
                    {
                    
                    -   "personName": "John Taylor",
                        
                    -   "emailAddress": "xxxxlor@fedex.com",
                        
                    -   "phoneNumber": "xxxxxxxx12",
                        
                    -   "phoneExtension": "91",
                        
                    -   "companyName": "Fedex",
                        
                    -   "faxNumber": "fax number",
                        
                    -   "displayName": "jhon",
                        
                    -   "stateTaxId": "state tax identifier",
                        
                    -   "fedralTaxId": "federal tax identifier"
                        
                    
                    },
                    
                -   "addressAncillaryDetail":
                    
                    {
                    
                    -   "locationInCity": "Mill Heights",
                        
                    -   "suite": "suite",
                        
                    -   "displayName": "jhon",
                        
                    -   "adderssVerificationOverrideReason": "MANUAL\_OVERRIDE",
                        
                    -   "locationInProperty": "back building north",
                        
                    -   "addtionalDescriptions": "thru south guard gate",
                        
                    -   "department": "R&D",
                        
                    -   "roomFloor": 302,
                        
                    -   "crossStreet": "First and Main",
                        
                    -   "building": "G20",
                        
                    -   "apartment": "2b",
                        
                    -   "room": "1A"
                        
                    
                    }
                    
                
                },
                
            -   "locationId": "COSA",
                
            -   "storeHours":
                
                \[
                
                -   {
                    
                    -   "dayofweek": "MONDAY",
                        
                    -   "operationalHoursType": "OPEN\_BY\_HOURS",
                        
                    -   "operationalHours":
                        
                        \[
                        
                        -   {
                            
                            -   "begins": "08:00:00",
                                
                            -   "ends": "17:00:00"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "exceptionalHoursType": "CLOSED\_ALL\_DAY",
                        
                    -   "exceptionalHours":
                        
                        \[
                        
                        -   {
                            
                            -   "begins": "08:00:00",
                                
                            -   "ends": "17:00:00"
                                
                            
                            }
                            
                        
                        \]
                        
                    
                    },
                    
                -   {
                    
                    -   "dayofweek": "TUESDAY",
                        
                    -   "operationalHoursType": "OPEN\_BY\_HOURS",
                        
                    -   "operationalHours":
                        
                        \[
                        
                        -   {
                            
                            -   "begins": "08:00:00",
                                
                            -   "ends": "17:00:00"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "exceptionalHoursType": "CLOSED\_ALL\_DAY",
                        
                    -   "exceptionalHours":
                        
                        \[
                        
                        -   {
                            
                            -   "begins": "08:00:00",
                                
                            -   "ends": "17:00:00"
                                
                            
                            }
                            
                        
                        \]
                        
                    
                    }
                    
                
                \],
                
            -   "carrierDetailList":
                
                \[
                
                -   {
                    
                    -   "serviceType": "PRIORITY\_OVERNIGHT",
                        
                    -   "countryRelationshipType": "DOMESTIC",
                        
                    -   "carrierCodeType": "FDXE",
                        
                    -   "latestDropoffDetails":
                        
                        \[
                        
                        -   {
                            
                            -   "dayOfWeek": "MONDAY",
                                
                            -   "operationalOverlay":
                                
                                {
                                
                                -   "time": "time",
                                    
                                -   "type": "WEST\_COAST"
                                    
                                
                                },
                                
                            -   "exceptionalTime": "08:30:00",
                                
                            -   "exceptionalOverlay":
                                
                                {
                                
                                -   "time": "09:00:00",
                                    
                                -   "type": "WEST\_COAST"
                                    
                                
                                },
                                
                            -   "operationTime": "08:30:00"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "serviceCategory": "EXPRESS\_FREIGHT"
                        
                    
                    },
                    
                -   {
                    
                    -   "serviceType": "STANDARD\_OVERNIGHT",
                        
                    -   "countryRelationshipType": "DOMESTIC",
                        
                    -   "carrierCodeType": "FDXE",
                        
                    -   "latestDropoffDetails":
                        
                        \[
                        
                        -   {
                            
                            -   "dayOfWeek": "TUESDAY",
                                
                            -   "operationalOverlay":
                                
                                {
                                
                                -   "time": "09:00:00",
                                    
                                -   "type": "WEST\_COAST"
                                    
                                
                                },
                                
                            -   "exceptionalTime": "07:00:00",
                                
                            -   "exceptionalOverlay":
                                
                                {
                                
                                -   "time": "02:00:00",
                                    
                                -   "type": "WEST\_COAST"
                                    
                                
                                },
                                
                            -   "operationTime": "06:00:00"
                                
                            
                            }
                            
                        
                        \],
                        
                    -   "serviceCategory": "EXPRESS\_FREIGHT"
                        
                    
                    }
                    
                
                \],
                
            -   "geoPositionalCoordinates":
                
                {
                
                -   "latitude": 5.637376,
                    
                -   "longitude": 3.61607
                    
                
                },
                
            -   "locationType": "FEDEX\_AUTHORIZED\_SHIP\_CENTER",
                
            -   "locationAttributeTypes":
                
                \[
                
                -   "ACCEPTS\_CASH",
                    
                -   "COPY\_AND\_PRINT\_SERVICES"
                    
                
                \],
                
            -   "lockerAvailability": false,
                
            -   "packageMaximumLimits":
                
                {
                
                -   "weight":
                    
                    {
                    
                    -   "units": "KG",
                        
                    -   "value": 68
                        
                    
                    },
                    
                -   "dimensions":
                    
                    {
                    
                    -   "length": 2,
                        
                    -   "width": 4,
                        
                    -   "units": "IN",
                        
                    -   "height": 7
                        
                    
                    }
                    
                
                },
                
            -   "specialInstructions": "Store email: Packagingdeput@telus.net",
                
            -   "rthservice": "REDIRECT",
                
            -   "locationCapabilities":
                
                \[
                
                -   {
                    
                    -   "serviceType": "PRIORITY\_OVERNIGHT",
                        
                    -   "transferOfPossessionType": "DROP\_OFF",
                        
                    -   "carrierCode": "FDXE",
                        
                    -   "daysOfWeek":
                        
                        \[
                        
                        -   "MONDAY",
                            
                        -   "TUESDAY",
                            
                        -   "WEDNESDAY",
                            
                        -   "THURSDAY",
                            
                        -   "FRIDAY"
                            
                        
                        \],
                        
                    -   "serviceCategory": "GROUND\_HOME\_DELIVERY"
                        
                    
                    },
                    
                -   {
                    
                    -   "serviceType": "FEDEX\_GROUND",
                        
                    -   "transferOfPossessionType": "HOLD\_AT\_LOCATION",
                        
                    -   "carrierCode": "FDXG",
                        
                    -   "daysOfWeek":
                        
                        \[
                        
                        -   "MONDAY",
                            
                        -   "TUESDAY",
                            
                        -   "WEDNESDAY",
                            
                        -   "THURSDAY",
                            
                        -   "FRIDAY",
                            
                        -   "SATURDAY"
                            
                        
                        \],
                        
                    -   "serviceCategory": "GROUND"
                        
                    
                    }
                    
                
                \]
                
            
            }
            
        
        \],
        
    -   "ambiguousLocationsReturned": false,
        
    -   "nearestLocationReturned": false,
        
    -   "latestLocationReturned": false,
        
    -   "lockerAvailabilityCode": 25,
        
    -   "lockerAvailabilityMessage": "Locker availability lookup is not available. Note: this is decouple state.",
        
    -   "location":
        
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
            
        -   "longLat":
            
            {
            
            -   "latitude": 5.637376,
                
            -   "longitude": 3.61607
                
            
            }
            
        
        },
        
    -   "phoneNumber": "9015551234",
        
    -   "multipleMatchesAction": "RETURN\_ALL",
        
    -   "sort":
        
        {
        
        -   "criteria": "DISTANCE",
            
        -   "order": "ASCENDING"
            
        
        },
        
    -   "trackingInfo":
        
        {
        
        -   "uniqueTrackingId": "789645",
            
        -   "trackingNumber": "123456789012",
            
        -   "shipDate": "2019-10-13"
            
        
        },
        
    -   "sameState": true,
        
    -   "sameCountry": true,
        
    -   "redirectToHoldType": "FEDEX\_GROUND",
        
    -   "locationAttrTypes":
        
        \[
        
        -   "ACCEPTS\_CASH",
            
        -   "PACK\_AND\_SHIP"
            
        
        \],
        
    -   "locationCapabilities":
        
        \[
        
        -   {
            
            -   "carrierCode": "FDXE",
                
            -   "serviceType": "PRIORITY\_OVERNIGHT",
                
            -   "transferOfPossessionType": "DROPOFF",
                
            -   "serviceCategory": "EXPRESS\_FREIGHT",
                
            -   "daysOfWeek":
                
                \[
                
                -   "MON",
                    
                -   "TUE"
                    
                
                \]
                
            
            }
            
        
        \],
        
    -   "packageMaximumLimits":
        
        \[
        
        -   {
            
            -   "weight":
                
                {
                
                -   "units": "LB",
                    
                -   "value": 150
                    
                
                },
                
            -   "dimensions":
                
                {
                
                -   "length": 20,
                    
                -   "width": 40,
                    
                -   "units": "IN",
                    
                -   "height": 70
                    
                
                },
                
            -   "serviceOptions":
                
                \[
                
                -   "DRY\_ICE"
                    
                
                \]
                
            
            }
            
        
        \],
        
    -   "locationTypes":
        
        \[
        
        -   "FEDEX\_AUTHORIZED\_SHIP\_CENTER"
            
        
        \],
        
    -   "includeHoliday": true,
        
    -   "dropoffTime": "09:30:00",
        
    -   "dropOffServiceType": "GROUND",
        
    -   "searchBy": "searchBy",
        
    -   "contentOptions": "HOLIDAYS",
        
    -   "carrierCodes":
        
        \[
        
        -   "FDXE"
            
        
        \],
        
    -   "getCall": false
        
    
    }
    

}

## Error Codes

-   ADDRESS.DETAILS.REQUIRED
    
    Address is required
    
-   ADDRESS.MINIMUMLENGTH.REQUIRED
    
    Address must be at least 3 characters.
    
-   CARRIAGEVALUE.EXCEEDS.CUSTOMVALUE
    
    The carriage value cannot exceed the customs value. The carriage value is optional. Please refer to the FedEx Service Guide.
    
-   CITYNAME.MINIMUMLENGTH.ERROR
    
    City name must be at least 3 characters.
    
-   COMPANYNAME.MINIMUMLENGTH.ERROR
    
    Company name must be at least 3 characters.
    
-   CONTACT.NAME.REQUIRED
    
    Contact name is required
    
-   CONTACTNAME.MINIMUMLENGTH.ERROR
    
    Contact name must be at least 2 characters
    
-   COUNTRY.LOCATION.REQUIRED
    
    Select a Country/Location.
    
-   COUNTRY.POSTALCODEORZIP.INVALID
    
    Invalid postal code/ZIP for the country selected. Please correct and try again.
    
-   CURRENCY.TYPE.INVALID
    
    The currency type you selected is invalid. Please select another currency type.
    
-   CURRENCYTYPE.CADORUSD.REQUIRED
    
    CAD or USD are the only currency types available. Please select CAD or USD as your currency type.
    
-   POSTALCODE.ZIPCODE.REQUIRED
    
    Postal code/ZIP is required
    
-   WEIGHT.NONNUMERIC.ERROR
    
    Enter a numeric value for weight
    
-   ADDRESS.MATCHTYPE.INVALID
    
    Address match type is invalid.
    
-   ERROR.LONGLAT.REQUIRED
    
    Longitude and Latitude are required.
    
-   CONTENT.OPTIONS.INVALID
    
    Invalid Content Options.
    
-   COUNTRY.CODE.SUPPORTED
    
    This Country Code is not supported.
    
-   DESTINATION.ADDRESS.INVALID
    
    Destination address is invalid.
    
-   DESTINATION.COUNTRY.INVALID
    
    Invalid destination country code
    
-   DESTINATION.GEO.INVALID
    
    Destination geo coordinates is invalid.
    
-   DESTINATION.POSTALCITY.INVALID
    
    Destination postal code and city are required.
    
-   DESTINATION.STATE.REQUIRED
    
    Destination state is required.
    
-   DISTANCE.UNIT.INVALID
    
    Distance unit is invalid.
    
-   DROPOFF.TIME.INVALID
    
    Invalid Drop off Time.
    
-   EFFECTIVE.DATE.INVALID
    
    Invalid effective date.
    
-   FEDEX.LOCATIONTYPE.INVALID
    
    Invalid FedEx Location Type.
    
-   GEO.BLANK.INVALID
    
    Geographical Coordinates is blank or invalid.
    
-   LOCATION.ATTRIBUTE.INVALID
    
    Invalid Location Attributes..
    
-   LOCATIONS.ORIGINCOUNTRY.NOTFOUND
    
    Origin country is invalid.
    
-   LOCATIONSEARCH.CRITERION.REQUIRED
    
    The Locations Search Criterion is required.
    
-   LOCATIONSERVICES.ADDRESSDETAILS.REQUIRED
    
    The Address is required.
    
-   LOCKER.NOT.AVAILABLE
    
    Locker availability is not available
    
-   MULTIPLEMATCH.NULL.INVALID
    
    MultipleMatchesAction is null or invalid.
    
-   NORESULT.TO.RETURN
    
    No result returned.
    
-   ORIGIN.ADDRESS.INVALID
    
    Origin address is invalid.
    
-   ORIGIN.GEO.INVALID
    
    Origin geo coordinates is invalid.
    
-   ORIGIN.STATE.REQUIRED
    
    Origin state is required.
    
-   ORIGINALPOSTAL.CITY.REQUIRED
    
    Original postal code and city are required.
    
-   POSTALCODE.VALUE.REQUIRED
    
    Postal Code is required.
    
-   RADIUS.UNITS.INVALID
    
    Invalid Radius units.
    
-   DISTANCE.VALUE.INVALID
    
    Invalid Distance value.
    
-   REDIRECTHOLD.COUNTRY.INVALID
    
    Invalid country for redirect to hold.
    
-   REDIRECTTO.HOLDSERVICES.INVALID
    
    Invalid Redirect To Hold Services.
    
-   REQUEST.POSITIVE.NUMBER
    
    Results requested must be a non-negative integer.
    
-   RESULT.TOSKIP.ZERO
    
    Results to skip is less than 0.
    
-   RESULTS.FILTER.INVALID
    
    Invalid Results Filters.
    
-   SEARCH.ORDER.INVALID
    
    Invalid Sort order.
    
-   ACCOUNTNUMBER.MINIMUMLENGTH.REQUIRED
    
    Enter a valid 9-digit FedEx account number.
    
-   PHONE.NUMBER.REQUIRED
    
    Phone Number is a required field. Please update and try again.
    
-   INTERNAL.SERVER.ERROR
    
    We encountered an unexpected error and are working to resolve the issue. We apologize for any inconvenience. Please check back at a later time.
    
-   LOCATION.COUNTRYCODE.REQUIRED
    
    Country Code is required and must be 2 characters long.
    
-   LOCATION.ID.REQUIRED
    
    Location Id is required.
    
-   LOCATION.SORTCRITERIA.INVALID
    
    Invalid Sort criterion.
    
-   LOCATION.SEARCHCRITERIA.INVALID
    
    Invalid Location Search Criterion.
    
-   PHONE.MINIMUMLENGTH.REQUIRED
    
    Phone no. must be 10 digits for U.S. and Canada.
    

    

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