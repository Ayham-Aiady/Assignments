
// for(let i=0;i<=3;i++){
//     for(let j=1;j<=3;j++){
//         console.log(`(${i},${j})`);
//     }
// }


// let array1=[
//     2,
//     3,
//     {
//         name:"ayham",
//     age:30
//     },
//     ["test",{phone:"0788128334",salary:1750},23]
// ];
// console.log(array1);
// console.log(array1[3][0].slice(-1));
// console.log(array1[3][1].salary);
// console.log(array1[3][2]*5);


// function returnObj(){
    
//     let i=0;
//     while(i<Array1.length){
//         if(array1[i].name==="ayham"){
//             return array1[i];
//         }
//         i++;
//     }
// }
// console.log(returnObj());





// let arr=[1,2,3];
// let arr1=[4,5,6];
// let result =arr.concat(arr1);
// console.log(result);
//  console.log(result.join('-'));

//  result= result.slice(1,4)
//  console.log(result);



// let arr3=[1,2,3,4];
// arr3.splice(1,2,100,88,33);
// console.log(arr3);




let arr4=[1,2,3,'a'];
// console.log(arr4.indexOf('a'));
// console.log(arr4.includes(2));
// arr4.reverse();
// console.log(arr4);

// arr4.sort((a,b)=>a-b);
// console.log(arr4);

// let double =arr4.map((x)=>x*2);
// console.log(double);

// let filter=arr4.filter((x)=>x>1);
// console.log(filter);

// let red=arr4.reduce((pre,curr)=>pre+curr);
// console.log(red);

// let index=0;
// arr4.forEach((x,y)=>{
//     console.log(x);
//     if(2===x){
//         index=y;
//     }
    
// });
// console.log(index);

// let found=arr4.find((x)=>x>1);
// console.log(found);

// let found1=arr4.findIndex((x)=>x>1);
// console.log(found1);

// console.log(arr4.every((x)=>x%2===0));
// console.log(arr4.some((x)=>x%2===0));


// let arr5=[1,[2,3],[4,[5]]];
// console.log(arr5.flat(2));













// let arr = [1,5,9,6,3,87,72,23];
// let m=0;
// function max(a){
// for(i=0;i<arr.length;i++){
//     if(m<arr[i]){
//         m=arr[i];
//     }
// }
// return m;
// }
// console.log(max(arr));



// let arr = [1,5,9,6,3,87,72,23];
// function rev(a){
//     let arr2=[];
//     for(let i=arr.length-1;i>=0;i--){
        
//             arr2.push(arr[i]);
        

//     }
//     return arr2;
// }
// console.log(rev(arr));



// let arr = [1,5,9,6,3,87,72,23];
// function tot(array,target){
//     array.sort((a,b)=>a-b);

//     let left=0;
//     let right=array.length-1;

//     while(left<right){
//         let sum=array[left]+array[right];
//         if(sum===target){
//             return [array[left],array[right]];
//         }
//         else if(sum<target){
//             left++;
//         }
//         else if(sum>target){
//             right--;
//         }

//     }

// console.log("thier are no two numbers matches the target.")
// }
// console.log(tot(arr,20));



function vowel(x){
    let vow=0;
    if(x.includes('a')){
        vow++;
    } if(x.includes('u')){
        vow++;
    }  if(x.includes('e')){
        vow++;
    }  if(x.includes('o')){
        vow++;
    }  if(x.includes('i')){
        vow++;
    } 
return vow;
}
let v="auieor";
console.log(vowel(v));


let ar=[2,5,6,9,8];

function EorO(x){

    for(let i=0;i<x.length;i++){
        if(x[i]%2===0){
            console.log("even");
        }else{
            console.log("odd");
        }
    }
}

console.log(EorO(ar));





function FLW(x) {
    let words = x.split(" ");
    let longestWord = "";
  
    for (let word of words) {
      if (word.length > longestWord.length) {
        longestWord = word;
      }
    }
  
    return longestWord;
  }
  
  
  console.log(FLW("I love JavaScript programming")); 
  






  function wierd(){
    let fizz=0;
let buzz=0;
let fizzbuzz=0;
for(let i=0;i<50;i++){
fizz=i;
buzz=i;
fizzbuzz=i;
if(fizzbuzz%5===0 && fizzbuzz%3===0){
    console.log("fizzbuzz");
} else if(fizz%3===0){
console.log("fizz");
    }else if(buzz%5===0){
        console.log("buzz");

}
  }
}
  wierd();



// let arr6=[-1,-33,-4,-22,22,66];
//   function secm(x){
// let m=-Infinity;
// let m2=-Infinity;
// for(let i=0;i<arr6.length;i++)

// if(m<x[i]){
//     m=x[i];
// }

// for(let i=0;i<arr6.length;i++){

//     if((m2<m && m2<=x[i])  ){
//         m2=x[i];
//     }else{
//         return m2;
//     }
// }
    

//   }
//   console.log(secm(arr6));

function findSecondLargest(arr) {
    if (arr.length < 2) {
      return "Array must have at least two numbers";
    }
  
    let largest = -Infinity;
    let secondLargest = -Infinity;
  
    for (let num of arr) {
      if (num > largest) {
        secondLargest = largest;
        largest = num;
      } else if (num > secondLargest && num !== largest) {
        secondLargest = num;
      }
    }
  
    return secondLargest === -Infinity ? "No second largest number" : secondLargest;
  }
  
  
  console.log(findSecondLargest([10, 5, 20, 8, 12])); 



  function flattenArray(arr) {
    let result = [];
  
    for (let item of arr) {
      if (Array.isArray(item)) {
        result.push(...flattenArray(item)); // Recursively flatten nested arrays
      } else {
        result.push(item); // Add non-array elements directly
      }
    }
  
    return result;
  }
  
  
  console.log(flattenArray([1, [2, [3, 4], 5], 6])); 