/*
 *  coingecko-forex.js
 *  JavaScript helper functions for CoinGecko API v3 exchange rates
 *  Copyright (c) 2021 jasbanza
 *  https://github.com/jasbanza/coingecko-exchange-rates-js/README.md
 */

import {
  Big
} from 'lib/big.min.js';

const FOREX = {
  fetch: async function() {
    let ret = {};
    await fetch('https://api.coingecko.com/api/v3/exchange_rates')
      .then(response => response.json())
      .then((data) => {
        ret = data.rates;
      })
      .catch(e) {
        ret = {
          "error": true
        };
      };
      return ret;
  },
  exchange: function(base, quote, amount) {
    var value = Big(0);
    if (parseFloat(amount) > 0) {
      // get base/quote data:
      var rates = getGlobal('exchange_rates');
      try {
        var rate = Big(rates[quote].value).div(Big(rates[base].value));
        var decimals = (rates[quote].type == 'crypto') ? 8 : 2;
        value = rate.times(amount).toFixed(decimals);
      } catch (e) {}
    }
    return value;
  },
  exchange_list: function(base, arr_quotes, amount) {
    var outputValues = {};
    var rates = getGlobal('exchange_rates');

    if (parseFloat(amount) > 0) {
      var quote;
      for (var i = 0; i < arr_quotes.length; i++) {
        quote = arr_quotes[i];
        var value = Big(0);
        // get base/quote data:
        try {
          // get value:
          var rate = Big(rates[quote].value).div(Big(rates[base].value));
          var decimals = (rates[quote].type == 'crypto') ? 8 : 2;
          value = rate.times(amount).toFixed(decimals);

          // prettifying currency format:
          var pretty = "";
          switch (rates[quote].type) {
            case 'fiat':
              try {
                pretty = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: quote,
                }).format(value);
              } catch {}
              break;
            case 'crypto':
            default:
              pretty = value + ' ' + rates[quote].unit;
              break;
          }

          outputValues[quote] = {
            value: value,
            pretty: pretty
          };
        } catch (e) {}
      }
    }
    return outputValues;
  }
};

function updateExchangeRates() {

  fetch('https://api.coingecko.com/api/v3/exchange_rates')
    .then(response => response.json())
    .then((data) => {
      setGlobal('exchange_rates', data.rates);

      setGlobal('exchange_disclaimer', "Data provided by CoinGecko - Updated every 1 to 10 minutes");
      setGlobal('exchange_time_updated', formatDateTime(new Date()));
      // UI:
      update_tickers();
      update_marquee();
    });
}

function getRate(currency) {
  var rate = Big(0);
  try {
    rate = Big(getGlobal('exchange_rates')[currency].value);
  } catch (e) {

  }
  return rate;
}
