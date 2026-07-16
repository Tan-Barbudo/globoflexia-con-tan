const tutoriales=[

{
nombre:"Serpiente",
youtube:"IHlMd2KkE5Y"
},

{
nombre:"Cangrejo",
youtube:"ItfPu3jZ25g"
},

{
nombre:"Perro",
youtube:"7Ay4HbAYWbI"
},

{
nombre:"Pulpo",
youtube:"oQc3BjYo0-o"
},

{
nombre:"Cruz",
youtube:"qQ6zrk8GADk"
},

{
nombre:"Ratón volador",
youtube:"W83CIGJfk7o"
},

{
nombre:"Gato",
youtube:"y8EiwTbj3ow"
},

{
nombre:"Conejo",
youtube:"Z9rCt_X0kTc"
},

{
nombre:"Dinosaurio",
youtube:"iKBwsdc7aEU"
},

{
nombre:"Pony",
youtube:"_j2SJgQOEB0"
},

{
nombre:"Corazón",
youtube:"7faPIOkhalo"
},

{
nombre:"Flor",
youtube:"jkDQqBiI8lU"
},

{
nombre:"Estrella o Copo de nieve",
youtube:"KYHJv1DNMoU"
},

{
nombre:"Flor de pulsera",
youtube:"UjuvTMRMJL8"
},

{
nombre:"Perro con retazos",
youtube:"igi1ZJWvbKc"
},

{
nombre:"Oso",
youtube:"ujmuGc46E1E"
},

{
nombre:"Uvas",
youtube:"Y0VCbVJNI8M"
}

];



function cargarTutoriales(){

const contenedor=document.getElementById("tutorialsContainer");

contenedor.innerHTML="";

tutoriales.forEach(tutorial=>{

const card=document.createElement("div");

card.className="tutorial-card";

card.innerHTML=`

<iframe

src="https://www.youtube.com/embed/${tutorial.youtube}"

allowfullscreen>

</iframe>

<h3>

${tutorial.nombre}

</h3>

`;

contenedor.appendChild(card);

});

}



window.addEventListener("load",()=>{

cargarTutoriales();

});
