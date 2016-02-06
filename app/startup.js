module.exports = {
    coin: ""
};

/*

if(typeof web3 === 'undefined') {
    //ethnode.cloudapp.net
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}


var token_address = '0xa3b66e4f316959326adbf73554202da99216dcf9';

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  

  Template.hello.helpers({
    balance: function () {
      return Session.get('counter');
    },
    accountInfo: {
      coinbase: web3.eth.coinbase,
      ethbalance: function(){
          return web3.eth.getBalance(web3.eth.coinbase);
      },
      langabalance : function(){
          //console.log(coin.at(web3.eth.coinbase))
          return token.at(token_address).balanceOf(web3.eth.coinbase);
      },
      
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

*/