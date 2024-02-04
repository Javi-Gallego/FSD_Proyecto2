//Array con todos los canales, usado en funciones de la tele

let channelList = [
    {
        name: "canal0",
        logo: "No signal",
        encendido: "false"
    },
    {
        name: "canal1",
        logo: "La 2",
        encendido: "false"
    },
    {
        name: "canal2",
        logo: "Antena 3",
        encendido: "false"
    },
    {
        name: "canal3",
        logo: "Canal 9",
        encendido: "false"
    },
    {
        name: "canal4",
        logo: "HBO",
        encendido: "false"
    },
    {
        name: "canal5",
        logo: "Canal+",
        encendido: "false"
    },
    {
        name: "canal6",
        logo: "Horror TV",
        encendido: "false"
    },
    {
        name: "canal7",
        logo: "No signal",
        encendido: "false"
    },
    {
        name: "canal8",
        logo: "No signal",
        encendido: "false"
    },
    {
        name: "canal9",
        logo: "No signal",
        encendido: "false"
    },
]

/*No sé si es buena práctica pero considero estas tres variables globales a todo el programa y me gustaría poder acceder a ella desde diferentes funciones y que los cambios que se hagasn en esas funciones se apliquen al total.
TVon variable para saber si la tele está encendida o apagada
MUTEon variable que recuerda si el canal anterior estaba silenciado
actualChannel variable que sabe en qué canal está */

var TVon = false
var MUTEon = false
var actualChannel = ""
var actualVolume = 10


/* Aquí metemos todos los botones en el htmlCollection(btn) y luego lo pasamos
al array(arrayBtn) para poder mapearlos y, dependiendo del botón pulsado,
llamar a la función correspondiente*/

const btn = document.getElementsByClassName("chanBtn")

const arrayBtn = Array.from(btn)

arrayBtn.map(
    boton => {
        boton.addEventListener("click", (e) => {
            let canal = document.getElementById(e.target.id)

            if(canal.id === "btnOnOff") {
                onOff()
            }
            if(canal.id === "btnMute") {
                Mute()
            }
            if(e.target.classList[1] === "numBtn") {
                changeChannel(canal.id)
            }
            if(canal.id === "btnInfo") {
                Info()
            }
            if(canal.id === "btnMenu") {
                Menu()
            }
            if(canal.id === "btnVolUp" || canal.id === "btnVolDown") {
                gestionVolumen(canal.id)
            }
            if(canal.id === "btnChUp" || canal.id === "btnChDown") {
                gestionCanales(canal.id)
            }
        })
    }
)

/*Función de encendido y apagado de la TV. En "screen" se añade lo que se ve en la pantalla de la tele. Si está apagada se muestra un gif que hace de loader y a los 3sg se pone el canal 1 por defecto. */
const onOff = () => {
    const screenOn = document.getElementById("screen") 
    const ledTv = document.getElementById("TVled")

    if(TVon === false) {
        ledTv.classList.remove("ledOff")
        ledTv.classList.add("ledOn")
        screenOn.innerHTML = `<img src="./img/loaderGHTV.gif" class="loader" alt="Loader">`
        setTimeout( () => {
            screenOn.innerHTML = `<video id="canal1" src="./videos/v1.mp4" class="canal" height="300em" autoplay loop=""></video>`
        }, 3000)
        TVon = true
        channelList[1].encendido = true
        actualChannel = 1

        return
    }
    if (TVon === true) {
        screenOn.innerHTML = ""
        ledTv.classList.add("ledOff")
        ledTv.classList.remove("ledOn")
        TVon = false
    }
}

/*Con esta función se cambian los canales cuando se da en los números.
Solo pone el canal en pantalla si la tv está encendida y tiene en cuenta si se silenció un canal antes para que el nuevo siga silenciado, además se actualiza en el array de canales cual es el que está encendido */
const changeChannel = (canal) => {
    const screenOn = document.getElementById("screen")

    let channNum = canal.slice(-1)
    let mute = ""

    if(TVon){     
        MUTEon ? mute = "muted" : mute = ""

        screenOn.innerHTML = `<video id="canal${channNum}" src="./videos/v${channNum}.mp4" class="canal" height="300em" autoplay ${mute} loop=""></video>`

        actualChannel = channNum

        for (let i = 0; i <= channelList.length; i++) {
                channNum == i ? channelList[i].encendido = true : channelList[i].encendido = false
        }
        actualChannel = channNum
    }
}

/* Función para silenciar los vídeos. Primero se recorre el array de canales para ver cual está encendido, luego cogemos el id del vídeo y miramos si está muteado o no y le cambiamos el estado */
const Mute = () => {
    const screenOn = document.getElementById("screen")

    for (let i = 0; i <= channelList.length; i++) {

        if(channelList[i].encendido === true){
            const canalMut = `canal${i}`
            const cnlMut = document.getElementById(canalMut)

            if (!cnlMut.muted) {
                cnlMut.muted = true
                MUTEon = true
            } else {
                cnlMut.muted = false
                MUTEon = false
            }
        }
    }
}

/*Se hace un array con los meses porque el getMonth devuelve un número y así cuando, se concatena con el resto de la fecha y con el nombre del canal que se saca del array de canales. La pantalla de info se muestra 3s y luego se vuelve a ocultar */
const Info = () => {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const barraInfo = document.getElementById("info")
    let hora = new Date();

    barraInfo.innerHTML = `${channelList[actualChannel].logo}     ${hora.getDate()}  ${meses[hora.getMonth()]}  ${hora.getHours()}:${hora.getMinutes()}`

    barraInfo.classList.add("visible")
    barraInfo.classList.remove("oculto")

    setTimeout( () => {
        barraInfo.classList.add("oculto")
        barraInfo.classList.remove("visible")
    }, 3000)
}

/* Hay diez niveles de volumen, para que se vea se han hecho 10 clases diferentes que tienen un ancho en % diferente, por eso al principio guardamos la clase que tiene así luego se borra y se le añade la nueva. También se comprueba que no se pueda subir más el volumen si ya está en 10 y que no se pueda bajar si ya está a 0. Para cambiarle el volumen se divide el resultado entre 10 porque el volumen va de 0 a 1. Como la ventana de info, se muestra el volumen en pantalla 3s y luego se vuelve a ocultar */
const gestionVolumen = (boton) => {

    let oldclass = "vol" + actualVolume

    if(boton === "btnVolUp" && actualVolume < 10) {
        actualVolume++
    }

    if(boton === "btnVolDown" && actualVolume > 0) {
        actualVolume--
    }

    let newclass = "vol" + actualVolume
    const barraVolumen = document.getElementById("volActual")

    barraVolumen.classList.remove(oldclass)
    barraVolumen.classList.add(newclass)

    let channel = "canal" + actualChannel
    let canal = document.getElementById(channel)

    canal.volume = actualVolume/10

    const barraVol = document.getElementById("volume")

    barraVol.classList.remove("oculto")
    barraVol.classList.add("visible")

    setTimeout( () => {
        barraVol.classList.add("oculto")
        barraVol.classList.remove("visible")
    }, 3000)
}

/*cambio de canales cuando se hace desde los botones de canal+ y canal-. Parecido al metodo de introducir por numero. Se tiene en cuenta si el canal anterior estaba silenciado. Si ya está en el canal 9 y se suma uno se pasa al canal 0 y comienza el ciclo. Al contrario si estamos en el canal 0 y bajamos uno más. */
const gestionCanales = (boton) => {

    const screenOn = document.getElementById("screen")
    let mute = ""

    if(boton === "btnChUp" && actualChannel < 9) {
        actualChannel++
    }

    if(boton === "btnChUp" && actualChannel === 9) {
        actualChannel = 0
    }

    if(boton === "btnChDown" && actualChannel > 0) {
        actualChannel--
    }

    if(boton === "btnChDown" && actualChannel === 0) {
        actualChannel = 9
    }

    MUTEon ? mute = "muted" : mute = ""

    screenOn.innerHTML = `<video id="canal${actualChannel}" src="./videos/v${actualChannel}.mp4" class="canal" height="300em" autoplay ${mute} loop=""></video>`
}