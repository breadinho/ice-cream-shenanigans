/* ==========================================================
   ICE CREAM SHENANIGANS
   JAVASCRIPT — PART 1
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
   FLAVORS
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


/* ==========================================================
   UPDATE STATS
========================================================== */

function updateStats() {

    moneyDisplay.textContent = money;
    servedDisplay.textContent = served;
    shenanigansDisplay.textContent = shenanigans;

}


/* ==========================================================
   RANDOM CUSTOMER ORDER
========================================================== */

function generateOrder() {

    currentOrder = [];

    const flavorKeys =
        Object.keys(flavors);

    const amount =
        Math.floor(Math.random() * 3) + 1;

    while (currentOrder.length < amount) {

        const randomFlavor =
            flavorKeys[
                Math.floor(
                    Math.random() * flavorKeys.length
                )
            ];

        if (!currentOrder.includes(randomFlavor)) {

            currentOrder.push(randomFlavor);

        }

    }

    displayOrder();

}


/* ==========================================================
   DISPLAY CUSTOMER ORDER
========================================================== */

function displayOrder() {

    orderFlavors.innerHTML = "";

    currentOrder.forEach(function (flavor) {

        const item =
            document.createElement("span");

        item.textContent =
            flavors[flavor].emoji +
            " " +
            flavors[flavor].name;

        orderFlavors.appendChild(item);

    });

}


/* ==========================================================
   DISPLAY SELECTED ICE CREAM
========================================================== */

function displaySelectedFlavors() {

    selectedFlavorsDisplay.innerHTML = "";

    selectedFlavors.forEach(function (flavor) {

        const item =
            document.createElement("span");

        item.textContent =
            flavors[flavor].emoji +
            " " +
            flavors[flavor].name;

        selectedFlavorsDisplay.appendChild(item);

    });

}


/* ==========================================================
   FLAVOR BUTTONS
========================================================== */

const flavorButtons =
    document.querySelectorAll(".flavor");


flavorButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const flavor =
                button.dataset.flavor;

            selectedFlavors.push(flavor);

            displaySelectedFlavors();

        }
    );

});


/* ==========================================================
   CLEAR BUTTON
========================================================== */

const clearButton =
    document.getElementById("clearButton");


clearButton.addEventListener(
    "click",
    function () {

        selectedFlavors = [];

        displaySelectedFlavors();

        message.textContent = "";

    }
);


/* ==========================================================
   START GAME
========================================================== */

generateOrder();

updateStats();


/* ==========================================================
   SERVE BUTTON
========================================================== */

const serveButton =
    document.getElementById("serveButton");


serveButton.addEventListener(
    "click",
    function () {

        /* Check if the selected flavors
           match the customer's order */

        if (
            selectedFlavors.length ===
            currentOrder.length
        ) {

            const correct =
                selectedFlavors.every(
                    function (flavor) {

                        return currentOrder.includes(flavor);

                    }
                );


            if (correct) {

                /* Successful order */

                money += 35;
                served++;

                message.textContent =
                    "🍦 ORDER SERVED! +₴35";

                selectedFlavors = [];

                displaySelectedFlavors();

                updateStats();

                nextCustomer();

            } else {

                message.textContent =
                    "❌ WRONG FLAVORS!";

            }

        } else {

            message.textContent =
                "❌ THAT'S NOT THE RIGHT ORDER!";

        }

    }
);


/* ==========================================================
   SHENANIGAN AREA
========================================================== */

const shenaniganArea =
    document.getElementById("shenaniganArea");

const punchButton =
    document.getElementById("punchButton");


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

    shenaniganArea.hidden = false;

    displayOrder();

}


/* ==========================================================
   HIDE SHENANIGAN AREA
========================================================== */

function hideShenanigans() {

    shenaniganArea.hidden = true;

}


/* ==========================================================
   PUNCH CUSTOMER
========================================================== */

punchButton.addEventListener(
    "click",
    function () {

        shenanigans++;

        message.textContent =
            "👊 CUSTOMER GOT SHENANIGAN'D!";

        selectedFlavors = [];

        displaySelectedFlavors();

        updateStats();

        hideShenanigans();

        generateOrder();

    }
);


/* ==========================================================
   RANDOM SHENANIGAN CHANCE
========================================================== */

function maybeGenerateShenanigan() {

    const chance =
        Math.random();

    if (chance < 0.10) {

        generateShenaniganOrder();

    } else {

        hideShenanigans();

    }

}


/* ==========================================================
   CUSTOMER GENERATION WITH SHENANIGANS
========================================================== */

function startNewCustomer() {

    const chance = Math.random();

    if (chance < 0.10) {

        generateShenaniganOrder();

    } else {

        generateOrder();
        hideShenanigans();

    }

}


/* ==========================================================
   UPDATE CUSTOMER AFTER SUCCESS
========================================================== */

function nextCustomer() {

    selectedFlavors = [];

    displaySelectedFlavors();

    startNewCustomer();

}


/* ==========================================================
   REPLACE NORMAL ORDER GENERATION
========================================================== */

startNewCustomer();


/* ==========================================================
   MESSAGE HELPER
========================================================== */

function showMessage(text) {

    message.textContent = text;

}


/* ==========================================================
   INITIAL DISPLAY
========================================================== */

updateStats();
displaySelectedFlavors();


/* ==========================================================
   CUSTOMER FLOW
========================================================== */

function finishCustomer() {

    selectedFlavors = [];

    displaySelectedFlavors();

    hideShenanigans();

    startNewCustomer();

}


/* ==========================================================
   SUCCESSFUL ORDER
========================================================== */

function completeOrder() {

    money += 35;
    served++;

    showMessage("🍦 ORDER SERVED! +₴35");

    updateStats();

    finishCustomer();

}


/* ==========================================================
   WRONG ORDER
========================================================== */

function failedOrder() {

    showMessage("❌ WRONG ORDER!");

}


/* ==========================================================
   DATA BUTTON REFERENCES
========================================================== */

const saveButton =
    document.getElementById("saveButton");

const resetProgressButton =
    document.getElementById("resetProgressButton");

const resetAllButton =
    document.getElementById("resetAllButton");


/* ==========================================================
   SAVE GAME
========================================================== */

function saveGame() {

    const saveData = {

        money: money,
        served: served,
        shenanigans: shenanigans

    };

    localStorage.setItem(
        "iceCreamShenanigansSave",
        JSON.stringify(saveData)
    );

}


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

    updateStats();

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
   LOAD SAVED DATA
========================================================== */

loadGame();


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

    message.textContent =
        "🔥 PROGRESS RESET!";

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

    selectedFlavors = [];

    displaySelectedFlavors();
    updateStats();

    message.textContent =
        "🖲️ ALL DATA RESET!";

}


/* ==========================================================
   RESET PROGRESS BUTTON
========================================================== */

resetProgressButton.addEventListener(
    "click",
    function () {

        resetProgress();

    }
);


/* ==========================================================
   RESET ALL BUTTON
========================================================== */

resetAllButton.addEventListener(
    "click",
    function () {

        resetAll();

    }
);


/* ==========================================================
   4-FLAVOR CUSTOMER CHECK
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
   SERVE CHECK
========================================================== */

serveButton.addEventListener(
    "click",
    function () {

        if (isShenaniganOrder()) {

            showMessage(
                "🚨 FOUR FLAVORS?! SHENANIGANS!"
            );

            shenaniganArea.hidden = false;

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


        /* Successful normal order */

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