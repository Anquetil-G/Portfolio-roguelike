/* -------------------------------- VARIABLE -------------------------------- */

const user = document.querySelector(".user");
const stepLevelP = document.getElementById("step-level");
const gameOverCard = document.querySelector(".game-over-card-container");
const mapImage = document.querySelector(".map-image");
const mapImageCSS = getComputedStyle(mapImage); 
const tileSize = parseFloat(mapImageCSS.width) / 14;

let pause = false;
let userX = 2;
let userY = 5;
let userCollisionLeft = true;
let userCollisionRight = false;
let userCollisionTop = false;
let userCollisionBottom = false;
let userLife = 5;
let stepLevel = 0;
let bonusHeartX = false;
let bonusHeartY = false;

let activeMonster1 = 1;
let activeMonster2 = 2;
let activeMonster3 = 3;
let activeMonster4 = 4;
let activeMonster5 = 5;
let monster1X = 12;
let monster1Y = 6;
let monster2X = 3;
let monster2Y = 10;
let monster3X = 12;
let monster3Y = 3;
let monster4X = 7;
let monster4Y = 2;
let monster5X = 10;
let monster5Y = 10;

let root = document.documentElement;
root.style.setProperty('--tileSize', tileSize + "px");
root.style.setProperty('--mapWidth', (parseFloat(mapImageCSS.width) - tileSize * 2) + "px");
root.style.setProperty('--mapHeight', (parseFloat(mapImageCSS.height) - tileSize * 2) + "px");

/* -------------------------------- FUNCTIONS ------------------------------- */

const damageReceived = () => {
    heart1.classList.add("heart-full");
    heart1.classList.remove("heart-half");
    heart1.classList.remove("heart-empty");
    heart2.classList.remove("heart-empty");
    heart2.classList.add("heart-full");
    heart2.classList.remove("heart-half");
    heart3.classList.remove("heart-empty");
    heart3.classList.add("heart-full");
    heart3.classList.remove("heart-half");
    heart4.classList.remove("heart-empty");
    heart4.classList.add("heart-full");
    heart4.classList.remove("heart-half");
    heart5.classList.remove("heart-empty");
    heart5.classList.add("heart-full");
    heart5.classList.remove("heart-half");
    if (userLife <= 5) {
        heart5.classList.add("heart-full");
    } if (userLife <= 4.5) {
        heart5.classList.add("heart-half");
    } if (userLife <= 4) {
        heart5.classList.add("heart-empty");
    } if (userLife <= 3.5) {
        heart4.classList.add("heart-half");
    } if (userLife <= 3) {
        heart4.classList.add("heart-empty");
    } if (userLife <= 2.5) {
        heart3.classList.add("heart-half");
    } if (userLife <= 2) {
        heart3.classList.add("heart-empty");
    } if (userLife <= 1.5) {
        heart2.classList.add("heart-half");
    } if (userLife <= 1) {
        heart2.classList.add("heart-empty");
    } if (userLife <= 0.5) {
        heart1.classList.add("heart-half");
    } if (userLife <= 0) {
        heart1.classList.add("heart-empty");
        gameOverCard.classList.remove("remove");
        pause = true;
        stepLevel = 1;
        stepLevelP.textContent = stepLevel;
    };
};
const newStep = () => {
    stepLevel++;
    stepLevelP.textContent = stepLevel;
    userX = 2;
    userY = 5;
    root.style.setProperty("--userX" , userX);
    root.style.setProperty("--userY" , userY);
    const random = Math.ceil(Math.random() * 19);
    const random2 = Math.ceil(Math.random() * 19);
    if (random < 10) {
        bonusHeart.classList.remove("remove");
        if (random > 8) {
            bonusHeartX = 4;
            bonusHeartY = 3;
        } else if (random > 6) {
            bonusHeartX = 10;
            bonusHeartY = 8;
        } else if (random > 4) {
            bonusHeartX = 7;
            bonusHeartY = 5;
        } else if (random > 2) {
            bonusHeartX = 4;
            bonusHeartY = 10;
        } else if (random > 0) {
            bonusHeartX = 9;
            bonusHeartY = 2;
        };
        root.style.setProperty('--bonusHeartX', bonusHeartX);
        root.style.setProperty('--bonusHeartY', bonusHeartY);
    } else {
        bonusHeart.classList.add("remove");
        bonusHeartX = false;
        bonusHeartY = false;
    }

    monster1.classList.add("remove");
    monster2.classList.add("remove");
    monster4.classList.add("remove");
    monster5.classList.add("remove");
    activeMonster1 = false;
    activeMonster2 = false;
    activeMonster4 = false;
    activeMonster5 = false;
    monster1X = false;
    monster1Y = false;
    monster2X = false;
    monster2Y = false;
    monster4X = false;
    monster4Y = false;
    monster5X = false;
    monster5Y = false;
    if (random2 < 10) {
        monster1.classList.remove("remove");
        activeMonster1 = 1;
        monster1X = 12;
        monster1Y = 6;
        monster2.classList.remove("remove");
        activeMonster2 = 2;
        monster2X = 3;
        monster2Y = 10;
    } else {
        monster4.classList.remove("remove");
        activeMonster4 = 4;
        monster4X = 7;
        monster4Y = 2;
        monster5.classList.remove("remove");
        activeMonster5 = 5;
        monster5X = 10;
        monster5Y = 10;
    }
    root.style.setProperty('--monster1X', monster1X);
    root.style.setProperty('--monster1Y', monster1Y);
    root.style.setProperty('--monster2Y', monster2Y);
    root.style.setProperty('--monster2X', monster2X);
    root.style.setProperty('--monster4Y', monster4Y);
    root.style.setProperty('--monster4X', monster4X);
    root.style.setProperty('--monster5Y', monster5Y);
    root.style.setProperty('--monster5X', monster5X);
};
newStep();

/* -------------------------------- USER-MOVE ------------------------------- */

// --------------- Functions-collisions
const testUserCollisionLeft = () => {
    if (userX === 1 ||
    userX === 2 && userY === 5 ||
    userX === 6 && userY === 2 ||
    userX === 11 && userY === 2) {
        userCollisionLeft = true;
    } else {
        userCollisionLeft = false;
    };
};
const testUserCollisionRight = () => {
    if (userX === 12 ||
    userX === 4 && userY === 2 ||
    userX === 9 && userY === 2 ||
    userX === 11 && userY === 2) {
        userCollisionRight = true;
    } else {
        userCollisionRight = false;
    };
};
const testUserCollisionTop = () => {
    if (userY === 2 ||
    userY === 3 && userX === 5 ||
    userY === 3 && userX === 10 ||
    userY === 3 && userX === 12 ||
    userY === 6 && userX === 1) {
        userCollisionTop = true;
    } else {
        userCollisionTop = false;
    };
};
const testUserCollisionBottom = () => {
    if (userY === 10 ||
    userY === 4 && userX === 1) {
        userCollisionBottom = true;
    } else {
        userCollisionBottom = false;
    };
};
const testUserCollisionDamage = () => {
    if (userX === 8 && userY === 4 ||
    userX === 8 && userY === 5 ||
    userX === 8 && userY === 6 ||
    userX === 8 && userY === 7 ||
    userX === 8 && userY === 8) {
        setTimeout(() => {
            userLife = userLife - 0.5;
            damageReceived();
            testUserCollisionDamage();
        }, 600);
    };
};
const testMonsterAttack = () => {
    if (userX === monster1X && userX === monster1Y ||
    userX === monster2X && userX === monster2Y ||
    userX === monster4X && userX === monster4Y ||
    userX === monster5X && userX === monster5Y) {
        setTimeout(() => {
            userLife = userLife - 0.5;
            damageReceived();
            testUserCollisionDamage();
        }, 600);
    }
}
const testBonusCollision = () => {
    if (userX === 11 && userY === 2) {
        newStep();
    };
    if (userX === bonusHeartX && userY === bonusHeartY) {
        bonusHeart.classList.add("remove");
        bonusHeartX = false;
        bonusHeartY = false;
        if (userLife <= 4) {
            userLife++;
            damageReceived();
        } else {
            userLife = 5;
            damageReceived();
        };
    };
};

// --------------- Keydown
window.addEventListener("keyup", (e) => {
    if (pause === false) {
        if (e.key.indexOf("Arrow") !== -1) {
            // user.classList.remove("cote-droit");
            // user.classList.remove("cote-gauche");
            // user.classList.remove("dos");
            // user.classList.remove("face");
            if (e.key.indexOf("ArrowLeft") !== -1) {
                testUserCollisionLeft();
                // user.classList.add("cote-gauche");
                if (userCollisionLeft === false) {                    
                    userX--;
                    root.style.setProperty('--userX', userX);
                };
                testUserCollisionDamage();
                testBonusCollision();
                // testMonsterAttack();
            };
            if (e.key.indexOf("ArrowRight") !== -1) {
                testUserCollisionRight();
                // user.classList.add("cote-droit");
                if (userCollisionRight === false) {                  
                    userX++;
                    root.style.setProperty('--userX', userX);
                };
                testUserCollisionDamage();
                testBonusCollision();
                // testMonsterAttack();
            };
            if (e.key.indexOf("ArrowUp") !== -1) {
                testUserCollisionTop();
                // user.classList.add("dos");
                if (userCollisionTop === false) {
                    userY--;
                    root.style.setProperty('--userY', userY);
                };
                testUserCollisionDamage();
                testBonusCollision();
                // testMonsterAttack();
            };
            if (e.key.indexOf("ArrowDown") !== -1) {
                testUserCollisionBottom();
                // user.classList.add("face");
                if (userCollisionBottom === false) {                    
                    userY++;
                    root.style.setProperty('--userY', userY);
                };
                testUserCollisionDamage();
                testBonusCollision();
                // testMonsterAttack();
            };
        };
    };
});

/* --------------------------------- MONSTER -------------------------------- */

const monsterMove = (x, y , num) => {
    if (x > userX) {
        if (x === 6 && y === 2 ||
        x === 9 && y === 7 ||
        x === 9 && y === 8 ||
        x === 9 && y === 4 ||
        x === 9 && y === 5 ||
        x === 9 && y === 6) {
        } else {
            if (num === 1) {
                monster1X--;
            } else if (num === 2) {
                monster2X--;
            } else if (num === 4) {
                monster4X--;
            } else if (num === 5) {
                monster5X--;
            };
        };
    } else if (x < userX) {
        if (x === 4 && y === 2 ||
        x === 9 && y === 2 ||
        x === 7 && y === 6 ||
        x === 7 && y === 7 ||
        x === 7 && y === 8 ||
        x === 7 && y === 4 ||
        x === 7 && y === 5) {
        } else {
            if (num === 1) {
                monster1X++; 
            } else if (num === 2) {
                monster2X++;
            } else if (num === 4) {
                monster4X++;
            } else if (num === 5) {
                monster5X++;
            };
        };
    };
    if (y > userY) {
        if (y !== 3 && x !== 8 ||
        y !== 4 && x !== 1) {
            if (num === 1) {
                monster1Y--;
            } else if (num === 2) {
                monster2Y--;
            } else if (num === 4) {
                monster4Y--;
            } else if (num === 5) {
                monster5Y--;
            };
        };
    } else if (y < userY) {
        if (y !== 9 && x !== 8 ||
        y !== 6 && x !== 1) {
            if (num === 1) {
                monster1Y++; 
            } else if (num === 2) {
                monster2Y++;
            } else if (num === 4) {
                monster4Y++;
            } else if (num === 5) {
                monster5Y++;
            };
        };
    };
    if (num === 1) {
        root.style.setProperty('--monster1X', x);
        root.style.setProperty('--monster1Y', y);
    } else if (num === 2) {
        root.style.setProperty('--monster2X', x);
        root.style.setProperty('--monster2Y', y);
    } else if (num === 4) {
        root.style.setProperty('--monster4X', x);
        root.style.setProperty('--monster4Y', y);
    } else if (num === 5) {
        root.style.setProperty('--monster5X', x);
        root.style.setProperty('--monster5Y', y);
    };
    // testMonsterAttack();
};

setInterval(() => {
    if (pause === false) {
        monsterMove(monster1X, monster1Y, activeMonster1);
        monsterMove(monster2X, monster2Y, activeMonster2);
    };
}, 900);
setInterval(() => {
    if (pause === false) {
        monsterMove(monster4X, monster4Y, activeMonster4);
        monsterMove(monster5X, monster5Y, activeMonster5);
    };
}, 800);