//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var Mongo = Package.mongo.Mongo;
var Web3 = Package['ethereum:web3'].Web3;
var BigNumber = Package['ethereum:web3'].BigNumber;

/* Package-scope variables */
var EthBlocks;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/ethereum_blocks/blocks.js                                                                           //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
/**                                                                                                             // 1
                                                                                                                // 2
@module Ethereum:blocks                                                                                         // 3
*/                                                                                                              // 4
                                                                                                                // 5
                                                                                                                // 6
                                                                                                                // 7
/**                                                                                                             // 8
The EthBlocks collection, with some ethereum additions.                                                         // 9
                                                                                                                // 10
@class EthBlocks                                                                                                // 11
@constructor                                                                                                    // 12
*/                                                                                                              // 13
                                                                                                                // 14
                                                                                                                // 15
                                                                                                                // 16
EthBlocks = new Mongo.Collection('ethereum_blocks', {connection: null});                                        // 17
                                                                                                                // 18
// if(typeof PersistentMinimongo !== 'undefined')                                                               // 19
//     new PersistentMinimongo(EthBlocks);                                                                      // 20
                                                                                                                // 21
                                                                                                                // 22
/**                                                                                                             // 23
Gives you reactively the lates block.                                                                           // 24
                                                                                                                // 25
@property latest                                                                                                // 26
*/                                                                                                              // 27
Object.defineProperty(EthBlocks, 'latest', {                                                                    // 28
    get: function () {                                                                                          // 29
        return EthBlocks.findOne({}, {sort: {number: -1}}) || {};                                               // 30
    },                                                                                                          // 31
    set: function (values) {                                                                                    // 32
        var block = EthBlocks.findOne({}, {sort: {number: -1}}) || {};                                          // 33
        values = values || {};                                                                                  // 34
        EthBlocks.update(block._id, {$set: values});                                                            // 35
    }                                                                                                           // 36
});                                                                                                             // 37
                                                                                                                // 38
/**                                                                                                             // 39
Stores all the callbacks                                                                                        // 40
                                                                                                                // 41
@property _forkCallbacks                                                                                        // 42
*/                                                                                                              // 43
EthBlocks._forkCallbacks = [];                                                                                  // 44
                                                                                                                // 45
                                                                                                                // 46
/**                                                                                                             // 47
Start looking for new blocks                                                                                    // 48
                                                                                                                // 49
@method init                                                                                                    // 50
*/                                                                                                              // 51
EthBlocks.init = function(){                                                                                    // 52
                                                                                                                // 53
    if(typeof web3 === 'undefined') {                                                                           // 54
        console.warn('EthBlocks couldn\'t find web3, please make sure to instantiate a web3 object before calling EthBlocks.init()');
        return;                                                                                                 // 56
    }                                                                                                           // 57
                                                                                                                // 58
    Tracker.nonreactive(function() {                                                                            // 59
        observeLatestBlocks();                                                                                  // 60
    });                                                                                                         // 61
};                                                                                                              // 62
                                                                                                                // 63
/**                                                                                                             // 64
Add callbacks to detect forks                                                                                   // 65
                                                                                                                // 66
@method detectFork                                                                                              // 67
*/                                                                                                              // 68
EthBlocks.detectFork = function(cb){                                                                            // 69
    EthBlocks._forkCallbacks.push(cb);                                                                          // 70
};                                                                                                              // 71
                                                                                                                // 72
/**                                                                                                             // 73
Clear all blocks                                                                                                // 74
                                                                                                                // 75
@method clear                                                                                                   // 76
*/                                                                                                              // 77
EthBlocks.clear = function(){                                                                                   // 78
    _.each(EthBlocks.find({}).fetch(), function(block){                                                         // 79
        EthBlocks.remove(block._id);                                                                            // 80
    });                                                                                                         // 81
};                                                                                                              // 82
                                                                                                                // 83
                                                                                                                // 84
/**                                                                                                             // 85
The global block filter instance.                                                                               // 86
                                                                                                                // 87
@property filter                                                                                                // 88
*/                                                                                                              // 89
var filter = null;                                                                                              // 90
                                                                                                                // 91
/**                                                                                                             // 92
Update the block info and adds additional properties.                                                           // 93
                                                                                                                // 94
@method updateBlock                                                                                             // 95
@param {Object} block                                                                                           // 96
*/                                                                                                              // 97
function updateBlock(block){                                                                                    // 98
                                                                                                                // 99
    // reset the chain, if the current blocknumber is 100 blocks less                                           // 100
    if(block.number + 10 < EthBlocks.latest.number)                                                             // 101
        EthBlocks.clear();                                                                                      // 102
                                                                                                                // 103
    block.difficulty = block.difficulty.toString(10);                                                           // 104
    block.totalDifficulty = block.totalDifficulty.toString(10);                                                 // 105
                                                                                                                // 106
    web3.eth.getGasPrice(function(e, gasPrice){                                                                 // 107
        if(!e) {                                                                                                // 108
            block.gasPrice = gasPrice.toString(10);                                                             // 109
            EthBlocks.upsert('bl_'+ block.hash.replace('0x','').substr(0,20), block);                           // 110
        }                                                                                                       // 111
    });                                                                                                         // 112
};                                                                                                              // 113
                                                                                                                // 114
/**                                                                                                             // 115
Observe the latest blocks and store them in the Blocks collection.                                              // 116
Additionally cap the collection to 50 blocks                                                                    // 117
                                                                                                                // 118
@method observeLatestBlocks                                                                                     // 119
*/                                                                                                              // 120
function observeLatestBlocks(){                                                                                 // 121
                                                                                                                // 122
    // get the latest block immediately                                                                         // 123
    web3.eth.getBlock('latest', function(e, block){                                                             // 124
        if(!e) {                                                                                                // 125
            updateBlock(block);                                                                                 // 126
        }                                                                                                       // 127
    });                                                                                                         // 128
                                                                                                                // 129
    // GET the latest blockchain information                                                                    // 130
    filter = web3.eth.filter('latest').watch(checkLatestBlocks);                                                // 131
                                                                                                                // 132
};                                                                                                              // 133
                                                                                                                // 134
/**                                                                                                             // 135
The observeLatestBlocks callback used in the block filter.                                                      // 136
                                                                                                                // 137
@method checkLatestBlocks                                                                                       // 138
*/                                                                                                              // 139
var checkLatestBlocks = function(e, hash){                                                                      // 140
    if(!e) {                                                                                                    // 141
        web3.eth.getBlock(hash, function(e, block){                                                             // 142
            if(!e) {                                                                                            // 143
                var oldBlock = EthBlocks.latest;                                                                // 144
                                                                                                                // 145
                // console.log('BLOCK', block.number);                                                          // 146
                                                                                                                // 147
                // if(!oldBlock)                                                                                // 148
                //     console.log('No previous block found: '+ --block.number);                                // 149
                                                                                                                // 150
                // CHECK for FORK                                                                               // 151
                if(oldBlock && oldBlock.hash !== block.parentHash) {                                            // 152
                    // console.log('FORK detected from Block #'+ oldBlock.number + ' -> #'+ block.number +'!');
                                                                                                                // 154
                    _.each(EthBlocks._forkCallbacks, function(cb){                                              // 155
                        if(_.isFunction(cb))                                                                    // 156
                            cb(oldBlock, block);                                                                // 157
                    });                                                                                         // 158
                }                                                                                               // 159
                                                                                                                // 160
                updateBlock(block);                                                                             // 161
                                                                                                                // 162
                // drop the 50th block                                                                          // 163
                var blocks = EthBlocks.find({}, {sort: {number: -1}}).fetch();                                  // 164
                if(blocks.length >= 5) {                                                                        // 165
                    var count = 0;                                                                              // 166
                    _.each(blocks, function(bl){                                                                // 167
                        count++;                                                                                // 168
                        if(count >= 5)                                                                          // 169
                            EthBlocks.remove({_id: bl._id});                                                    // 170
                    });                                                                                         // 171
                }                                                                                               // 172
            }                                                                                                   // 173
        });                                                                                                     // 174
                                                                                                                // 175
    // try to re-create the filter on error                                                                     // 176
    // TODO: want to do this?                                                                                   // 177
    } else {                                                                                                    // 178
        filter.stopWatching();                                                                                  // 179
        filter = web3.eth.filter('latest').watch(checkLatestBlocks);                                            // 180
    }                                                                                                           // 181
};                                                                                                              // 182
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['ethereum:blocks'] = {
  EthBlocks: EthBlocks
};

})();
