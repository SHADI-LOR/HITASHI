let pinnedButtons = [];

document.addEventListener('DOMContentLoaded', () => {
    // استعادة الأزرار المثبتة من localStorage
    const savedPins = JSON.parse(localStorage.getItem('pinnedButtons')) || [];

    savedPins.forEach(savedPin => {
        const bankButton = document.querySelector(`.bank-button p:contains('${savedPin}')`).parentElement;
        if (pinnedButtons.length < 2) {
            const clonedButton = bankButton.cloneNode(true);
            clonedButton.querySelector('.pin-btn').style.display = 'none';
            document.querySelector('.pin-buttons').appendChild(clonedButton);
            pinnedButtons.push(bankButton);
        }
    });
});

function pinButton(buttonElement) {
    const bankButton = buttonElement.parentElement;
    const bankName = bankButton.querySelector('p').textContent;

    if (pinnedButtons.length < 2 && !pinnedButtons.includes(bankButton)) {
        const clonedButton = bankButton.cloneNode(true);
        clonedButton.querySelector('.pin-btn').style.display = 'none';
        document.querySelector('.pin-buttons').appendChild(clonedButton);
        pinnedButtons.push(bankButton);

        // حفظ الأزرار المثبتة في localStorage
        const savedPins = JSON.parse(localStorage.getItem('pinnedButtons')) || [];
        savedPins.push(bankName);
        localStorage.setItem('pinnedButtons', JSON.stringify(savedPins));
    }
              }
