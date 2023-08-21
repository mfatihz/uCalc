/* const formulas = {
    "triangle":{
        "image": "image/Triangle.png",
        "formula": {
            "area": {
                "description": "Luas Segitiga = alas x tinggi / 2",
                "function": function(base, height) {return base * height / 2;},
                "output": (base, height) => {return `Luas Segitiga = ${base} x ${height} / 2`},
            },
            "perimeter": {
                "description": "Keliling Segitiga = sisi<sub>A</sub> + sisi<sub>B</sub> + sisi<sub>C</sub>",
                "function": function(sideA, sideB, sideC) {return sideA + sideB + sideC;},
                "output": (a, b, c) => {return `Keliling Segitiga = ${a} + ${b} + ${c}`},
            },
        },
    },
    "rectangle":{
        "image": "image/Rectangle.png",
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
} */

import { formulas, inputLabels } from './formulas.js';

let planeType = Object.keys(formulas)[0];
let calcType = Object.keys(formulas[Object.keys(formulas)[0]]['formula'])[0];

const navCalc = document.querySelector("#nav-calc");
const navPlane = document.querySelector("#nav-plane");
const navPlaneOption = document.querySelector("#nav-plane-option");
const planeImage = document.querySelector("#image-plane");
const descFormula = document.querySelector("#desc-formula");
const inputTable = document.querySelector("#input-formula");
const btnCalc = document.querySelector("#btn-calc");
const btnReset = document.querySelector("#btn-reset");
const result = document.querySelector("#result");

const step = document.querySelector("#step");

btnCalc.addEventListener("click", calculation);

btnReset.addEventListener("click", () => {
    resetInput();
    resetResult();
});

createCalcTypeButtons();
addPlaneTypeOptions();
createInput();

function calculation() {
    let formula = formulas[planeType]["formula"][calcType]["function"];
    let parameters = getParamNames(formula);

    let args = [];
    for (let i of parameters) {
        args.push(document.querySelector(`#${i}`).valueAsNumber);
    }

    result.innerHTML = formula(...args);


    console.log(formulas[planeType]["formula"][calcType]["output"]);
    step.innerHTML = formulas[planeType]["formula"][calcType]["output"](...args);
}

function createCalcTypeButtons() {
    for(let key in formulas[planeType]["formula"]) {
        let btn = document.createElement("button");
        btn.textContent = getInputLabel(key);
        btn.addEventListener("click", function(){
            calcType = key;
            createInput();
        });
        navCalc.appendChild(btn);
    }
}
function addPlaneTypeOptions() {
    for(let key in formulas) {
        let opt = document.createElement("option");
        opt.textContent = getInputLabel(key);
        opt.value = key;
        navPlaneOption.appendChild(opt);
    }
    navPlaneOption.addEventListener("change", function(){
        planeType = navPlaneOption.value;
        createInput();
    });
}

function createInput() {
    planeImage.src = formulas[planeType]["image"];
    planeImage.alt = `image-${planeType}`;
    descFormula.innerHTML = formulas[planeType]["formula"][calcType]["description"];
    inputTable.replaceChildren();

    let formula = formulas[planeType]["formula"][calcType]["function"];
    let parameters = getParamNames(formula);

    for(let paramName of parameters) {
        var row = inputTable.insertRow();
        var label = row.insertCell(0);
        var input = row.insertCell(1);
        label.innerHTML = getInputLabel(paramName);
        input.innerHTML = `<input type="number" id=${paramName} value="2">`;
    }
    resetResult();
}

function getInputLabel(name) {
    if (name in inputLabels) {return inputLabels[name];}
    return name;
}

function resetInput() {
    let formula = formulas[planeType]["formula"][calcType]["function"];
    let parameters = getParamNames(formula);
    for(let i of parameters) {
        document.querySelector(`#${i}`).value = 0;
    }
}

function resetResult() {
    result.innerHTML = null;
    step.innerHTML = null;
}

function getParamNames(func) {
    var funStr = func.toString();
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}

/* 


import { planes, inputLabels } from './formulas.js';

let planeType = 0;
// let planeType = planes[0]["plane"];// Object.keys(planes)[0];
let formulaType = Object.keys(planes[0]['formula'])[0]; // Object.keys(planes[Object.keys(planes)[0]]['formula'])[0];

const navCalc = document.querySelector("#nav-calc");
const navPlane = document.querySelector("#nav-plane");
const navPlaneOption = document.querySelector("#nav-plane-option");
const planeImage = document.querySelector("#image-plane");
const descFormula = document.querySelector("#desc-formula");
const inputTable = document.querySelector("#input-formula");
const btnCalc = document.querySelector("#btn-calc");
const btnReset = document.querySelector("#btn-reset");
const result = document.querySelector("#result");

const step = document.querySelector("#step");

btnCalc.addEventListener("click", calculation);

btnReset.addEventListener("click", () => {
    resetInput();
    resetResult();
});

createFormulaTypeButtons();
addPlaneTypeOptions();
createInput();

function getFormula() {
    return planes[planeType]["formula"][formulaType]["function"];
}

function calculation() {
    console.log(Object.keys(planes[planeType]["formula"]));
    let formula = getFormula();
    let parameters = getParamNames(formula);

    let args = [];
    for (let i of parameters) {
        args.push(document.querySelector(`#${i}`).valueAsNumber);
    }

    result.innerHTML = formula(...args);
    step.innerHTML = planes[planeType]["formula"][formulaType]["output"](...args);
}

function getFormulas() {
    return planes[planeType]["formula"];
}

function createFormulaTypeButtons() {
    navCalc.replaceChildren();
    for(let key in getFormulas()) {
        let btn = document.createElement("button");
        btn.textContent = getInputLabel(key);
        btn.addEventListener("click", function(){
            formulaType = key;
            console.log(formulaType, planeType);
            createInput();
        });
        navCalc.appendChild(btn);
    }
    console.log("FORMULA", formulaType, planeType);
}

function addPlaneTypeOptions() {
    for(let i in planes) {
        let key = planes[i].plane;
        let opt = document.createElement("option");
        opt.textContent = getInputLabel(key);
        opt.value = i;
        navPlaneOption.appendChild(opt);
    }
    navPlaneOption.addEventListener("change", function(){
        planeType = navPlaneOption.value;
        formulaType = (formulaType in getFormulas()) ? formulaType : getFormulas()[0];
        console.log("PLANE", formulaType, planeType);
        createFormulaTypeButtons();
        createInput();
    });
}

function createInput() {
    console.log("INPUT", formulaType, planeType);
    planeImage.src = planes[planeType]["image"];
    planeImage.alt = `image-${planeType}`;
    // console.log(getFormulas(), formulaType, planeType, planes[planeType]["formula"][0]);
    descFormula.innerHTML = planes[planeType]["formula"][formulaType]["description"];
    inputTable.replaceChildren();

    let formula = getFormula();
    let parameters = getParamNames(formula);
    
    for(let paramName of parameters) {
        var row = inputTable.insertRow();
        var label = row.insertCell(0);
        var input = row.insertCell(1);
        label.innerHTML = getInputLabel(paramName);
        input.innerHTML = `<input type="number" id=${paramName} value="2">`;
    }
    resetResult();
}

function getInputLabel(name) {
    if (name in inputLabels) {return inputLabels[name];}
    return name;
}

function resetInput() {
    let formula = getFormula();
    let parameters = getParamNames(formula);
    for(let i of parameters) {
        document.querySelector(`#${i}`).value = 0;
    }
}

function resetResult() {
    result.innerHTML = null;
    step.innerHTML = null;
}

function getParamNames(func) {
    var funStr = func.toString();
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
} */