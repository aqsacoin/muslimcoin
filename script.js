document.addEventListener("DOMContentLoaded", function() {
  // التحقق من حالة تسجيل الدخول
  const isLoggedIn = localStorage.getItem('loggedIn');
  const isKYCVerified = localStorage.getItem('kycVerified'); // التحقق من KYC
  const mineBtn = document.getElementById('mine-btn');
  const balanceElement = document.querySelector('.balance span');
  const timerElement = document.getElementById('timer');
  const logoutBtn = document.querySelector('.logout-btn');

  // تحقق من كون المستخدم مسجلاً وتحديث واجهة المستخدم
  if (isLoggedIn) {
    // إظهار بيانات المستخدم
    const username = localStorage.getItem('username') || 'اسم المستخدم';
    const balance = localStorage.getItem('balance') || '0.00';
    document.querySelector('.username').textContent = username;
    balanceElement.textContent = balance;

    // تحقق من وقت التعدين الأخير
    let lastMiningTime = localStorage.getItem('lastMiningTime');
    const miningDuration = 24 * 60 * 60; // 24 ساعة بالثواني
    let currentTime = Math.floor(Date.now() / 1000); // الوقت الحالي بالثواني

    if (lastMiningTime) {
      let remainingTime = (lastMiningTime + miningDuration) - currentTime;
      if (remainingTime > 0) {
        // إيقاف زر التعدين إذا لم تمر 24 ساعة
        mineBtn.disabled = true;
        let hours = Math.floor(remainingTime / 3600);
        let minutes = Math.floor((remainingTime % 3600) / 60);
        let seconds = remainingTime % 60;
        timerElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
      } else {
        mineBtn.disabled = false;
        timerElement.textContent = '00:00:00'; // عند انتهاء الدورة
      }
    } else {
      mineBtn.disabled = false; // إذا لم يكن هناك وقت تعدين سابق
    }

    // التحقق من KYC
    if (!isKYCVerified) {
      // منع التعدين إذا لم يمر المستخدم من التحقق
      mineBtn.disabled = true;
      alert('يرجى إتمام التحقق من الهوية أولاً');
    }
  } else {
    // إعادة توجيه المستخدم إذا لم يكن مسجلاً
    window.location.href = '/muslimcoin/pages/login.html';
  }

  // التفاعل مع زر التعدين
  if (mineBtn) {
    mineBtn.addEventListener('click', function() {
      // تخزين وقت التعدين الحالي في localStorage
      localStorage.setItem('lastMiningTime', Math.floor(Date.now() / 1000));
      mineBtn.disabled = true; // تعطيل الزر

      // تحديث الرصيد بعد التعدين
      let currentBalance = parseFloat(localStorage.getItem('balance') || '0.00');
      let newBalance = (currentBalance + 3).toFixed(2); // إضافة 3 عملات للمستخدم
      localStorage.setItem('balance', newBalance);
      balanceElement.textContent = `${newBalance} MuslimCoins`;

      // هنا يمكن إضافة وظيفة التفاعل مع العقد الذكي لتحديث البيانات في الشبكة
    });
  }

  // وظيفة تسجيل الخروج
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(event) {
      event.preventDefault();

      // مسح بيانات الجلسة من localStorage
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('balance');
      localStorage.removeItem('lastMiningTime');
      localStorage.removeItem('kycVerified');

      // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
      window.location.href = '/muslimcoin/pages/login.html';
    });
  }

  // إضافة صفر قبل الأرقام الصغيرة
  function padZero(num) {
    return num < 10 ? '0' + num : num;
  }
});