/* global web3 */
var Web3 = require('web3');

if(typeof web3 === 'undefined') {
  web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
  );
  
  web3.eth.defaultAccount = web3.eth.coinbase;
}

var token = require('./contracts/token');

module.exports = {
  token,
  accounts: {
    coinbase: web3.eth.coinbase,
    getBalance: function(address) {
      if (typeof address === 'undefined') {
        return web3.eth.getBalance(web3.eth.coinbase);
      }
      return  web3.eth.getBalance(address);
    }
  }    
};
