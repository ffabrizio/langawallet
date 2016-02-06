/* global web3 */

const Web3 = require('web3');
const Token = require('../contracts/token');

const tokenAddress = '0xa3b66e4f316959326adbf73554202da99216dcf9';
const httpProvider = 'http://localhost:8545';
/* remote provider: 
    const httpProvider = 'http://ethnode.cloudapp.net:8545';
*/

if(typeof web3 === 'undefined') {
    web3 = new Web3(
        new Web3.providers.HttpProvider(httpProvider)
    );
}

module.exports = {
    account: {
      coinbase: web3.eth.coinbase,
      etherbalance: function() {
          return web3.eth.getBalance(web3.eth.coinbase);
      },
      tokenbalance : function() {
          return Token.at(tokenAddress).balanceOf(web3.eth.coinbase);
      }
    }
};