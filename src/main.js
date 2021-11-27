const { BlockChain, Transaction } = require('./blockchain');

const superChain = new BlockChain();

superChain.createTransaction('add1', 'add2', 100);
superChain.createTransaction('add2', 'add1', 50);

console.log('Start mining.');
superChain.minePendingTransactions('my-address');
console.log('Balance of mine: ', superChain.getBalanceOfAddress('my-address'));


console.log('Start mining.');
superChain.minePendingTransactions('my-address');
console.log('Balance of mine: ', superChain.getBalanceOfAddress('my-address'));

