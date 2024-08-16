// تحديد الأزرار والتخزين المحلي
const pinButtons = document.querySelectorAll('.pin-button');
const pinnedBanksContainer = document.getElementById('pinned-banks');
const maxPinnedBanks = 3;

// تحميل الأزرار المثبتة من التخزين المحلي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const pinnedBanks = JSON.parse(localStorage.getItem('pinnedBanks')) || [];
    pinnedBanks.forEach(bank => {
        const bankButton = document.querySelector(`.bank-button[data-bank="${bank}"]`);
        if (bankButton) {
            const clonedButton = bankButton.cloneNode(true);
            clonedButton.classList.add('pinned-bank-button'); // تأكد من إضافة الكلاس المطلوب
            clonedButton.querySelector('.pin-button').remove(); // إزالة زر التثبيت من النسخة المثبتة
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌'; // رمز إزالة
            deleteButton.className = 'delete-button';
            clonedButton.appendChild(deleteButton);
            clonedButton.setAttribute('data-bank', bank); // تأكيد اسم البنك المثبت
            pinnedBanksContainer.appendChild(clonedButton);
            bankButton.classList.add('pinned'); // إخفاء الزر الأصلي
        }
    });
});

// إضافة أحداث التثبيت
pinButtons.forEach(button => {
    button.addEventListener('click', () => {
        const bankButton = button.closest('.bank-button');
        const bankName = bankButton.getAttribute('data-bank');

        // التحقق من عدد الأزرار المثبتة
        if (pinnedBanksContainer.querySelectorAll('.pinned-bank-button').length >= maxPinnedBanks) {
            alert('يمكنك تثبيت حتى ثلاثة بنوك فقط.');
            return;
        }

        // التحقق من عدم وجود زر مثبت بالفعل
        if (!pinnedBanksContainer.querySelector(`.pinned-bank-button[data-bank="${bankName}"]`)) {
            const clonedButton = bankButton.cloneNode(true);
            clonedButton.classList.add('pinned-bank-button'); // تأكد من إضافة الكلاس المطلوب
            clonedButton.querySelector('.pin-button').remove(); // إزالة زر التثبيت من النسخة المثبتة
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌'; // رمز إزالة
            deleteButton.className = 'delete-button';
            clonedButton.appendChild(deleteButton);
            clonedButton.setAttribute('data-bank', bankName); // تأكيد اسم البنك المثبت
            pinnedBanksContainer.appendChild(clonedButton);

            // تخزين البيانات في التخزين المحلي
            let pinnedBanks = JSON.parse(localStorage.getItem('pinnedBanks')) || [];
            pinnedBanks.push(bankName);
            localStorage.setItem('pinnedBanks', JSON.stringify(pinnedBanks));

            // إخفاء الزر الأصلي
            bankButton.classList.add('pinned');
        }
    });
});

// إزالة الأزرار المثبتة
pinnedBanksContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const bankButton = event.target.closest('.pinned-bank-button');
        const bankName = bankButton.getAttribute('data-bank');
        
        // إظهار الزر الأصلي
        const originalButton = document.querySelector(`.bank-button[data-bank="${bankName}"]`);
        if (originalButton) {
            originalButton.classList.remove('pinned'); // إعادة إظهار الزر الأصلي
        }

        // حذف الزر المثبت
        bankButton.remove();

        // تحديث التخزين المحلي
        let pinnedBanks = JSON.parse(localStorage.getItem('pinnedBanks')) || [];
        pinnedBanks = pinnedBanks.filter(bank => bank !== bankName);
        localStorage.setItem('pinnedBanks', JSON.stringify(pinnedBanks));
    }
});
