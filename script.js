document.addEventListener("DOMContentLoaded", function() {
  
  // التحقق من حالة تسجيل الدخول
  const isLoggedIn = localStorage.getItem('loggedIn');

  // توجيه المستخدم لصفحة التسجيل عند الدخول الأول
  if (!isLoggedIn) {
    window.location.href = 'pages/login.html';
  }

  // العناصر في الصفحة
  const userInfo = document.querySelector('.profile-data');
  const logoutBtn = document.getElementById('logout-btn');
  const usernameElement = document.querySelector('.username');
  const balanceElement = document.querySelector('.balance span');
  const profilePic = document.querySelector('.profile-pic');
  const timerElement = document.getElementById('timer');
  const miningButton = document.getElementById('mine-btn'); // زر التعدين

  // إذا كان المستخدم مسجلاً، اعرض بياناته
  if (isLoggedIn) {
    userInfo.style.display = 'block';
    logoutBtn.style.display = 'inline-block';

    // الحصول على بيانات المستخدم
    const username = localStorage.getItem('username') || 'اسم المستخدم';
    const balance = localStorage.getItem('balance') || '0.00';
    const profilePicture = localStorage.getItem('profilePic') || 'https://via.placeholder.com/100';

    usernameElement.textContent = username;
    balanceElement.textContent = balance;
    profilePic.src = profilePicture;
  }

  // وظيفة تسجيل الخروج
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(event) {
      event.preventDefault();
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('balance');
      localStorage.removeItem('profilePic');
      window.location.href = 'pages/login.html';
    });
  }

  // مؤقت التعدين
  let miningCooldown = false; // لضمان أن التعدين لا يبدأ تلقائيًا
  let seconds = 86400; // 24 ساعة للتعدين (86400 ثانية)

  const updateTimer = () => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    timerElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;

    if (seconds > 0) {
      seconds--;
    } else {
      miningCooldown = false; // بعد انتهاء المؤقت، يسمح بالتعدين مرة أخرى
      miningButton.disabled = false;
    }
  };

  // إضافة صفر قبل الأرقام الصغيرة
  const padZero = (num) => (num < 10 ? '0' + num : num);

  if (timerElement) {
    setInterval(updateTimer, 1000);
    updateTimer();
  }

  // وظيفة التعدين
  if (miningButton) {
    miningButton.addEventListener('click', function() {
      if (!miningCooldown) {
        miningCooldown = true;
        seconds = 86400; // إعادة ضبط المؤقت إلى 24 ساعة
        miningButton.disabled = true; // تعطيل الزر حتى ينتهي العد

        // إضافة العملات إلى الرصيد
        let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
        currentBalance += 3; // إضافة 3 عملات
        localStorage.setItem('balance', currentBalance.toFixed(2));
        balanceElement.textContent = currentBalance.toFixed(2);
      } else {
        alert("يجب الانتظار حتى انتهاء المؤقت للتعدين مرة أخرى.");
      }
    });
  }

  // وظيفة تسجيل الدخول
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
});