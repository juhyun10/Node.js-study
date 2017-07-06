/*******************************
TITLE: POST 방식으로 전달된 파라미터 확인하기
    (1) 웹 브라우저에서 http://localhost:3001/05-3-1.login.html 페이지 열고 요청
    (2) 크롬 브라우저의 Postman 앱이나 기타 POST 요청 도구를 사용하여 POST 방식으로 요청
        GET 방식으로 요청 시에는 웹브라우저에서 아래 URL로 요청해야 함
            http://localhost:3000?id=test1&password=123456
AUTHOR: Assu
DATE: 2017.06.20
*******************************/

// Express 기본 모듈 호출
var express = require('express')
  , http = require('http')
  , path = require('path');


// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , static = require('serve-static');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3001);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
// body-parser : POST 요청데이터 추출하는 미들웨어
// 이게 없으면 req.body.id 는 undefined(오류) => POST 방식 오류
app.use(bodyParser.urlencoded({extended: false}));


// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

// 이게 없으면 http://localhost:3001/05-3-1.login.html 이렇게 호출 못함.
app.use(static(path.join(__dirname, 'public')));

console.log('__dirname', __dirname);                            // D:\06_STUDY\03_Git\05_Nodejs_study\chap05\expressCode
console.log('path.join()', path.join(__dirname, 'public'));     // D:\06_STUDY\03_Git\05_Nodejs_study\chap05\expressCode\public


// 미들웨어에서 파라미터 확인
app.use(function(req, res, next) {
	console.log('첫번째 미들웨어에서 요청을 처리함.');

	var paramId = req.body.id || req.query.id;
	var paramPassword = req.body.password || req.query.password;
	
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
	res.end();
});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express Server 시작.',app.get('port') + '__' + __dirname);
});