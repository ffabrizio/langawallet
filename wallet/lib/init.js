/* global web3 */
/* global Web3 */

const httpProvider = new Web3.providers.HttpProvider('http://localhost:8545');

if (typeof web3 === 'undefined') {
    web3 = new Web3(httpProvider);
}