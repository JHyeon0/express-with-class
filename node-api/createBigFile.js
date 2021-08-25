const fs = require('fs');
const file = fs.createWriteStream('./bigText.txt');

for(let i=0; i<=1_000_000; i++){
  file.write('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam')
}
file.end();
