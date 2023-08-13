const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll("button.num");
const clearButton = document.querySelector(".clearButton");
const operatorButtons = document.querySelectorAll(".operator");
const deleteButton = document.querySelector(".delete");
const commaButton = document.querySelector(".comma");
const OPERATORS = ["+", "-", "x", "/", "%", "="];

let screenContent = "";
let operation = [];

clearButton.addEventListener("click", () => {
    screen.textContent = "0";
    screenContent = "";
    operation = [];
    commaButton.disabled = false;
});

deleteButton.addEventListener(
    "click",
    () => { 
        screenContent = screenContent.slice(0,-1);
        if (screenContent.length!=0){
        screen.textContent = screenContent;
            }
        else {
            screen.textContent = "0"; 
            };
        if (!screenContent.includes(".")){
            commaButton.disabled = false;
            }  
        }
);

buttons.forEach((element) => { 
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
    
    element.addEventListener("click",
        (e) => {
            screenContent = screenContent + e.target.value;
            if (true){
            screen.textContent = screenContent;
            };
            if (screenContent.includes(".") || screenContent == ""){
                commaButton.disabled = true;
            }
    })
});

operatorButtons.forEach(
    elt => elt.addEventListener(
        "click",
        e => {
            let currentOp = e.target.value;
            commaButton.disabled = false;
            if (screenContent){
            operation.push(screenContent);
            screenContent = ""
            };
            
            if (operation.length != 0){
                let op = operation[operation.length -1];
                if (!OPERATORS.includes(op)){
                    operation.push(currentOp);
                } else {
                    operation[operation.length -1] = currentOp;
                };
            } else {
                // operation[operation.length -1] = currentOp;
            }
            console.log(operation);
        }
    )
);

function operate(firstNumber = 0, secondNumber = 0, op = "+"){
    switch(op){
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return substract(firstNumber,secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/": 
            return divide(firstNumber, secondNumber);
        case "%":
            return intDivide(firstNumber, secondNumber);
        
    }
}

function add(x = 0, y = 0){
    return x+y;
};

function substract(x = 0, y = 0){
    return x-y;
};

function multiply (x = 0,y = 1){
    return x*y;
};

function divide(num = 0, den = 1){
    if (den == 0){
        if (num == 0){
            return "error";
        } else {
        return Infinity;
     }
    } else {
        return Math.round(100000000*num/den)/100000000;
    };
};

function intDivide(num = 0, den = 1){
    if (den == 0){
        if (num == 0){
            return "error";
        } else {
        return Infinity;
     }
    } else {
        return num%den;
    };
};