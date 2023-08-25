const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll("button.num");
const clearButton = document.querySelector(".clearButton");
const operatorButtons = document.querySelectorAll(".operator");
const deleteButton = document.querySelector(".delete");
const commaButton = document.querySelector(".comma");
const equalButton = document.querySelector(".equalButton");
const OPERATORS = ["+", "-", "x", "/", "%", "="];
screen.textContent = "0";
let operatorTracker = false; // This will switch to true if an operator button is hit


// STATUS OF THE CALCULATOR
let state = {
    numberOne: 0,
    ope: "+", 
    numberTwo: 0, 
    queue: "",
    result: function() {
        return operate(this.numberOne, this.numberTwo, this.ope);
        },
    reset: function() {
        this.numberOne = 0;
        this.ope = "+";
        this.numberTwo = 0;
        this.queue = "";
    }
    };

// CLEAR BUTTON EVENTS
clearButton.addEventListener("click", () => {
    screen.textContent = "0";
    state.reset();
    commaButton.disabled = false;
    deleteButton.disabled = false;
});

//BACKSPACE BUTTON EVENTS
deleteButton.addEventListener(
    "click",
    () => {
        if (state.queue[(state.queue).length - 1] == "="){
            state.reset();
            screen.textContent = "0";
        }
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
        }
);

// NUMERICAL BUTTONS EVENTS
buttons.forEach((element) => { 
    element.addEventListener("click",
        (e) => {
            let onScreen  = screen.textContent;
            if (state.queue[(state.queue).length - 1] == "="){
                onScreen = "0";
                state.reset();
            }
            if ((Number(onScreen) == 0 && !onScreen.includes(".") ) || operatorTracker){
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
            operatorTracker = false;
            deleteButton.disabled = false;
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

// OPERATOR BUTTONS EVENTS
operatorButtons.forEach(
    elt => elt.addEventListener(
        "click",
        e => {
            commaButton.disabled = false; //unlock the comma button
            let currentOp = e.target.value;
            if (!operatorTracker){
                state.numberOne = state.result();
                state.numberTwo = Number(screen.textContent);
            }
            screen.textContent = state.numberOne;
            state.ope = currentOp;
            state.queue = updateQ(state.queue, currentOp);
            deleteButton.disabled = true;
            operatorTracker = true;
         }
    )
);

// EQUAL BUTTON EVENTS
equalButton.addEventListener(
    "click",
    () => {
        if (operatorTracker){
            screen.textContent = state.numberOne;
        }
        else
        {
            screen.textContent = state.result();
            state.numberOne = state.result();
        }
        state.queue = updateQ(state.queue, "=");
        deleteButton.disabled = true;
        operatorTracker = true;
    }
)

// UPDATING THE QUEUE
function updateQ (string, hit){
    let lastChar = string[string.length -1];
    if (OPERATORS.includes(lastChar)){
        string = string.slice(0,-1) + hit;
    } else {
        string += hit;
    }
    return string;
}

// OPERATIONS
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

