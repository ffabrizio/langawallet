/* global dapp */
/* global web3 */

if(typeof dapp === 'undefined') {
  dapp = require('./startup');
  console.log("dapp started...");
} else {
  console.log(dapp);
}

info();
window.setInterval(info, 10000);

function info() {
  console.log("info reloading ...")
  
  var coinbase = dapp.accounts.coinbase;
  document.getElementById('coinbase').innerText = coinbase;

  var balance = web3.eth.getBalance(coinbase);
  document.getElementById('balance').innerText = balance.toString(10);

  var block = web3.eth.getBlock("latest");
  document.getElementById('latestBlock').innerText = block.number;
  document.getElementById('latestBlockHash').innerText = block.hash;
  document.getElementById('latestBlockTimestamp').innerText = Date(block.timestamp);
}
