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

/* Package-scope variables */
var PersistentMinimongo;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/frozeman_persistent-minimongo/persistent-minimongo.js                                   //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
/**                                                                                                 // 1
Packages                                                                                            // 2
                                                                                                    // 3
@module Packages                                                                                    // 4
*/                                                                                                  // 5
                                                                                                    // 6
/**                                                                                                 // 7
The PersistentMinimongo package                                                                     // 8
                                                                                                    // 9
@class PersistentMinimongo                                                                          // 10
@constructor                                                                                        // 11
*/                                                                                                  // 12
                                                                                                    // 13
                                                                                                    // 14
                                                                                                    // 15
/**                                                                                                 // 16
If the localstorage goes over 4.8 MB, trim the collections.                                         // 17
                                                                                                    // 18
@property capLocalStorageSize                                                                       // 19
*/                                                                                                  // 20
var capLocalStorageSize = 4.8;                                                                      // 21
                                                                                                    // 22
/**                                                                                                 // 23
If the localstorage goes over `capLocalStorageSize`, trim the current collection,                   // 24
which wanted to add a new entry, by 50 entries.                                                     // 25
                                                                                                    // 26
@property trimCollectionBy                                                                          // 27
*/                                                                                                  // 28
var trimCollectionBy = 50;                                                                          // 29
                                                                                                    // 30
                                                                                                    // 31
PersistentMinimongo = function (collection) {                                                       // 32
    var self = this;                                                                                // 33
    if (! (self instanceof PersistentMinimongo))                                                    // 34
        throw new Error('use "new" to construct a PersistentMinimongo');                            // 35
                                                                                                    // 36
    self.key = 'minimongo__' + collection._name;                                                    // 37
    self.col = collection;                                                                          // 38
    self.stats = { added: 0, removed: 0, changed: 0 };                                              // 39
                                                                                                    // 40
    persisters.push(self);                                                                          // 41
                                                                                                    // 42
    // Check if the localstorage is to big and reduce the current collection by 50 items, every 30s
    Meteor.setInterval(function() {                                                                 // 44
        self.capCollection();                                                                       // 45
    }, 1000 * 30);                                                                                  // 46
                                                                                                    // 47
    // load from storage                                                                            // 48
    self.refresh(true);                                                                             // 49
                                                                                                    // 50
    // Meteor.startup(function () {                                                                 // 51
    self.col.find({}).observe({                                                                     // 52
        added: function (doc) {                                                                     // 53
                                                                                                    // 54
            // get or initialize tracking list                                                      // 55
            var list = amplify.store(self.key);                                                     // 56
            if (! list)                                                                             // 57
                list = [];                                                                          // 58
                                                                                                    // 59
            // add document id to tracking list and store                                           // 60
            if (! _.contains(list, doc._id)) {                                                      // 61
                list.push(doc._id);                                                                 // 62
                amplify.store(self.key, list);                                                      // 63
            }                                                                                       // 64
                                                                                                    // 65
            // store copy of document into local storage, if not already there                      // 66
            var key = self._makeDataKey(doc._id);                                                   // 67
            if(! amplify.store(key)) {                                                              // 68
                amplify.store(key, doc);                                                            // 69
            }                                                                                       // 70
                                                                                                    // 71
            ++self.stats.added;                                                                     // 72
        },                                                                                          // 73
                                                                                                    // 74
        removed: function (doc) {                                                                   // 75
            var list = amplify.store(self.key);                                                     // 76
                                                                                                    // 77
            // if not in list, nothing to do                                                        // 78
            if(! _.contains(list, doc._id))                                                         // 79
                return;                                                                             // 80
                                                                                                    // 81
            // remove from list                                                                     // 82
            list = _.without(list, doc._id);                                                        // 83
                                                                                                    // 84
            // remove document copy from local storage                                              // 85
            amplify.store(self._makeDataKey(doc._id), null);                                        // 86
                                                                                                    // 87
            // if tracking list is empty, delete; else store updated copy                           // 88
            amplify.store(self.key, list.length === 0 ? null : list);                               // 89
                                                                                                    // 90
            ++self.stats.removed;                                                                   // 91
        },                                                                                          // 92
                                                                                                    // 93
        changed: function (newDoc, oldDoc) {                                                        // 94
            // update document in local storage                                                     // 95
            amplify.store(self._makeDataKey(newDoc._id), newDoc);                                   // 96
            ++self.stats.changed;                                                                   // 97
        }                                                                                           // 98
    });                                                                                             // 99
    // });                                                                                          // 100
};                                                                                                  // 101
                                                                                                    // 102
PersistentMinimongo.prototype = {                                                                   // 103
    constructor: PersistentMinimongo,                                                               // 104
    _getStats: function () {                                                                        // 105
        return this.stats;                                                                          // 106
    },                                                                                              // 107
    _getKey: function () {                                                                          // 108
        return this.key;                                                                            // 109
    },                                                                                              // 110
    _makeDataKey: function (id) {                                                                   // 111
        return this.key + '__' + id;                                                                // 112
    },                                                                                              // 113
    /**                                                                                             // 114
    Refresh the local storage                                                                       // 115
                                                                                                    // 116
    @method refresh                                                                                 // 117
    @return {String}                                                                                // 118
    */                                                                                              // 119
    refresh: function (init) {                                                                      // 120
        var self = this;                                                                            // 121
        var list = amplify.store(self.key);                                                         // 122
                                                                                                    // 123
        self.stats.added = 0;                                                                       // 124
                                                                                                    // 125
                                                                                                    // 126
        if (!! list) {                                                                              // 127
            var length = list.length;                                                               // 128
            list = _.filter(list, function (id) {                                                   // 129
                var doc = amplify.store(self._makeDataKey(id));                                     // 130
                if(!! doc) {                                                                        // 131
                    var id = doc._id;                                                               // 132
                    delete doc._id;                                                                 // 133
                    self.col.upsert({_id: id}, {$set: doc});                                        // 134
                }                                                                                   // 135
                                                                                                    // 136
                return !! doc;                                                                      // 137
            });                                                                                     // 138
                                                                                                    // 139
            // if not initializing, check for deletes                                               // 140
            if(! init) {                                                                            // 141
                _.each(self.col.find({}).fetch(), function (doc) {                                  // 142
                    if(! _.contains(list, doc._id))                                                 // 143
                        self.col.remove({ _id: doc._id});                                           // 144
                });                                                                                 // 145
            }                                                                                       // 146
                                                                                                    // 147
            // if initializing, save cleaned list (if changed)                                      // 148
            if(init && length != list.length)                                                       // 149
                amplify.store(self.key, list.length === 0 ? null : list);                           // 150
        }                                                                                           // 151
    },                                                                                              // 152
    /**                                                                                             // 153
    Gets the current localstorage size in MB                                                        // 154
                                                                                                    // 155
    @method localStorageSize                                                                        // 156
    @return {String} total localstorage size in MB                                                  // 157
    */                                                                                              // 158
    localStorageSize: function() {                                                                  // 159
                                                                                                    // 160
        // function toSizeMB(info) {                                                                // 161
        //   info.size = toMB(info.size).toFixed(2) + ' MB';                                        // 162
        //   return info;                                                                           // 163
        // }                                                                                        // 164
                                                                                                    // 165
        // var sizes = Object.keys(localStorage).map(toSize).map(toSizeMB);                         // 166
        // console.table(sizes);                                                                    // 167
                                                                                                    // 168
        var size = 0;                                                                               // 169
        if(localStorage) {                                                                          // 170
            _.each(Object.keys(localStorage), function(key){                                        // 171
                size += localStorage[key].length * 2 / 1024 / 1024;                                 // 172
            });                                                                                     // 173
        }                                                                                           // 174
                                                                                                    // 175
        return size;                                                                                // 176
    },                                                                                              // 177
    /**                                                                                             // 178
    Check if the localstorage is to big and reduce the current collection by 50 items               // 179
                                                                                                    // 180
    @method localStorageSize                                                                        // 181
    @return {String}                                                                                // 182
    */                                                                                              // 183
    capCollection: function(){                                                                      // 184
        var _this = this;                                                                           // 185
                                                                                                    // 186
        if(_this.localStorageSize() > capLocalStorageSize) {                                        // 187
            console.log(_this.localStorageSize(), _this.col.find({}).count());                      // 188
            // find the first 50 entries and remove them                                            // 189
            _.each(_this.col.find({}, {limit: trimCollectionBy}).fetch(), function(item){           // 190
                _this.col.remove(item._id);                                                         // 191
            });                                                                                     // 192
        }                                                                                           // 193
    }                                                                                               // 194
};                                                                                                  // 195
                                                                                                    // 196
var persisters = [];                                                                                // 197
var lpTimer = null;                                                                                 // 198
                                                                                                    // 199
// React on manual local storage changes                                                            // 200
Meteor.startup(function () {                                                                        // 201
    $(window).bind('storage', function (e) {                                                        // 202
        Meteor.clearTimeout(lpTimer);                                                               // 203
        lpTimer = Meteor.setTimeout(function () {                                                   // 204
            _.each(persisters, function (lp) {                                                      // 205
                lp.refresh(false);                                                                  // 206
            });                                                                                     // 207
        }, 250);                                                                                    // 208
    });                                                                                             // 209
});                                                                                                 // 210
                                                                                                    // 211
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['frozeman:persistent-minimongo'] = {
  PersistentMinimongo: PersistentMinimongo
};

})();
