// إضافة express في بداية الكود
const express = require('express');
const app = express();

// إعداد المسار لعرض ملفات الواجهة من مجلد public
app.use(express.static('public')); // نشر مجلد public لملفات الواجهة

// المسار الرئيسي لعرض صفحة index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// بدء الخادم على المنفذ 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// الأكواد الأخرى الخاصة بالبلوك تشين والعقد
const crypto = require('crypto');
// تعديل المسار لعقد البلوكتشين ليكون في مجلد src
const MuslimCoin = require('./src/contract'); // تعديل المسار إذا كان العقد في مجلد src

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

  calculateBlockHash(index, timestamp, transactions, nonce, previousBlockHash) {
    return crypto
      .createHash('sha256')
      .update(index + timestamp + JSON.stringify(transactions) + nonce + previousBlockHash)
      .digest('hex');
  }
}

module.exports = Blockchain;