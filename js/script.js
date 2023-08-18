const formulas = {
    "triangle":{
        "image": "image/triangle.webp",
        "formula": {
            "area": {
                "description": "Luas Segitiga = alas x tinggi",
                "function": function(base, height) {return base * height / 2;}
            },
            "perimeter": {
                "description": "Keliling Segitiga = sisi<sub>A</sub> + sisi<sub>B</sub> + sisi<sub>C</sub>",
                "output": ["sisi<sub>A</sub>", "sisi<sub>B</sub>", "sisi<sub>C</sub>"],
                "function": function(sideA, sideB, sideC) {return sideA + sideB + sideC;}
            },
        },
    },
    "rectangle":{
        "image": "image/rectangle.png",
        "formula": {
            "area": {
                "description": "Luas Segiempat = panjang x lebar",
                "function": function(width, height) {return width * height;},
            },
            "perimeter": {
                "description": "Keliling Segiempat = (panjang + lebar) x 2",
                "function": function(width, height) {return (width + height) * 2;}
            },
        },
    },
};

const inputLabels = {
    "base": "alas",
    "height": "tinggi",
    "width": "lebar",
    "sideA": "sisi<sub>A</sub>",
    "sideB": "sisi<sub>B</sub>",
    "sideC": "sisi<sub>C</sub>",
}

let planeType = "triangle";
let calcType = "area";

const navCalc = document.querySelector("#nav-calc");
const navPlane = document.querySelector("#nav-plane");
const planeImage = document.querySelector("#image-plane");
const descFormula = document.querySelector("#desc-formula");
const inputTable = document.querySelector("#input-formula");
const btnCalc = document.querySelector("#btn-calc");
const btnReset = document.querySelector("#btn-reset");
const result = document.querySelector("#result");

btnCalc.addEventListener("click", function() {
    let formula = formulas[planeType]["formula"][calcType]["function"];
    let parameters = getParamNames(formula);

    let args = [];
    for(let i of parameters){
        args.push(document.querySelector(`#${i}`).valueAsNumber);
    }
    
    result.innerHTML = formula(...args);
});

btnReset.addEventListener("click", function() {
    resetResult();
});

createCalcTypeButton();
createPlaneTypeButton();
createInput();

function createCalcTypeButton() {
    for(let key in formulas[planeType]["formula"]) {
        let btn = document.createElement("button");
        btn.textContent = key;
        btn.addEventListener("click", function(){
            calcType = key;
            createInput();
        });
        navCalc.appendChild(btn);
    }
}

function createPlaneTypeButton() {
    for(let key in formulas) {
        let btn = document.createElement("button");
        btn.textContent = key;
        btn.addEventListener("click", function(){
            planeType = key;
            createInput();
        });
        navPlane.appendChild(btn);
    }
}

function createInput() {
    planeImage.src = formulas[planeType]["image"];
    planeImage.alt = `image-${planeType}`;
    descFormula.innerHTML = formulas[planeType]["formula"][calcType]["description"];
    inputTable.replaceChildren();

    let labels = formulas[planeType]["formula"][calcType]["input"];
    let formula = formulas[planeType]["formula"][calcType]["function"];
    let parameters = getParamNames(formula);

    //for(let i = 0; i < parameters.length; i++) {
    //for(let i of parameters) {
    for(let i of parameters) {
        var row = inputTable.insertRow();
        var label = row.insertCell(0);
        var input = row.insertCell(1);
        label.innerHTML = getInputLabel(i);
        input.innerHTML = `<input type="number" id=${i} value="2">`;
        //label.innerHTML = i;
        //input.innerHTML = `<input type="number" id=${i} value="2">`;
        //label.innerHTML = labels[i];
        //input.innerHTML = `<input type="number" id=${parameters[i]} value="2">`;
    }
    result.innerHTML = null;
}

function getInputLabel(name) {
    return inputLabels[name];
}

function resetResult() {
    let formula = formulas[planeType]["formula"][calcType]["function"];
    let parameters = getParamNames(formula);
    for(let i of parameters) {
        document.querySelector(`#${i}`).value = 0;
    }
    result.innerHTML = null;
}

function getParamNames(func) {
    var funStr = func.toString();
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}