import { shapes, words } from './shapes.js';

const navCalc = document.querySelector(".nav-calc");
const navShapeOption = document.querySelector(".nav-shape-option");
const shapeImage = document.querySelector(".box-contents");
const descFormula = document.querySelector(".formula-desc");
const inputTable = document.querySelector(".form-formula");
const btnCalc = document.querySelector("#btn-calc");
const btnReset = document.querySelector("#btn-reset");
const result = document.querySelector(".result");

const step = document.querySelector(".step");

let shapeId = 0;
let shapeProp = getShapeProperties()[0];

createFormulaTypeButtons();
addShapeOptions();
updateDisplay();

btnCalc.addEventListener("click", showCalculation);

btnReset.addEventListener("click", () => {
    resetInputValues();
    resetResult();
});

function getShapeProperties() {
    return Object.keys(shapes[shapeId]["formula"]);
}

function getFormula() {
    return shapes[shapeId]["formula"][shapeProp]["function"];
}

function showCalculation() {
    try {
        const calculation = calculate();
        result.innerHTML = calculation.result;
        step.innerHTML = calculation.desc;
    } catch (e) {
        console.error(e);
        resetResult();
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
        desc: shapes[shapeId]["formula"][shapeProp]["output"](...args),
    };
}

function createFormulaTypeButtons() {
    navCalc.replaceChildren();

    const shapeProps = getShapeProperties();

    for(let i=0; i < shapeProps.length; i++) {
        let borderRadiusClass = null;
        if (i == 0) {
            borderRadiusClass = 'bottom-left-radius';
        } else if (i === shapeProps.length-1) {
            borderRadiusClass = 'bottom-right-radius';
        }
        createRadioBtn("shapePropsBtn", shapeProps[i], navCalc, borderRadiusClass);
    }

    if (document.querySelector('input[name="shapePropsBtn"]')) {
        document.querySelectorAll('input[name="shapePropsBtn"]').forEach((el) => {
          el.addEventListener("change", function(event) {
            shapeProp = event.target.value;
            updateDisplay(true);
          });
        });
    }
}

function createRadioBtn(name, value, container, borderRadiusClass = null) {
    let radiobox = document.createElement('input');
    radiobox.type = 'radio';
    radiobox.id = value;
    radiobox.value = value;
    radiobox.name = name;
    radiobox.checked = (value == shapeProp) ? true : false;

    let label = document.createElement('label')
    if (borderRadiusClass != null) {
        label.classList.add(borderRadiusClass);
    }
    label.htmlFor = value;

    let description = document.createTextNode(getText(value));
    label.appendChild(description);
    
    container.appendChild(radiobox);
    container.appendChild(label);
}

function addShapeOptions() {
    for(let i in shapes) {
        let key = shapes[i].shape;
        let opt = document.createElement("option");
        opt.textContent = getText(key);
        opt.value = i;
        navShapeOption.appendChild(opt);
    }
    navShapeOption.addEventListener("change", function(){
        shapeId = navShapeOption.value;
        shapeProp = getShapeProperties().includes(shapeProp) ? shapeProp : getShapeProperties()[0];
        createFormulaTypeButtons();
        updateDisplay();
    });
}

function updateDisplay(keepValues = false) {
    updateImage();
    updateFormulaDescription();
    updateInputForm(keepValues);
    resetResult();
}

function updateImage() {
    shapeImage.style.backgroundImage = `url("./image/${shapes[shapeId]['image']}")`;
    shapeImage.style.backgroundSize = "cover";
    shapeImage.style.backgroundRepeat = "no-repeat";
}

function updateFormulaDescription() {
    descFormula.innerHTML = shapes[shapeId]["formula"][shapeProp]["description"];
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
        oldValues = getValues();
    }

    inputTable.replaceChildren();

    for(let parameter of parameters) {
        let row = inputTable.insertRow();

        let labelCell = row.insertCell(0);
        labelCell.innerHTML = getText(parameter);

        let inputCell = row.insertCell(1);
        let oldValue = (keepValues && oldValues.hasOwnProperty(parameter)) ? oldValues[parameter] : 0;
        let inputHTML = `<input type="number" id=${parameter} value=${oldValue}>`;

        inputCell.innerHTML = inputHTML;
    }
}

function getValues() {
    let formula = getFormula();
    let parameters = getParamNames(formula);
    
    let oldValues = {};

    for(let i of parameters) {
        if (document.querySelector(`#${i}`)) {
            oldValues[i] = document.querySelector(`#${i}`).value;
        }
    }

    return oldValues;
}

function resetInputValues() {
    let formula = getFormula();
    let parameters = getParamNames(formula);
    for(let i of parameters) {
        document.querySelector(`#${i}`).value = 0;
    }
}

function resetResult() {
    result.innerHTML = "";
    step.innerHTML = "";
}

function getParamNames(func) {
    let funStr = func.toString();
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}
