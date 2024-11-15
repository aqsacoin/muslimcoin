const express = require('express');
const path = require('path');

const app = express();

// إعداد المسار لعرض الملفات الثابتة (مثل HTML و CSS)
app.use(express.static(path.join(__dirname, 'public')));

// إعداد صفحة HTML عند الوصول للمسار الرئيسي
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// تحديد المنفذ الذي سيعمل عليه الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});