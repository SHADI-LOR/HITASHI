document.addEventListener("DOMContentLoaded", function() {
    const favoriteButtons = document.querySelectorAll(".favorite-button");
    const favoritesList = document.getElementById("favorites-list");

    // تحميل المفضلات من التخزين المحلي عند تحميل الصفحة
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    savedFavorites.forEach(favorite => {
        addFavoriteToDOM(favorite.text, favorite.url);
    });

    favoriteButtons.forEach(button => {
        button.addEventListener("click", function() {
            const buttonElement = this.parentElement;
            const buttonText = buttonElement.textContent.trim();
            const buttonLink = buttonElement.getAttribute("href");

            if (this.classList.contains("selected")) {
                this.classList.remove("selected");
                removeFavorite(buttonText);
            } else {
                if (favoritesList.childElementCount < 2) {
                    this.classList.add("selected");
                    addFavorite(buttonText, buttonLink);
                } else {
                    alert("يمكنك إضافة زرين فقط إلى المفضلة.");
                }
            }
        });
    });

    function addFavorite(text, url) {
        addFavoriteToDOM(text, url);
        saveFavorite(text, url);
    }

    function addFavoriteToDOM(text, url) {
        const favoriteItem = document.createElement("div");
        favoriteItem.classList.add("favorite-item");

        const favoriteLink = document.createElement("a");
        favoriteLink.href = url;
        favoriteLink.textContent = text;
        favoriteLink.classList.add("favorite-link");

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-favorite-button");
        removeButton.textContent = "إزالة";

        removeButton.addEventListener("click", function() {
            favoritesList.removeChild(favoriteItem);
            removeFavorite(text);
            const originalButton = document.querySelector(`.icon-button[href="${url}"] .favorite-button`);
            if (originalButton) {
                originalButton.classList.remove("selected");
            }
        });

        favoriteItem.appendChild(favoriteLink);
        favoriteItem.appendChild(removeButton);
        favoritesList.appendChild(favoriteItem);
    }

    function saveFavorite(text, url) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites.push({ text, url });
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    function removeFavorite(text) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites = favorites.filter(favorite => favorite.text !== text);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
});
