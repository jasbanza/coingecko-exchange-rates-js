# coingecko-exchange-rates-js

Pure JavaScript helper functions for CoinGecko API v3 exchange rates. Makes use of Big.js dependency to ensure accurate conversion.

API endpoint: <https://api.coingecko.com/api/v3/exchange_rates>

**_You will notice the CoinGecko API endpoint above returns fiat and major crypto tickers with values quoted against a BTC base_**

## Setup

-   Add `coingecko-exchange-rates-js/index.js` as a script src. This will instantiate the `RATES` variable in global scope.

## Example usage

### Getting exchange rates from CoinGecko and doing lookups.

If you plan on only doing a single lookup, use Method 1.
If your intentions are to do a lot of lookups, use method 2. _This is to ensure the API is only called once, and you won't accidently run into CoinGecko rate limiting._

**_NB: All functions are asynchronous_**

-   Method 1 - calling from API each time:

```javascript
let usd_zar = await RATES.exchange({
  "from": "usd",
  "to": "zar",
  "amount": 1
});

console.log(usd_zar);

// output will be:
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

-   Method 2 - get rates once, and use multiple times:

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

### Polling the exchange rates for specific types

You can also query `RATES.list(options)` with an `options` object.

```javascript
let options = {
      "types": ["fiat", "crypto", "commodity", "all"],
      "rates": null
    };

/* `options.types` is an array which can contain any combination of the following:
["fiat", "crypto", "commodity", "all"]

 Omitting `options.types` will result in all types being returned.

 `options.rates` is a previously returned `rates` object.
 Ommitting this will result in the CoinGecko API endpoint being queried.*/


console.log(await RATES.list(options));
// returns object of exchange rates

```
