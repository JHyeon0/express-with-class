const fs = require('fs').promises;

fs.readFile('node-api/test.md')
  .then(data => {
    console.log(data);
    console.log(data.toString());
  })
  .catch(err => {
    throw err;
  })

fs.writeFile('node-api/writeTest.md', '# 글 제목')
  .then(() => {
    return fs.readFile('node-api/writeTest.md');
  })
  .then(data=>{
    console.log(data.toString());
  })
  .catch(err => {
    throw err;  
  })