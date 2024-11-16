document.addEventListener('DOMContentLoaded', function () {
    // توليد عنوان محفظة جديد وكلمات استرداد عند التسجيل
    const userBalance = localStorage.getItem('balance') || '0';
    const userWalletAddress = localStorage.getItem('walletAddress');
    const userRecoveryWords = localStorage.getItem('recoveryWords');

    // عرض المحفظة وعنوانها عند التسجيل
    if (!userWalletAddress || !userRecoveryWords) {
        const newWalletAddress = generateWalletAddress();
        const newRecoveryWords = generateRecoveryWords();

        // تخزين العنوان والكلمات في localStorage
        localStorage.setItem('walletAddress', newWalletAddress);
        localStorage.setItem('recoveryWords', newRecoveryWords.join(' '));

        // عرض العنوان والكلمات
        document.getElementById('walletAddress').textContent = newWalletAddress;
        const recoveryWordsList = document.getElementById('recoveryWords');
        newRecoveryWords.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            recoveryWordsList.appendChild(li);
        });
    } else {
        // في حال كان المستخدم قد سجل بالفعل
        document.getElementById('walletAddress').textContent = userWalletAddress;
        const recoveryWordsList = document.getElementById('recoveryWords');
        const recoveryWords = userRecoveryWords.split(' ');
        recoveryWords.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            recoveryWordsList.appendChild(li);
        });
    }

    // معالجة إرسال المعاملة
    document.getElementById('transferForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const recipient = document.getElementById('recipient').value;
        const amount = document.getElementById('amount').value;

        if (!recipient || !amount) {
            alert('يرجى ملء جميع الحقول');
            return;
        }

        // إرسال المعاملة (عملية وهمية هنا)
        alert(`تم إرسال ${amount} MSC إلى ${recipient}`);
    });
});

// وظيفة لتوليد عنوان محفظة طويل (عناوين طويلة تبدأ بـ MSC)
function generateWalletAddress() {
    const prefix = 'MSC';
    const randomString = Math.random().toString(36).substr(2, 30).toUpperCase();  // 30 حرفًا عشوائيًا
    return `${prefix}-${randomString}`;
}

// وظيفة لتوليد 12 كلمة استرداد عشوائية
function generateRecoveryWords() {
    const wordList = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry', 'strawberry', 'tangerine', 'watermelon', 'blueberry', 'blackberry', 'cantaloupe', 'pineapple', 'plum', 'pear', 'peach'];
    let recoveryWords = [];
    
    for (let i = 0; i < 12; i++) {
        const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        recoveryWords.push(randomWord);
    }

    return recoveryWords;
}