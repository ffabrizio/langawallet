/* global web3 */

var definition = require('./definition.json')[0];
var contract = web3.eth.contract(JSON.parse(definition.interface));

module.exports = contract.new(
  
  web3.eth.coinbase,
  {
    from: web3.eth.coinbase, 
    data: definition.bytecode, 
    gas: 2000000
  }, 
  
  function(e, contract) {
    if (e) console.log("e", e)
      if (typeof contract.address === 'undefined') { 
        console.log(definition.name, "Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined..."); 
      } else { 
        console.log(definition.name, "Contract mined! Address: " + contract.address); 
        console.log(contract); 
      }
  }
);