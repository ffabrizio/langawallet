const solc = require('solc');
const contract = solc.compile({sources: '../contracts/token.sol'}, 1);
module.exports = contract;
