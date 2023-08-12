const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll("button.num");
const clearButton = document.querySelector(".clearButton");
const OPERATORS = ["+", "-", "x", "/", "%"];
const operatorButtons = document.querySelectorAll(".operator");
const deleteButton = document.querySelector(".delete");


let screenContent = 0;
let operation = [];

clearButton.addEventListener("click", () => {
    screen.textContent = 0;
    screenContent = 0;
    operation = [];
})

deleteButton.addEventListener(
    "click",
    () => { 
        screenContent = Math.floor(screenContent/10);
        screen.textContent = screenContent;    
        }
)
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
            screenContent = 10*Number(screenContent) + Number(e.target.value);
            if (true){
            screen.textContent = screenContent;
            };
        })
});

operatorButtons.forEach(
    elt => elt.addEventListener(
        "click",
        e => {
            if (screenContent){
            operation.push(screenContent);
            screenContent = 0};
            let op = operation[operation.length -1];
            if (!OPERATORS.includes(op)){
                operation.push(e.target.value);
            } else {
                operation[operation.length -1] = e.target.value;
            }
            console.log(operation);
        }
    )
);


function add(x,y){
    return x+y;
}

function substract(x,y){
    return x-y;
}

function multiply (x,y){
    return x*y;
};

function divide(num, den){
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

function intDivide(num, den){
    if (den == 0){
        if (num == 0){
            return "error";
        } else {
        return Infinity;
     }
    } else {
        return Math.floor(num/den);
    };
};