/* ==========================================
NAVEGACIÓN
========================================== */

const tabs=document.querySelectorAll(".tab");

const menu=document.querySelectorAll("nav button");

function abrirPestana(nombre){

    tabs.forEach(tab=>{

        tab.classList.remove("active");

    });

    menu.forEach(btn=>{

        btn.classList.remove("active");

    });

    document.getElementById(nombre).classList.add("active");

    document
        .querySelector(`button[data-tab="${nombre}"]`)
        .classList.add("active");

}

menu.forEach(btn=>{

    btn.onclick=()=>{

        abrirPestana(btn.dataset.tab);

    }

});



/* ==========================================
CONTINUAR CURSO
========================================== */

document
.getElementById("continueCourse")
.onclick=()=>{

    abrirPestana("modulos");

};



document
.getElementById("btnContinue")
.onclick=()=>{

    abrirPestana("modulos");

};



/* ==========================================
SIGUIENTE MÓDULO PENDIENTE
========================================== */

function irSiguientePendiente(){

    const progreso=
    JSON.parse(localStorage.getItem("progreso"))||[];

    const pendiente=videos.find(video=>

        video.disponible &&

        !progreso.includes(video.id)

    );

    if(pendiente){

        abrirPestana("modulos");

        abrirModulo(pendiente.id);

    }

}



document
.getElementById("continueCourse")
.onclick=irSiguientePendiente;

document
.getElementById("btnContinue")
.onclick=irSiguientePendiente;



/* ==========================================
ACTUALIZAR BIENVENIDA
========================================== */

window.addEventListener("load",()=>{

    const alumno=localStorage.getItem("alumno");

    if(alumno){

        document.getElementById("welcomeName").innerHTML=alumno;

        document.getElementById("studentNameHeader").innerHTML=alumno;

    }

});



/* ==========================================
MENÚ INICIAL
========================================== */

window.addEventListener("load",()=>{

    abrirPestana("inicio");

});



/* ==========================================
ATARJOS
========================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        siguienteModulo();

    }

    if(e.key==="ArrowLeft"){

        moduloAnterior();

    }

});



/* ==========================================
SCROLL AL VIDEO
========================================== */

function irAlVideo(){

    document
    .querySelector(".video-container")
    .scrollIntoView({

        behavior:"smooth"

    });

}

const abrirOriginal=abrirModulo;

abrirModulo=function(id){

    abrirOriginal(id);

    irAlVideo();

};
