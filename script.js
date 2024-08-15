document.addEventListener("DOMContentLoaded", function () {
    const pinnedBanksContainer = document.getElementById("pinned-banks");
    const pinButtons = document.querySelectorAll(".pin-button");

    // استعادة البنوك المثبتة من localStorage
    const storedPinnedBanks = JSON.parse(localStorage.getItem("pinnedBanks")) || [];
    storedPinnedBanks.forEach(bankName => {
        const bankElement = createPinnedBankElement(bankName);
        pinnedBanksContainer.appendChild(bankElement);
    });

    // السماح بتثبيت بنكين كحد أقصى
    pinButtons.forEach(button => {
        button.addEventListener("click", function () {
            const bankName = this.parentElement.getAttribute("data-bank");

            if (storedPinnedBanks.length < 2 && !storedPinnedBanks.includes(bankName)) {
                storedPinnedBanks.push(bankName);
                const bankElement = createPinnedBankElement(bankName);
                pinnedBanksContainer.appendChild(bankElement);
                localStorage.setItem("pinnedBanks", JSON.stringify(storedPinnedBanks));
            }
        });
    });

    // إنشاء عنصر البنك المثبت
    function createPinnedBankElement(bankName) {
        const div = document.createElement("div");
        div.classList.add("bank-button");
        div.textContent = bankName;
        return div;
    }
});
