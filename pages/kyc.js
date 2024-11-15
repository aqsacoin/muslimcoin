document.getElementById('kycForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const nationalId = document.getElementById('nationalId').value;
  const address = document.getElementById('address').value;
  const photoId = document.getElementById('photoId').files[0];
  const selfie = document.getElementById('selfie').files[0];

  if (!fullName || !dateOfBirth || !nationalId || !address || !photoId || !selfie) {
    alert('الرجاء ملء جميع الحقول ورفع الصور المطلوبة.');
    return;
  }

  const kycData = {
    fullName,
    dateOfBirth,
    nationalId,
    address,
    photoId: photoId.name,
    selfie: selfie.name
  };

  // إرسال البيانات إلى الخادم أو المعالجة حسب الحاجة
  // مثال: إرسال البيانات عبر API
  console.log(kycData);
  alert('تم إرسال بياناتك للتحقق بنجاح. سنقوم بمراجعتها قريبًا.');
});