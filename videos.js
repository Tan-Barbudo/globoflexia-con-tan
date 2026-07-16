const videos = [

{
    id:1,
    modulo:"Introducción",
    titulo:"Bienvenida al curso",
    descripcion:"En este video te doy la bienvenida y te explico cómo trabajaremos durante las próximas semanas.",
    youtube:"W0r-6JJ8SZo",
    disponible:true
},

{
    id:2,
    modulo:"Módulo 1",
    titulo:"Organización del curso",
    descripcion:"En esta primera clase conocerás cómo está organizado el curso y comenzaremos a construir una base sólida antes de crear nuestras primeras figuras.",
    youtube:"uabgTdjDMfk",
    disponible:true
},

{
    id:3,
    modulo:"Módulo 2",
    titulo:"Infladores para globoflexia",
    descripcion:"Conocerás los diferentes tipos de infladores, ventajas y cuándo utilizar cada uno.",
    youtube:"mu4jCp8BN3o",
    disponible:true
},

{
    id:4,
    modulo:"Módulo 3",
    titulo:"Tipos de globos",
    descripcion:"Aprenderás los diferentes tipos de globos, medidas y cómo elegir globos de buena calidad.",
    youtube:"NNaU2kGoMxY",
    disponible:true
},

{
    id:5,
    modulo:"Módulo 4",
    titulo:"Técnicas básicas",
    descripcion:"Aprenderás a inflar correctamente un globo, hacer nudos y dominar las torciones básicas.",
    youtube:"991rgpDtq1g",
    disponible:true
},

{
    id:6,
    modulo:"Módulo 5",
    titulo:"Próximamente",
    descripcion:"Este módulo estará disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:7,
    modulo:"Módulo 6",
    titulo:"Próximamente",
    descripcion:"Este módulo estará disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:8,
    modulo:"Módulo 7",
    titulo:"Próximamente",
    descripcion:"Este módulo estará disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:9,
    modulo:"Módulo 8",
    titulo:"Próximamente",
    descripcion:"Este módulo estará disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:10,
    modulo:"Módulo 9",
    titulo:"Próximamente",
    descripcion:"Este módulo estará disponible próximamente.",
    youtube:"",
    disponible:false
},
  {
    id:11,
    modulo:"Módulo 10",
    titulo:"Próximamente",
    descripcion:"Este módulo estará disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:12,
    modulo:"Módulo 11",
    titulo:"Próximamente",
    descripcion:"Este módulo estará disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:13,
    modulo:"Módulo 12",
    titulo:"Próximamente",
    descripcion:"Este módulo estará disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:14,
    modulo:"Módulo 13",
    titulo:"Próximamente",
    descripcion:"Este módulo estará disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:15,
    modulo:"Módulo 14",
    titulo:"Próximamente",
    descripcion:"Este módulo estará disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:16,
    modulo:"Módulo 15",
    titulo:"Próximamente",
    descripcion:"Este módulo estará disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:17,
    modulo:"Módulo 16",
    titulo:"Próximamente",
    descripcion:"Este módulo estará disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:18,
    modulo:"Bonus 1",
    titulo:"Contenido extra",
    descripcion:"Disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:19,
    modulo:"Bonus 2",
    titulo:"Contenido extra",
    descripcion:"Disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:20,
    modulo:"Bonus 3",
    titulo:"Contenido extra",
    descripcion:"Disponible próximamente.",
    youtube:"",
    disponible:false
},

{
    id:21,
    modulo:"Bonus 4",
    titulo:"Contenido extra",
    descripcion:"Disponible próximamente.",
    youtube:"",
    disponible:false
}

];



/* ==========================================
   VARIABLES
========================================== */

let moduloActual = 0;



/* ==========================================
   DIBUJAR MODULOS
========================================== */

function cargarModulos(){

    const contenedor =
        document.getElementById("modulesContainer");

    contenedor.innerHTML = "";

    videos.forEach(video=>{

        const card=document.createElement("div");

        card.className="module-card";

        if(video.disponible){

            card.innerHTML=`

                <div class="module-status available">

                    🟢 Disponible

                </div>

                <h3>${video.modulo}</h3>

                <p>${video.titulo}</p>

            `;

            card.onclick=()=>abrirModulo(video.id);

        }

        else{

            card.innerHTML=`

                <div class="module-status locked">

                    🔒 Próximamente

                </div>

                <h3>${video.modulo}</h3>

                <p>${video.descripcion}</p>

            `;

        }

        contenedor.appendChild(card);

    });

}
/* ==========================================
   ABRIR MODULO
========================================== */

function abrirModulo(id){

    const video=videos.find(v=>v.id===id);

    if(!video || !video.disponible) return;

    moduloActual=id;

    document.getElementById("videoTitle").innerText=
        video.modulo;

    document.getElementById("videoDescription").innerText=
        video.descripcion;

    document.getElementById("videoPlayer").src=
        "https://www.youtube.com/embed/"+video.youtube;

}



/* ==========================================
   MODULO SIGUIENTE
========================================== */

function siguienteModulo(){

    let siguiente=videos.find(v=>
        v.id>moduloActual &&
        v.disponible
    );

    if(siguiente){

        abrirModulo(siguiente.id);

    }

}



/* ==========================================
   MODULO ANTERIOR
========================================== */

function moduloAnterior(){

    const anteriores=videos.filter(v=>
        v.id<moduloActual &&
        v.disponible
    );

    if(anteriores.length){

        abrirModulo(
            anteriores[anteriores.length-1].id
        );

    }

}



/* ==========================================
   MARCAR COMPLETADO
========================================== */

function marcarCompletado(){

    let progreso=
        JSON.parse(localStorage.getItem("progreso")) || [];

    if(!progreso.includes(moduloActual)){

        progreso.push(moduloActual);

    }

    localStorage.setItem(
        "progreso",
        JSON.stringify(progreso)
    );

    actualizarProgreso();

    alert("🎉 Módulo completado correctamente.");

}



/* ==========================================
   ACTUALIZAR PROGRESO
========================================== */

function actualizarProgreso(){

    const progreso=
        JSON.parse(localStorage.getItem("progreso")) || [];

    const disponibles=
        videos.filter(v=>v.disponible).length;

    const porcentaje=
        Math.round((progreso.length/disponibles)*100);

    document.getElementById("progressFill").style.width=
        porcentaje+"%";

    document.getElementById("progressFillLarge").style.width=
        porcentaje+"%";

    document.getElementById("progressPercent").innerText=
        porcentaje+"%";

    document.getElementById("progressText").innerText=
        progreso.length+" de "+disponibles+" módulos completados";

    document.getElementById("progressResume").innerText=
        progreso.length+" de "+disponibles+" módulos completados";

}



/* ==========================================
   EVENTOS
========================================== */

document
.getElementById("btnPrev")
.onclick=moduloAnterior;

document
.getElementById("btnNext")
.onclick=siguienteModulo;

document
.getElementById("btnCompleted")
.onclick=marcarCompletado;



/* ==========================================
   INICIO
========================================== */

window.addEventListener("load",()=>{

    cargarModulos();

    abrirModulo(1);

    actualizarProgreso();

});
