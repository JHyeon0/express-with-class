const { spawn } = require('child_process');
const process = spawn('python', ['node-api/test.py']);

process.stdout.on('data', (data) => {
  console.log(`stdout\n${data}`);
});

process.stderr.on('data', (data) => {
  console.error(`stderr\n${data}`);
});

process.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});