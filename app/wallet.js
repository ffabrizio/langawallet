/* global web3 */
/* global Token */
/* global Template */
/* global Session */
/* global Meteor */

if (Meteor.isClient) {
  const token = Token.at('0xa3b66e4f316959326adbf73554202da99216dcf9');
  //let coinbase = '0xfa5c91c9b4d0bebf79c1963ba13c760ff83fde09';
  //let coinbase = '0x87b625a3ae9672f5905bb44a419a46af6c568dc4'; 
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
