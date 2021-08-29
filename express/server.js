const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

const app = express();

// 아래 app.use는 서비스에 맞게 순서를 조정해야 함!
// 각 한줄이 middleware로서 내부적으로 next를 실행하고 있을 것임.
app.use(cors());
app.use(morgan('dev'));

// 정적 파일 제공, 쿠키 파서 등 아래 middleware보다 선행되어야할 경우 이 위치. 만약 쿠키 파싱해서 로그인 유저에게만 주려면 미들웨어 순서가 바뀌어야 한다.
app.use('/static', (req, res, next)=>{
  // 로그인 한 유저에게만 static file 접근 권한
  // 미들웨어 확장법
  if(req.session.id){
    express.static(path.join(__dirname, 'public'))(req,res,next)
  } else {
    next();
  }
}); 
app.use(cookieParser('signSecreteStringJELLY'));
app.use(express.json()); // 예전처럼 body-parser 필요 없다!
app.use(express.urlencoded({ extended: true })); // form parsing, true면 qs, false면 querystring

// 세션 관리용 미들웨어
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'myJELLYserverSecret',
  cookie: {
    httpOnly: true,
  },
  nmae: 'connect.sid'
}))
app.use(multer().array());

app.use((req, res, next)=>{
  console.log("middleware for every router");
  next();
}, (req, res, next)=> {
  try {
    console.log("do something");
    next();
  } catch (error) {
    next(error); // 이 부분이 실행되면 next 에러로 처리되어 router 뛰어넘고 error 핸들러까지 넘어감
  }
})

app.get('/myeonghyeon', (req, res)=>{
  res.send({ 
    name: '이명현', 
    age: 18,
    characteristic: '고등학생'
  })
})

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, './public/myPage.html'))
})

app.get('/ping', (req, res, next)=>{
  if('skip middleware and go next router'){
    next('route')
  } else {
    next()
  }
}, (req, res)=>{
  res.send({ result: "from middleware" })
})

app.get('/ping', (req, res)=>{
  res.send({ result: "from next router" })
})


// err 미들웨어는 반드시 매개변수 4개를 다 넣어주어야 한다.
app.use((err, req, res, next)=>{
  console.log(err); // 서버에서만 보임
  res.send({ error: 'error' })
})

app.listen(3000, ()=>{
  console.log('express server listening')
})
