/* global web3 */
/* global Token */
/* global Template */
/* global Session */
/* global Meteor */

const token_address = '0xa3b66e4f316959326adbf73554202da99216dcf9';

if (Meteor.isClient) {
    Template.wallet.helpers({
        account: {
            address: web3.eth.coinbase,
            etherBalance: function() {
                return web3.eth.getBalance(web3.eth.coinbase);
            },
            tokenBalance : function() {
                return Token.at(token_address).balanceOf(web3.eth.coinbase);
            }
        }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
