document.addEventListener('DOMContentLoaded', () => {
    const pins = document.querySelectorAll('.pin-button');
    const pinnedBanksContainer = document.getElementById('pinned-banks');

    pins.forEach(pin => {
        pin.addEventListener('click', (event) => {
            const bankButton = event.currentTarget.closest('.bank-button');
            const bankName = bankButton.dataset.bank;

            // تحقق من عدم تجاوز الحد الأقصى لعدد التثبيتات
            if (pinnedBanksContainer.children.length < 2) {
                const pinnedButton = bankButton.cloneNode(true);
                pinnedButton.querySelector('.pin-button').remove();
                pinnedButton.classList.add('pinned');
                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-button';
                deleteButton.innerHTML = '<i class="fas fa-times"></i>';
                pinnedButton.appendChild(deleteButton);
                pinnedBanksContainer.appendChild(pinnedButton);
                
                deleteButton.addEventListener('click', () => {
                    pinnedBanksContainer.removeChild(pinnedButton);
                });

                // تخزين التثبيت في localStorage
                let pinnedBanks = JSON.parse(localStorage.getItem('pinnedBanks')) || [];
                if (!pinnedBanks.includes(bankName)) {
                    pinnedBanks.push(bankName);
                    localStorage.setItem('pinnedBanks', JSON.stringify(pinnedBanks));
                }
            } else {
                alert('يمكنك تثبيت ما يصل إلى زرين فقط.');
            }
        });
    });

    // تحميل التثبيتات المحفوظة عند تحميل الصفحة
    const savedBanks = JSON.parse(localStorage.getItem('pinnedBanks')) || [];
    savedBanks.forEach(bankName => {
        const bankButton = Array.from(document.querySelectorAll('.bank-button')).find(button => button.dataset.bank === bankName);
        if (bankButton) {
            const pinnedButton = bankButton.cloneNode(true);
            pinnedButton.querySelector('.pin-button').remove();
            pinnedButton.classList.add('pinned');
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerHTML = '<i class="fas fa-times"></i>';
            pinnedButton.appendChild(deleteButton);
            pinnedBanksContainer.appendChild(pinnedButton);

            deleteButton.addEventListener('click', () => {
                pinnedBanksContainer.removeChild(pinnedButton);
                // إزالة التثبيت من localStorage
                let pinnedBanks = JSON.parse(localStorage.getItem('pinnedBanks')) || [];
                pinnedBanks = pinnedBanks.filter(bank => bank !== bankName);
                localStorage.setItem('pinnedBanks', JSON.stringify(pinnedBanks));
            });
        }
    });
});
