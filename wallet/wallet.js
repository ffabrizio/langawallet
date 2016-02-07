/* global web3 */
/* global Token */
/* global Template */
/* global Session */
/* global Meteor */

if (Meteor.isClient) {
    const token = Token.at('0xa3b66e4f316959326adbf73554202da99216dcf9');
    let coinbase = web3.eth.coinbase;

    Template.wallet.helpers({
        account: {
            address: coinbase,
            etherBalance: function() {
                return web3.eth.getBalance(coinbase);
            },
            tokenBalance : function() {
                return token.balanceOf(coinbase);
            }
        }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
