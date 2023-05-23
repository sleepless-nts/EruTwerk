# General

*Eru's Twerk it up!* is a small fangame of the vtuber [Eru Nabura](https://twitter.com/EruNabura), the character design and the illustration belong to her. The game code (everything in the /src/ folder) is released under MIT License. Other assets used are specifed and credited in the CREDITS.txt file.

Be sure to check out the live version at [Eru's Twerk it up!](https://sleepless-nts.github.io/EruTwerk/).

## Adding songs to the game
If you wish to add songs to the game you can do so in the /src/songs.js file by specifying certain information 

    __add_song({
        "file": "assets/songs/[FILE_NAME].mp3",
        "sound_obj" : undefined,
        "title": "[TITLE]",
        "author": "[AUTHOR]",
        "length": "[LENGTH]",
        "difficulty": "3",
        "timings": []
    });

You will need to record *track timings* for the beats, you can do so by opening your browser's console and typing

    ALLOW_DEBUGGING = true

This will allow you to press D to enter DEBUG mode and start recording track timings. While in debug mode, A or S keypresses are recorded according to the song time. Once the song finishes (or if you press Q), track timings will be printed in the console, which you can then add to the track in songs.js.

If you download the files you might encounter the issue that it doesn't work locally. It's been a long time since browsers restricted loading resources from local files due to security issues. The short answer is that you will have to set up a small server on your machine for it to work locally.
