let st='ggggg gggggg  gggggg   ggggg  ggg gggggggggggggggggggggggggggggggggggggggggggggggggg ggggggg'
function checkLength(str) {
    if( str.length>=280) 
    return "exceed 280"
    else return "not exceed 280"
}
    console.log(checkLength(st));

    function checkupper(str){
    return str.charAt(0).toUpperCase();
    }
    console.log(checkupper(st));

    function toupper (str){
    return str.toUpperCase();
    }
    console.log(toupper(st));
    function toLower(str){
    return str.toLowerCase();
    }
    console.log(toLower(st));

    function totrim(str){
    return str.trim();
    }

function processText() {
    let text = document.getElementById("userInput").value;
    let results = "";
    
    results += `Length: ${text.length}\n`;
    results += `First char (capitalized if applicable): ${text.charAt(0).toUpperCase()}\n`;
    results += `Uppercase: ${text.toUpperCase()}\n`;
    results += `Lowercase: ${text.toLowerCase()}\n`;
    results += `Trimmed: '${text.trim()}'\n`;
    results += `Short preview: '${text.slice(0, 10)}...'\n`;
    results += `Masked phone (last 4 digits visible): ${'****-****-' + text.slice(-4)}\n`;
    results += `Replace bad words (e.g., 'bad' -> '***'): ${text.replace(/bad/gi, '***')}\n`;
    results += `Words array: ${JSON.stringify(text.split(" "))}\n`;
    results += `Contains 'restricted'? ${text.includes("restricted")}\n`;
    results += `Starts with 'Hello'? ${text.startsWith("Hello")}\n`;
    results += `Ends with 'world'? ${text.endsWith("world")}\n`;
    results += `Repeated text (x2): ${text.repeat(2)}\n`;
    results += `Concatenation with ' Example': ${text.concat(" Example")}\n`;
    results += `First occurrence of 'a': ${text.indexOf("a")}\n`;
    results += `Last occurrence of 'a': ${text.lastIndexOf("a")}\n`;
    
    document.getElementById("output").innerText = results;
}

let num =5;
function factorial(int){
    let result=1;
    for(let x=int;x>0;x--){

result *=x;
    }
    return result;
}
console.log(factorial(num));