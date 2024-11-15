document.getElementById('kycForm').addEventListener('submit', function(e) {
  e.preventDefault(); // منع الإرسال الافتراضي للنموذج

  // جمع البيانات المدخلة من المستخدم
  const fullName = document.getElementById('fullName').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const nationalId = document.getElementById('nationalId').value;
  const address = document.getElementById('address').value;
  const photoId = document.getElementById('photoId').files[0];
  const selfie = document.getElementById('selfie').files[0];

  // التحقق من وجود جميع البيانات المدخلة
  if (!fullName || !dateOfBirth || !nationalId || !address || !photoId || !selfie) {
    alert('الرجاء ملء جميع الحقول ورفع الصور المطلوبة.');
    return;
  }

  // بيانات KYC التي سيتم إرسالها
  const kycData = {
    fullName,
    dateOfBirth,
    nationalId,
    address,
    photoId: photoId.name,
    selfie: selfie.name
  };

  // يمكن إرسال البيانات إلى الخادم أو المعالجة حسب الحاجة
  // مثال: إرسال البيانات عبر API
  console.log(kycData);

  // تنبيه المستخدم بأن البيانات تم إرسالها بنجاح
  alert('تم إرسال بياناتك للتحقق بنجاح. سنقوم بمراجعتها قريبًا.');
});