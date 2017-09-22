/*******************************
TITLE: 모듈에 대해 알아보기

        exports 객체의 속성으로 함수와 객체 추가하는 것이 아니라
        exports에 객체를 직접 할당해보기
        메인 파일에서 불러오기하면 할당되지 않는 문제 발샏함
        
        exports에는 속성만 추가할 수 있고, 객체는 할당할 수 없음
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

// exports에는 속성만 추가할 수 있고 객체는 할당할 수 없음.
// exports는 속성으로서, exports에 속성을 추가하면 모듈에서 접근가능하지만,
// exports에 객체를 할당하면 자바스크립트에서 새로운 변수로 처리하기 때문에
// 전역변수가 아니라 지역변수가 되어 모듈에서 접근 불가함

exports = {
    getUser: function() {
        return {id:'test01', name:'소녀시대'};
    },
    group: {id:'group01', name:'친구'}
};