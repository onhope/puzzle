# puzzle
<img src="./image.gif" width="350px">

## 기능 
퍼즐 맞추기   

(1) start 버튼을 클릭하면, 사진이 16조각으로 나눠서 랜덤으로 섞임     
(2) hint 버튼을 클릭하면, 사진의 숫자가 표시   
(3) 퍼즐 완성시 timer는 멈춤 

## 학습
### 1. JS : shuffle(array)
배열의 요소를 무작위로 섞어주는 함수    
```
let arr = [1, 2, 3];

shuffle(arr);  // arr = [3, 2, 1]

shuffle(arr);  // arr = [2, 1, 3]

shuffle(arr);  // arr = [3, 1, 2]
// ...
```

### 2. JS : 전개연산자 Spread Operator   
: 배열의 요소나 객체를 <ins>나열</ins> 해주는 연산자   
예) 배열에서 전개 연산자 사용   
```
let numArr = [1, 2, 3, 4, 5, 6];
let copyNumArr = [...numArr]; 

console.log(numArr, copyNumArr); // [ 1, 2, 3, 4, 5, 6 ] [ 1, 2, 3, 4, 5, 6 ]
console.log(numArr === copyNumArr); // false
// 출력했을때의 값은 같으나 둘은 다른 주소값을 가지고 있는 엄연한 다른 변수
```

: 배열이나 객체의 <ins>복사본(원본에 영향을 미치지 않는)</ins>을 만들 수 있으며, 여러개의 배열이나 객체를 손쉽게 <ins>병합</ins>할 수도 있다.    
```
let leftArr = [1, 2, 3, 4, 5];

let rightArr = [6, 7, 8, 9, 10]; 

let mergeArr = [...leftArr, ...rightArr]; 

console.log(mergeArr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

```
// push 메소드 사용
let leftArr = [1, 2, 3, 4, 5];

let rightArr = [6, 7, 8, 9, 10]; 

leftArr.push(...rightArr); 

console.log(leftArr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

```
// 배열의 중간에 값 병합하기

let leftArr = [1, 2, 3, 4, 5];

let rightArr = [6, 7, ...leftArr, 8, 9, 10]; // 중간에 전개 연산자를 이용한 배열 삽입 

console.log(rightArr); // [6, 7, 1, 2, 3, 4, 5, 8, 9, 10] 

```

: 수의 매개변수나 인자 값으로도 사용이 가능한 연산자   

```
// 함수의 인자값으로 전개 연산자 사용

let sum = function(a, b, c){	
  return a+b+c;
} 
let arr = [1,10,100]; 

console.log(sum(arr[0], arr[1], arr[2])); // 전개 연산자 미사용시 111
console.log(sum(...arr)); // 전개 연산자 사용시 111
```

```
// 함수의 매개변수로 전개 연산자 사용 
let sum = function(...arr){	
  let result = 0;	
  for(i of [...arr]){		
    result += i;	
  }	
  return result;
} 

console.log(sum(1, 100, 1000, 100000));  // 101101
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));  //55 
```

```
// 매개변수 중, 고정으로 들어가는 인자 값 이외에 인자 값이 가변일 경우

let sum = function(a, ...arr){	
  let result = 0;	
  for(i of [...arr]){		
    console.log(i);  // 100, 1000, 100000		
    result += i;	
    console.log(result); // 101100
  }	
  return a * result; // 5 * i 
} 
  
console.log(sum(5, 100, 1000, 100000));  // 505500

```

예) 객체에서 전개 연산자 사용   
```
// 객체 복사

let Person = {	
  name : "ludeno",	
  from : "Korea",	
  language : "Javascript"
}; 

let anotherPerson = {...Person}; 

console.log(Person); // { name: 'ludeno', from: 'Korea', language: 'Javascript' }
console.log(anotherPerson);  // { name: 'ludeno', from: 'Korea', language: 'Javascript' }
console.log(Person === anotherPerson); // false
// 출력했을때의 값은 같으나 둘은 다른 주소값을 가지고 있는 엄연한 다른 객체

```
```
// 객체 복사
let Person = {	
  name : "ludeno",	
  from : "Korea",	
  language : "Javascript"
};

let clone = {	
  ...Person,	
  butHeIs : "Clone"
};

console.log(Person) // { name: 'ludeno', from: 'Korea', language: 'Javascript' }
console.log(clone);  // { name: 'ludeno', from: 'Korea', language: 'Javascript', butHeIs: 'Clone' }  
```
```
// 객체 병합
let Person = {
  name : "ludeno",
  language : "Javascript"
};

let Korean = {
  from : "Korea",
  UsedIDE : "Vscode"
} 

let mergeObj = {...Person, ...Korean}; 

console.log(mergeObj);

//{
  name: 'ludeno',  
  language: 'Javascript',  
  from: 'Korea',  
  UsedIDE: 'Vscode'
  }
```

: 사용법은 객체나 배열을 담은 변수 앞에 '...'을 붙이면 된다.    

### 3. js : indexOf()
: 사용법 
> array.indexOf(item, start)   
> : item은 검색할 값, 필수   
> : start는 검색을 시작할 위치, 선택요소, 기본값은 0이며 음수인 경우 배열 끝에서 부터 검색 

: 지정된 값의 첫 번째 인덱스(위치)를 반환    
: 값을 찾을 수 없으면 이 메서드는 -1을 반환   
: 지정된 인덱스에서 시작하여 왼쪽에서 오른쪽으로 검색    
: 기본적으로 검색은 첫 번째 요소에서 시작하여 마지막 요소에서 끝납니다.    
: 음수 시작 값은 마지막 요소부터 계산
```
const fruits = ["Banana", "Orange", "Apple", "Mango"];
let index = fruits.indexOf("Apple");

console.log(index)  // 2
```
```
const fruits = ["Banana", "Orange", "Apple", "Mango", "Apple"];
let index = fruits.indexOf("Apple", 3);

console.log(index) // 4
```

### 4. nextSibling 속성과 previousSibling 속성
**nextSibling 속성**     
: 동일한 트리 수준의 다음 노드를 반환   
: nextSibling노드 객체를 반환   
: 읽기 전용     

```
<ul>  
  <li id="item1">Coffee (first item)</li>
  <li id="item2">Tea (second item)</li>
</ul>

<p>The HTML content of the next sibling of the first list item is:</p>
<p id="demo"></p> 

// 
The HTML content of the next sibling of the first list item is:
Tea (second item)
```

```
let text = document.getElementById("item1").nextSibling.innerHTML; // Tea (second item)
document.getElementById("demo").innerHTML = text; // Tea (second item)
```

<br>

**PreviousSibling**   
: 동일한 트리 수준의 이전 노드를 반환    
: 노드 개체를 반환   
: 읽기 전용   
```
<p>The HTML content of the previous sibling of the second list item is:</p>
<p id="demo"></p>

// 
The HTML content of the previous sibling of the second list item is:
Coffee (first item)
```

```
let text = document.getElementById("item2").previousSibling.innerHTML; // Coffee (first item)
document.getElementById("demo").innerHTML = text;  // Coffee (first item)
```



## 학습 출처  
**<클래스 101>**     
바닐라 자바스크립트로 배우는 모던 프론트엔드 실전!

**이미지 가져오기**     
https://picsum.photos/     

**JS**   
https://ko.javascript.info/task/shuffle    
https://ludeno-studying.tistory.com/70    
https://www.w3schools.com/jsref/jsref_indexof_array.asp    


**키워드**   
shuffle    
전개연산자[...] ,{...}   
indexOf()
