const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll("button.num");
const clearButton = document.querySelector(".clearButton");
const operatorButtons = document.querySelectorAll(".operator");
const deleteButton = document.querySelector(".delete");
const commaButton = document.querySelector(".comma");
const equalButton = document.querySelector(".equalButton");
const OPERATORS = ["+", "-", "x", "/", "%", "="];

let state = {
    numberOne: 0,
    ope: "+", 
    numberTwo: 0, 
    result: function() {
        return operate(this.numberOne, this.numberTwo, this.ope);
        },
    queue: ""
    };

clearButton.addEventListener("click", () => {
    screen.textContent = 0;
    state.numberOne = 0;
    state.numberTwo = 0;
    state.ope = "+";
    state.queue = "";
    commaButton.disabled = false;
    console.table(state);
});

deleteButton.addEventListener(
    "click",
    () => {
        let currentScreenContent = screen.textContent;
        if (Number(currentScreenContent)){
            currentScreenContent = currentScreenContent.slice(0,-1);
            if (currentScreenContent == ""){
                currentScreenContent = "0";
            }
            }
        else {
            currentScreenContent = "0"; 
            };
        if (!currentScreenContent.includes(".")){
            commaButton.disabled = false;
            };
        screen.textContent = currentScreenContent;
        // operate on current state  
        state.queue = state.queue.slice(0,-1);
        state.numberTwo = Number(screen.textContent);
        console.table(state);
        }
);

let operatorTracker = false;
// numerical buttons
buttons.forEach((element) => { 
    element.addEventListener("click",
        (e) => {
            let onScreen  = screen.textContent;
            if (Number(onScreen) == 0 || operatorTracker){
                onScreen = e.target.value;
            }
            else {
                onScreen = onScreen + e.target.value;
            }
            screen.textContent = onScreen;
            if (onScreen.includes(".") || onScreen == ""){
                commaButton.disabled = true;
            };
            state.numberTwo = Number(onScreen);
            state.queue += e.target.value;
            console.table(state);
            operatorTracker = false;
    });
    element.addEventListener("mousedown", 
        (e) =>{ 
            e.target.style["background-color"] = "#00FF00";
            }
    );
    element.addEventListener("mouseup", 
        (e)=> { 
                e.target.style["background-color"] = "#FFFFFF"
            }
    );
    element.addEventListener("mouseout", 
    (e)=> { 
            e.target.style["background-color"] = "#FFFFFF"
        }
    );
});

operatorButtons.forEach(
    elt => elt.addEventListener(
        "click",
        e => {
            commaButton.disabled = false; //unlock the comma button
            let currentOp = e.target.value;
            let firstNumber = Number(screen.textContent);
            let lastHit = state.queue[state.queue.length - 1];
            if (OPERATORS.includes(lastHit)){
                // Don't do anything but replace the operator
            } else {
                state.numberOne = state.result();
                state.numberTwo = firstNumber;
            }
            screen.textContent = state.numberOne;
            state.ope = currentOp;
            state.queue = updateQ(state.queue, currentOp);
            operatorTracker = true;
            console.table(state);
         }
    )
);

equalButton.addEventListener(
    "click",
    () => {
        let lastPressed = state.queue[state.queue.length - 1];

        if (OPERATORS.includes(lastPressed)){
            screen.textContent = state.numberOne;
        }
        else
        {
            screen.textContent = state.result();
            state.numberOne = state.result();
        }
        state.queue = updateQ(state.queue, "=");
        operatorTracker = true;
        console.table(state);
    }
)

function updateQ (string, hit){
    let lastChar = string[string.length -1];
    if (OPERATORS.includes(lastChar)){
        string = string.slice(0,-1) + hit;
    } else {
        string += hit;
    }
    return string;
}

function operate(firstNumber, secondNumber, op){
    switch(op){
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return substract(firstNumber,secondNumber);
        case "x":
            return multiply(firstNumber, secondNumber);
        case "/": 
            return divide(firstNumber, secondNumber);
        case "%":
            return intDivide(firstNumber, secondNumber);
        
    }
}

function add(x = 0, y = 0){
    return myRound(x+y);
};

function substract(x = 0, y = 0){
    return x-y;
};

function multiply (x = 0,y = 1){
    return myRound(x*y);
};

function divide(num = 0, den = 1){
    if (den == 0){
        if (num == 0){
            return "error";
        } else {
        return Infinity;
     }
    } else {
        return myRound(num/den);
    };
};

function intDivide(num = 0, den = 1){
    if (den == 0){
         return "error";
     } else if (num.toString().includes('.') || den.toString().includes('.')){
        return "error";
     } else {
        return num%den;
    };
};

function myRound(x){
    return Math.round(100000000*x)/100000000;
}

