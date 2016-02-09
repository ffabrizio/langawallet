(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// wallet.js                                                           //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/* global web3 */                                                      //
/* global Token */                                                     //
/* global Template */                                                  //
/* global Session */                                                   //
/* global Meteor */                                                    //
                                                                       //
if (Meteor.isClient) {                                                 // 7
    (function () {                                                     //
        var token = Token.at('0xa3b66e4f316959326adbf73554202da99216dcf9');
        var coinbase = web3.eth.coinbase;                              // 9
                                                                       //
        Template.wallet.helpers({                                      // 11
            account: {                                                 // 12
                address: coinbase,                                     // 13
                etherBalance: function () {                            // 14
                    return web3.eth.getBalance(coinbase);              // 15
                },                                                     //
                tokenBalance: function () {                            // 17
                    return token.balanceOf(coinbase);                  // 18
                }                                                      //
            }                                                          //
        });                                                            //
    })();                                                              //
}                                                                      //
                                                                       //
if (Meteor.isServer) {                                                 // 24
    Meteor.startup(function () {                                       // 25
        // code to run on server at startup                            //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
