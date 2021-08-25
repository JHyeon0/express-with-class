const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./bigText.txt');
const writeStream = fs.createWriteStream('./bigText-stream.txt');
readStream.pipe(writeStream);

readStream.on('end', () => {
  console.log('stream: ', process.memoryUsage().rss);
})

