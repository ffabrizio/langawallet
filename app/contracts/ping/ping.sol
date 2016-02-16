contract ping { 
    function echo( address recipient ) constant returns (address) {
        return recipient;
    }
    
    function pong( ) constant returns (address) {
        return msg.sender;
    }
}