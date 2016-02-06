var solc = require('solc');
var fs = require('fs');
var contract;

var sourceMap = function(source) {
    var s = source.replace(/\\/g, '/');
    return s.substring(s.lastIndexOf('/') +1, s.lastIndexOf('.'));
};

module.exports = function(source) {  
    console.log(source)
    fs.readFile(source, (err, data) => {
        if (err) throw err;
        contract = data;
    });
    
	this.cacheable && this.cacheable(); 
    
    var c = solc.compile(contract)
    , sm = sourceMap(source)
    , js = "\n\n" + sm + ' = ' + ' web3.eth.contract(' +JSON.parse(JSON.stringify(c.interface, null, '\t')).trim() + ')' + '; \n\n';
    
    js += sm + ".bytecode = '" + c.bytecode + "'; \n\n";
	
    return js; 
}