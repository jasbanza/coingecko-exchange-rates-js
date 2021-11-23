# coingecko-exchange-rates-js
JavaScript helper functions for CoinGecko API v3 exchange rates

## Setup

* Add `coingecko-exchange-rates-js/index.js` as a script src. This will instantiate the FOREX variable in global scope.

## Example usage

### getting rate from api and exchanging.
There are 2 ways of using this. If your intentions are to do a lot of exchanging, use method 2. This is to ensure the API is only called once, and you won't accidently run into CoinGecko rate limiting.

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
var rates = await RATES.get(); // get rates

console.log(await RATES.exchange({
  "from": "usd",
  "to": "zar",
  "amount": 1,
  "rates": rates
}));
console.log(await RATES.exchange({
  "from": "usd",
  "to": "jpy",
  "amount": 1,
  "rates": rates
}));
console.log(await RATES.exchange({
  "from": "usd",
  "to": "rup",
  "amount": 1,
  "rates": rates
}));
```
