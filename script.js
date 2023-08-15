const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll("button.num");
const clearButton = document.querySelector(".clearButton");
const operatorButtons = document.querySelectorAll(".operator");
const deleteButton = document.querySelector(".delete");
const commaButton = document.querySelector(".comma");
const equalButton = document.querySelector(".equalButton");
const OPERATORS = ["+", "-", "x", "/", "%", "="];

let screenContent = "";
let operation = [];

clearButton.addEventListener("click", () => {
    screen.textContent = "0";
    screenContent = "";
    operation = [];
    commaButton.disabled = false;
    equalButton.disabled = false;
});

deleteButton.addEventListener(
    "click",
    () => { 
        equalButton.disabled = false;
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
            equalButton.disabled = false;
            screenContent = screenContent + e.target.value;
            screen.textContent = screenContent;
            if (screenContent.includes(".") || screenContent == ""){
                commaButton.disabled = true;
            }
    })
});

operatorButtons.forEach(
    elt => elt.addEventListener(
        "click",
        e => {
            equalButton.disabled = false;

            let currentOp = e.target.value;
            commaButton.disabled = false; //unlock the comma button
            if (screenContent){ // add the current collected number to the operations
            operation.push(Number(screenContent));
            screenContent = ""
            };
            
            if (operation.length != 0){
                let op = operation[operation.length -1];
                if (!OPERATORS.includes(op)){
                    // If the last typed button was an operator and it is followed by 
                    // an operator, then just keep that last one
                    operation.push(currentOp);
                } else {
                    operation[operation.length -1] = currentOp;
                };
            };

           compute();

            console.log(operation);
        }
    )
);

equalButton.addEventListener(
    "click",
    () => {
        if (screenContent && operation.length != 0){
            operation.push(Number(screenContent));
            compute();
        } else if (operation.length !=0) {
            if (operation[0]){
            screen.textContent = operation[0];}
            else {
                screen.textContent ='0';
            };
        } else {
            screen.textContent = '0';
        };
    }
)

function compute (){
    if (operation.length >= 3) {
        let firstNumber = Number(operation[0]);
        let secondNumber =  Number(operation[2]);
        let currentOperator = operation[1];
        let nextOperator = operation[operation.length-1];
        let liveResult = operate(firstNumber, secondNumber, currentOperator);
        screen.textContent = liveResult;
        operation = [liveResult, nextOperator];
    } ;
}

function operate(firstNumber = 0, secondNumber = 0, op = "+"){
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