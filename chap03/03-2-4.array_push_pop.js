/*******************************
TITLE: 배열 끝에 요소 추가 및 삭제 - push(), pop()
AUTHOR: Assu
DATE: 2017.05.02
*******************************/
var Users = [{name:'소녀시대',age:20},{name:'걸스데이',age:22}];

console.log('1. push() 호출 전 배열 요소의 수: ', Users.length);

Users.push({name:'티아라',age:23});

console.log('2. push() 호출 후 배열 요소의 수: ', Users.length);
console.log('3. push() 호출 후 배열값: ', Users);

Users.pop();

console.log('4. pop() 호출 후 배열 요소의 수 : ', Users.length);
console.log('5. pop() 호출 후 배열값: ', Users);