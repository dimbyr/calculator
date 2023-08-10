const screen = document.querySelector("#screen");
const buttons = document.querySelectorAll(".button");
const clearButton = document.querySelector(".clearButton");

let screenContent = ""

clearButton.addEventListener("click", () => {
    screen.textContent = "0";
    screenContent = "";
})

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
            screenContent += `${e.target.value}`;
            if (screenContent.length < 13){
            screen.textContent = screenContent;
            };
        })
});







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