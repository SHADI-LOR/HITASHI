const maxFavorites = 2;

document.addEventListener('DOMContentLoaded', () => {
    const hearts = document.querySelectorAll('.heart-icon');
    const favoriteBanks = JSON.parse(localStorage.getItem('favorites')) || [];

    hearts.forEach(heart => {
        const bankCard = heart.closest('.bank-card');
        const bankId = bankCard.dataset.id;

        if (favoriteBanks.includes(bankId)) {
            heart.classList.add('active');
        }

        heart.addEventListener('click', () => {
            if (heart.classList.contains('active')) {
                heart.classList.remove('active');
                removeFromFavorites(bankId);
            } else if (favoriteBanks.length < maxFavorites) {
                heart.classList.add('active');
                addToFavorites(bankId);
            } else {
                alert('الحد الأقصى للمفضلات هو 2');
            }
        });
    });
});

function addToFavorites(bankId) {
    let favoriteBanks = JSON.parse(localStorage.getItem('favorites')) || [];
    favoriteBanks.push(bankId);
    localStorage.setItem('favorites', JSON.stringify(favoriteBanks));
}

function removeFromFavorites(bankId) {
    let favoriteBanks = JSON.parse(localStorage.getItem('favorites')) || [];
    favoriteBanks = favoriteBanks.filter(fav => fav !== bankId);
    localStorage.setItem('favorites', JSON.stringify(favoriteBanks));
}
