(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/init.js                                                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/* global web3 */                                                      //
/* global Web3 */                                                      //
                                                                       //
var httpProvider = new Web3.providers.HttpProvider('http://localhost:8545');
                                                                       //
if (typeof web3 === 'undefined') {                                     // 6
    web3 = new Web3(httpProvider);                                     // 7
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
