document.addEventListener('DOMContentLoaded', function() {
    const pinButtons = document.querySelectorAll('.pin-button');
    const pinnedBanksContainer = document.getElementById('pinned-banks');

    // Load pinned items from localStorage
    function loadPinnedItems() {
        const pinnedItems = JSON.parse(localStorage.getItem('pinnedBanks')) || [];
        pinnedItems.forEach(item => {
            const bankButton = document.querySelector(`.bank-button[data-bank="${item}"]`);
            if (bankButton) {
                const pinnedItem = bankButton.cloneNode(true);
                pinnedItem.querySelector('.pin-button').remove(); // Remove the pin button from the pinned item
                pinnedBanksContainer.appendChild(pinnedItem);
                bankButton.remove(); // Remove the button from the main list
            }
        });
    }

    // Save pinned items to localStorage
    function savePinnedItems() {
        const pinnedItems = Array.from(pinnedBanksContainer.querySelectorAll('.bank-button'))
            .map(item => item.getAttribute('data-bank'));
        localStorage.setItem('pinnedBanks', JSON.stringify(pinnedItems));
    }

    // Initialize pinned items
    loadPinnedItems();

    pinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bankButton = this.closest('.bank-button');
            const bankName = bankButton.getAttribute('data-bank');
            const pinnedItems = pinnedBanksContainer.querySelectorAll('.bank-button');

            if (pinnedItems.length < 2) {
                const pinnedItem = bankButton.cloneNode(true);
                pinnedItem.querySelector('.pin-button').remove(); // Remove the pin button from the pinned item
                pinnedBanksContainer.appendChild(pinnedItem);
                bankButton.remove(); // Remove the button from the main list
                savePinnedItems(); // Save to localStorage
            }
        });
    });
});
