document.addEventListener('DOMContentLoaded', () => {
  const miningButton = document.getElementById('miningButton');
  const userBalanceElement = document.getElementById('userBalance');
  const userAddress = localStorage.getItem('userAddress') || generateUserAddress();
  const miningCycleDuration = 24 * 60 * 60 * 1000; // 24 ساعة بالمللي ثانية

  // توليد عنوان المستخدم وحفظه
  function generateUserAddress() {
    const address = 'user-' + Date.now();
    localStorage.setItem('userAddress', address);
    return address;
  }

  // تحديث الرصيد في الواجهة
  function updateBalance() {
    fetch(`/balance?address=${userAddress}`)
      .then(response => response.json())
      .then(data => {
        userBalanceElement.innerText = `رصيدك: ${data.balance} MuslimCoin`;
      })
      .catch(console.error);
  }

  // التحقق من حالة الزر عند التحميل
  function checkMiningStatus() {
    const lastMiningTime = localStorage.getItem('lastMiningTime');
    if (lastMiningTime) {
      const timeSinceLastMining = Date.now() - parseInt(lastMiningTime, 10);
      if (timeSinceLastMining < miningCycleDuration) {
        disableMiningButton(miningCycleDuration - timeSinceLastMining);
      } else {
        enableMiningButton();
      }
    }
  }

  // تعطيل زر التعدين مع مؤقت العد التنازلي
  function disableMiningButton(remainingTime) {
    miningButton.disabled = true;
    const countdownInterval = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        enableMiningButton();
      } else {
        remainingTime -= 1000;
        miningButton.innerText = `التعدين متوقف - ${Math.floor(remainingTime / 1000 / 60)} دقيقة`;
      }
    }, 1000);
  }

  // تمكين زر التعدين
  function enableMiningButton() {
    miningButton.disabled = false;
    miningButton.innerText = 'ابدأ التعدين';
  }

  // بدء عملية التعدين
  miningButton.addEventListener('click', () => {
    miningButton.disabled = true;
    miningButton.innerText = 'جاري التعدين...';

    fetch(`/mine?address=${userAddress}`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('lastMiningTime', Date.now().toString());
        updateBalance();
        disableMiningButton(miningCycleDuration);
      })
      .catch(error => {
        console.error(error);
        enableMiningButton();
      });
  });

  updateBalance();
  checkMiningStatus();
});