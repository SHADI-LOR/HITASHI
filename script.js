// تحميل المفضلات المحفوظة عند تحميل الصفحة
window.onload = function() {
    loadFavorites();
};

function loadFavorites() {
    let favoritesContainer = document.getElementById('favoritesContainer');
    favoritesContainer.innerHTML = '';
    
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    favorites.forEach(fav => {
        let favButton = document.createElement('div');
        favButton.className = 'bank-button';
        favButton.innerHTML = `
            <div class="icon"></div>
            <p>${fav}</p>
            <button onclick="removeFavorite('${fav}')">
                <i class="fas fa-heart"></i>
            </button>
        `;
        favoritesContainer.appendChild(favButton);
    });
}

function toggleFavorite(bank) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.includes(bank)) {
        return;
    }
    
    if (favorites.length < 2) {
        favorites.push(bank);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
        
        // إخفاء الزر الأصلي عند التثبيت
        let buttons = document.querySelectorAll('.bank-button');
        buttons.forEach(button => {
            if (button.querySelector('p').textContent === bank) {
                button.style.display = 'none';
            }
        });
    } else {
        alert("يمكنك إضافة اثنين فقط إلى المفضلة.");
    }
}

function removeFavorite(bank) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav !== bank);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();

    // إعادة إظهار الزر الأصلي بعد إلغاء التثبيت
    let buttons = document.querySelectorAll('.bank-button');
    buttons.forEach(button => {
        if (button.querySelector('p').textContent === bank) {
            button.style.display = 'flex';
        }
    });
}
