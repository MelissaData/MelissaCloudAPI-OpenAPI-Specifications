(function () {
  var descriptions = {
    'cicero': 'Cicero API by Melissa. Access legislative district boundaries, elected official data, and geocoding endpoints for political geography.',
    'contribution': 'Contribution API by Melissa. Submit address corrections and updates to improve data quality across Melissa services.',
    'data-retriever': 'Data Retriever API by Melissa. Retrieve demographic, geographic, and property data enrichment for your records.',
    'global-address-verification': 'Global Address Verification API by Melissa. Validate, standardize, and verify mailing addresses worldwide in real time.',
    'global-email': 'Global Email API by Melissa. Validate email addresses, check deliverability, and enrich email data for better outreach.',
    'global-express-entry': 'Global Express Entry API by Melissa. Provide real-time address autocomplete and type-ahead suggestions for web forms.',
    'global-ip': 'Global IP API by Melissa. Geolocate IP addresses and retrieve geographic, ISP, and connection metadata.',
    'global-name': 'Global Name API by Melissa. Parse, validate, and standardize personal and business names globally.',
    'global-phone': 'Global Phone API by Melissa. Validate, standardize, and enrich phone numbers with carrier and location data.',
    'leadgen-business': 'LeadGen Business API by Melissa. Search and retrieve business lead data with firmographic filtering.',
    'leadgen-consumer': 'LeadGen Consumer API by Melissa. Generate consumer leads with demographic and geographic targeting.',
    'leadgen-occupant': 'LeadGen Occupant API by Melissa. Access occupant-level data for targeted marketing and outreach campaigns.',
    'leadgen-property': 'LeadGen Property API by Melissa. Search property records with owner, valuation, and geographic filters.',
    'melissa-keys-lookup': 'Melissa Keys Lookup API. Retrieve Melissa address keys and identifiers for data matching and deduplication.',
    'melissa-releases': 'Melissa Releases API. Access release notes, version history, and update information for Melissa products.',
    'people-business-search': 'People Business Search API by Melissa. Search for individuals and businesses by name, address, phone, or email.',
    'personator-consumer': 'Personator Consumer API by Melissa. Verify, correct, and enrich consumer contact data in a single call.',
    'personator-identity': 'Personator Identity API by Melissa. Verify identity details with name, address, date of birth, and phone matching.',
    'personator-search': 'Personator Search API by Melissa. Search the Melissa consumer database by name, address, phone, email, or IP.',
    'property': 'Property API by Melissa. Access property records, ownership history, deed data, and valuation information.',
    'reverse-geocoder': 'Reverse GeoCoder API by Melissa. Convert latitude and longitude coordinates to addresses and location data.',
    'smartmover-ca': 'SmartMover Canada API by Melissa. Process Canadian NCOA change-of-address updates for mailing list hygiene.',
    'smartmover-us': 'SmartMover US API by Melissa. Process USPS NCOA change-of-address updates for mailing list hygiene.',
    'ssn-name-match': 'SSN Name Match API by Melissa. Verify Social Security Number and name combinations for identity confirmation.',
    'street-route': 'Street Route API by Melissa. Calculate driving distances and routes between geographic coordinates.',
    'token-server': 'Token Server API by Melissa. Generate secure authentication tokens for client-side API access.',
    'us-business-coder': 'US Business Coder API by Melissa. Append firmographic data to business records using name and address input.'
  };

  function getApiSlug() {
    var path = window.location.pathname.replace(/\/+$/, '');
    var segments = path.split('/');
    var apisIdx = segments.indexOf('apis');
    if (apisIdx === -1 || apisIdx >= segments.length - 1) return null;
    return segments[apisIdx + 1].toLowerCase();
  }

  function setMeta(attr, attrVal, content) {
    var el = document.querySelector('meta[' + attr + '="' + attrVal + '"]');
    if (el) {
      el.content = content;
    } else {
      el = document.createElement('meta');
      el.setAttribute(attr, attrVal);
      el.content = content;
      el.setAttribute('data-api-meta', 'true');
      document.head.appendChild(el);
    }
  }

  function removeManagedMeta() {
    document.querySelectorAll('meta[data-api-meta="true"]').forEach(function (el) {
      el.parentNode.removeChild(el);
    });
  }

  function injectMeta() {
    var apiSlug = getApiSlug();

    // Not an API page — remove any previously injected tags
    if (!apiSlug) {
      removeManagedMeta();
      return;
    }

    var desc = descriptions[apiSlug];
    if (!desc) {
      var name = apiSlug.replace(/-/g, ' ').replace(/\b\w/g, function (l) { return l.toUpperCase(); });
      desc = name + ' API documentation by Melissa. Explore endpoints, request and response schemas, and code samples.';
    }

    // Only inject description — don't overwrite tags set by page frontmatter
    if (!document.querySelector('meta[name="description"]:not([data-api-meta])')) {
      setMeta('name', 'description', desc);
    }
    setMeta('property', 'og:description', desc);
    setMeta('name', 'twitter:description', desc);
  }

  // Run on initial load
  injectMeta();

  // Re-run on SPA navigation (history.pushState / back-forward)
  var _pushState = history.pushState;
  history.pushState = function () {
    _pushState.apply(history, arguments);
    injectMeta();
  };

  window.addEventListener('popstate', injectMeta);
})();
