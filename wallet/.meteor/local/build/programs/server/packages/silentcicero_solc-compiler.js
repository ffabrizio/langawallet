(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var solc;

(function(){

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/silentcicero_solc-compiler/package-init.js                               //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
// Node environment                                                                  // 1
if(typeof global !== 'undefined') {                                                  // 2
    solc = (typeof global.solc !== 'undefined') ? global.solc : Npm.require('solc');
}                                                                                    // 4
                                                                                     // 5
///////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['silentcicero:solc-compiler'] = {
  solc: solc
};

})();

//# sourceMappingURL=silentcicero_solc-compiler.js.map
