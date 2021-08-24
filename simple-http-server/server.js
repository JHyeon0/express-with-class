const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req,res) => {
  try {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    const pageData = await fs.readFile('./simple-http-server/server.html'); // 경로는 서버 실행하는 경로에 의해 결정
    res.end(pageData);
  } catch (error) {
    console.log(error);
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
    res.end(error.message);
  }
})
  .listen(8080)

server.on('listening', () => {
  console.log('PORT 8080, server started')
})