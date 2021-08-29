const name = document.getElementsByClassName("name")[0];
const age = document.getElementsByClassName("age")[0];
const characteristic = document.getElementsByClassName("characteristic")[0];

fetch('http://192.168.0.10:3000/myeonghyeon')
  .then(res => res.json())
  .then(res => {
    const personData = res;
    name.innerHTML = personData.name
    age.innerHTML = personData.age
    characteristic.innerHTML = personData.characteristic
  })
  .catch(()=>{
    name.innerHTML = "서버가 꺼져 있습니다."
    age.innerHTML = ""
    characteristic.innerHTML = ""
  })  

