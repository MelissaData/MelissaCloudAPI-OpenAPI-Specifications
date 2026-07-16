// Learn more about how to build React pages in Realm: https://redocly.com/docs/realm/extend/how-to/create-react-page
import React from 'react';

import { Button } from '@redocly/theme';
import { CodeBlock } from '@redocly/theme/components/CodeBlock/CodeBlock';
import { CopyButton } from '@redocly/theme/components/Buttons/CopyButton';
import { Card } from '@redocly/theme/markdoc/components/Cards/Card';
import { Cards } from '@redocly/theme/markdoc/components/Cards/Cards';
import licenseKeyImg from './images/licenseKeyImg.svg';
import chooseApiImg from './images/chooseApiImg.svg';
import sendRequestImg from './images/sendRequestImg.svg';

const code = `curl -X GET "https://address.melissadata.net/V3/WEB/GlobalAddress/doGlobalAddress?&format=JSON&opt=USPreferredCityNames:ON,OutputGeo:ON&a1=22382%20Avenida%20Empresa&admarea=CA&ctry=US&loc=Rancho%20Santa%20Margarita&postal=92688\\
&id={REPLACE-WITH-YOUR-LICENSE-KEY}" \\
-H "Content-Type: application/json" \\
-H "Accept: application/json"
`;
export const frontmatter = {
  seo: {
    title: 'Melissa Cloud APIs | Developer Portal',
    description: 'One-stop hub for all Melissa Cloud API specifications, industry leading tools for address cleansing, enrichment, and verification.',
  },
};

export default function HomePage() {
  return (
    <main>
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
          <Button size="large" variant="secondary" to="/guides/get-started">
            Get Started
          </Button>
        </div>
      </div>

      <div className="home-container">
        <h2>Get started in just 3 simple steps</h2>
        <Cards cardMinWidth={280}>
          <Card title="Step 1 - Get License Key with Credits"
                image = {licenseKeyImg}
                variant="filled"
                layout = "vertical"
                align = "center"
                imagePosition = "start">
            <p><a href="https://apps.melissa.com/user/signin.aspx?src=https://developer.melissa.com/" className="home-link" target="_blank" rel="noopener noreferrer">Sign In</a> or <a href="https://apps.melissa.com/user/new_user.aspx?src=https://developer.melissa.com/" className="home-link" target="_blank" rel="noopener noreferrer">Create An Account</a> to get a License Key with Credits to use our APIs.</p>
            <p><a href="https://docs.melissa.com/melissa/license/license-information.html" className="home-link" target="_blank" rel="noopener noreferrer">License Key Information</a>.
            </p>
          </Card>

          <Card title="Step 2 - Choose the optimal API for your needs"
                image={chooseApiImg}
                variant="filled"
                layout = "vertical"
                align = "center"
                imagePosition = "start">
            <p>Explore our extensive catalog of APIs for address validation, data enrichment, and more.</p>
            <p><a href="#location-based-services" className="home-link">Choose an API to start</a>.</p>
          </Card>

          <Card title="Step 3 - Make your first API call"
                image={sendRequestImg}
                variant="filled"
                layout = "vertical"
                align = "center"
                imagePosition = "start">
            <p>Try out this cURL command to test the API, replace with your License Key.</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'left'}}>
              <CopyButton data={code} type="compound" buttonText="Copy" />
              <CodeBlock lang="curl" source={code}/>
            </div>
          </Card>
        </Cards>
      </div>

      <div className="home-container" id="location-based-services">
        <h2>Location Based Services</h2>
        <Cards cardMinWidth={280}>
          <span>
            <Card title="Global Address Verification" to="/apis/global-address-verification" variant="elevated">
                Verify and standardize U.S. and international addresses in over 250+ countries and territories with Postal Authority certified coding and premise level Geocoding.
            </Card>
          </span>
          <span>
            <Card title="Global IP" to="/apis/global-ip" variant="elevated">
                Utilize 20+ unique dynamic techniques to return a geolocation of an input IP address with latitude and longitude, proxy info, city, region, and country.
            </Card>
          </span>
          <span>
            <Card title="Property" to="/apis/property" variant="elevated">
                Return comprehensive property and mortgage info for over 140 million U.S. properties based on supplied Assessor Parcel Number or input address.
            </Card>
          </span>
          <span>
            <Card title="Reverse GeoCoder" to="/apis/reverse-geocoder" variant="elevated">
                Return a set of complete addresses in a radius from an input latitude and longitude coordinates, or pass in a list of locations and get the nearest location to your input coordinates.
            </Card>
          </span>
          <span>
            <Card title="SmartMover US" to="/apis/smartmover-us" variant="elevated">
                Validate and standardize addresses, detect moves, and provide an updated address for an individual or business using data from the USPS.
            </Card>
          </span>
        </Cards>
        <div className="home-button-container">
          <Button type="button" variant="secondary" size="small" to="/guides/get-started" >
            See more APIs
          </Button>
        </div>
      </div>

      <div className="home-container">
        <h2>Business & Identification Services</h2>
        <Cards cardMinWidth={280}>
          <span>
            <Card title="Personator Consumer" to="/apis/personator-consumer" variant="elevated">
                USPS CASS/DPV certified address checking, name parsing and genderizing, phone and email verification are easily performed with API.
            </Card>
          </span>
          <span>
            <Card title="Global Email" to="/apis/global-email" variant="elevated">
                Verify email mailboxes, syntax, and domains in real-time to confirm they are deliverable. Takes an input email address and returns a status of deliverability to the box level, as well as returns domain information.
            </Card>
          </span>
          <span>
            <Card title="US Business Coder" to="/apis/us-business-coder" variant="elevated">
                Return detailed firmographic data on 25+ million U.S. companies including contact title, address, phone and email by supplying an input Business name, Stock Ticker or Business Address.
            </Card>
          </span>
          <span>
            <Card title="Global Name" to="/apis/global-name" variant="elevated">
                Verify, standardize and parse person and business names while identifying suspicious or vulgar names by sending in a full name. Now input a country name for culture-appropriate parsing!
            </Card>
          </span>
          <span>
            <Card title="Global Phone" to="/apis/global-phone" variant="elevated">
                Verify phone as active, output Caller ID info, as well identifies line type, and returns geographic details, dominant language and carrier for over 250+ countries. Now includes Caller ID information!
            </Card>
          </span>
        </Cards>
        <div className="home-button-container">
          <Button type="button" variant="secondary" size="small" to="/guides/get-started">
            See more APIs
          </Button>
        </div>
      </div>

      <div className="home-container">
        <div className="home-contact">
          <h3>Need help?</h3>
          <div className="home-button-container">
            <Button
              variant="outlined"
              size="large"
              to="https://www.melissa.com/company/contact"
              external
              target="_blank"
            >
              Contact Us
            </Button>
            <Button
              variant="outlined"
              size="large"
              to="https://docs.melissa.com"
              external
              target="_blank"
            >
              Read Melissa Docs
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

