(function () {
  var descriptions = {
    'cicero': 'Cicero API by Melissa. Retrieve legislative districts, elected officials, and political geography data by address or coordinates.',
    'contribution': 'Contribution API by Melissa. Submit verified address corrections and data quality updates to improve Melissa reference datasets.',
    'data-retriever': 'Data Retriever API by Melissa. Enrich records with demographic, geographic, and property data across multiple retrieval endpoints.',
    'global-address-verification': 'Global Address Verification API by Melissa. Validate and standardize mailing addresses worldwide with real-time verification endpoints.',
    'global-email': 'Global Email API by Melissa. Validate addresses, check mailbox deliverability, and enrich email records across multiple endpoints.',
    'global-express-entry': 'Global Express Entry API by Melissa. Deliver real-time address autocomplete and type-ahead suggestions for web and mobile form inputs.',
    'global-ip': 'Global IP API by Melissa. Geolocate IP addresses and retrieve geographic, ISP, proxy, and connection type data with multiple endpoints.',
    'global-name': 'Global Name API by Melissa. Parse, validate, and standardize personal and business names across global formats with multiple endpoints.',
    'global-phone': 'Global Phone API by Melissa. Validate, standardize, and enrich phone numbers with carrier, line type, and location data worldwide.',
    'leadgen-business': 'LeadGen Business API by Melissa. Search and retrieve B2B lead records with firmographic, industry, and geographic filtering endpoints.',
    'leadgen-consumer': 'LeadGen Consumer API by Melissa. Build targeted consumer lead lists using demographic, behavioral, and geographic filtering endpoints.',
    'leadgen-occupant': 'LeadGen Occupant API by Melissa. Access occupant-level contact records for residential addresses with targeting and filtering endpoints.',
    'leadgen-property': 'LeadGen Property API by Melissa. Search property records by owner, location, and valuation with multiple data retrieval endpoints.',
    'melissa-keys-lookup': 'Melissa Keys Lookup API. Retrieve standardized Melissa address keys and property identifiers for record matching and deduplication.',
    'melissa-releases': 'Melissa Releases API. Access release notes, version history, and product update information for all Melissa data services and APIs.',
    'people-business-search': 'People Business Search API by Melissa. Search for people and businesses by name, address, phone, or email across multiple lookup endpoints.',
    'personator-consumer': 'Personator Consumer API by Melissa. Verify, correct, and enrich consumer contact records with name, address, phone, and email endpoints.',
    'personator-identity': 'Personator Identity API by Melissa. Verify identity with name, address, date of birth, and phone matching across verification endpoints.',
    'personator-search': 'Personator Search API by Melissa. Search the Melissa consumer database by name, address, phone, email, or IP across multiple endpoints.',
    'property': 'Property API by Melissa. Access property records, ownership history, deed data, mortgage details, and valuations across multiple endpoints.',
    'reverse-geocoder': 'Reverse GeoCoder API by Melissa. Convert latitude and longitude coordinates to addresses, census data, and location details.',
    'smartmover-ca': 'SmartMover Canada API by Melissa. Process Canadian NCOA change-of-address requests and verify business relocations with batch and single endpoints.',
    'smartmover-us': 'SmartMover US API by Melissa. Process USPS NCOA change-of-address updates and verify business relocations with batch and single record endpoints.',
    'ssn-name-match': 'SSN Name Match API by Melissa. Verify Social Security Number and name combinations for identity confirmation across validation endpoints.',
    'street-route': 'Street Route API by Melissa. Calculate driving distances, travel times, and routes between multiple geographic coordinate points.',
    'token-server': 'Token Server API by Melissa. Generate and manage secure authentication tokens for authorizing client-side access to Melissa APIs.',
    'us-business-coder': 'US Business Coder API by Melissa. Append firmographic data, SIC codes, and business details to records using name and address input.'
  };

  function getApiSlug() {
    var path = window.location.pathname.replace(/\/+$/, '');
    var segments = path.split('/');
    var apisIdx = segments.indexOf('apis');
    if (apisIdx === -1 || apisIdx >= segments.length - 1) return null;
    return segments[apisIdx + 1].toLowerCase();
  }

  function getDesc(apiSlug) {
    if (descriptions[apiSlug]) return descriptions[apiSlug];
    var name = apiSlug.replace(/-/g, ' ').replace(/\b\w/g, function (l) { return l.toUpperCase(); });
    return name + ' API documentation by Melissa. Explore endpoints, request and response schemas, and code samples.';
  }

  // Keep references to elements we created so we can remove them on navigation
  var injected = [];

  function removeInjected() {
    injected.forEach(function (el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    injected = [];
  }

  function injectIfMissing() {
    var apiSlug = getApiSlug();
    if (!apiSlug) return;

    // If the page already has a description (set by Redocly/Helmet), do nothing
    if (document.querySelector('meta[name="description"]')) return;

    var desc = getDesc(apiSlug);

    function addMeta(attr, attrVal) {
      var el = document.createElement('meta');
      el.setAttribute(attr, attrVal);
      el.setAttribute('content', desc);
      document.head.appendChild(el);
      injected.push(el);
    }

    addMeta('name', 'description');
    addMeta('property', 'og:description');
    addMeta('name', 'twitter:description');
  }

  // On every navigation: remove any previously injected tags first,
  // then wait for Helmet to render before checking if injection is needed.
  function scheduleInject() {
    removeInjected();
    setTimeout(injectIfMissing, 300);
  }

  scheduleInject();

  var _pushState = history.pushState;
  history.pushState = function () {
    _pushState.apply(history, arguments);
    scheduleInject();
  };

  window.addEventListener('popstate', scheduleInject);
})();
