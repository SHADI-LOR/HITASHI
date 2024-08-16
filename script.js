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
            clonedButton.classList.add('pinned-bank-button');
            clonedButton.querySelector('.pin-button').remove();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';
            deleteButton.className = 'delete-button';
            clonedButton.appendChild(deleteButton);
            clonedButton.setAttribute('data-bank', bank);
            pinnedBanksContainer.appendChild(clonedButton);
            bankButton.classList.add('pinned'); // إخفاء زر التثبيت فقط
        }
    });
});

// إضافة أحداث التثبيت
pinButtons.forEach(button => {
    button.addEventListener('click', () => {
        const bankButton = button.closest('.bank-button');
        const bankName = bankButton.getAttribute('data-bank');

        if (pinnedBanksContainer.querySelectorAll('.pinned-bank-button').length >= maxPinnedBanks) {
            alert('يمكنك تثبيت حتى ثلاثة بنوك فقط.');
            return;
        }

        // التحقق من عدم تثبيت نفس البنك مسبقاً
        if (!pinnedBanksContainer.querySelector(`.pinned-bank-button[data-bank="${bankName}"]`)) {
            const clonedButton = bankButton.cloneNode(true);
            clonedButton.classList.add('pinned-bank-button');
            clonedButton.querySelector('.pin-button').remove();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';
            deleteButton.className = 'delete-button';
            clonedButton.appendChild(deleteButton);
            clonedButton.setAttribute('data-bank', bankName);
            pinnedBanksContainer.appendChild(clonedButton);

            let pinnedBanks = JSON.parse(localStorage.getItem('pinnedBanks')) || [];
            pinnedBanks.push(bankName);
            localStorage.setItem('pinnedBanks', JSON.stringify(pinnedBanks));

            // إخفاء زر التثبيت فقط
            button.style.display = 'none'; // إخفاء زر التثبيت فقط
        }
    });
});

// إزالة الأزرار المثبتة
pinnedBanksContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const bankButton = event.target.closest('.pinned-bank-button');
        const bankName = bankButton.getAttribute('data-bank');
        
        // إظهار زر التثبيت مرة أخرى
        const originalPinButton = document.querySelector(`.bank-button[data-bank="${bankName}"] .pin-button`);
        if (originalPinButton) {
            originalPinButton.style.display = 'inline-block'; // إعادة إظهار زر التثبيت فقط
        }

        // حذف الزر المثبت
        bankButton.remove();

        // تحديث التخزين المحلي
        let pinnedBanks = JSON.parse(localStorage.getItem('pinnedBanks')) || [];
        pinnedBanks = pinnedBanks.filter(bank => bank !== bankName);
        localStorage.setItem('pinnedBanks', JSON.stringify(pinnedBanks));
    }
});
