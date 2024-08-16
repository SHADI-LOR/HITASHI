const maxFavorites = 2; // الحد الأقصى لعدد المفضلات

document.addEventListener('DOMContentLoaded', () => {
    const hearts = document.querySelectorAll('.heart-icon'); // جميع أيقونات القلوب
    const favoriteBanks = JSON.parse(localStorage.getItem('favorites')) || []; // استرجاع المفضلات من التخزين المحلي

    // عرض المفضلات عند تحميل الصفحة
    updateFavoritesDisplay(favoriteBanks);

    // إضافة حدث النقر لأيقونات القلوب
    hearts.forEach(heart => {
        const bankCard = heart.closest('.bank-card'); // أقرب عنصر بنكي
        const bankId = bankCard.dataset.id; // الحصول على معرّف البنك
        const bankName = bankCard.querySelector('a').textContent; // اسم البنك

        // تمييز البنوك التي تم إضافتها كمفضلة
        if (favoriteBanks.some(bank => bank.id === bankId)) {
            heart.classList.add('active');
        }

        // التعامل مع النقر على أيقونة القلب
        heart.addEventListener('click', (event) => {
            event.stopPropagation(); // منع تأثير النقر على الرابط
            if (heart.classList.contains('active')) {
                heart.classList.remove('active');
                removeFromFavorites(bankId); // إزالة البنك من المفضلات
            } else if (favoriteBanks.length < maxFavorites) {
                heart.classList.add('active');
                addToFavorites(bankId, bankName); // إضافة البنك إلى المفضلات
            } else {
                alert('الحد الأقصى للمفضلات هو 2'); // رسالة إذا تم الوصول إلى الحد الأقصى
            }
        });
    });
});

// وظيفة لإضافة بنك إلى المفضلات
function addToFavorites(bankId, bankName) {
    let favoriteBanks = JSON.parse(localStorage.getItem('favorites')) || [];
    const bankLink = document.querySelector(`.bank-card[data-id="${bankId}"] a`).href; // الحصول على رابط البنك
    if (!favoriteBanks.some(bank => bank.id === bankId)) {
        if (favoriteBanks.length >= maxFavorites) {
            alert('الحد الأقصى للمفضلات هو 2'); // رسالة إذا تم الوصول إلى الحد الأقصى
            return;
        }
        favoriteBanks.push({ id: bankId, name: bankName, link: bankLink }); // إضافة البنك إلى القائمة
        localStorage.setItem('favorites', JSON.stringify(favoriteBanks)); // حفظ المفضلات في التخزين المحلي
        updateFavoritesDisplay(favoriteBanks); // تحديث عرض المفضلات
    }
}

// وظيفة لإزالة بنك من المفضلات
function removeFromFavorites(bankId) {
    let favoriteBanks = JSON.parse(localStorage.getItem('favorites')) || [];
    favoriteBanks = favoriteBanks.filter(fav => fav.id !== bankId); // تصفية البنك الذي سيتم إزالته
    localStorage.setItem('favorites', JSON.stringify(favoriteBanks)); // حفظ التغييرات في التخزين المحلي
    updateFavoritesDisplay(favoriteBanks); // تحديث عرض المفضلات
}

// وظيفة لتحديث عرض المفضلات
function updateFavoritesDisplay(favoriteBanks) {
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = ''; // مسح المحتوى الحالي

    if (favoriteBanks.length === 0) {
        favoritesContainer.innerHTML = '<p>لا توجد بنوك مفضلة حالياً.</p>'; // رسالة عند عدم وجود مفضلات
    } else {
        favoriteBanks.forEach(bank => {
            const favoriteBankElement = document.createElement('div');
            favoriteBankElement.classList.add('favorite-bank');
            favoriteBankElement.innerHTML = `
                <i class="fas fa-university"></i>
                <a href="${bank.link}">${bank.name}</a>
            `;
            favoritesContainer.appendChild(favoriteBankElement); // إضافة العنصر إلى الحاوية
        });
    }
}
