let firstNumber
let secondNumber
let step = 0
let operation
let result = 0

let numArray = []
let secondNumberArr = []

let display = document.getElementById('display')

function getNumber(num) {
	if (step === 0 || step === 1) {
		numArray.push(num)
		step = 1
		firstNumber = Number(numArray.join(''))
		display.value = firstNumber
	} else if (step === 2) {
		secondNumberArr.push(num)
		secondNumber = Number(secondNumberArr.join(''))
		display.value = secondNumber
	}
}

function getOperator(operator) {
	step = 2
	operation = operator
}

function calculateResult() {
	console.log('first number', firstNumber, 'second number', secondNumber)
	if (operation === '+') {
		result = firstNumber + secondNumber
		display.value = result
	} else if (operation === '-') {
		result = firstNumber - secondNumber
		display.value = result
	} else if (operation === '*') {
		result = firstNumber * secondNumber
		display.value = result
	} else if (operation === '/') {
		result = firstNumber / secondNumber
		display.value = result
	} else if (operation === '%') {
		result = firstNumber % secondNumber
		display.value = result
	}
}

function clearDisplay() {
	display.value = 0
	firstNumber = null
	secondNumber = null
	step = 0
	operation = null
	result = 0
	numArray = []
	secondNumberArr = []
}


function deleteLast() {
	if (step === 1) {
		numArray.pop()
		firstNumber = Number(numArray.join('')) || 0
		display.value = firstNumber
	} else if (step === 2) {
		secondNumberArr.pop()
		secondNumber = Number(secondNumberArr.join('')) || 0
		display.value = secondNumber
	}
}


// function deleteLast() {
//    display.value=firstNumber.slice(0, -1)
//    display.value=secondNumber.slice(0, -1)
    
// }











// let firstNumber = '';      
// let secNumber = '';     
// let operation = null; 
//     const display = document.getElementById('display');
// let display2=display.textContent.split("");

// let numbers=display2.filter(x=>!isNaN(x)).map(number);

// firstNumber=Number(display2[0]);
// secNumber =Number(display2.at(-1));

// display2.forEach((x)=>{

//     switch(x){
//         case('+'):{
// operation='+';
// break;
//         }
//         case('-'):{
//             operation='-';
//             break;
//         }
//         case('*'):{
//             operation='*';
//             break;
//         }
//         case('/'):{
//             operation='/';
//             break;
//         }
//         case('%'):{
//             operation='%';
//             break;
//         }
//     }
//     // if(x=== '+' || x=== '-' || x=== '*' || x=== '/' || x=== '%'){
//     //     operation=x;
//     // }
// })

// function calc(){
// switch(operation){
//     case("+"):{
// display.textContent=parseFloat(firstNumber)+parseFloat(secNumber);
// break;
//     }
  
//     case("-"):{
//         display.textContent=firstNumber-secNumber;
//         break;
//     }
//     case("*"):{
//         display.textContent=firstNumber*secNumber;
//         break;
//     }
//     case("/"):{
//         display.textContent=firstNumber/secNumber; 
//         break;
//     }
//     case("%"):{
//         display.textContent=firstNumber%secNumber;
//         break;
//     }
// }

// }

    // function add() {
    //     let num1 = parseFloat(firstNumberInput.value);
    //     let num2 = parseFloat(secondNumberInput.value);
    //     resultInput.value = num1 + num2;
    // }

    // function subtract() {
    //     let num1 = parseFloat(firstNumberInput.value);
    //     let num2 = parseFloat(secondNumberInput.value);
    //     resultInput.value = num1 - num2;
    // }

    // function multiply() {
    //     let num1 = parseFloat(firstNumberInput.value);
    //     let num2 = parseFloat(secondNumberInput.value);
    //     resultInput.value = num1 * num2;
    // }

    // function divide() {
    //     let num1 = parseFloat(firstNumberInput.value);
    //     let num2 = parseFloat(secondNumberInput.value);
    //     if (num2 !== 0) {
    //         resultInput.value = num1 / num2;
    //     } else {
    //         resultInput.value = 'Error'; 
    //     }
    // }




    