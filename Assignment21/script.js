// let arr=[1,2,3,4,5];
// let mulBy3=arr.map(x =>x*3);
// console.log(mulBy3);

// let arr=[1,2,2,3,3,4,5,5,5];
// let filter=arr.filter((val,ind,ar)=>ar.indexOf(val)===ind);
// console.log(filter);



let arr=[
    {name:"ayham",age:25},
    {name:"ahmed",age:32},
    {name:"tareq",age:30}
];

let arr2=arr.sort((arr,b)=>arr.age-b.age);
console.log(arr2);