![TV](/img/tituloReadme.png "TV")

# Interactive TV :tv:

Welcome to the 1st project for the GeeksHubs Academy. It consists of a little web of a restaurant in which we can see their food and get in contact with them. The office is a real restaurant in Calicanto.

## Table of Contents 🗂️

- [Stack 🛠️](#stack)
- [Preview :eyes:](#preview)
- [Features 🌟](#features)
- [Author ✒️](#autor)
- [Roadmap :world_map:](#roadmap)

## <a id="stack">Stack 🛠️</a>

- **HTML5** - Page structure
- **CSS3** - Design and styles.
- **Bootstrap 5** - Responsive design.
- **Javascript** - To make the TV interactive
- **Photoshop** - For some images, icons or gifs

## <a id="preview">Preview :eyes:</a>

You can see a preview of the TV [here](https://javi-gallego.github.io/FSD_Proyecto2/)

## <a id="features">Features 🌟</a>

The TV has an On/Off button and all the other buttons are bloqued until the TV is on.

Once the TV is switched on you can change channels with de number or CH+/- buttons. You can also turnd up/down the volume on the Tv with the Vol+/- buttons or directly mute the sound (if you switch channels it remembers if the tv was muted and automatically silences the new one)

As extra features this TV has an Info button that shows for 3s the name of the channel and the actual date an hour. Another feature is the Menu, once it opens you can navigate through the options with de arrow buttons and enter the selected option with the OK

As for now, the only option implemented is the parental control, once activated it detects if the channel has restrictions (there is a channel's array and the key "parental" indicates if this channel has restrictions with parental control on).

If you try to enter a restricted channel you must enter the password with the number buttons. You can use the left arrow to erase what you put on the field or validate the password with the OK button. If you failed you will be redirected to the last channel and if you succeeded you will be granted access to the channel you wanted to watch.

INFO: the sixth channel (Horror TV) is the only one with parental restrictions and the password is "123"

It was a challenge to add the parental control as I had to solve a lot of problems. When I implemented it the features that already worked started to do strange things (buttons like mute or change channels did not work after some combinations like activate parental control and close the menu) and it was impossible to write the password and when you tried to write a numbre you could change channel once and then it bloqued and did not let you switch channels more. I wished to add the channels list or fix some things but I did not have time.


## <a id="autor">Author ✒️</a>

- **Javier Gallego** - Project Developer
  - [GitHub](https://github.com/Javi-Gallego) - [LinkedIn](https://www.linkedin.com/in/javier-gallego-garrido-1433a5157/) 

## <a id="roadmap">Roadmap :world_map:</a>

- **Add a channels list** - 
- **Solve channel restart** - When you close the menu the video of the channel restarts, it would be better to play it without interruptions
- **Responsive design** - Although it includes a responsive design it can improve a lot.
- **Videos from the start** - In the first version of the TV all the videos were loaded at once and you could change between them. The one you were watching had the "visible" class and the other ones the "oculto" class. That was good because you could pause the video, switch channels and then return to a channel you already watched and start playing where you stopped. In the actual version you only load the video you are watching, it is ligther to load but on the other hand you have to watch from the start each time you change channels. Maybe it is a good idea to save at least the last channel so it is more tv like if you return to it.
