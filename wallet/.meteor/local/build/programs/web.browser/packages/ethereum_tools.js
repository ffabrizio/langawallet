//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var Mongo = Package.mongo.Mongo;
var HTTP = Package.http.HTTP;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package.templating.Template;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var numeral = Package['numeral:numeral'].numeral;
var BigNumber = Package['ethereum:web3'].BigNumber;
var Web3 = Package['ethereum:web3'].Web3;
var PersistentMinimongo = Package['frozeman:persistent-minimongo'].PersistentMinimongo;
var LocalStore = Package['frozeman:storage'].LocalStore;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var LocalStore, Tracker, EthTools;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/ethereum_tools/ethtools.js                                                                     //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        // 1
Template Controllers                                                                                       // 2
                                                                                                           // 3
@module Packages                                                                                           // 4
*/                                                                                                         // 5
                                                                                                           // 6
                                                                                                           // 7
/**                                                                                                        // 8
Helper functions for ethereum dapps                                                                        // 9
                                                                                                           // 10
@class [packages] ethereum:tools                                                                           // 11
@constructor                                                                                               // 12
*/                                                                                                         // 13
                                                                                                           // 14
var isMeteorPackage = true;                                                                                // 15
                                                                                                           // 16
// setup LocalStore if not available                                                                       // 17
if(typeof LocalStore === 'undefined') {                                                                    // 18
    isMeteorPackage = false;                                                                               // 19
    LocalStore = {                                                                                         // 20
        get: function(){},                                                                                 // 21
        set: function(){}                                                                                  // 22
    };                                                                                                     // 23
}                                                                                                          // 24
                                                                                                           // 25
// stup Tracker if not available                                                                           // 26
if(typeof Tracker === 'undefined')                                                                         // 27
    Tracker = {                                                                                            // 28
        Dependency: function(){                                                                            // 29
            return {                                                                                       // 30
                depend: function(){},                                                                      // 31
                changed: function(){}                                                                      // 32
            }                                                                                              // 33
        }                                                                                                  // 34
    };                                                                                                     // 35
                                                                                                           // 36
var dependency = new Tracker.Dependency;                                                                   // 37
                                                                                                           // 38
/**                                                                                                        // 39
Check for supported currencies                                                                             // 40
                                                                                                           // 41
@method supportedCurrencies                                                                                // 42
@param {String} unit                                                                                       // 43
@return {String}                                                                                           // 44
*/                                                                                                         // 45
var supportedCurrencies = function(unit){                                                                  // 46
    return (unit === 'usd' ||                                                                              // 47
           unit === 'eur' ||                                                                               // 48
           unit === 'cad' ||                                                                               // 49
           unit === 'gbp' ||                                                                               // 50
           unit === 'jpy' ||                                                                               // 51
           unit === 'btc');                                                                                // 52
};                                                                                                         // 53
                                                                                                           // 54
/**                                                                                                        // 55
Gets the ether unit if not set from localstorage                                                           // 56
                                                                                                           // 57
@method getUnit                                                                                            // 58
@param {String} unit                                                                                       // 59
@return {String}                                                                                           // 60
*/                                                                                                         // 61
var getUnit = function(unit){                                                                              // 62
    if(!_.isString(unit)) {                                                                                // 63
        unit = LocalStore.get('dapp_etherUnit');                                                           // 64
                                                                                                           // 65
        if(!unit) {                                                                                        // 66
            unit = 'ether';                                                                                // 67
            LocalStore.set('dapp_etherUnit', unit);                                                        // 68
        }                                                                                                  // 69
    }                                                                                                      // 70
                                                                                                           // 71
    return unit;                                                                                           // 72
};                                                                                                         // 73
                                                                                                           // 74
                                                                                                           // 75
                                                                                                           // 76
/**                                                                                                        // 77
Helper functions for ethereum dapps                                                                        // 78
                                                                                                           // 79
@class EthTools                                                                                            // 80
@constructor                                                                                               // 81
*/                                                                                                         // 82
                                                                                                           // 83
EthTools = {};                                                                                             // 84
                                                                                                           // 85
if(isMeteorPackage) {                                                                                      // 86
                                                                                                           // 87
    /**                                                                                                    // 88
    Sets the default unit used by all EthTools functions, if no unit is provided.                          // 89
                                                                                                           // 90
        EthTools.setUnit('ether')                                                                          // 91
                                                                                                           // 92
    @method setUnit                                                                                        // 93
    @param {String} unit the unit like 'ether', or 'eur'                                                   // 94
    @param {Boolean}                                                                                       // 95
    **/                                                                                                    // 96
    EthTools.setUnit = function(unit){                                                                     // 97
        if(supportedCurrencies(unit)) {                                                                    // 98
            LocalStore.set('dapp_etherUnit', unit);                                                        // 99
            return true;                                                                                   // 100
        } else {                                                                                           // 101
            try {                                                                                          // 102
                web3.toWei(1, unit);                                                                       // 103
                LocalStore.set('dapp_etherUnit', unit);                                                    // 104
                return true;                                                                               // 105
            } catch(e) {                                                                                   // 106
                return false;                                                                              // 107
            }                                                                                              // 108
        }                                                                                                  // 109
    };                                                                                                     // 110
                                                                                                           // 111
    /**                                                                                                    // 112
    Get the default unit used by all EthTools functions, if no unit is provided.                           // 113
                                                                                                           // 114
        EthTools.getUnit()                                                                                 // 115
                                                                                                           // 116
    @method getUnit                                                                                        // 117
    @return {String} unit the unit like 'ether', or 'eur'                                                  // 118
    **/                                                                                                    // 119
    EthTools.getUnit = function(){                                                                         // 120
        return LocalStore.get('dapp_etherUnit');                                                           // 121
    };                                                                                                     // 122
}                                                                                                          // 123
                                                                                                           // 124
/**                                                                                                        // 125
Sets the locale to display numbers in different formats.                                                   // 126
                                                                                                           // 127
    EthTools.setLocale('de')                                                                               // 128
                                                                                                           // 129
@method language                                                                                           // 130
@param {String} lang the locale like "de" or "de-DE"                                                       // 131
**/                                                                                                        // 132
EthTools.setLocale = function(lang){                                                                       // 133
    var lang = lang.substr(0,2);                                                                           // 134
    numeral.language(lang);                                                                                // 135
    dependency.changed();                                                                                  // 136
                                                                                                           // 137
    return lang;                                                                                           // 138
};                                                                                                         // 139
                                                                                                           // 140
/**                                                                                                        // 141
Formats a given number                                                                                     // 142
                                                                                                           // 143
    EthTools.formatNumber(10000, "0.0[000]")                                                               // 144
                                                                                                           // 145
@method formatNumber                                                                                       // 146
@param {Number|String|BigNumber} number the number to format                                               // 147
@param {String} format           the format string e.g. "0.0[000]" see http://numeraljs.com for more.      // 148
@return {String} The formated time                                                                         // 149
**/                                                                                                        // 150
EthTools.formatNumber = function(number, format){                                                          // 151
    dependency.depend();                                                                                   // 152
                                                                                                           // 153
    if(!_.isFinite(number) && !(number instanceof BigNumber))                                              // 154
        number = 0;                                                                                        // 155
                                                                                                           // 156
    if(format instanceof Spacebars.kw)                                                                     // 157
        format = null;                                                                                     // 158
                                                                                                           // 159
    if(number instanceof BigNumber || _.isObject(number))                                                  // 160
        number = number.toString(10);                                                                      // 161
                                                                                                           // 162
    format = format || '0,0.[00000000]';                                                                   // 163
                                                                                                           // 164
    if(!_.isFinite(number))                                                                                // 165
        number = numeral().unformat(number);                                                               // 166
                                                                                                           // 167
    if(_.isFinite(number))                                                                                 // 168
        return numeral(number).format(format);                                                             // 169
};                                                                                                         // 170
                                                                                                           // 171
/**                                                                                                        // 172
Formats a number of wei to a balance.                                                                      // 173
                                                                                                           // 174
    EthTools.formatBalance(myNumber, "0,0.0[0000] unit")                                                   // 175
                                                                                                           // 176
@method (formatBalance)                                                                                    // 177
@param {String} number                                                                                     // 178
@param {String} format       the format string                                                             // 179
@return {String} The formatted number                                                                      // 180
**/                                                                                                        // 181
EthTools.formatBalance = function(number, format, unit){                                                   // 182
    dependency.depend();                                                                                   // 183
                                                                                                           // 184
    if(!_.isFinite(number) && !(number instanceof BigNumber))                                              // 185
        number = 0;                                                                                        // 186
                                                                                                           // 187
    format = format || '0,0.[00000000]';                                                                   // 188
                                                                                                           // 189
    unit = getUnit(unit);                                                                                  // 190
                                                                                                           // 191
    if(typeof EthTools.ticker !== 'undefined' && supportedCurrencies(unit)) {                              // 192
        var ticker = EthTools.ticker.findOne(unit, {fields: {price: 1}});                                  // 193
                                                                                                           // 194
        // convert first to ether                                                                          // 195
        number = web3.fromWei(number, 'ether');                                                            // 196
                                                                                                           // 197
        // then times the currency                                                                         // 198
        if(ticker) {                                                                                       // 199
            number = (number instanceof BigNumber || _.isObject(number))                                   // 200
                ? number.times(ticker.price)                                                               // 201
                : new BigNumber(String(number), 10).times(ticker.price);                                   // 202
                                                                                                           // 203
        } else {                                                                                           // 204
            number = '0';                                                                                  // 205
        }                                                                                                  // 206
                                                                                                           // 207
    } else {                                                                                               // 208
        number = web3.fromWei(number, unit.toLowerCase());                                                 // 209
    }                                                                                                      // 210
                                                                                                           // 211
    var isUppercase = (format.indexOf('UNIT') !== -1);                                                     // 212
                                                                                                           // 213
    var cleanedFormat = format.replace(/ *unit */i,'').replace(/ +/,'');                                   // 214
    var format = format.replace(cleanedFormat, '__format__');                                              // 215
                                                                                                           // 216
    if(format.toLowerCase().indexOf('unit') !== -1) {                                                      // 217
        return format.replace('__format__', EthTools.formatNumber(number, cleanedFormat)).replace(/unit/i, (isUppercase ? unit.toUpperCase() : unit));
    } else                                                                                                 // 219
        return EthTools.formatNumber(number, cleanedFormat);                                               // 220
};                                                                                                         // 221
                                                                                                           // 222
                                                                                                           // 223
/**                                                                                                        // 224
Formats any of the supported currency to ethereum wei.                                                     // 225
                                                                                                           // 226
    EthTools.toWei(myNumber, unit)                                                                         // 227
                                                                                                           // 228
@method (toWei)                                                                                            // 229
@param {String} number                                                                                     // 230
@return {String} unit                                                                                      // 231
**/                                                                                                        // 232
EthTools.toWei = function(number, unit){                                                                   // 233
                                                                                                           // 234
    if(!_.isFinite(number) && !(number instanceof BigNumber))                                              // 235
        return number;                                                                                     // 236
                                                                                                           // 237
    unit = getUnit(unit);                                                                                  // 238
                                                                                                           // 239
    if(typeof EthTools.ticker !== 'undefined' && supportedCurrencies(unit)) {                              // 240
        var ticker = EthTools.ticker.findOne(unit, {fields: {price: 1}});                                  // 241
                                                                                                           // 242
        // convert first to ether                                                                          // 243
        number = web3.toWei(number, 'ether');                                                              // 244
                                                                                                           // 245
        // then times the currency                                                                         // 246
        if(ticker) {                                                                                       // 247
            number = (number instanceof BigNumber || _.isObject(number))                                   // 248
                ? number.dividedBy(ticker.price)                                                           // 249
                : new BigNumber(String(number), 10).dividedBy(ticker.price);                               // 250
                                                                                                           // 251
            // make sure the number is flat                                                                // 252
            number = number.round(0).toString(10);                                                         // 253
        } else {                                                                                           // 254
            number = '0';                                                                                  // 255
        }                                                                                                  // 256
                                                                                                           // 257
    } else {                                                                                               // 258
        number = web3.toWei(number, unit.toLowerCase());                                                   // 259
    }                                                                                                      // 260
                                                                                                           // 261
    return number;                                                                                         // 262
};                                                                                                         // 263
                                                                                                           // 264
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/ethereum_tools/ticker.js                                                                       //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
// Price ticker                                                                                            // 1
EthTools.ticker = new Mongo.Collection('ethereum_price_ticker', {connection: null});                       // 2
if(Meteor.isClient)                                                                                        // 3
    new PersistentMinimongo(EthTools.ticker);                                                              // 4
                                                                                                           // 5
var updatePrice = function(e, res){                                                                        // 6
                                                                                                           // 7
    if(!e && res && res.statusCode === 200) {                                                              // 8
        var content = JSON.parse(res.content);                                                             // 9
                                                                                                           // 10
        if(content && content.Response === 'Success' && content.Data){                                     // 11
            _.each(content.Data, function(item){                                                           // 12
                var name = item.Symbol.toLowerCase();                                                      // 13
                                                                                                           // 14
                // make sure its a number and nothing else!                                                // 15
                if(_.isFinite(item.Price)) {                                                               // 16
                    EthTools.ticker.upsert(name, {$set: {                                                  // 17
                        price: String(item.Price),                                                         // 18
                        timestamp: item.LastUpdateTS                                                       // 19
                    }});                                                                                   // 20
                }                                                                                          // 21
                                                                                                           // 22
            });                                                                                            // 23
        }                                                                                                  // 24
    } else {                                                                                               // 25
        console.warn('Can not connect to https://www.cryptocompare.com/api to get price ticker data, please check your internet connection.');
    }                                                                                                      // 27
};                                                                                                         // 28
                                                                                                           // 29
// update right away                                                                                       // 30
HTTP.get('https://www.cryptocompare.com/api/data/price?fsym=ETH&tsyms=BTC,USD,EUR', updatePrice);          // 31
                                                                                                           // 32
                                                                                                           // 33
// update prices                                                                                           // 34
Meteor.setInterval(function(){                                                                             // 35
    HTTP.get(' https://www.cryptocompare.com/api/data/price?fsym=ETH&tsyms=BTC,USD,EUR', updatePrice);    
}, 1000 * 30);                                                                                             // 37
                                                                                                           // 38
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/ethereum_tools/globalHelpers.js                                                                //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        // 1
Formats a number.                                                                                          // 2
                                                                                                           // 3
    {{dapp_formatNumber myNumber "0,0.0[0000]"}}                                                           // 4
                                                                                                           // 5
@method (dapp_formatNumber)                                                                                // 6
@param {String} number                                                                                     // 7
@param {String} format       the format string                                                             // 8
@return {String} The formatted number                                                                      // 9
**/                                                                                                        // 10
Template.registerHelper('dapp_formatNumber', EthTools.formatNumber);                                       // 11
                                                                                                           // 12
/**                                                                                                        // 13
Formats a number.                                                                                          // 14
                                                                                                           // 15
    {{dapp_formatBalance myNumber "0,0.0[0000]"}}                                                          // 16
                                                                                                           // 17
@method (dapp_formatBalance)                                                                               // 18
@param {String} number                                                                                     // 19
@param {String} format       the format string                                                             // 20
@return {String} The formatted number                                                                      // 21
**/                                                                                                        // 22
Template.registerHelper('dapp_formatBalance', EthTools.formatBalance);                                     // 23
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ethereum:tools'] = {
  EthTools: EthTools
};

})();
