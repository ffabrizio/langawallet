/* global dapp */
/* global web3 */

var definition = require('./definition.json')[0];
var contract = web3.eth.contract(JSON.parse(definition.interface));
var contractAddress = '0x59484f0e34ca33463026d55b0b4e98c136bc0e0c'; 

if (false)
{
  contract.new(
   // marketcap
   100000000,
   // token name
   'fbrz',
   // decimals
   2,
   // symbol
   'FBZ',
   
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
      
      contractAddress = contract.address;
    }
  });
} else {
  console.log(definition.name, "Address: " + contractAddress);
}

module.exports = contract.at(contractAddress);
  
