const maxFavorites = 2;

document.addEventListener('DOMContentLoaded', () => {
    const hearts = document.querySelectorAll('.heart-icon');
    const favoriteBanks = JSON.parse(localStorage.getItem('favorites')) || [];

    // عرض المفضلات عند تحميل الصفحة
    updateFavoritesDisplay(favoriteBanks);

    hearts.forEach(heart => {
        const bankCard = heart.closest('.bank-card');
        const bankId = bankCard.dataset.id;
        const bankName = bankCard.querySelector('a').textContent;

        // إذا كان البنك مفضلاً، تفعيل أيقونة القلب
        if (favoriteBanks.some(bank => bank.id === bankId)) {
            heart.classList.add('active');
        }

        heart.addEventListener('click', () => {
            if (heart.classList.contains('active')) {
                heart.classList.remove('active');
                removeFromFavorites(bankId);
            } else if (favoriteBanks.length < maxFavorites) {
                heart.classList.add('active');
                addToFavorites(bankId, bankName);
            } else {
                alert('الحد الأقصى للمفضلات هو 2');
            }
        });
    });
});

function addToFavorites(bankId, bankName) {
    let favoriteBanks = JSON.parse(localStorage.getItem('favorites')) || [];
    favoriteBanks.push({ id: bankId, name: bankName });
    localStorage.setItem('favorites', JSON.stringify(favoriteBanks));
    updateFavoritesDisplay(favoriteBanks);
}

function removeFromFavorites(bankId) {
    let favoriteBanks = JSON.parse(localStorage.getItem('favorites')) || [];
    favoriteBanks = favoriteBanks.filter(fav => fav.id !== bankId);
    localStorage.setItem('favorites', JSON.stringify(favoriteBanks));
    updateFavoritesDisplay(favoriteBanks);
}

function updateFavoritesDisplay(favoriteBanks) {
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = ''; // إفراغ المحتوى السابق

    favoriteBanks.forEach(bank => {
        const favoriteBankElement = document.createElement('div');
        favoriteBankElement.classList.add('favorite-bank');
        favoriteBankElement.innerHTML = `
            <i class="fas fa-university"></i>
            <p>${bank.name}</p>
        `;
        favoritesContainer.appendChild(favoriteBankElement);
    });
}
