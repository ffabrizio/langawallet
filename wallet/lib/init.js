/* global web3 */
/* global Web3 */

const __LOCALRPC = 'http://localhost:8545';
const __REMOTERPC = 'https://ethnode.cloudapp.net:8545';

if (typeof web3 === 'undefined') {
    web3 = new Web3(
        new Web3.providers.HttpProvider(__LOCALRPC)
    );
}