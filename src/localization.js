let LANG_ES = 0,
    LANG_EN = 1;
  //LANG_JP = 2; // Maybe later

let LANGUAGES = [];

LANGUAGES[LANG_ES] = {
    "CREDITS_CREDITS" : 'Créditos',
    "CREDITS_GAME"    : 'Juego',
    "CREDITS_TRACKS"  : 'Pistas',
    "CREDITS_OTHER"   : 'Otros',
    "CREDITS_MAIN"    : `<i>Eru's Twerk it up!</i> es un pequeño <i>fangame</i> de la <del>png</del>vtuber <a href='https://twitter.com/EruNabura/' target='_blank'>Eru
                        Nabura</a> inspirado por este <a href="https://twitter.com/EruNabura/status/1651051816816193538#m" target="_blank">tweet</a>,
                        el diseño de su personaje y la ilustración le pertenecen. Este juego está publicado sin ninguna intención de lucro y es puramente
                        por diversión. El código fuente se puede encontrar <a href="https://github.com/sleepless-nts/EruTwerk/" target="_blank">aquí</a>. Hecho por Sleepless Nights.`,


    "SPLASH_TITLE"    : "Eru's Twerk it up!",
    "SPLASH_PRESS_A"  : "Presiona A para empezar",

    "SONGSEL_SELSONG" : "Selecciona una canción",
    "SONGSEL_SELINSTR": "Usa las teclas DERECHA e IZQUIERDA para seleccionar \nla canción\nPresiona A para empezar",
    "SONGSEL_TRACK"   : "Pista",
    "SONGSEL_DIFF"    : "Dificultad",
    "SONGSEL_HOW2PLAY": "¿Cómo jugar?",
    "SONGSEL_HOWINSTR": "Presiona A para que Eru haga twerk de arriba hacia abajo\nPresiona S para que Eru gire de lado a lado\n\nSincroniza tus pulsaciones para que sean registradas\ncuando las flechas estén centradas en los objetivos",
    "SONGSEL_HOWINST2": "Fallar los objetivos te restan energía, ¡no dejes\nque tu energía llegue a cero!",
    "SONGSEL_LENGTH"  : "Duración de pista:",

    "SONGPLAY_PERFECT": "¡Perfecto!",
    "SONGPLAY_GOOD"   : "Bueno",
    "SONGPLAY_BAD"    : "Malo",
    "SONGPLAY_MISS"   : "Fallo",
    "SONGPLAY_ENERGY" : "Energía",
    "SONGPLAY_INSTR"  : "Presiona A para Twerk    Presiona S para Girar    Presiona Q para Volver",

    "LOADING_LOADING" : 'Cargando',
    "LOADING_ERROR"   : "Ocurrió un error al cargar la canción\nPresiona S para regresar",

    "STATS_SUCCESS"   : "ÉXITO",
    "STATS_FAILURE"   : "FALLIDO",
    "STATS_STATS"     : "Estadísticas",
    "STATS_POINTS"    : "Puntos",

    "RETURN_INSTR"    : "Presiona A para reiniciar esta canción\nPresiona S para regresar"
};

LANGUAGES[LANG_EN] = {
    "CREDITS_CREDITS" : 'Credits',
    "CREDITS_GAME"    : 'Game',
    "CREDITS_TRACKS"  : 'Tracks',
    "CREDITS_OTHER"   : 'Other',
    "CREDITS_MAIN"    : `<i>Eru's Twerk it up!</i> is a small fangame based on the <del>png</del>vtuber <a href='https://twitter.com/EruNabura/' target='_blank'>Eru
                        Nabura</a> which was inspired by this <a href="https://twitter.com/EruNabura/status/1651051816816193538#m" target="_blank">tweet</a>,
                        the illustration and character design belong to her. This game is published without any intention of profit and is merely
                        for fun. The source code can be found <a href="https://github.com/sleepless-nts/EruTwerk/" target="_blank">here</a>. Made by Sleepless Nights.`,

    "SPLASH_TITLE"    : "Eru's Twerk it up!",
    "SPLASH_PRESS_A"  : "Press A to start",

    "SONGSEL_SELSONG" : "Select a song",
    "SONGSEL_SELINSTR": "Use the RIGHT and LEFT arrow keys to select a song\nPress A to start",
    "SONGSEL_TRACK"   : "Track",
    "SONGSEL_DIFF"    : "Difficulty",
    "SONGSEL_HOW2PLAY": "How to play",
    "SONGSEL_HOWINSTR": "Press A to make Eru twerk up and down\nPress S to make Eru flip side to side\n\nTime your inputs so that they are registered when the\narrows are centered in the targets",
    "SONGSEL_HOWINST2": "Missing targets drains your energy\nDon't let your energy reach zero!",
    "SONGSEL_LENGTH"  : "Track length:",

    "SONGPLAY_PERFECT": "Perfect!",
    "SONGPLAY_GOOD"   : "Good",
    "SONGPLAY_BAD"    : "Bad",
    "SONGPLAY_MISS"   : "Miss",
    "SONGPLAY_ENERGY" : "Energy",
    "SONGPLAY_INSTR"  : "Press A to Twerk    Press S to Flip    Press Q to Return",

    "LOADING_LOADING" : 'Loading',
    "LOADING_ERROR"   : "An error occurred while loading the song\nPress S to go back",

    "STATS_SUCCESS"   : "SUCCESS",
    "STATS_FAILURE"   : "FAIL",
    "STATS_STATS"     : "Statistics",
    "STATS_POINTS"    : "Points",

    "RETURN_INSTR"    : "Press A to restart this song\nPress S to return"
};

CREDITS_TEXT = `
    <h1>{CREDITS_CREDITS}</h1>
    <h2>{CREDITS_GAME}</h2>
    <p>{CREDITS_MAIN}</p>
    <h2>{CREDITS_TRACKS}</h2>
    <ul>
        <li><a href='https://www.youtube.com/watch?v=ZRtdQ81jPUQ' target='_blank'>Yoasobi - Aidoru (excerpt)</a></li>
        <li><a href='https://www.youtube.com/watch?v=n3nl2G8cK9w' target='_blank'>Dova Syndrome - 2Neons</a></li>
        <li>
            <a href='https://www.youtube.com/watch?v=UrXbXJrIC-Y' target='_blank'>Nobodyknows - Kokoro Odoru (cover by Yuu)</a>
            <ul>
                <li><a href='https://twitter.com/mameruiyuu' target='_blank'><i style="font-size:1.5em;" class='fa-brands fa-twitter'></i>/mameruiyuu</a> <a href='https://www.youtube.com/channel/UCNyiQK9J2WpLOI8aZhcwlYA' target='_blank'><i style="font-size:1.5em;" class='fa-brands fa-youtube'></i>/yu64l</a></li>
            </ul>
        </li>
    </ul>
    <h2>{CREDITS_OTHER}</h2>
    <ul>
        <li><a href='https://flagicons.lipis.dev/'>Flag-icons</a></li>
        <li><a href='https://fontawesome.com/'>Fontawesome</a></li>
        <li><a href='https://p5js.org/'>p5js</a></li>
    </ul>`;