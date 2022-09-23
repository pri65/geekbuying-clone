document.querySelector("#form").addEventListener("submit",CreateAcc)
     
let userArr = JSON.parse(localStorage.getItem("userInfo")) || [];

function CreateAcc(event){
    event.preventDefault();
    console.log("king")
   let form = document.querySelector("#form");
   let nickname = form.nickname.value;
   let email = form.email.value; 
   let password = form.password.value;
   console.log(nickname)
   let userObj = {
      nickname: nickname,
      email: email,
      password: password,
   }
  
   if(email.length>0 && password.length>0 && nickname.length>0)
   {
    userArr.push(userObj)
   localStorage.setItem("userInfo",JSON.stringify(userArr))
   alert("Account created successfully")
   window.location.href = "signin.html"
   }
   else{
    alert("Account creation failed")
   }

}