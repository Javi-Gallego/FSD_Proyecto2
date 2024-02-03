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
        })
    }
)

const onOff = () => {
    const screenOn = document.getElementById("screen") 

    if(TVon === false) {
        ledTv.classList.remove("ledOff")
        ledTv.classList.add("ledOn")
        screenOn.innerHTML = `<img src="./img/loaderGHTV.gif" class="loader" alt="Loader">`
        setTimeout( () => {
            screenOn.innerHTML = `<video id="canal1" src="./videos/v1.mp4" class="canal" height="300em" autoplay loop=""></video>`
        }, 5000)
        TVon = true
        channelList[1].encendido = true
        return
    }
    if (TVon === true) {
        screenOn.innerHTML = ""
        ledTv.classList.add("ledOff")
        ledTv.classList.remove("ledOn")
        TVon = false
    }
}

const changeChannel = (canal) => {
    const screenOn = document.getElementById("screen")

    let channNum = canal.slice(-1)
    let mute = ""
    console.log("Encendido: " + channelList[channNum].encendido)
    if(TVon){     
        MUTEon ? mute = "muted" : mute = ""

        screenOn.innerHTML = `<video id="canal${channNum}" src="./videos/v${channNum}.mp4" class="canal" height="300em" autoplay ${mute} loop=""></video>`

        for (let i = 0; i <= channelList.length; i++) {
                channNum == i ? channelList[i].encendido = true : channelList[i].encendido = false
        }       
    }
}

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


var onoffButton = document.getElementById("btnOnOff")
var chann1Button = document.getElementById("channel1")
var chann2Button = document.getElementById("channel2")
var chann3Button = document.getElementById("channel3")
var chann4Button = document.getElementById("channel4")
var muteButton = document.getElementById("btnMute")
var chann1 = document.getElementById("canal1")
var chann2 = document.getElementById("canal2")
var chann3 = document.getElementById("canal3")
var chann4 = document.getElementById("canal4")
var ledTv = document.getElementById("TVled")

// chann1Button.addEventListener("click", () => {
//     if(!chann2.paused) {
//     chann2.pause()
//     }
//     if(!chann3.paused) {
//         chann3.pause()
//     }
//     chann2.classList.remove("visible")
//     chann2.classList.add("oculto")
//     chann3.classList.remove("visible")  
//     chann3.classList.add("oculto")
//     chann4.classList.remove("visible")
//     chann4.classList.add("oculto")
//     chann1.classList.remove("oculto")
//     chann1.classList.add("visible")
//     chann1.play()
// })

// chann2Button.addEventListener("click", () => {
//     chann1.pause()
//     chann3.pause()
//     chann2.play()
//     chann2.classList.add("visible")
//     chann2.classList.remove("oculto")
//     chann1.classList.remove("visible")
//     chann1.classList.add("oculto")
//     chann3.classList.add("oculto")
//     chann3.classList.remove("visible")
//     chann4.classList.add("oculto")
//     chann4.classList.remove("visible")
// })

// chann3Button.addEventListener("click", () => {
//     chann1.pause()
//     chann2.pause()
//     chann3.play()
//     chann3.classList.add("visible")
//     chann3.classList.remove("oculto")
//     chann1.classList.remove("visible")
//     chann1.classList.add("oculto")
//     chann2.classList.add("oculto")
//     chann2.classList.remove("visible")
//     chann4.classList.add("oculto")
//     chann4.classList.remove("visible")
// })

/*funcion on off antes de cambiar innerhtml

if(TVon === false) {
    ledTv.classList.remove("ledOff")
    ledTv.classList.add("ledOn")
    chann1.classList.add("visible")
    chann1.classList.remove("oculto")
    chann1.play()
    TVon = true
    return
}
if (TVon === true) {
    ledTv.classList.remove("ledOn")
    ledTv.classList.add("ledOff")
    chann1.pause()
    chann2.pause()
    chann3.pause()
    chann4.pause()
    chann1.classList.remove("visible")
    chann1.classList.add("oculto")
    chann2.classList.add("oculto")
    chann2.classList.remove("visible")
    chann3.classList.add("oculto")
    chann3.classList.remove("visible")
    chann4.classList.add("oculto")
    chann4.classList.remove("visible")
    TVon = false
}*/