// Learn more about how to build React pages in Realm: https://redocly.com/docs/realm/extend/how-to/create-react-page
import React from 'react';

import { Button } from '@redocly/theme';
import { CodeBlock } from '@redocly/theme/components/CodeBlock/CodeBlock';
import { CopyButton } from '@redocly/theme/components/Buttons/CopyButton';
import { Card } from '@redocly/theme/markdoc/components/Cards/Card';
import { Cards } from '@redocly/theme/markdoc/components/Cards/Cards';

const code = `curl -X GET "https://address.melissadata.net/V3/WEB/GlobalAddress/doGlobalAddress?\\
&format=JSON\\
&id={{licenseKey}}\\
&opt=USPreferredCityNames:ON,OutputGeo:ON\\
&t=Test\\
&a1=22382%20Avenida%20Empresa\\
&admarea=CA\\
&ctry=US\\
&loc=Rancho%20Santa%20Margarita\\
&org=Melissa\\
&postal=92688" \\
-H "Content-Type: application/json" \\
-H "Accept: application/json"
`;

export default function HomePage() {
  return (
    <div>
      <div className="home-hero">
        <div className="home-hero-bg" />
        {/* <Image srcSet={`${require('./images/grid.svg')} light, ${require('./images/grid-dark.svg')} dark`} /> */}
        <div
          style={{
            maxWidth: '1040px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            color: 'var(--color-white)'
          }}
        >
          <h1>Melissa Developer Portal</h1>
          <h2>for Developers, by Developers</h2>
          <p>Instantly integrate address, name, email, and phone validation into your apps to prevent fraud, reduce lost shipments, and minimize returned mail. </p>
          <p>Melissa’s scalable APIs deliver clean, reliable data for analytics, BI, and e-commerce; plus flexible endpoints for batch or single-record processing. Power up your next project with developer-friendly docs, affordable pricing, and the freedom to combine multiple APIs for custom solutions.</p>
          <Button size="large" variant="secondary" to="/guides/quickstart">
            Get Started
          </Button>
        </div>
      </div>

      <div className="home-container">
        <h2>Get started in just 3 simple steps</h2>
        <div className="home-step">
          <div className="home-step-card">
            <img src={require('./images/melissa-license-key-icon-500.png')} alt="Get License Key" style={{ width: '150px', height: '150px' }} />
            <div>
              <h4>Step 1 - Get License Key with Credits</h4>
              <p>
                Follow the instructions in <a href="https://docs.melissa.com/melissa/license/license-information.html" target="_blank" rel="noopener noreferrer" style={{color:"#1DA5DE"}}>License Key Information</a> to obtain your License Key with Credits and start using the API.
              </p>
              <p>
                Visit <a href="https://www.melissa.com/pricing#purchase-credits" target="_blank" rel="noopener noreferrer" style={{color:"#1DA5DE"}}>Melissa Pricing Page</a> for Credits Pricing.
              </p>
            </div>
          </div>
          <img src={require('./images/next-right.png')} alt="To Step 2" style={{ minHeight: '50px', maxHeight: '150px'}} />
        </div>
        <div className="home-step">
          <img src={require('./images/next-left.png')} alt="To Step 3" style={{ minHeight: '50px', maxHeight: '150px'}} />
          <a className="home-step-card-link" href="/apis/global-address-verification">
            <div>
              <h4>Step 2 - Choose the optimal API for your needs</h4>
              <p>Select an API from our extensive catalog to get started.</p>
            </div>
            <img src={require('./images/pick-api.png')} alt="Pick an API" style={{ width: '200px', height: '200px' }} />
          </a>
        </div>
        <div className="home-step">
          <div className="home-step-card">
            <img src={require('./images/api-call.png')} alt="Make API Call" style={{ width: '150px', height: '150px' }} />
            <div>
              <h4>Step 3 - Make your first API call</h4>
              <p>Try out the following cURL command to test the API, replace with your License Key.</p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <CopyButton data={code} />
              <CodeBlock lang="curl" source={code} />
              </div>
            </div>
          </div>
          <img src={require('./images/api-response.png')} alt="API Response" style={{ maxHeight: '150px' }} />
        </div>
      </div>

      <div className="home-container">
        <h2>Location Based Services</h2>
        <Cards>
          <Card title="Global Address Verification" to="/apis/global-address-verification">
            Verify and standardize U.S. and international addresses in over 200 countries and 46 territories with Postal Authority certified coding and premise level Geocoding.
          </Card>
          <Card title="Global IP" to="/apis/global-ip">
            Utilize 20+ unique dynamic techniques to return a geolocation of an input IP address with latitude and longitude, proxy info, city, region, and country.
          </Card>
          <Card title="Property" to="/apis/property">
            Return comprehensive property and mortgage info for over 140 million U.S. properties based on supplied Assessor Parcel Number or input address.
          </Card>
          <Card title="Reverse GeoCoder" to="/apis/reverse-geocoder">
            Return a set of complete addresses in a radius from an input latitude and longitude coordinates, or pass in a list of locations and get the nearest location to your input coordinates.
          </Card>
          <Card title="SmartMover US" to="/apis/smartmover-us">
            <p>Provides the most updated address validation and change of address services from USPS and Canada Post data respectively.</p>
          </Card>
        </Cards>
      </div>

      <div className="home-container">
        <h2>Business & Identification Services</h2>
        <Cards>
          <Card title="Personator Consumer" to="/apis/personator-consumer">
            USPS CASS/DPV certified address checking, name parsing and genderizing, phone and email verification are easily performed with API.
          </Card>
          <Card title="Global Email" to="/apis/global-email">
            Verify email mailboxes, syntax, and domains in real-time to confirm they are deliverable. Takes an input email address and returns a status of deliverability to the box level, as well as returns domain information.
          </Card>
          <Card title="US Business Coder" to="/apis/us-business-coder">
            Return detailed firmographic data on 25+ million U.S. companies including contact title, address, phone and email by supplying an input Business name, Stock Ticker or Business Address.
          </Card>
          <Card title="Global Name" to="/apis/global-name">
            Verify, standardize and parse person and business names while identifying suspicious or vulgar names by sending in a full name. Now input a country name for culture-appropriate parsing!
          </Card>
          <Card title="Global Phone" to="/apis/global-phone">
            Verify phone as active, output Caller ID info, as well identifies line type, and returns geographic details, dominant language and carrier for over 200 countries. Now includes Caller ID information!
          </Card>
        </Cards>
      </div>

      <div className="home-container">
        <div className="home-contact">
          <h3>Need help?</h3>
          <div className="home-button-container">
            <Button variant="outlined" size="large" onClick={() => window.open("https://www.melissa.com/company/contact", "_blank", "noopener,noreferrer")}>
              Contact Us
            </Button>
            <Button variant="outlined" size="large" onClick={() => window.open("https://docs.melissa.com", "_blank", "noopener,noreferrer")}>
              Read Melissa Docs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

