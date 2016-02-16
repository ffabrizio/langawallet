# langawallet

## an experimental Ξthereum wallet

##### geth dev mode
```
geth --identity "devchain" --rpc --rpccorsdomain "*" --datadir "/data/dev/" --maxpeers "0" --nodiscover --networkid "666" --genesis "/data/dev/genesis_block.json" --vmdebug --verbosity 6"
```


##### sample genesis_block.json
```
{
	"nonce": "0xdeadbeefdeadbeef",
	"timestamp": "0x0",
	"parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
	"extraData": "0x0",
	"gasLimit": "0x8000000",
	"difficulty": "0x400",
	"mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
	"coinbase": "0x0000000000000000000000000000000000000000",
	//"alloc": {
  	//	"0x41d30ea54723bdacc77bd9e83841957ef86e53cd": {
  	//		"balance": "1000000000000000000000"
  	// 	}
	//}
}
```

