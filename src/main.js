const SHA256 = require("crypto-js/sha256");

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}
class Block {
  constructor(transactions, timestamp, previousHash = '') {
    this.transactions = transactions;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficult) {
    while(this.hash.substring(0, difficult) !== Array(difficult + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('Add with hash: ' + this.hash);
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficult = 4;
    this.pendingTransactions = [];
    this.miningRewards = 1;
  }

  createGenesisBlock() {
    return new Block('the new world', '14/09/1996', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }
  
  minePendingTransactions(miningAddress) {
    const block = new Block(this.pendingTransactions, Date.now());

    block.mineBlock(this.difficult);
    this.chain = [...this.chain, block];

    console.log('Congratulations! Mined successfully!');
    this.pendingTransactions = [new Transaction(null, miningAddress, this.miningRewards)];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for(const block of this.chain) {
      for(const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
      
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      return true;
    }
  }
}

const superChain = new BlockChain();

superChain.createTransaction('add1', 'add2', 100);
superChain.createTransaction('add2', 'add1', 50);

console.log('Start mining.');
superChain.minePendingTransactions('my-address');
console.log('Balance of mine: ', superChain.getBalanceOfAddress('my-address'));


console.log('Start mining.');
superChain.minePendingTransactions('my-address');
console.log('Balance of mine: ', superChain.getBalanceOfAddress('my-address'));

