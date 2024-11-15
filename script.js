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
  const mineButton = document.getElementById('mine-btn');
  
  // إذا كان المستخدم مسجلاً، اعرض بياناته
  if (isLoggedIn) {
    userInfo.style.display = 'block'; 
    logoutBtn.style.display = 'inline-block'; 
    
    const username = localStorage.getItem('username') || 'اسم المستخدم';
    const balance = localStorage.getItem('balance') || '0.00';
    const profilePicture = localStorage.getItem('profilePic') || 'https://via.placeholder.com/100';

    usernameElement.textContent = username;
    balanceElement.textContent = balance;
    profilePic.src = profilePicture;

  } else {
    window.location.href = 'pages/login.html';
  }

  // وظيفة تسجيل الخروج
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(event) {
      event.preventDefault();
      localStorage.clear();
      window.location.href = 'pages/login.html';
    });
  }

  // إعداد مؤقت التعدين
  if (mineButton) {
    mineButton.addEventListener('click', function() {
      const lastMiningTime = localStorage.getItem('lastMiningTime');
      const currentTime = new Date().getTime();

      if (lastMiningTime && currentTime - lastMiningTime < 86400000) {
        alert('لم يمر 24 ساعة بعد. الرجاء المحاولة لاحقًا.');
        return;
      }
      
      mineButton.disabled = true;
      let seconds = 86400;

      const updateTimer = () => {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = seconds % 60;

        timerElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;

        if (seconds > 0) {
          seconds--;
        } else {
          mineButton.disabled = false;
          localStorage.setItem('lastMiningTime', new Date().getTime());
          updateBalance();
        }
      };

      const padZero = (num) => (num < 10 ? '0' + num : num);

      setInterval(updateTimer, 1000);
      updateTimer();
    });
  }

  const updateBalance = () => {
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 0;
    currentBalance += 3;
    localStorage.setItem('balance', currentBalance.toFixed(2));
    balanceElement.textContent = currentBalance.toFixed(2);
  };

  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const email = document.querySelector('#login-email').value;
      const password = document.querySelector('#login-password').value;

      const storedEmail = localStorage.getItem('registeredEmail');
      const storedPassword = localStorage.getItem('registeredPassword');

      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem('loggedIn', true);
        window.location.href = 'index.html';
      } else {
        alert('بيانات غير صحيحة. يرجى المحاولة مجددًا.');
      }
    });
  }

  const registerForm = document.querySelector('#register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const username = document.querySelector('#username').value;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      localStorage.setItem('registeredUsername', username);
      localStorage.setItem('registeredEmail', email);
      localStorage.setItem('registeredPassword', password);

      alert('تم التسجيل بنجاح. يمكنك الآن تسجيل الدخول.');
      window.location.href = 'pages/login.html';
    });
  }

  const registerLink = document.querySelector('#register-link');
  if (registerLink) {
    registerLink.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'pages/register.html';
    });
  }
});