//Array con todos los canales, usado en funciones de la tele

let channelList = [
    {
        name: "canal0",
        logo: "No signal",
        encendido: false,
        parental: false
    },
    {
        name: "canal1",
        logo: "La 2",
        encendido: false,
        parental: false
    },
    {
        name: "canal2",
        logo: "Antena 3",
        encendido: false,
        parental: false
    },
    {
        name: "canal3",
        logo: "Canal 9",
        encendido: false,
        parental: false
    },
    {
        name: "canal4",
        logo: "HBO",
        encendido: false,
        parental: false
    },
    {
        name: "canal5",
        logo: "Canal+",
        encendido: false,
        parental: false
    },
    {
        name: "canal6",
        logo: "Horror TV",
        encendido: false,
        parental: true
    },
    {
        name: "canal7",
        logo: "No signal",
        encendido: false,
        parental: false
    },
    {
        name: "canal8",
        logo: "No signal",
        encendido: false,
        parental: false

    },
    {
        name: "canal9",
        logo: "No signal",
        encendido: false,
        parental: false
    },
]

/*Estas cuatro variables son globales a todo el programa y se puede acceder a ellas desde diferentes funciones y que los cambios se apliquen al total.
TVon variable para saber si la tele está encendida o apagada
MUTEon variable que recuerda si el canal anterior estaba silenciado
Menuon variable para saber si el menu ya está visible o no
parentalControl para saber si está activada está opción
actualChannel variable que sabe en qué canal está
actualVolume para saber el nivel de volumen actual
writeMenu está hecha para escribir el menu con la clase oculto cada vez que se cambia de canal, así ahorramos código al escribirle sólo la variable*/

let TVon = false
let MUTEon = false
let Menuon = false
let Menuparental = false
let MenuPassword = false
let password = ""
let CanalProhibido = ""
let parentalControl = false
let actualChannel = ""
let actualVolume = 10
let controlActivo = "desactivado"

let writeMenu = `<div id="menu" class="oculto">
<div class="filaMenu">MENU</div>
<div class="filaMenu">
    <div id="canales" class="menuOpt seleccionOn">Canales</div>
    <div id="config" class="menuOpt">Config</div>
</div>
<div class="filaMenu">
    <div id="parental" class="menuOpt">Control parental</div>
    <div id="otros" class="menuOpt">Otros</div>
</div>
</div>`
let writeParental =`<div id="menuParental" class="oculto"><div>El control parental está ${controlActivo} ¿qué quieres hacer?</div><div id="ponerControl" class="menuOpt">Poner</div><div id="quitarControl" class="menuOpt">Quitar</div><div id="salirControl" class="menuOpt seleccionOn">Salir</div></div>`


/* Aquí metemos todos los botones en el htmlCollection(btn) y luego lo pasamos
al array(arrayBtn) para poder mapearlos y, dependiendo del botón pulsado,
llamar a la función correspondiente. Todos los botones excepto el de encendido están supeditados a que la Tv esté encendida para funcionar y, siempre, se llama a la función que enciende el led como feedback de botón pulsado*/

const btn = document.getElementsByClassName("chanBtn")

const arrayBtn = Array.from(btn)

arrayBtn.map(
    boton => {
        boton.addEventListener("click", (e) => {
            let canal = document.getElementById(e.target.id)

            mandoLed()

            if(canal.id === "btnOnOff") {
                onOff()
            }

            if(TVon){
                if(canal.id === "btnMute") {
                    Mute()
                }
                if(e.target.classList[1] === "numBtn" && !MenuPassword) {
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
                if(canal.id === "btnChUp" || canal.id === "btnChDown" && !MenuPassword) {
                    gestionCanales(canal.id)
                }
                if(((canal.id ) === "btnUp" || (canal.id ) === "btnDown" || (canal.id ) === "btnLeft" || (canal.id ) === "btnRight" || (canal.id ) === "btnOK" || (e.target.classList[1] === "numBtn")) && Menuparental) {
                    menuParental(canal.id)
                }
                if(((canal.id ) === "btnUp" || (canal.id ) === "btnDown" || (canal.id ) === "btnLeft" || (canal.id ) === "btnRight" || (canal.id ) === "btnOK") && Menuon) {
                    gestionMenu(canal.id)
                }
                if(e.target.classList[1] === "numBtn" || canal.id === "btnOK" || canal.id === "btnLeft" && menuPassword) {
                    putPassword(canal.id)
                }
            }
        })
    }
)

/*Todas las funciones llaman a esta para que se encienda el led superior que indica que se ha pulsado un botón*/
const mandoLed = () => {
    const led = document.getElementById("btnLed")

    led.classList.add("ledOn")

    setTimeout( () => {
        led.classList.remove("ledOn")
    }, 200)
}

/*Función de encendido y apagado de la TV. En "screen" se añade lo que se ve en la pantalla de la tele. Si está apagada se muestra un gif que hace de loader y a los 3sg se pone el canal 1 por defecto. */
const onOff = () => {
    const screenOn = document.getElementById("screen") 
    const ledTv = document.getElementById("TVled")

    if(TVon === false) {
        ledTv.classList.remove("ledOff")
        ledTv.classList.add("ledOn")
        screenOn.innerHTML = `<img src="./img/loaderGHTV.gif" class="loader" alt="Loader">`
        setTimeout( () => {
            screenOn.innerHTML = `${writeMenu}${writeParental}<video id="canal1" src="./videos/v1.mp4" class="canal" height="300em" autoplay loop=""></video>`
        }, 30)
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

    if(channelList[channNum].parental && parentalControl){
        MenuPassword = true
        CanalProhibido = channNum
        screenOn.innerHTML = `<div id="menu" class="visible">
        <div class="filaMenu">El canal ${channelList[channNum].logo} está protegido</div>
        <div class="filaMenu">Escribe la contraseña</div>
            <input id="pass" type="text" value="">`
        return
    }

    actualChannel = channNum

    // for (let i = 0; i <= channelList.length; i++) {
    //     channNum === i ? channelList[i].encendido = true : channelList[i].encendido = false
    // }

    MUTEon ? mute = "muted" : mute = ""

    screenOn.innerHTML = `${writeMenu}${writeParental}<video id="canal${channNum}" src="./videos/v${channNum}.mp4" class="canal" height="300em" autoplay ${mute} loop=""></video>`

    const barraInfo = document.getElementById("info")

    barraInfo.innerHTML = `${channelList[actualChannel].logo}`

    barraInfo.classList.add("visible")
    barraInfo.classList.remove("oculto")
    console.log(" hola " + channelList[actualChannel].logo)
    setTimeout( () => {
        barraInfo.classList.add("oculto")
        barraInfo.classList.remove("visible")
    }, 3000)
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

    screenOn.innerHTML = `${writeMenu}${writeParental}<video id="canal${actualChannel}" src="./videos/v${actualChannel}.mp4" class="canal" height="300em" autoplay ${mute} loop=""></video>`

    const barraInfo = document.getElementById("info")

    barraInfo.innerHTML = `${channelList[actualChannel].logo}`

    barraInfo.classList.add("visible")
    barraInfo.classList.remove("oculto")

    setTimeout( () => {
        barraInfo.classList.add("oculto")
        barraInfo.classList.remove("visible")
    }, 3000)
}

/*Esta funcion sólo hace visible el menú y cambia la variable global que indica si el menú etá activo o no */
const Menu = () => {
    const menuTV = document.getElementById("menu")

    if(Menuon) {
        menuTV.classList.add("oculto")
        menuTV.classList.remove("visible")
    }

    if(!Menuon) {
        menuTV.classList.add("visible")
        menuTV.classList.remove("oculto")
    }

    Menuon = !Menuon
}

/*Con esta funcion nos movemos por las opciones del menu, como para saber la opcion que está activa utilizamos una clase, primero traemos todos los elementos para poder poner y quitar clases y que el usuario sepa donde está cada vez */
const gestionMenu = (boton) => {
    const menuCanales = document.getElementById("canales")
    const menuConfig = document.getElementById("config")
    const menuParental = document.getElementById("parental")
    const menuOtros = document.getElementById("otros")

    if(menuCanales.classList.contains("seleccionOn")) {
        if(boton === "btnDown" || boton === "btnUp") {
            menuCanales.classList.remove("seleccionOn")
            menuParental.classList.add("seleccionOn")
            return
        }
        if(boton === "btnRight" || boton === "btnLeft") {
            menuCanales.classList.remove("seleccionOn")
            menuConfig.classList.add("seleccionOn")
            return
        }
    }
    
    if(menuConfig.classList.contains("seleccionOn")) {
        if(boton === "btnDown" || boton === "btnUp") {
            menuConfig.classList.remove("seleccionOn")
            menuOtros.classList.add("seleccionOn")
            return
        }
        if(boton === "btnLeft" || boton === "btnRight") {
            menuConfig.classList.remove("seleccionOn")
            menuCanales.classList.add("seleccionOn")
            return
        }
    }

    if(menuParental.classList.contains("seleccionOn")) {
        if(boton === "btnUp" || boton === "btnDown") {
            menuParental.classList.remove("seleccionOn")
            menuCanales.classList.add("seleccionOn")
            return
        }
        if(boton === "btnRight" || boton === "btnLeft") {
            menuParental.classList.remove("seleccionOn")
            menuOtros.classList.add("seleccionOn")
            return
        }
        if(boton === "btnOK") {
            Menuparental = true

            parentalControl ? controlActivo = "activado" : controlActivo = "desactivado"
            const nuevoMenu = document.getElementById("menuParental")
            
            nuevoMenu.classList.remove("oculto")
            nuevoMenu.classList.add("visible")
            return
        }
    }

    if(menuOtros.classList.contains("seleccionOn")) {
        if(boton === "btnUp" || boton === "btnDown") {
            menuOtros.classList.remove("seleccionOn")
            menuConfig.classList.add("seleccionOn")
            return
        }
        if(boton === "btnLeft" || boton === "btnRight") {
            menuOtros.classList.remove("seleccionOn")
            menuParental.classList.add("seleccionOn")
            return
        }
    }
}

const menuParental = (boton) => {

    parentalControl ? controlActivo = "activado" : controlActivo = "desactivado"

    const quitaCon = document.getElementById("quitarControl")
    const ponCon = document.getElementById("ponerControl")
    const salCon = document.getElementById("salirControl")
    const menPar = document.getElementById("menuParental")
    const screenOn = document.getElementById("screen") 

    if (boton === "btnUp" && ponCon.classList.contains("seleccionOn")) {
        ponCon.classList.remove("seleccionOn")
        salCon.classList.add("seleccionOn")
        return
    }
    if (boton === "btnUp" && quitaCon.classList.contains("seleccionOn")) {
        quitaCon.classList.remove("seleccionOn")
        ponCon.classList.add("seleccionOn")
        return
    }
    if (boton === "btnUp" && salCon.classList.contains("seleccionOn")) {
        salCon.classList.remove("seleccionOn")
        quitaCon.classList.add("seleccionOn")
        return
    }
    if (boton === "btnDown" && ponCon.classList.contains("seleccionOn")) {
        ponCon.classList.remove("seleccionOn")
        quitaCon.classList.add("seleccionOn")
        return
    }
    if (boton === "btnDown" && quitaCon.classList.contains("seleccionOn")) {
        quitaCon.classList.remove("seleccionOn")
        salCon.classList.add("seleccionOn")
        return
    }
    if (boton === "btnDown" && salCon.classList.contains("seleccionOn")) {
        salCon.classList.remove("seleccionOn")
        ponCon.classList.add("seleccionOn")
        return
    }
    if (boton === "btnOK" && ponCon.classList.contains("seleccionOn")) {
        console.log("poner")
        parentalControl = true
        parentalControl ? controlActivo = "activado" : controlActivo = "desactivado"

        menPar.innerHTML = `<div>El control parental está ${controlActivo} y la contraseña es: 6123</div>`
        setTimeout( () => {
            screenOn.innerHTML = `<div id="menu" class="visible">
            <div class="filaMenu">MENU</div>
            <div class="filaMenu">
                <div id="canales" class="menuOpt seleccionOn">Canales</div>
                <div id="config" class="menuOpt">Config</div>
            </div>
            <div class="filaMenu">
                <div id="parental" class="menuOpt">Control parental</div>
                <div id="otros" class="menuOpt">Otros</div>
            </div>
            </div><div id="menuParental" class="visible"><div>El control parental está ${controlActivo} ¿qué quieres hacer?</div><div id="ponerControl" class="menuOpt">Poner</div><div id="quitarControl" class="menuOpt">Quitar</div><div id="salirControl" class="menuOpt seleccionOn">Salir</div></div><video id="canal${actualChannel}" src="./videos/v${actualChannel}.mp4" class="canal" height="300em" autoplay loop=""></video>`
        }, 3500)
        setTimeout(() => {}, 3000)
        menPar.classList.remove("visible")
        menPar.classList.add("oculto")

        Menuparental = false
        return
    }
    if (boton === "btnOK" && quitaCon.classList.contains("seleccionOn")) {
        console.log("quitar")
        parentalControl = false
        parentalControl ? controlActivo = "activado" : controlActivo = "desactivado"
        screenOn.innerHTML = `${writeMenu}${writeParental}<video id="canal${actualChannel}" src="./videos/v${actualChannel}.mp4" class="canal" height="300em" autoplay loop=""></video>`
        menPar.innerHTML = `<div>El control parental está ${controlActivo} ¿qué quieres hacer?</div><div id="ponerControl" class="menuOpt">Poner</div><div id="quitarControl" class="menuOpt">Quitar</div><div id="salirControl" class="menuOpt seleccionOn">Salir</div>
        menPar.classList.remove("visible")`
        menPar.classList.add("oculto")

        Menuparental = false
        return
    }
    if (boton === "btnOK" && salCon.classList.contains("seleccionOn")) {
        menPar.classList.remove("visible")
        menPar.classList.add("oculto")

        Menuparental = false
        return
    }   
}

const putPassword = (canal) => {
    const password = document.getElementById("pass")
    const screenOn = document.getElementById("screen")
    const REALPASS = 6123;
    const num = canal.slice(-1)
    
    if(canal === "btnLeft") {
        password.value = ""
    }

    password.value += num

    if(canal === "btnOK" && parseInt(password.value) === REALPASS) {
        screenOn.innerHTML = `<div id="menu" class="visible">
        <div class="filaMenu">Contraseña correcta!!</div>
        <div class="filaMenu">Puedes ver el canal ${channelList[channNum].logo}</div>`
    }

    setTimeout( () => {
        screenOn.innerHTML = `${writeMenu}${writeParental}<video id="canal${CanalProhibido}" src="./videos/v${CanalProhibido}.mp4" class="canal" height="300em" autoplay loop=""></video>`
    }, 2000)
    console.log("valor num: " + num)
    console.log("valor pass: " + password.value)


}