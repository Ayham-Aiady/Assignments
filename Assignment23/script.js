let person={
    name:"ayham",
    age:23,
    print: function(){},
address:{
    street:"test",
    buldingnum:9
}
};

// console.log(person.__proto__);


// let student=Object.create(person);
// console.log(student);


let person2=Object.assign(person);
let person4={...person};
//chalo clon

let person3=JSON.parse(JSON.stringify(person));
//deep clone
person3.name="ahmed";
person3.address.street='test 3';
person2.address.street='test 2';
person2.name="omar";
console.log(person);
console.log(person2);
console.log(person3);
console.log(person4);

// json is javascript object notation