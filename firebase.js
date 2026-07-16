import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getFirestore,

collection,

addDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



/* ==========================================
CONFIGURA TUS DATOS DE FIREBASE
========================================== */

const firebaseConfig = {

apiKey: "AQUI_TU_API_KEY",

authDomain: "AQUI.firebaseapp.com",

projectId: "AQUI",

storageBucket: "AQUI.appspot.com",

messagingSenderId: "0000000000",

appId: "AQUI"

};



const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



const PASSWORD="globoflexiaTan2026";



/* ==========================================
LOGIN
========================================== */

const btnLogin=document.getElementById("btnLogin");

btnLogin.onclick=function(){

const nombre=document.getElementById("studentName").value.trim();

const clave=document.getElementById("studentPassword").value.trim();

if(nombre==""){

document.getElementById("loginError").innerHTML="Escribe tu nombre.";

return;

}

if(clave!==PASSWORD){

document.getElementById("loginError").innerHTML="Contraseña incorrecta.";

return;

}

localStorage.setItem("alumno",nombre);

document.getElementById("studentNameHeader").innerHTML=nombre;

document.getElementById("welcomeName").innerHTML=nombre;

document.getElementById("login-screen").classList.add("hidden");

document.getElementById("app").classList.remove("hidden");

};



/* ==========================================
AUTOLOGIN
========================================== */

window.addEventListener("load",()=>{

const nombre=localStorage.getItem("alumno");

if(nombre){

document.getElementById("studentNameHeader").innerHTML=nombre;

document.getElementById("welcomeName").innerHTML=nombre;

document.getElementById("login-screen").classList.add("hidden");

document.getElementById("app").classList.remove("hidden");

}

});



/* ==========================================
SALIR
========================================== */

document.getElementById("logout").onclick=function(){

localStorage.removeItem("alumno");

location.reload();

};



/* ==========================================
PREGUNTAS
========================================== */

document.getElementById("sendQuestion").onclick=async()=>{

const titulo=document.getElementById("questionTitle").value;

const pregunta=document.getElementById("questionText").value;

const alumno=localStorage.getItem("alumno");

if(pregunta=="") return;

try{

await addDoc(

collection(db,"preguntas"),

{

alumno:alumno,

titulo:titulo,

pregunta:pregunta,

fecha:serverTimestamp()

}

);

document.getElementById("questionTitle").value="";

document.getElementById("questionText").value="";

document.getElementById("questionMessage").innerHTML="Pregunta enviada correctamente 🎈";

}catch(error){

document.getElementById("questionMessage").innerHTML="Error al enviar.";

}

};
