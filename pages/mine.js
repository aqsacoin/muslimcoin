// المتغيرات الأساسية
const mineBtn = document.getElementById('mine-btn');
const timerElement = document.getElementById('timer');
let miningDuration = 24 * 60 * 60; // 24 ساعة بالثواني
let lastMiningTime = localStorage.getItem('lastMiningTime'); // وقت آخر تعدين

// تحديث المؤقت
const updateTimer = () => {
  let currentTime = Math.floor(Date.now() / 1000); // الوقت الحالي بالثواني
  let remainingTime = lastMiningTime ? (lastMiningTime + miningDuration) - currentTime : 0;

  if (remainingTime > 0) {
    let hours = Math.floor(remainingTime / 3600);
    let minutes = Math.floor((remainingTime % 3600) / 60);
    let seconds = remainingTime % 60;
    timerElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  } else {
    timerElement.textContent = '00:00:00'; // بعد انتهاء الدورة
    mineBtn.disabled = false; // تفعيل الزر بعد 24 ساعة
    
    // زيادة الرصيد بعد 24 ساعة
    let currentBalance = parseInt(localStorage.getItem('balance') || 0); // استرجاع الرصيد الحالي من localStorage
    currentBalance += 3; // إضافة 3 عملات
    localStorage.setItem('balance', currentBalance); // حفظ الرصيد الجديد
  }
};

const padZero = (num) => (num < 10 ? '0' + num : num);

// التعامل مع زر التعدين
if (mineBtn) {
  mineBtn.addEventListener('click', function() {
    // منع الزر من العمل إذا كان غير مفعل
    mineBtn.disabled = true;
    lastMiningTime = Math.floor(Date.now() / 1000); // تخزين الوقت الحالي
    localStorage.setItem('lastMiningTime', lastMiningTime); // تخزين وقت التعدين الأخير

    // هنا يمكن إضافة الكود الخاص بزيادة رصيد العملة
    // مثلا: زيادة الرصيد بمقدار 3 عملات بعد 24 ساعة
  });
}

// تحديث المؤقت بشكل دوري
setInterval(updateTimer, 1000);
updateTimer(); // تحديث الوقت عند التحميل