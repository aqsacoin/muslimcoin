// محاكاة محفظة المستخدم باستخدام العقد الذكي
class MuslimCoinWallet {
  constructor() {
    this.balance = 0;
    this.address = this.generateAddress();
    this.recoveryPhrase = this.generateRecoveryPhrase();
  }

  // توليد عنوان يبدأ بـ MSC
  generateAddress() {
    return 'MSC' + Math.random().toString(36).substr(2, 15);  // مثال على توليد عنوان فريد
  }

  // توليد 12 كلمة استرداد عشوائية
  generateRecoveryPhrase() {
    const words = ['apple', 'banana', 'cherry', 'date', 'elephant', 'fox', 'grape', 'honey', 'iris', 'jack', 'kite', 'lemon'];
    let recoveryPhrase = [];
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      recoveryPhrase.push(words[randomIndex]);
    }
    return recoveryPhrase.join(' ');
  }

  // عرض الرصيد
  getBalance() {
    return this.balance;
  }

  // إضافة عملات إلى المحفظة
  addCoins(amount) {
    this.balance += amount;
  }

  // خصم المعاملات وتحويل الأموال بين المستخدمين
  transfer(receiverAddress, amount) {
    if (this.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // خصم رسوم المعاملة 0.05
    const transactionFee = amount * 0.05;
    const finalAmount = amount - transactionFee;

    this.balance -= amount;  // خصم من الرصيد
    receiverAddress.addCoins(finalAmount);  // إضافة المبلغ إلى المحفظة المستقبل

    return {
      from: this.address,
      to: receiverAddress.address,
      amount: finalAmount,
      fee: transactionFee,
    };
  }

  // مكافأة المهام اليومية
  rewardDailyTask() {
    this.balance += 0.5;  // إضافة 0.5 عملة كمكافأة
  }
}

// إنشاء محفظة
const wallet = new MuslimCoinWallet();

// عرض العنوان ورصيد المحفظة
document.getElementById('address').innerText = wallet.address;
document.getElementById('balance').innerText = wallet.getBalance();

// عرض كلمات الاسترداد
document.getElementById('recovery-phrase').innerText = wallet.recoveryPhrase;

// إدارة التحويلات
document.getElementById('transfer-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const receiverAddress = document.getElementById('receiver-address').value;
  const amount = parseFloat(document.getElementById('amount').value);

  try {
    const receiverWallet = new MuslimCoinWallet(); // إنشاء محفظة مستقبل جديدة
    const transferResult = wallet.transfer(receiverWallet, amount);
    document.getElementById('transfer-status').innerText = `تم إرسال ${transferResult.amount} إلى ${receiverAddress} مع رسوم ${transferResult.fee}.`;
    document.getElementById('balance').innerText = wallet.getBalance();  // تحديث الرصيد
  } catch (error) {
    document.getElementById('transfer-status').innerText = error.message;
  }
});

// إدارة مكافأة المهام اليومية
document.getElementById('daily-reward-btn').addEventListener('click', function () {
  wallet.rewardDailyTask();
  document.getElementById('reward-status').innerText = 'تم استلام مكافأة يومية بقيمة 0.5 عملة.';
  document.getElementById('balance').innerText = wallet.getBalance();  // تحديث الرصيد
});