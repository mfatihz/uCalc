import { planes, words } from './planes.js';

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

let planeType = 0;
// let planeType = Object.keys(planes)[0];
let formulaType = Object.keys(planes[Object.keys(planes)[0]]['formula'])[0];

btnCalc.addEventListener("click", calculation);

btnReset.addEventListener("click", () => {
    resetInputValues();
    resetResultValues();
});

createFormulaTypeButtons();
addPlaneTypeOptions();
updateDisplay();

function getFormulas() {
    return Object.keys(planes[planeType]["formula"]);
}

function getFormula() {
    return planes[planeType]["formula"][formulaType]["function"];
}

function calculation() {
    let formula = getFormula();
    let parameters = getParamNames(formula);

    let args = [];
    for (let i of parameters) {
        args.push(document.querySelector(`#${i}`).valueAsNumber);
    }

    result.innerHTML = formula(...args);
    step.innerHTML = planes[planeType]["formula"][formulaType]["output"](...args);
}

function createFormulaTypeButtons() {
    navCalc.replaceChildren();
    for(let key in planes[planeType]["formula"]) {
        let btn = document.createElement("button");
        // btn.classList.add("btn-action", "capitalize");
        btn.classList.add("btn-action");
        btn.textContent = getText(key);
        btn.addEventListener("click", function(){
            formulaType = key;
            updateDisplay();
        });
        navCalc.appendChild(btn);
    }
}
function addPlaneTypeOptions() {
    for(let i in planes) {
        let key = planes[i].plane;
        let opt = document.createElement("option");
        opt.textContent = getText(key);
        opt.value = i;
        navPlaneOption.appendChild(opt);
    }
    navPlaneOption.addEventListener("change", function(){
        planeType = navPlaneOption.value;
        formulaType = getFormulas().includes(formulaType) ? formulaType : getFormulas()[0];
        createFormulaTypeButtons();
        updateDisplay();
    });
}

function updateDisplay() {
    updatePicture();
    updateInputForm();
    resetResultValues();
}

function updatePicture() {
    planeImage.src = planes[planeType]["image"];
    planeImage.alt = `image-${planeType}`;
    descFormula.innerHTML = planes[planeType]["formula"][formulaType]["description"];
}

function getText(name) {
    if (name in words) {
        name = words[name];
    }
    return name[0].toUpperCase() + name.substring(1);
}

function updateInputForm() {
    let formula = getFormula();
    let parameters = getParamNames(formula);

    inputTable.replaceChildren();

    for(let parameter of parameters) {
        var row = inputTable.insertRow();

        var label = row.insertCell(0);
        // label.classList.add("capitalize");
        label.innerHTML = getText(parameter);

        var input = row.insertCell(1);
        input.innerHTML = `<input type="number" id=${parameter} value="2">`;
    }
}

function resetInputValues() {
    let formula = getFormula();
    let parameters = getParamNames(formula);
    for(let i of parameters) {
        document.querySelector(`#${i}`).value = 0;
    }
}

function resetResultValues() {
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
    resetInputValue();
    resetResult();
});

createFormulaTypeButtons();
addPlaneTypeOptions();
createInput();

function getFormula() {
    return getFormula();
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
        btn.textContent = getText(key);
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
        opt.textContent = getText(key);
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
    
    for(let parameter of parameters) {
        var row = inputTable.insertRow();
        var label = row.insertCell(0);
        var input = row.insertCell(1);
        label.innerHTML = getText(parameter);
        input.innerHTML = `<input type="number" id=${parameter} value="2">`;
    }
    resetResult();
}

function getText(name) {
    if (name in inputLabels) {return inputLabels[name];}
    return name;
}

function resetInputValue() {
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