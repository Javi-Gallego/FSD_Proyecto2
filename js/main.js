let channelList = [
    {
        "name": "canal1",
        "logo": "La 2",
        "encendido": "false",
    },
    {
        "name": "canal2",
        "logo": "Antena 3",
        "encendido": "false",
    },
    {
        "name": "canal3",
        "logo": "Canal 9",
        "encendido": "false",
    },
    {
        "name": "canal4",
        "logo": "HBO",
        "encendido": "false",
    },
    {
        "name": "canal5",
        "logo": "Canal+",
        "encendido": "false",
    },
    {
        "name": "canal6",
        "logo": "No signal",
        "encendido": "false",
    },
    {
        "name": "canal7",
        "logo": "No signal",
        "encendido": "false",
    },
    {
        "name": "canal8",
        "logo": "No signal",
        "encendido": "false",
    },
    {
        "name": "canal9",
        "logo": "No signal",
        "encendido": "false",
    },
]

console.log(channelList[0].name)
console.log(channelList[3].logo)

let TVon = false

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


onoffButton.addEventListener("click", () => {

    if (TVon === false) {           
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
    }
})

chann1Button.addEventListener("click", () => {
    if(!chann2.paused) {
    chann2.pause()
    }
    if(!chann3.paused) {
        chann3.pause()
    }
    chann2.classList.remove("visible")
    chann2.classList.add("oculto")
    chann3.classList.remove("visible")  
    chann3.classList.add("oculto")
    chann4.classList.remove("visible")
    chann4.classList.add("oculto")
    chann1.classList.remove("oculto")
    chann1.classList.add("visible")
    chann1.play()
})

chann2Button.addEventListener("click", () => {
    chann1.pause()
    chann3.pause()
    chann2.play()
    chann2.classList.add("visible")
    chann2.classList.remove("oculto")
    chann1.classList.remove("visible")
    chann1.classList.add("oculto")
    chann3.classList.add("oculto")
    chann3.classList.remove("visible")
    chann4.classList.add("oculto")
    chann4.classList.remove("visible")
})

chann3Button.addEventListener("click", () => {
    chann1.pause()
    chann2.pause()
    chann3.play()
    chann3.classList.add("visible")
    chann3.classList.remove("oculto")
    chann1.classList.remove("visible")
    chann1.classList.add("oculto")
    chann2.classList.add("oculto")
    chann2.classList.remove("visible")
    chann4.classList.add("oculto")
    chann4.classList.remove("visible")
})

muteButton.addEventListener("click", () => {
    !chann1.muted ? chann1.muted = true : chann1.muted = false

    chann2.muted = chann1.muted
    chann3.muted = chann1.muted
    chann4.muted = chann1.muted
})