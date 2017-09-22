/*******************************
TITLE: 모듈화하기

        이전 장(데이터베이스 사용하기)에서 만들었던 웹서버 중 상당부분 모듈화
        (06-5-2.mongoose.crypto.js)
        
        설정파일 이용
        
        웹브라우저에서 아래 주소의 페이지를 열고 웹페이지에서 요청
            http://localhost:3000/public/07-2-1.login.html
            http://localhost:3000/public/07-2-1.adduser.html
        
AUTHOR: Assu
DATE: 2017.09.02
*******************************/

// Express 기본 모듈 호출
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 호출
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 호출
var expressSession = require('express-session');

// 모듈로 분리한 설정 파일 호출
var config = require('./07-2-2.config');

// 모듈로 분리한 데이터베이스 파일 호출
var database = require('./database/07-2-2.database');

// 모듈로 분리한 라우팅 파일 호출
var route_loader = require('./route/07-2-2.route_loader');



// 익스프레스 객체 생성
var app = express();


//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));
 
// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));


// 라우팅 정보를 읽어들여 라우팅 설정
route_loader.init(app, express.Router());


// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
 static: {
   '404': './chap06/public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

//===== 서버 시작 =====//

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database.db) {
		database.db.close();
	}
});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

  // 데이터베이스 연결을 위한 함수 호출
  database.init(app, config);
   
});