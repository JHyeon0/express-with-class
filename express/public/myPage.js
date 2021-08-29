const name = document.getElementsByClassName("name")[0];
const age = document.getElementsByClassName("age")[0];
const characteristic = document.getElementsByClassName("characteristic")[0];


fetch('http://localhost:3000/myeonghyeon')
  .then(res => res.json())
  .then(res => {
    console.log(res)
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

document.getElementById('form').addEventListener('submit', (e)=>{
  e.preventDefault();
  const formData = new FormData();
  formData.append('image', e.target.image.files[0]);
  formData.append('title', e.target.title.value);
  axios.post('/upload', formData);
})

