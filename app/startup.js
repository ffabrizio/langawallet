/* global web3 */

const Web3 = require('web3');
//const Token = require('./token');

//const tokenAddress = '0xa3b66e4f316959326adbf73554202da99216dcf9';
const httpProvider = 'http://localhost:8545';
/* remote provider: 
    const httpProvider = 'http://ethnode.cloudapp.net:8545';
*/

if(typeof web3 === 'undefined') {
    web3 = new Web3(
        new Web3.providers.HttpProvider('http://ethnode.cloudapp.net:8545')
    );
}

module.exports = {
    account: {
      coinbase: web3.eth.coinbase,
      etherbalance: function() {
          return web3.eth.getBalance(web3.eth.coinbase);
      },
      tokenbalance : function() {
          return 0;//Token.at(tokenAddress).balanceOf(web3.eth.coinbase);
      }
    }
};