
 
    const firstNumberInput = document.getElementById('FN');
    const secondNumberInput = document.getElementById('SN');
    const resultInput = document.getElementById('result');

    
    function add() {
        let num1 = parseFloat(firstNumberInput.value);
        let num2 = parseFloat(secondNumberInput.value);
        resultInput.value = num1 + num2;
    }

    function subtract() {
        let num1 = parseFloat(firstNumberInput.value);
        let num2 = parseFloat(secondNumberInput.value);
        resultInput.value = num1 - num2;
    }

    function multiply() {
        let num1 = parseFloat(firstNumberInput.value);
        let num2 = parseFloat(secondNumberInput.value);
        resultInput.value = num1 * num2;
    }

    function divide() {
        let num1 = parseFloat(firstNumberInput.value);
        let num2 = parseFloat(secondNumberInput.value);
        if (num2 !== 0) {
            resultInput.value = num1 / num2;
        } else {
            resultInput.value = 'Error'; 
        }
    }

   
    document.getElementById('add').addEventListener('click', add);
    document.getElementById('subtract').addEventListener('click', subtract);
    document.getElementById('multiply').addEventListener('click', multiply);
    document.getElementById('divide').addEventListener('click', divide);

