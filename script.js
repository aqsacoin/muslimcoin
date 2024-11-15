document.addEventListener("DOMContentLoaded", function() {
  
  // تحقق من حالة تسجيل الدخول
  const isLoggedIn = localStorage.getItem('loggedIn');
  
  // العناصر في الصفحة
  const userInfo = document.querySelector('.profile-data');
  const logoutBtn = document.getElementById('logout-btn');
  const usernameElement = document.querySelector('.username');
  const balanceElement = document.querySelector('.balance span');
  const profilePic = document.querySelector('.profile-pic');
  const miningButton = document.getElementById('mine-btn');
  const timerElement = document.getElementById('timer');

  // إذا كان المستخدم مسجلاً، اعرض بياناته
  if (isLoggedIn) {
    // عرض بيانات المستخدم
    userInfo.style.display = 'block';
    logoutBtn.style.display = 'inline-block';
    
    // هنا يمكن إضافة بيانات المستخدم الفعلية
    const username = localStorage.getItem('username') || 'اسم المستخدم';
    const balance = localStorage.getItem('balance') || '0.00';
    const profilePicture = localStorage.getItem('profilePic') || 'https://via.placeholder.com/100';

    usernameElement.textContent = username;
    balanceElement.textContent = balance;
    profilePic.src = profilePicture;

  } else {
    // إذا لم يكن المستخدم مسجلاً، إعادة التوجيه إلى صفحة تسجيل الدخول
    window.location.href = 'pages/login.html';
  }

  // وظيفة تسجيل الخروج
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(event) {
      event.preventDefault();
      // مسح بيانات الجلسة من localStorage
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('balance');
      localStorage.removeItem('profilePic');
      window.location.href = 'pages/login.html';
    });
  }

  // وظيفة التعدين
  if (miningButton) {
    miningButton.addEventListener('click', function() {
      // تحقق من انتهاء العد التنازلي
      if (timerElement.textContent === "00:00:00") {
        // إضافة 3 عملات إلى الرصيد
        let currentBalance = parseFloat(localStorage.getItem('balance') || '0');
        currentBalance += 3;
        localStorage.setItem('balance', currentBalance.toFixed(2));
        balanceElement.textContent = currentBalance.toFixed(2);

        // بدء مؤقت التعدين الجديد لمدة 24 ساعة
        startMiningTimer();
      } else {
        alert("لم يكتمل العد التنازلي للتعدين بعد.");
      }
    });
  }

  // وظيفة بدء مؤقت التعدين
  function startMiningTimer() {
    let seconds = 86400; // 24 ساعة بالثواني
    const updateTimer = () => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      timerElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;

      if (seconds > 0) {
        seconds--;
      }
    };

    // إضافة صفر قبل الأرقام الصغيرة
    const padZero = (num) => (num < 10 ? '0' + num : num);

    setInterval(updateTimer, 1000);
    updateTimer();
  }

  // وظيفة لتسجيل الدخول (يُستخدم في صفحة تسجيل الدخول)
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const username = document.querySelector('#login-email').value;
      const password = document.querySelector('#login-password').value;

      if (username && password) {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', username);
        localStorage.setItem('balance', '0.00');
        localStorage.setItem('profilePic', 'https://via.placeholder.com/100');
        window.location.href = 'index.html';
      } else {
        alert('يرجى إدخال اسم المستخدم وكلمة المرور');
      }
    });
  }

  // تحقق من حالة المؤقت الحالية عند التحميل
  if (timerElement) {
    const remainingTime = localStorage.getItem('remainingTime');
    if (remainingTime) {
      seconds = parseInt(remainingTime, 10);
      startMiningTimer(); // تابع العد التنازلي المتبقي
    }
  }
});