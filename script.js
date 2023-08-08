screen = document.querySelector("#screen");
buttons = document.querySelectorAll(".button");

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
    )
});