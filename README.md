# coingecko-exchange-rates-js
Pure JavaScript helper functions for CoinGecko API v3 exchange rates. Makes use of Big.js dependency to ensure accurate conversion.

API endpoint: (https://api.coingecko.com/api/v3/exchange_rates)[https://api.coingecko.com/api/v3/exchange_rates]

***You will notice the CoinGecko API endpoint above returns fiat and major crypto tickers with values quoted against a BTC base***

## Setup

* Add `coingecko-exchange-rates-js/index.js` as a script src. This will instantiate the `RATES` variable in global scope.

## Example usage

### Getting exchange rates from CoinGecko and doing lookups.
If you plan on only doing a single lookup, use Method 1.
If your intentions are to do a lot of lookups, use method 2. _This is to ensure the API is only called once, and you won't accidently run into CoinGecko rate limiting._

***NB: All functions are async***

* Method 1 - calling from API each time:

```javascript
let usd_zar = await RATES.exchange({
  "from": "usd",
  "to": "zar",
  "amount": 1
});
```
`usd_zar` will be:
```javascript
{
    "from": {
        "amount": 1,
        "ticker": "usd",
        "name": "US Dollar",
        "unit": "$",
        "type": "fiat"
    },
    "to": {
        "amount": "15.82",
        "ticker": "zar",
        "name": "South African Rand",
        "unit": "R",
        "type": "fiat"
    }
}
```

* Method 2 - get rates once, and use multiple times:

```javascript
var rates = await RATES.get(); // get rates once

console.log(await RATES.exchange({
  "from": "usd",
  "to": "zar",
  "amount": 1,
  "rates": rates    //reuse of rates
}));
console.log(await RATES.exchange({
  "from": "usd",
  "to": "jpy",
  "amount": 1,
  "rates": rates    //reuse of rates
}));
console.log(await RATES.exchange({
  "from": "usd",
  "to": "rup",
  "amount": 1,
  "rates": rates    //reuse of rates
}));
```

### Polling the exchange rates list for fiat rates only

```javascript
console.log(await RATES.fiat());

// results in a exchange rates javascript object, without crypto pairs, only fiat.

```
