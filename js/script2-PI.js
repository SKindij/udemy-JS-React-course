'use strict'
console.log('JS-FrontEnd-Udemy-PI');

const leftButton = document.querySelector('#leftButton');
const allButtons = document.querySelectorAll('button');

let info = false;
const elemInfo = (event) => {
    console.log(event.target);
    console.log(event.type);
    info = true;
    if (info) {
      leftButton.removeEventListener('click', elemInfo)
    };
};
leftButton.addEventListener('click', elemInfo);

const firstLink = document.querySelector('#firstLink');
firstLink.addEventListener('click', function(event) {
  event.preventDefault(); // override default browser behavior
  console.log(event.target);
});

const showInfo = (event) => {
  console.log('you ' + event.type + ' on ' + event.target);

};

allButtons.forEach(btn => {
  btn.addEventListener('click', showInfo, {once: true});
});

// navigating the DOM tree
console.log(document.documentElement);
console.log(document.body.childNodes);
console.log(document.querySelector('#current'));
console.log(document.querySelector('#current').parentNode);
console.log(document.querySelector('#current').parentNode.parentNode);

// data atributes and childs
console.log(document.querySelector('[data-current="3"]').previousSibling);
console.log(document.querySelector('[data-current="3"]'));
console.log(document.querySelector('[data-current="3"]').nextSibling);
console.log(document.querySelector('[data-current="3"]').nextElementSibling);

console.log('*****************************************')
for (let node of document.querySelector('main').childNodes) {
  if (node.nodeName == '#text') {
    continue;
  }
  console.log(node);
}
console.log('*****************************************')

// some words about recursion
function powA (x, n) {
  let result = 1; 
  for (let k = 1; k <= n; k++) {
    result *= x;
  }
  return result;
}
console.log(powA(2,1), powA(2,3), powA(2,5)); // => 2 8 32

function powB (x, n) {
  if (n === 1) {
    return x;
  } else {
    return x * powB (x, n - 1)
  }
}
console.log(powB(2,1), powB(2,3), powB(2,5)); // => 2 8 32

// calculating the overall progress of students
let students = {
  js: [{
    name: 'John',
    progress: 49
  }, {
    name: 'Abraham',
    progress: 43
  }],

  html: {
    basics: [{
      name: 'Deter',
      progress: 38
    }, {
      name: 'Samanta',
      progress: 32 
    }],
    pro: [{
      name: 'Hloe',
      progress: 27 
    }]
  }
};

function getTotalProgressByIteration (data) {
  let total = 0;
  let students = 0;
for (let course of Object.values(data)) {
  if (Array.isArray(course)) {
    students += course.length;
    for (let i = 0; i < course.length; i++) {
      total += course[i].progress;
    }
  } else {
      for (let subCourse of Object.values(course)) {
        students += subCourse.length;
        for (let i = 0; i < subCourse.length; i++) {
          total += subCourse[i].progress;
        }
      }
  }
}
  return total / students;
}
console.log(getTotalProgressByIteration(students));

function getTotalProgressByRecursion (data) { 
    if (Array.isArray(data)) {
      let total = 0;
      for (let i = 0; i < data.length; i++) {
        total += data[i].progress;
      }
      return [total, data.length];
    } else {
        let total = [0, 0];
        for (let subData of Object.values(data)) {
          const subDataArray = getTotalProgressByRecursion (subData);
          total[0] += subDataArray[0];
          total[1] += subDataArray[1];
        }
        return total;
    }
}
const recursionResult = getTotalProgressByRecursion (students);
console.log(recursionResult[0] / recursionResult[1]);

// function that calculates factorial: 5!=1*2*3*4*5=120
function factorial(n) {
  if (typeof(n) !== 'number' || !Number.isInteger(n)) {
      return "Error, check data";
  }
  if (n >= 1) {
      return n * factorial(n - 1);
  } else {
      return 1;
  }
}
console.log(factorial(5)); // => 120

function factorialize(num) {
  let result = num;
  if (num === 0 || num === 1) 
    return 1; 
  while (num > 1) { 
    num--;
    result *= num;
  }
  return result;
}
console.log(factorialize(5)); // => 120
console.log('*****************************************')
// null merge operator
let userName; // => undefined
console.log(userName ?? 'User'); // => User

// static collections
const boxoQuery = document.querySelectorAll('.boxo');
  // boxoQuery[0].remove();
// live collections
const boxoGet = document.getElementsByClassName('boxo');
  // boxoGet[0].remove();

console.log(boxoQuery); // => NodeList(3) [div.boxo, div.boxo, div.boxo]
console.log(boxoGet); // => HTMLCollection(3) [div.boxo, div.boxo, div.boxo]
  console.log(Array.from(boxoGet)); // => (3) [div.boxo, div.boxo, div.boxo]

const liveBoxo = document.getElementById('liveBoxo');
liveBoxo.style = 'display: flex';
for (let el = 0; el < 5; el++) {
  const divBoxo = document.createElement('div');
  divBoxo.classList.add('boxo');
  liveBoxo.append(divBoxo);
}
console.log(boxoQuery); // => NodeList(3) [div.boxo, div.boxo, div.boxo]
console.log(boxoGet); // => HTMLCollection(8) [div.boxo, div.boxo, div.boxo, ...]

// method to search for a specific selector
boxoQuery.forEach(box => {
  if (box.matches('.needed')) console.log(box);
}); // =>  <div class="boxo needed"></div>
// you can copy the selector in the console: #liveBoxo > div.boxo.needed
// find the closest ancestor by class
console.log(boxoQuery[0].closest('.liveBoxos'));

console.log('*****************************************')
// creation of private properties of the object
  const symbolObject = {
    nameSym: 'testSym'
  };
  let idSym = Symbol('idSym');
    symbolObject[idSym] = 1;
console.log(symbolObject); // => {nameSym: 'testSym', Symbol(idSym): 1}
console.log(symbolObject[idSym]); // => 1
  for (let value in symbolObject) console.log(value); // => nameSym

  console.log(Object.getOwnPropertySymbols(symbolObject)); // => [Symbol(idSym)]

// object descriptors
const descUser = {
  name: 'Corban',
  surname: 'Dallas',
  birthday: '08/03/1991',
  [Symbol('film')]: '6th element',
  showMyPublicData: function() {
    console.log(`${this.name} ${`this.surname`}`);
  }
}
// writable || enumerable || configurable
console.log(Object.getOwnPropertyDescriptor(descUser, 'name')); // => {value: 'Corban', writable: true, enumerable: true, configurable: true}
Object.defineProperty(descUser, 'birthday', {writable: false});
// descUser.birthday = '12/05/1993'; => error
Object.defineProperty(descUser, 'gender', {value: 'male'});
console.log(Object.getOwnPropertyDescriptor(descUser, 'gender')); // => {value: 'male', writable: false, enumerable: false, configurable: false}

Object.defineProperty(descUser, 'nick', {value: 'cop', enumerable: true, configurable: true});
console.log(Object.getOwnPropertyDescriptor(descUser, 'nick')); // => {value: 'cop', writable: false, enumerable: true, configurable: true}
console.log(descUser);

Object.defineProperty(descUser, 'showMyPublicData', {enumerable: false});
for (let key in descUser) console.log(key); // => name, surname, birthday, nick 

console.log(Object.getOwnPropertyDescriptor(Math, 'PI')); // => {value: 3.141592653589793, ...: false}

Object.defineProperties(descUser, {
  name: {writable: false},
  surname: {writable: false}
});

console.log(Object.keys(descUser)); //  =>  ['name', 'surname', 'birthday', 'nick']
console.log(Object.values(descUser)); // => ['Corban', 'Dallas', '08/03/1991', 'cop']
console.log(Object.entries(descUser)); // => [['name', 'Corban'], ..., ['nick', 'cop']]

// constructions for iterating the properties
const strangeWord = ['f', 'u', 't', 'u', 'r', 'e'];
for (const leter of strangeWord) console.log(leter);

const salaries = {
  johan: 830,
  betany: 780,
  mike: 760,
  stefany: 790,
  karl: 850,
  makeWork: function() {
    console.log('work done');
  }
};
// create an artificial method for a certain object
salaries[Symbol.iterator] = function() {
  return {
    current: this.johan,
    last: this.karl,
    next() {
      if (this.current < this.last) {
        this.current += 10;
        return {done: false, value: this.current}
      } else {
        return {done: true}
      }     
    }
  }
}
for (let res of salaries) {
  console.log(res);
}
console.log('*****************************************')

// Map is aray with arays
const shops = [
  {rise: 80},
  {oil: 130},
  {pasta: 48}
];
const someMap = new Map([
  [{paper: 63}, 6500]
]);
someMap.set(shops[0], 3000);
someMap.set(shops[1], 5000);
someMap.set(shops[2], 4000);
console.log(someMap); // => Map(4) {{…} => 6500, {…} => 3000, {…} => 5000, {…} => 4000}

console.log(someMap.get(shops[1])); // => 5000
console.log(someMap.has(shops[0])); // => true
console.log(someMap.keys()); // => MapIterator {{…}, {…}, {…}, {…}}
for (let shop of someMap.keys()) {
  console.log(shop);
} // => {paper: 63}, ...
for (let budjet of someMap.values()) {
  console.log(budjet);
} // => 6500, 3000, 5000, 4000
for (let shbu of someMap.entries()) {
  console.log(shbu);
} // => (2) [{…}, 6500], ...

console.log('our object is ', descUser);
const descUserMap = new Map (Object.entries(descUser));
console.log(descUserMap);
console.log('*****************************************')

// SET is aray like a unique collection
const dirtyAray = [1, 1, 4, 8, 8, 2, 3, 3, 6, 9, 9, 7];
const setAray = new Set(dirtyAray);
setAray.add(11);
console.log(setAray); // => Set(9) {1, 4, 8, 2, 3, …}
console.log(setAray.has(7)); // => true

const secondAray = [];
setAray.forEach((value) => {
  secondAray.push((value * 10))
});
console.log(secondAray); // => (9) [10, 40, 80, 20, 30, 60, 90, 70, 110]

function uniqueAray(aray) {
  return Array.from(new Set(aray));
}
console.log(uniqueAray(dirtyAray)); // => (8) [1, 4, 8, 2, 3, 6, 9, 7]
console.log('*****************************************')

// super big numbers
console.log(Number.MAX_SAFE_INTEGER); // => 9007199254740991 = 2**53-1
const bigNumberA = 17394594357954723n;
const bigNumberB = BigInt(17394594357954723);
console.log(bigNumberA == bigNumberB, bigNumberA === bigNumberB); // => false false










