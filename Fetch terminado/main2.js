tituloPrincipal = document.getElementById("tituloPrincipal"),
 h2 = document.getElementById("h2"),

tituloPrincipal.innerText = "",
h2.innerText = "Kiosco";
const ul= document.getElementById('lista')

const btn = document.getElementById("btnIngresar"),
     checkbox = document.getElementById("checkbox"),
     email = document.getElementById("email"),
     password = document.getElementById("password"),
     p = document.querySelector(".mensaje");
     btn.value = "Registrar";



function guardar(valor){
    let user = {username: email.value , password: password.value}

if (valor === "sessionStorage"){
    sessionStorage.setItem("user", JSON.stringify(user))
}
if(valor=== "localStorage"){
    localStorage.setItem("user", JSON.stringify(user))
}
return user;
}


function recuperarDatos (datos){
    if (datos){
        email.value= datos.username;
        password.value= datos.password;
    }
}

recuperarDatos(JSON.parse(localStorage.getItem("user")))

btn.addEventListener("click", (e) => { e.preventDefault();
if(checkbox.checked){
    guardar("localStorage")   
}else{
    guardar("sessionStorage")
}   
Swal.fire({
  icon: 'success',
  title: 'Sesion Iniciada',
  text: 'Ingresaste de manera correcta!',
  confirmButtonText: '<a href="../Fetch terminado/kiosco.html">Ok</a>'
})

});