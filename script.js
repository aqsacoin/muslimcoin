document.addEventListener("DOMContentLoaded", function() {
  const isLoggedIn = localStorage.getItem('loggedIn');
  const isKYCVerified = localStorage.getItem('kycVerified');
  const mineBtn = document.getElementById('mine-btn');
  const balanceElement = document.querySelector('.balance span');
  const timerElement = document.getElementById('timer');
  const logoutBtn = document.querySelector('.logout-btn');

  if (isLoggedIn) {
    const username = localStorage.getItem('username') || 'اسم المستخدم';
    const balance = localStorage.getItem('balance') || '0.00';
    document.querySelector('.username').textContent = username;
    balanceElement.textContent = balance;

    let lastMiningTime = parseInt(localStorage.getItem('lastMiningTime'), 10);
    const miningDuration = 24 * 60 * 60;
    let currentTime = Math.floor(Date.now() / 1000);

    if (lastMiningTime) {
      let remainingTime = (lastMiningTime + miningDuration) - currentTime;
      if (remainingTime > 0) {
        mineBtn.disabled = true;
        updateTimer(remainingTime);
        const timerInterval = setInterval(() => {
          remainingTime--;
          updateTimer(remainingTime);
          if (remainingTime <= 0) {
            clearInterval(timerInterval);
            mineBtn.disabled = false;
            timerElement.textContent = '00:00:00';
          }
        }, 1000);
      } else {
        mineBtn.disabled = false;
        timerElement.textContent = '00:00:00';
      }
    } else {
      mineBtn.disabled = false;
    }

    if (!isKYCVerified) {
      mineBtn.disabled = true;
      alert('يرجى إتمام التحقق من الهوية أولاً');
    }
  } else {
    window.location.href = '/muslimcoin/pages/login.html';
  }

  if (mineBtn) {
    mineBtn.addEventListener('click', function() {
      localStorage.setItem('lastMiningTime', Math.floor(Date.now() / 1000));
      mineBtn.disabled = true;

      let currentBalance = parseFloat(localStorage.getItem('balance') || '0.00');
      let newBalance = (currentBalance + 3).toFixed(2);
      localStorage.setItem('balance', newBalance);
      balanceElement.textContent = `${newBalance} MuslimCoins`;

      // هنا يمكن إضافة وظيفة التفاعل مع العقد الذكي لتحديث البيانات في الشبكة
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(event) {
      event.preventDefault();

      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('balance');
      localStorage.removeItem('lastMiningTime');
      localStorage.removeItem('kycVerified');

      window.location.href = '/muslimcoin/pages/login.html';
    });
  }

  function padZero(num) {
    return num < 10 ? '0' + num : num;
  }

  function updateTimer(remainingTime) {
    let hours = Math.floor(remainingTime / 3600);
    let minutes = Math.floor((remainingTime % 3600) / 60);
    let seconds = remainingTime % 60;
    timerElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  }
});

document.getElementById("login-form")?.addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if (username === storedUsername && password === storedPassword) {
    localStorage.setItem('loggedIn', true);
    window.location.href = "/muslimcoin/pages/dashboard.html";
  } else {
    alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
  }
});

document.getElementById("register-form")?.addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  localStorage.setItem('username', username);
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);
  localStorage.setItem('loggedIn', true);

  window.location.href = "/muslimcoin/pages/login.html";
});