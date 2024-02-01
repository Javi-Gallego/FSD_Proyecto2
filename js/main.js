var onoffButton = document.getElementById("btnOnOff")
var chann1Button = document.getElementById("channel1")
var chann2Button = document.getElementById("channel2")
var chann1 = document.getElementById("canal1")
var chann2 = document.getElementById("canal2")

var TVon = false;

onoffButton.addEventListener("click", () => {
    TVon = true
    chann1.classList.add("visible")
})

chann1Button.addEventListener("click", () => {
    chann1.classList.add("visible")
    chann1.classList.remove("oculto")
    chann2.classList.add("oculto")
    chann2.classList.remove("visible")
    console.log("canal1 " + chann1)
    console.log("canal2 " + chann2)
})

chann2Button.addEventListener("click", () => {
    chann2.classList.add("visible")
    chann2.classList.remove("oculto")
    chann1.classList.remove("visible")
    chann1.classList.add("oculto")
    console.log("canal1 " + chann1)
    console.log("canal2 " + chann2)
})