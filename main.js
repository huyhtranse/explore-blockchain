const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, data, timestamp, previousHash = ''){
    this.index = index;
    this.data = data;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  createGenesisBlock() {
    return new Block(0, 'the new world', '14/09/1996', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }
  
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
      
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      return true
    }
  }
}

const superChain = new BlockChain();

superChain.addBlock(new Block(1, { amount: 50 }, '20/09/2021'));
superChain.addBlock(new Block(2, { amount: 100 }, '29/10/2021'));

superChain.chain[1].data = { amount: 20 } 
superChain.chain[1].hash = superChain.chain[1].calculateHash()

console.log(JSON.stringify(superChain, null, 4));
console.log(superChain.isChainValid());
