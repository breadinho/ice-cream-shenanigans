/* ==========================================================
   ICE CREAM SHENANIGANS
   FRESH JAVASCRIPT — PART 1/4
========================================================== */


/* ==========================================================
   GAME DATA
========================================================== */

let money = 0;
let served = 0;
let shenanigans = 0;

let currentOrder = [];
let selectedFlavors = [];


/* ==========================================================
   UNLOCKED FLAVORS
========================================================== */

let unlockedFlavors = [
    "blue",
    "vanilla",
    "chocolate",
    "cherry"
];


/* ==========================================================
   FLAVOR DATA
========================================================== */

const flavors = {

    blue: {
        name: "Blue Angel",
        emoji: "💎"
    },

    vanilla: {
        name: "Vanilla",
        emoji: "🍦"
    },

    chocolate: {
        name: "Chocolate",
        emoji: "🍫"
    },

    cherry: {
        name: "Cherry",
        emoji: "🍒"
    },

    strawberry: {
        name: "Strawberry",
        emoji: "🍓"
    },

    mint: {
        name: "Mint",
        emoji: "🌿"
    },

    banana: {
        name: "Banana",
        emoji: "🍌"
    },

    rainbow: {
        name: "Rainbow",
        emoji: "🌈"
    },

    galaxy: {
        name: "Galaxy",
        emoji: "🌌"
    },

    guarguantian: {
        name: "GUARGUANTIAN",
        emoji: "🌠"
    }

};


/* ==========================================================
   HTML REFERENCES
========================================================== */

const moneyDisplay =
    document.getElementById("money");

const servedDisplay =
    document.getElementById("served");

const shenanigansDisplay =
    document.getElementById("shenanigans");

const orderFlavors =
    document.getElementById("orderFlavors");

const selectedFlavorsDisplay =
    document.getElementById("selectedFlavors");

const message =
    document.getElementById("message");

const serveButton =
    document.getElementById("serveButton");

const clearButton =
    document.getElementById("clearButton");

const shenaniganArea =
    document.getElementById("shenaniganArea");

const punchButton =
    document.getElementById("punchButton");

const saveButton =
    document.getElementById("saveButton");

const resetProgressButton =
    document.getElementById("resetProgressButton");

const resetAllButton =
    document.getElementById("resetAllButton");

const flavorButtons =
    document.querySelectorAll(".flavor");

const shopFlavorButtons =
    document.querySelectorAll(".shopFlavor");


/* ==========================================================
   UPDATE STATS
========================================================== */

function updateStats() {

    moneyDisplay.textContent =
        money;

    servedDisplay.textContent =
        served;

    shenanigansDisplay.textContent =
        shenanigans;

}


/* ==========================================================
   MESSAGE HELPER
========================================================== */

function showMessage(text) {

    message.textContent =
        text;

}


/* ==========================================================
   DISPLAY CUSTOMER ORDER
========================================================== */

function displayOrder() {

    orderFlavors.innerHTML = "";

    currentOrder.forEach(
        function (flavor) {

            const item =
                document.createElement("span");

            item.textContent =
                flavors[flavor].emoji +
                " " +
                flavors[flavor].name;

            orderFlavors.appendChild(
                item
            );

        }
    );

}


/* ==========================================================
   DISPLAY SELECTED FLAVORS
========================================================== */

function displaySelectedFlavors() {

    selectedFlavorsDisplay.innerHTML =
        "";

    selectedFlavors.forEach(
        function (flavor) {

            const item =
                document.createElement("span");

            item.textContent =
                flavors[flavor].emoji +
                " " +
                flavors[flavor].name;

            selectedFlavorsDisplay.appendChild(
                item
            );

        }
    );

}


/* ==========================================================
   GENERATE NORMAL CUSTOMER
========================================================== */

function generateOrder() {

    currentOrder = [];

    const availableFlavors =
        unlockedFlavors;

    const amount =
        Math.floor(
            Math.random() * 3
        ) + 1;

    while (
        currentOrder.length <
        amount
    ) {

        const randomFlavor =
            availableFlavors[
                Math.floor(
                    Math.random() *
                    availableFlavors.length
                )
            ];

        if (
            !currentOrder.includes(
                randomFlavor
            )
        ) {

            currentOrder.push(
                randomFlavor
            );

        }

    }

    displayOrder();

}


/* ==========================================================
   GENERATE SHENANIGAN CUSTOMER
========================================================== */

function generateShenaniganOrder() {

    currentOrder = [
        "blue",
        "vanilla",
        "chocolate",
        "cherry"
    ];

    shenaniganArea.hidden =
        false;

    displayOrder();

}


/* ==========================================================
   HIDE SHENANIGANS
========================================================== */

function hideShenanigans() {

    shenaniganArea.hidden =
        true;

}


/* ==========================================================
   START NEW CUSTOMER
========================================================== */

function startNewCustomer() {

    const chance =
        Math.random();

    if (chance < 0.10) {

        generateShenaniganOrder();

    } else {

        generateOrder();

        hideShenanigans();

    }

}


/* ==========================================================
   NEXT CUSTOMER
========================================================== */

function nextCustomer() {

    selectedFlavors = [];

    displaySelectedFlavors();

    startNewCustomer();

}


/* ==========================================================
   FLAVOR BUTTONS
========================================================== */

flavorButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const flavor =
                    button.dataset.flavor;

                if (
                    !unlockedFlavors.includes(
                        flavor
                    )
                ) {

                    showMessage(
                        "🔒 YOU DON'T OWN THAT FLAVOR!"
                    );

                    return;

                }

                selectedFlavors.push(
                    flavor
                );

                displaySelectedFlavors();

            }
        );

    }
);


/* ==========================================================
   CLEAR BUTTON
========================================================== */

clearButton.addEventListener(
    "click",
    function () {

        selectedFlavors = [];

        displaySelectedFlavors();

        showMessage("");

    }
);


/* ==========================================================
   SHENANIGAN CHECK
========================================================== */

function isShenaniganOrder() {

    return (
        currentOrder.length === 4 &&
        currentOrder.includes("blue") &&
        currentOrder.includes("vanilla") &&
        currentOrder.includes("chocolate") &&
        currentOrder.includes("cherry")
    );

}


/* ==========================================================
   SERVE BUTTON
========================================================== */

serveButton.addEventListener(
    "click",
    function () {

        if (
            isShenaniganOrder()
        ) {

            showMessage(
                "🚨 FOUR FLAVORS?! SHENANIGANS!"
            );

            shenaniganArea.hidden =
                false;

            return;

        }

        if (
            selectedFlavors.length !==
            currentOrder.length
        ) {

            showMessage(
                "❌ WRONG AMOUNT OF FLAVORS!"
            );

            return;

        }

        const correct =
            selectedFlavors.every(
                function (flavor) {

                    return currentOrder.includes(
                        flavor
                    );

                }
            );

        if (!correct) {

            showMessage(
                "❌ WRONG FLAVOR!"
            );

            return;

        }

        money += 35;

        served++;

        showMessage(
            "🍦 ORDER SERVED! +₴35"
        );

        selectedFlavors = [];

        displaySelectedFlavors();

        updateStats();

        startNewCustomer();

    }
);


/* ==========================================================
   PUNCH CUSTOMER
========================================================== */

punchButton.addEventListener(
    "click",
    function () {

        shenanigans++;

        showMessage(
            "👊 CUSTOMER GOT SHENANIGAN'D!"
        );

        selectedFlavors = [];

        displaySelectedFlavors();

        updateStats();

        hideShenanigans();

        startNewCustomer();

    }
);


/* ==========================================================
   SHOP
========================================================== */

shopFlavorButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const flavor =
                    button.dataset.flavor;

                const price =
                    Number(
                        button.dataset.price
                    );


                if (
                    unlockedFlavors.includes(
                        flavor
                    )
                ) {

                    showMessage(
                        "🍦 YOU ALREADY OWN THIS FLAVOR!"
                    );

                    return;

                }


                if (
                    money < price
                ) {

                    showMessage(
                        "💰 NOT ENOUGH MONEY!"
                    );

                    return;

                }


                money -= price;

                unlockedFlavors.push(
                    flavor
                );

                button.disabled =
                    true;

                button.classList.add(
                    "owned"
                );

                showMessage(
                    "🛒 " +
                    flavors[flavor].name +
                    " UNLOCKED!"
                );

                updateStats();
                updateFlavorButtons();

            }
        );

    }
);


/* ==========================================================
   UPDATE SHOP
========================================================== */

function updateShop() {

    shopFlavorButtons.forEach(
        function (button) {

            const flavor =
                button.dataset.flavor;

            if (
                unlockedFlavors.includes(
                    flavor
                )
            ) {

                button.disabled =
                    true;

                button.classList.add(
                    "owned"
                );

            } else {

                button.disabled =
                    false;

                button.classList.remove(
                    "owned"
                );

            }

        }
    );

}

/* ==========================================================
   UPDATE ICE CREAM FLAVORS
========================================================== */

function updateFlavorButtons() {

    flavorButtons.forEach(
        function (button) {

            const flavor =
                button.dataset.flavor;

            if (
                unlockedFlavors.includes(
                    flavor
                )
            ) {

                button.hidden = false;

            } else {

                button.hidden = true;

            }

        }
    );

}


/* ==========================================================
   SAVE GAME
========================================================== */

function saveGame() {

    const saveData = {

        money: money,

        served: served,

        shenanigans: shenanigans,

        unlockedFlavors:
            unlockedFlavors

    };

    localStorage.setItem(
        "iceCreamShenanigansSave",
        JSON.stringify(
            saveData
        )
    );

}


/* ==========================================================
   SAVE BUTTON
========================================================== */

saveButton.addEventListener(
    "click",
    function () {

        saveGame();

        saveButton.textContent =
            "💾 SAVED!";

        setTimeout(
            function () {

                saveButton.textContent =
                    "💾 SAVE";

            },
            1000
        );

    }
);


/* ==========================================================
   LOAD GAME
========================================================== */

function loadGame() {

    const savedData =
        localStorage.getItem(
            "iceCreamShenanigansSave"
        );

    if (!savedData) {
        return;
    }

    const data =
        JSON.parse(savedData);

    money =
        data.money || 0;

    served =
        data.served || 0;

    shenanigans =
        data.shenanigans || 0;

    unlockedFlavors =
        data.unlockedFlavors || [
            "blue",
            "vanilla",
            "chocolate",
            "cherry"
        ];

}


/* ==========================================================
   RESET PROGRESS
========================================================== */

function resetProgress() {

    money = 0;

    served = 0;

    shenanigans = 0;

    selectedFlavors = [];

    displaySelectedFlavors();

    updateStats();

    showMessage(
        "🔥 PROGRESS RESET!"
    );

}


/* ==========================================================
   RESET ALL
========================================================== */

function resetAll() {

    localStorage.removeItem(
        "iceCreamShenanigansSave"
    );

    money = 0;

    served = 0;

    shenanigans = 0;

    unlockedFlavors = [
        "blue",
        "vanilla",
        "chocolate",
        "cherry"
    ];

    selectedFlavors = [];

    displaySelectedFlavors();

    updateStats();

    updateShop();

    showMessage(
        "🖲️ ALL DATA RESET!"
    );

}


/* ==========================================================
   RESET BUTTONS
========================================================== */

resetProgressButton.addEventListener(
    "click",
    function () {

        resetProgress();

    }
);


resetAllButton.addEventListener(
    "click",
    function () {

        resetAll();

    }
);


/* ==========================================================
   START GAME
========================================================== */

loadGame();

updateStats();

displaySelectedFlavors();

updateShop();

updateFlavorButtons();

startNewCustomer();