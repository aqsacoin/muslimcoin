const crypto = require('crypto');
const MuslimCoin = require('./contract');

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.muslimCoin = new MuslimCoin(10000000000);  // إجمالي العرض 10 مليار
    this.createNewBlock(100, '1');  // إنشاء أول بلوك مع التحقق من الأعداد
  }

  createNewBlock(nonce, previousBlockHash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce,
      previousBlockHash,
      hash: this.calculateBlockHash(
        this.chain.length + 1,
        Date.now(),
        this.pendingTransactions,
        nonce,
        previousBlockHash
      ),
    };
    this.pendingTransactions = [];  // مسح المعاملات المعلقة بعد إنشاء البلوك
    this.chain.push(newBlock);  // إضافة البلوك الجديد إلى السلسلة
    return newBlock;
  }

  minePendingTransactions(miningRewardAddress) {
    const rewardTx = this.muslimCoin.mineCoins(miningRewardAddress);  // تعدين العملات
    this.pendingTransactions.push(rewardTx);  // إضافة المعاملة المعلقة
    return this.createNewBlock(0, this.getLatestBlock().hash);  // إنشاء البلوك الجديد بعد التعدين
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];  // الحصول على آخر بلوك في السلسلة
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.previousBlockHash !== previousBlock.hash) {
        return false;
      }

      const blockHash = this.calculateBlockHash(
        currentBlock.index,
        currentBlock.timestamp,
        currentBlock.transactions,
        currentBlock.nonce,
        currentBlock.previousBlockHash
      );
      if (blockHash !== currentBlock.hash) {
        return false;
      }
    }
    return true;
  }

  validateKYC(userAddress) {
    // تحقق من شرط الـ 30 دورة تعدين
    const user = this.muslimCoin.getUser(userAddress);
    if (user && user.miningCycles >= 30) {
      return true;  // يمكن إتمام الـ KYC
    }
    return false;  // لا يمكن إتمام الـ KYC بعد 30 دورة تعدين فقط
  }

  calculateBlockHash(index, timestamp, transactions, nonce, previousBlockHash) {
    return crypto
      .createHash('sha256')
      .update(index + timestamp + JSON.stringify(transactions) + nonce + previousBlockHash)
      .digest('hex');
  }
}

module.exports = Blockchain;