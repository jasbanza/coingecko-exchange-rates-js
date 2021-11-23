# coingecko-exchange-rates-js
JavaScript helper functions for CoinGecko API v3 exchange rates

### Setup

* Add `coingecko-exchange-rates-js/index.js` as a script src. This will instantiate the FOREX variable in global scope.

### Usage

First get the list from the CoinGecko endpoint, and store in a variable:
* `let rates = FOREX.fetch();`

* `let FOREX.exchange(
