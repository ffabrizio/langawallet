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
var PersistentMinimongo = Package['frozeman:persistent-minimongo'].PersistentMinimongo;
var Web3 = Package['ethereum:web3'].Web3;
var BigNumber = Package['ethereum:web3'].BigNumber;

/* Package-scope variables */
var EthAccounts;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/ethereum_accounts/accounts.js                                                                  //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        // 1
                                                                                                           // 2
@module Ethereum:accounts                                                                                  // 3
*/                                                                                                         // 4
                                                                                                           // 5
                                                                                                           // 6
                                                                                                           // 7
/**                                                                                                        // 8
The accounts collection, with some ethereum additions.                                                     // 9
                                                                                                           // 10
@class EthAccounts                                                                                         // 11
@constructor                                                                                               // 12
*/                                                                                                         // 13
var collection = new Mongo.Collection('ethereum_accounts', {connection: null});                            // 14
EthAccounts = _.clone(collection);                                                                         // 15
EthAccounts._collection = collection;                                                                      // 16
                                                                                                           // 17
                                                                                                           // 18
if(typeof PersistentMinimongo !== 'undefined')                                                             // 19
    new PersistentMinimongo(EthAccounts._collection);                                                      // 20
                                                                                                           // 21
                                                                                                           // 22
EthAccounts._watching = false;                                                                             // 23
                                                                                                           // 24
/**                                                                                                        // 25
Updates the accounts balances, by watching for new blocks and checking the balance.                        // 26
                                                                                                           // 27
@method _watchBalance                                                                                      // 28
*/                                                                                                         // 29
EthAccounts._watchBalance = function(){                                                                    // 30
    var _this = this;                                                                                      // 31
                                                                                                           // 32
    this._watching = true;                                                                                 // 33
                                                                                                           // 34
    // UPDATE SIMPLE ACCOUNTS balance on each new block                                                    // 35
    web3.eth.filter('latest').watch(function(e, res){                                                      // 36
        if(!e) {                                                                                           // 37
            _this._updateBalance();                                                                        // 38
        }                                                                                                  // 39
    });                                                                                                    // 40
};                                                                                                         // 41
                                                                                                           // 42
/**                                                                                                        // 43
Updates the accounts balances.                                                                             // 44
                                                                                                           // 45
@method _updateBalance                                                                                     // 46
*/                                                                                                         // 47
EthAccounts._updateBalance = function(){                                                                   // 48
    _.each(EthAccounts.find().fetch(), function(account){                                                  // 49
        web3.eth.getBalance(account.address, function(err, res){                                           // 50
            if(!err) {                                                                                     // 51
                EthAccounts.update(account._id, {$set: {                                                   // 52
                    balance: res.toString(10)                                                              // 53
                }});                                                                                       // 54
            }                                                                                              // 55
        });                                                                                                // 56
    });                                                                                                    // 57
}                                                                                                          // 58
                                                                                                           // 59
/**                                                                                                        // 60
Updates the accounts list,                                                                                 // 61
if its finds a difference between the accounts in the collection and the accounts in the accounts array.   // 62
                                                                                                           // 63
@method _addAccounts                                                                                       // 64
*/                                                                                                         // 65
EthAccounts._addAccounts = function(){                                                                     // 66
    var _this = this;                                                                                      // 67
                                                                                                           // 68
    // UPDATE normal accounts on start                                                                     // 69
    web3.eth.getAccounts(function(e, accounts){                                                            // 70
        if(!e) {                                                                                           // 71
            var visibleAccounts = _.pluck(EthAccounts.find().fetch(), 'address');                          // 72
                                                                                                           // 73
                                                                                                           // 74
            if(!_.isEmpty(accounts) &&                                                                     // 75
                _.difference(accounts, visibleAccounts).length === 0 &&                                    // 76
                _.difference(visibleAccounts, accounts).length === 0)                                      // 77
                return;                                                                                    // 78
                                                                                                           // 79
                                                                                                           // 80
            var localAccounts = EthAccounts.findAll().fetch();                                             // 81
                                                                                                           // 82
            // if the accounts are different, update the local ones                                        // 83
            _.each(localAccounts, function(account){                                                       // 84
                                                                                                           // 85
                // needs to have the balance                                                               // 86
                if(!account.balance)                                                                       // 87
                    return;                                                                                // 88
                                                                                                           // 89
                // set status deactivated, if it seem to be gone                                           // 90
                if(!_.contains(accounts, account.address)) {                                               // 91
                    EthAccounts.updateAll(account._id, {$set: {                                            // 92
                        deactivated: true                                                                  // 93
                    }});                                                                                   // 94
                } else {                                                                                   // 95
                    EthAccounts.updateAll(account._id, {$unset: {                                          // 96
                        deactivated: ''                                                                    // 97
                    }});                                                                                   // 98
                }                                                                                          // 99
                                                                                                           // 100
                accounts = _.without(accounts, account.address);                                           // 101
            });                                                                                            // 102
                                                                                                           // 103
            // ADD missing accounts                                                                        // 104
            var accountsCount = visibleAccounts.length + 1;                                                // 105
            _.each(accounts, function(address){                                                            // 106
                                                                                                           // 107
                web3.eth.getBalance(address, function(e, balance){                                         // 108
                    if(!e) {                                                                               // 109
                        web3.eth.getCoinbase(function(e, coinbase){                                        // 110
                            var doc = EthAccounts.findAll({address: address}).fetch()[0];                  // 111
                                                                                                           // 112
                            var insert = {                                                                 // 113
                                    type: 'account',                                                       // 114
                                    address: address,                                                      // 115
                                    balance: balance.toString(10),                                         // 116
                                    name: (address === coinbase) ? 'Etherbase' : 'Account '+ accountsCount
                                };                                                                         // 118
                                                                                                           // 119
                            if(doc) {                                                                      // 120
                                EthAccounts.updateAll({_id: doc._id}, {$set: insert});                     // 121
                            } else {                                                                       // 122
                                EthAccounts.insert(insert);                                                // 123
                            }                                                                              // 124
                                                                                                           // 125
                            if(address !== coinbase)                                                       // 126
                                accountsCount++;                                                           // 127
                        });                                                                                // 128
                    }                                                                                      // 129
                });                                                                                        // 130
                                                                                                           // 131
            });                                                                                            // 132
        }                                                                                                  // 133
    });                                                                                                    // 134
};                                                                                                         // 135
                                                                                                           // 136
                                                                                                           // 137
                                                                                                           // 138
/**                                                                                                        // 139
Builds the query with the addition of "{deactivated: {$exists: false}}"                                    // 140
                                                                                                           // 141
@method _addToQuery                                                                                        // 142
@param {Mixed} arg                                                                                         // 143
@return {Object} The query                                                                                 // 144
*/                                                                                                         // 145
EthAccounts._addToQuery = function(args){                                                                  // 146
    var args = Array.prototype.slice.call(args);                                                           // 147
                                                                                                           // 148
    if(_.isObject(args[0]))                                                                                // 149
        args[0] = _.extend(args[0], {deactivated: {$exists: false}});                                      // 150
    else if(_.isString(args[0]))                                                                           // 151
        args[0] = {_id: args[0], deactivated: {$exists: false}};                                           // 152
    else                                                                                                   // 153
        args[0] = {deactivated: {$exists: false}};                                                         // 154
                                                                                                           // 155
    return args;                                                                                           // 156
};                                                                                                         // 157
                                                                                                           // 158
                                                                                                           // 159
/**                                                                                                        // 160
Find all accounts, besides the deactivated ones                                                            // 161
                                                                                                           // 162
@method find                                                                                               // 163
@return {Object} cursor                                                                                    // 164
*/                                                                                                         // 165
EthAccounts.find = function(){                                                                             // 166
    return this._collection.find.apply(this, this._addToQuery(arguments));                                 // 167
};                                                                                                         // 168
                                                                                                           // 169
/**                                                                                                        // 170
Find all accounts, including the deactivated ones                                                          // 171
                                                                                                           // 172
@method findAll                                                                                            // 173
@return {Object} cursor                                                                                    // 174
*/                                                                                                         // 175
EthAccounts.findAll = EthAccounts._collection.find;                                                        // 176
                                                                                                           // 177
/**                                                                                                        // 178
Find one accounts, besides the deactivated ones                                                            // 179
                                                                                                           // 180
@method findOne                                                                                            // 181
@return {Object} cursor                                                                                    // 182
*/                                                                                                         // 183
EthAccounts.findOne = function(){                                                                          // 184
    return this._collection.findOne.apply(this, this._addToQuery(arguments));                              // 185
};                                                                                                         // 186
                                                                                                           // 187
/**                                                                                                        // 188
Update accounts, besides the deactivated ones                                                              // 189
                                                                                                           // 190
@method update                                                                                             // 191
@return {Object} cursor                                                                                    // 192
*/                                                                                                         // 193
EthAccounts.update = function(){                                                                           // 194
    return this._collection.update.apply(this, this._addToQuery(arguments));                               // 195
};                                                                                                         // 196
                                                                                                           // 197
/**                                                                                                        // 198
Update accounts, including the deactivated ones                                                            // 199
                                                                                                           // 200
@method updateAll                                                                                          // 201
@return {Object} cursor                                                                                    // 202
*/                                                                                                         // 203
EthAccounts.updateAll = EthAccounts._collection.update;                                                    // 204
                                                                                                           // 205
/**                                                                                                        // 206
Update accounts, including the deactivated ones                                                            // 207
                                                                                                           // 208
@method upsert                                                                                             // 209
@return {Object} cursor                                                                                    // 210
*/                                                                                                         // 211
EthAccounts.upsert = EthAccounts._collection.upsert;                                                       // 212
                                                                                                           // 213
/**                                                                                                        // 214
Starts fetching and watching the accounts                                                                  // 215
                                                                                                           // 216
@method init                                                                                               // 217
*/                                                                                                         // 218
EthAccounts.init = function(){                                                                             // 219
    var _this = this;                                                                                      // 220
                                                                                                           // 221
    if(typeof web3 === 'undefined') {                                                                      // 222
        console.warn('EthAccounts couldn\'t find web3, please make sure to instantiate a web3 object before calling EthAccounts.init()');
        return;                                                                                            // 224
    }                                                                                                      // 225
                                                                                                           // 226
    /**                                                                                                    // 227
    Overwrite web3.reset, to also stop the interval                                                        // 228
                                                                                                           // 229
    @method web3.reset                                                                                     // 230
    */                                                                                                     // 231
    web3._reset = Web3.prototype.reset;                                                                    // 232
    web3.reset = function(keepIsSyncing){                                                                  // 233
        Meteor.clearInterval(_this._intervalId);                                                           // 234
        _this._watching = false;                                                                           // 235
        web3._reset(keepIsSyncing);                                                                        // 236
    };                                                                                                     // 237
                                                                                                           // 238
    Tracker.nonreactive(function(){                                                                        // 239
                                                                                                           // 240
        _this._addAccounts();                                                                              // 241
                                                                                                           // 242
        if(!_this._watching) {                                                                             // 243
            _this._updateBalance();                                                                        // 244
            _this._watchBalance();                                                                         // 245
                                                                                                           // 246
            // check for new accounts every 2s                                                             // 247
            Meteor.clearInterval(_this._intervalId);                                                       // 248
            _this._intervalId = Meteor.setInterval(function(){                                             // 249
                _this._addAccounts();                                                                      // 250
            }, 2000);                                                                                      // 251
        }                                                                                                  // 252
    });                                                                                                    // 253
};                                                                                                         // 254
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ethereum:accounts'] = {
  EthAccounts: EthAccounts
};

})();
