import { planes, words } from './planes.js';

const navCalc = document.querySelector(".nav-calc");
const navPlane = document.querySelector("#nav-plane");
const navPlaneOption = document.querySelector("#nav-plane-option");
const planeImage = document.querySelector(".box-contents");
// const planeImage = document.querySelector("#image-plane");
const descFormula = document.querySelector("#desc-formula");
const inputTable = document.querySelector("#input-formula");
const btnCalc = document.querySelector("#btn-calc");
const btnReset = document.querySelector("#btn-reset");
const result = document.querySelector("#result");

const step = document.querySelector("#step");

let planeType = 0;
// let planeType = Object.keys(planes)[0];
//let formulaType = Object.keys(planes[Object.keys(planes)[0]]['formula'])[0];
let formulaType = Object.keys(planes[0]['formula'])[0];

btnCalc.addEventListener("click", showCalculation);

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

function showCalculation() {
    try {
        const calculation = calculate();
        console.log(calculation);
        result.innerHTML = calculation.result;
        step.innerHTML = calculation["desc"];
    } catch (e) {
        console.error(e);
        resetResultValues();
        result.innerHTML = "Error!"
    }
}

function calculate() {
    let formula = getFormula();
    let parameters = getParamNames(formula);

    let args = [];
    for (let i of parameters) {
        let arg = document.querySelector(`#${i}`).valueAsNumber
        
        if(isNaN(arg)) {
            throw new Error("Parameter is not a number!");
        }
        args.push(arg);
    }
    
    return {
        result: formula(...args),
        "desc": planes[planeType]["formula"][formulaType]["output"](...args),
    };
}

function createFormulaTypeButtons() {
    // navCalc.replaceChildren();
    // for(let key in planes[planeType]["formula"]) {
    //     let btn = document.createElement("button");
    //     // btn.classList.add("btn-action", "capitalize");
    //     btn.classList.add("btn-action");
    //     btn.textContent = getText(key);
    //     btn.addEventListener("click", function(){
    //         formulaType = key;
    //         updateDisplay();
    //     });
    //     navCalc.appendChild(btn);
    // }
    navCalc.replaceChildren();

    for(let key in planes[planeType]["formula"]) {
        createRadioBtn('formulaType', key, navCalc);
    }

    if (document.querySelector('input[name="formulaType"]')) {
        document.querySelectorAll('input[name="formulaType"]').forEach((el) => {
          el.addEventListener("change", function(event) {
            formulaType = event.target.value;
            updateDisplay(true);
          });
        });
    }
    //read this: https://stackoverflow.com/questions/118693/how-do-you-dynamically-create-a-radio-button-in-javascript-that-works-in-all-bro
}

function createRadioBtn(name, value, container) {
    let radiobox = document.createElement('input');
    radiobox.type = 'radio';
    radiobox.id = value;
    radiobox.value = value;
    radiobox.name = name;
    radiobox.checked = (value == formulaType) ? true : false;
    let label = document.createElement('label')
    label.htmlFor = value;
 
    let description = document.createTextNode(getText(value));
    label.appendChild(description);
    container.appendChild(radiobox);
    container.appendChild(label);
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

function updateDisplay(keepValues = false) {
    updateDescriptions();
    updateInputForm(keepValues);
    resetResultValues();
}

function updateDescriptions() {
    planeImage.style.backgroundImage = `url("./image/${planes[planeType]['image']}")`;
    planeImage.style.backgroundSize = "cover";
    planeImage.style.backgroundRepeat = "no-repeat";
    descFormula.innerHTML = planes[planeType]["formula"][formulaType]["description"];
}

function getText(name) {
    if (name in words) {
        name = words[name];
    }
    return name[0].toUpperCase() + name.substring(1);
}

function updateInputForm(keepValues = false) {
    let formula = getFormula();
    let parameters = getParamNames(formula);

    let oldValues = {};
    
    if (keepValues) {
        oldValues = getOldValues();
    }

    inputTable.replaceChildren();

    for(let parameter of parameters) {
        let row = inputTable.insertRow();

        let labelCell = row.insertCell(0);
        labelCell.innerHTML = getText(parameter);

        let inputCell = row.insertCell(1);
        let oldValue = (keepValues && oldValues.hasOwnProperty(parameter)) ? oldValues[parameter] : '';
        let inputHTML = `<input type="number" id=${parameter} value=${oldValue}>`;

        inputCell.innerHTML = inputHTML;
    }
}

function getOldValues() {
    let formula = getFormula();
    let parameters = getParamNames(formula);
    // console.log("A",parameters);
    //console.log(funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g));
    let oldValues = {};

    for(let i of parameters) {
        if (document.querySelector(`#${i}`)) {
            oldValues[i] = document.querySelector(`#${i}`).value;
        }
    }
    console.log("UPD", oldValues);
    return oldValues;
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
    let funStr = func.toString();
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}
