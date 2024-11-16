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
    // إذا لم يكن المستخدم مسجلاً، إعادة التوجيه إلى صفحة التسجيل
    window.location.href = 'index.html';
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
      
      // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
      window.location.href = 'index.html'; 
    });
  }

  // إعداد مؤقت التعدين
  if (mineButton) {
    mineButton.addEventListener('click', function() {
      // التحقق إذا كان قد مر 24 ساعة
      const lastMiningTime = localStorage.getItem('lastMiningTime');
      const currentTime = new Date().getTime();

      if (lastMiningTime && currentTime - lastMiningTime < 86400000) { // 86400000 ملي ثانية = 24 ساعة
        alert('لم يمر 24 ساعة بعد. الرجاء المحاولة لاحقًا.');
        return;
      }
      
      // منع الزر من العمل مجددًا
      mineButton.disabled = true;
      
      // بدء العد التنازلي
      let seconds = 86400; // 24 ساعة بالثواني

      const updateTimer = () => {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = seconds % 60;

        // عرض الوقت بشكل مناسب
        timerElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;

        if (seconds > 0) {
          seconds--;
        } else {
          // بعد انتهاء الوقت، يتم تمكين الزر مرة أخرى
          mineButton.disabled = false;
          localStorage.setItem('lastMiningTime', new Date().getTime());
          updateBalance(); // إضافة العملات
        }
      };

      // إضافة صفر قبل الأرقام الصغيرة
      const padZero = (num) => (num < 10 ? '0' + num : num);

      setInterval(updateTimer, 1000);
      updateTimer(); // تحديث الوقت عند التحميل
    });
  }

  // وظيفة تحديث الرصيد بعد مرور 24 ساعة
  const updateBalance = () => {
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
    currentBalance += 3; // إضافة 3 عملات
    localStorage.setItem('balance', currentBalance.toFixed(2));
    balanceElement.textContent = currentBalance.toFixed(2);
  };

  // إضافة وظيفة للتنقل بين الصفحات (إذا كانت هناك صفحات أخرى تتطلب تفاعلاً)
  const navigationLinks = document.querySelectorAll('.navigation a');
  navigationLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      // يمكن إضافة دوال للتحقق قبل التوجيه إذا لزم الأمر
      if (!isLoggedIn && link.getAttribute('href') !== 'index.html') {
        event.preventDefault();
        alert('يجب تسجيل الدخول أولاً');
        window.location.href = 'index.html';
      }
    });
  });

  // إضافة وظيفة لتسجيل الدخول في صفحة تسجيل الدخول (كود افتراضي لتسجيل الدخول)
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const username = document.querySelector('#login-email').value;
      const password = document.querySelector('#login-password').value;

      // في هذا المثال، يمكن التحقق من اسم المستخدم وكلمة المرور (أو الاتصال بنظام تحقق حقيقي)
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

  // إضافة وظيفة للتوجيه إلى صفحة التسجيل في حالة رغبة المستخدم في إنشاء حساب جديد
  const registerLink = document.querySelector('#register-link');
  if (registerLink) {
    registerLink.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'register.html';
    });
  }

});