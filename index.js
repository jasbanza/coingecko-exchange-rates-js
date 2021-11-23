/*
 *  coingecko-forex.js
 *  JavaScript helper functions for CoinGecko API v3 exchange rates
 *  Copyright (c) 2021 jasbanza
 *  https://github.com/jasbanza/coingecko-exchange-rates-js/README.md
 */

const RATES = {
  get: async function() {
    let ret = {};
    await fetch('https://api.coingecko.com/api/v3/exchange_rates')
      .then(response => response.json())
      .then((data) => {
        ret = data.rates;
      })
      .catch((e) => {
        ret = {
          "error": true
        };
      });
    return ret;
  },
  exchange: async function(options = {
    "from": "usd",
    "to": "zar",
    "amount": 0,
    "rates": null
  }) {
    let rates = options.rates;
    if (!rates) {
      rates = await this.get();
    }
    var ret = {
      from: {},
      to: {}
    };
    if (parseFloat(options.amount) > 0) {
      try {
        var rate = Big(rates[options.to].value).div(Big(rates[options.from].value));
        var decimals = (rates[options.from].type == 'crypto') ? 8 : 2;

        ret.to.amount = rate.times(options.amount).toFixed(decimals);
        ret.to.ticker = options.to;
        ret.to.name = rates[options.to].name;
        ret.to.unit = rates[options.to].unit;
        ret.to.type = rates[options.to].type;

        ret.from.amount = options.amount
        ret.from.ticker = options.from;
        ret.from.name = rates[options.from].name;
        ret.from.unit = rates[options.from].unit;
        ret.from.type = rates[options.from].type;

      } catch (e) {}
    }
    return ret;
  }
};
