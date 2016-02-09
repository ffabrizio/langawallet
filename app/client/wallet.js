/* global blockies */
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
      address: coinbase.substring(0, 10),
      blockie: function() {
        return blockies.create({ seed: coinbase }).toDataURL()
      },
      hash: function() {
        return coinbase.substring(2);
      },
      etherBalance: function() {
        let balance = web3.eth.getBalance(coinbase);
        return balance;
      },
      tokenBalance : function() {
        let balance = token.balanceOf(coinbase);
        return balance;
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  // code to run on server at startup
  });
}
