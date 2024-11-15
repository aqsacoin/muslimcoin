document.addEventListener("DOMContentLoaded", function() {

  // تحقق من حالة تسجيل الدخول
  const isLoggedIn = localStorage.getItem('loggedIn');
  
  // العناصر في الصفحة
  const userInfo = document.querySelector('.profile-data');
  const logoutBtn = document.getElementById('logout-btn');
  const usernameElement = document.querySelector('.username');
  const balanceElement = document.querySelector('.balance span');
  const profilePic = document.querySelector('.profile-pic');
  const timerElement = document.getElementById('timer');
  const mineButton = document.getElementById('mine-btn'); // زر التعدين
  let isMining = localStorage.getItem('isMining') === 'true'; // حالة التعدين السابقة
  
  // إذا لم يكن المستخدم مسجلاً، إعادة التوجيه إلى صفحة تسجيل الدخول
  if (!isLoggedIn) {
    window.location.href = 'pages/login.html';
    return;
  }

  // عرض بيانات المستخدم إذا كان مسجلاً
  userInfo.style.display = 'block'; 
  logoutBtn.style.display = 'inline-block'; 
  
  // استرجاع بيانات المستخدم المخزنة
  const username = localStorage.getItem('username') || 'اسم المستخدم';
  const balance = parseFloat(localStorage.getItem('balance') || '0.00');
  const profilePicture = localStorage.getItem('profilePic') || 'https://via.placeholder.com/100';

  usernameElement.textContent = username;
  balanceElement.textContent = balance.toFixed(2);
  profilePic.src = profilePicture;

  // وظيفة تسجيل الخروج
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(event) {
      event.preventDefault();
      
      // مسح بيانات الجلسة من localStorage
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('balance');
      localStorage.removeItem('profilePic');
      localStorage.removeItem('isMining');
      localStorage.removeItem('miningTime');
      
      // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
      window.location.href = 'pages/login.html'; 
    });
  }

  // إعداد مؤقت تنازلي في صفحة التعدين عند الضغط على زر التعدين فقط
  if (timerElement && mineButton) {
    let seconds = parseInt(localStorage.getItem('miningTime') || '3600'); // يبدأ من آخر قيمة أو ساعة
    
    const updateTimer = () => {
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds % 3600) / 60);
      let remainingSeconds = seconds % 60;

      timerElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;

      if (seconds > 0 && isMining) {
        seconds--;
        localStorage.setItem('miningTime', seconds); // حفظ الوقت الحالي
      } else if (seconds === 0 && isMining) {
        // إضافة العملات عند انتهاء العد التنازلي
        let currentBalance = parseFloat(localStorage.getItem('balance') || '0.00');
        currentBalance += 3; // إضافة العملات المكتسبة
        localStorage.setItem('balance', currentBalance);
        balanceElement.textContent = currentBalance.toFixed(2);
        
        // إعادة تعيين الوقت وجعل التعدين غير مفعل
        seconds = 3600;
        isMining = false;
        localStorage.setItem('isMining', 'false');
        localStorage.setItem('miningTime', seconds);
      }
    };

    const padZero = (num) => (num < 10 ? '0' + num : num);

    setInterval(updateTimer, 1000);
    updateTimer(); // تحديث الوقت عند التحميل

    // بدء التعدين عند الضغط على زر التعدين فقط
    mineButton.addEventListener('click', function() {
      if (!isMining) {
        isMining = true; // تفعيل التعدين
        localStorage.setItem('isMining', 'true');
        seconds = 3600; // تعيين المؤقت لساعة
        localStorage.setItem('miningTime', seconds);
      } else {
        alert('التعدين جاري بالفعل');
      }
    });
  }

  // إضافة وظيفة لتسجيل الدخول في صفحة تسجيل الدخول
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const username = document.querySelector('#login-email').value;
      const password = document.querySelector('#login-password').value;

      if (username && password) {
        // تخزين بيانات المستخدم في localStorage
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', username);
        localStorage.setItem('balance', '0.00');
        localStorage.setItem('profilePic', 'https://via.placeholder.com/100');  // صورة افتراضية

        // إعادة التوجيه بعد تسجيل الدخول
        window.location.href = 'index.html';
      } else {
        alert('يرجى إدخال اسم المستخدم وكلمة المرور');
      }
    });
  }
});