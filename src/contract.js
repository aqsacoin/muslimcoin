class MuslimCoin {
  constructor(totalSupply) {
    this.totalSupply = totalSupply;
    this.balance = {};
    this.referrals = {};
    this.dailyRewards = {};
    this.transactionFees = 0.05;  // رسوم المعاملات 0.05
    this.burnAddress = 'burn-address';
    this.teamShare = 0.25 * totalSupply;  // 25% للفريق
    this.totalDistributed = totalSupply - this.teamShare;
  }

  mineCoins(miningRewardAddress) {
    let miningReward = 3;  // 3 عملات لكل دورة تعدين

    // زيادة المكافأة بناءً على التفاعل مع الإحالات أو المهام اليومية
    if (this.referrals[miningRewardAddress]) {
      miningReward += this.referrals[miningRewardAddress] * 0.1;  // 0.1 عملة إضافية لكل إحالة
    }

    if (this.dailyRewards[miningRewardAddress]) {
      miningReward += 0.5;  // 0.5 عملة إضافية إذا تم التفاعل مع المهام اليومية
    }

    if (!this.balance[miningRewardAddress]) {
      this.balance[miningRewardAddress] = 0;
    }

    this.balance[miningRewardAddress] += miningReward;  // إضافة المكافأة إلى الرصيد

    return {
      from: 'system',
      to: miningRewardAddress,
      amount: miningReward,
    };
  }

  addReferral(userAddress, referredAddress) {
    if (!this.referrals[userAddress]) {
      this.referrals[userAddress] = 0;
    }
    this.referrals[userAddress]++;
  }

  rewardDailyTask(userAddress) {
    this.dailyRewards[userAddress] = true;
  }

  getBalance(address) {
    return this.balance[address] || 0;
  }

  transfer(sender, receiver, amount) {
    // خصم رسوم المعاملة 0.05 لكل عملية
    const transactionFee = amount * this.transactionFees;
    const finalAmount = amount - transactionFee;

    if (this.balance[sender] < amount) {
      throw new Error('Insufficient balance');
    }

    this.balance[sender] -= amount;  // خصم من رصيد المرسل
    if (!this.balance[receiver]) {
      this.balance[receiver] = 0;
    }
    this.balance[receiver] += finalAmount;  // إضافة المبلغ إلى رصيد المستقبل

    // حرق الرسوم
    if (!this.balance[this.burnAddress]) {
      this.balance[this.burnAddress] = 0;
    }
    this.balance[this.burnAddress] += transactionFee;  // إضافة الرسوم إلى عنوان الحرق

    return {
      from: sender,
      to: receiver,
      amount: finalAmount,
      fee: transactionFee,
    };
  }
}

module.exports = MuslimCoin;