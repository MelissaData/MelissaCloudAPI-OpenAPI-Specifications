---
seo:
  meta:
    - name: description
      content: "Get started with Melissa Cloud APIs in 3 simple steps. Get your license key, choose an API, and make your first call today."
---

# Get Started with Melissa Developer Portal

Welcome to Melissa Cloud APIs! This quickstart guide will help you get started with Melissa Cloud APIs, allowing you to make your first API call and begin exploring the possibilities of Melissa's products.

## Step 1: Get Your Melissa License Key

Follow the step-by-step instructions to get your License Key at [License Key Information](https://docs.melissa.com/melissa/license/license-information.html).

Your Melissa License Key is required to authenticate all API requests.

## Step 2: Choose An Optimal API
Choose one or multiple APIs from our extensive [API catalog](https://docs.melissa.com/cloud-api/cloud-api.html) to integrate into your project.


## Step 3: Make Your First API Request

Let's start by making a simple request to the Melissa API to verify an address.

### Verify an address

Use the following `cURL` command to verify an address:

```bash
curl -X GET "https://address.melissadata.net/V3/WEB/GlobalAddress/doGlobalAddress?\
&format=JSON\
&id={REPLACE-WITH-YOUR-LICENSE-KEY}\
&opt=USPreferredCityNames:ON,OutputGeo:ON\
&t=Test\
&a1=22382%20Avenida%20Empresa\
&admarea=CA\
&ctry=US\
&loc=Rancho%20Santa%20Margarita\
&org=Melissa\
&postal=92688" \
-H "Content-Type: application/json" \
-H "Accept: application/json"
```

- **`id`**: Replace with your License Key.

### Response Example

```json
{
  "Version": "3.0.1.174",
  "TransmissionReference": "Test",
  "TransmissionResults": "",
  "TotalRecords": "1",
  "Records": [
    {
      "RecordID": "1",
      "Results": "AC16,AV24,GS05",
      "FormattedAddress": "Melissa;22382 Avenida Empresa;Rancho Santa Margarita, CA 92688-2112",
      "Organization": "Melissa",
      "AddressLine1": "22382 Avenida Empresa",
      "AddressLine2": "Rancho Santa Margarita, CA 92688-2112",
      "AddressLine3": "",
      "AddressLine4": "",
      "AddressLine5": "",
      "AddressLine6": "",
      "AddressLine7": "",
      "AddressLine8": "",
      "SubPremises": "",
      "DoubleDependentLocality": "",
      "DependentLocality": "",
      "Locality": "Rancho Santa Margarita",
      "SubAdministrativeArea": "Orange",
      "AdministrativeArea": "CA",
      "PostalCode": "92688-2112",
      "PostalCodeType": " ",
      "AddressType": "S",
      "AddressKey": "92688211282",
      "SubNationalArea": "",
      "CountryName": "United States of America",
      "CountryISO3166_1_Alpha2": "US",
      "CountryISO3166_1_Alpha3": "USA",
      "CountryISO3166_1_Numeric": "840",
      "CountrySubdivisionCode": "US-CA",
      "Thoroughfare": "Avenida Empresa",
      "ThoroughfarePreDirection": "",
      "ThoroughfareLeadingType": "",
      "ThoroughfareName": "Avenida Empresa",
      "ThoroughfareTrailingType": "",
      "ThoroughfarePostDirection": "",
      "DependentThoroughfare": "",
      "DependentThoroughfarePreDirection": "",
      "DependentThoroughfareLeadingType": "",
      "DependentThoroughfareName": "",
      "DependentThoroughfareTrailingType": "",
      "DependentThoroughfarePostDirection": "",
      "Building": "",
      "PremisesType": "",
      "PremisesNumber": "22382",
      "SubPremisesType": "",
      "SubPremisesNumber": "",
      "PostBox": "",
      "Latitude": "33.637562",
      "Longitude": "-117.606887",
      "DeliveryIndicator": "B",
      "MelissaAddressKey": "8008006245",
      "MelissaAddressKeyBase": "",
      "PostOfficeLocation": "",
      "SubPremiseLevel": "",
      "SubPremiseLevelType": "",
      "SubPremiseLevelNumber": "",
      "SubBuilding": "",
      "SubBuildingType": "",
      "SubBuildingNumber": "",
      "UTC": "UTC-08:00",
      "DST": "Y",
      "DeliveryPointSuffix": "",
      "CensusKey": "060590320531002",
      "Extras": {}
    }
  ]
}
```

## Hooray!!!
You’ve completed your first Address Verification using the Global Address Verification API, one of the most popular APIs by Melissa!

Check out [Global Address Verification API](/apis/global-address-verification.yaml) for more advanced usage.

## Let's keep it rolling

Melissa offers a wide variety of Cloud APIs for you to integrate into your projects. Try out other Melissa Cloud APIs using the License Key from your Melissa Account.
If you need more processing power, do not hesitate to [Contact Us](https://docs.melissa.com/melissa/support/tech-support-index.html).

To jump-start your project with ready-to-use code, please check out [Melissa GitHub](https://github.com/MelissaData?tab=repositories).

Have fun exploring [Melissa Cloud APIs](/apis/global-address-verification.yaml)!
