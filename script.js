// أزرار التثبيت
const pinButtons = document.querySelectorAll('.pin-button');
const pinnedBanksContainer = document.getElementById('pinned-banks');
const maxPinnedBanks = 3;

// إضافة أحداث التثبيت
pinButtons.forEach(button => {
    button.addEventListener('click', () => {
        const bankButton = button.closest('.bank-button');
        const bankName = bankButton.getAttribute('data-bank');

        if (pinnedBanksContainer.querySelectorAll('.bank-button').length >= maxPinnedBanks) {
            alert('يمكنك تثبيت حتى ثلاثة بنوك فقط.');
            return;
        }

        if (!pinnedBanksContainer.querySelector(`.bank-button[data-bank="${bankName}"]`)) {
            const clonedButton = bankButton.cloneNode(true);
            clonedButton.querySelector('.pin-button').remove(); // إزالة زر التثبيت من النسخة المثبتة
            pinnedBanksContainer.appendChild(clonedButton);
        }

        button.style.display = 'none'; // إخفاء زر التثبيت بعد التثبيت
    });
});

// إزالة الأزرار المثبتة
pinnedBanksContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        event.target.closest('.bank-button').remove();
    }
});
