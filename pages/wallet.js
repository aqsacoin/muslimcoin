document.addEventListener('DOMContentLoaded', function () {
    // توليد عنوان محفظة جديد
    document.getElementById('generateWallet').addEventListener('click', function () {
        const newAddress = generateWalletAddress();
        document.getElementById('walletAddress').textContent = newAddress;
    });

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

// وظيفة لتوليد عنوان محفظة عشوائي (عناوين طويلة تبدأ بـ MSC)
function generateWalletAddress() {
    const prefix = 'MSC';
    const randomString = Math.random().toString(36).substr(2, 10).toUpperCase();
    return `${prefix}-${randomString}`;
}