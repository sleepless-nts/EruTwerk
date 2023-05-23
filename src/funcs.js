// General purpose functions
function __print_debug_timings(){
    let tmp = [];
    for(let i = 0; i < debugTimings.length; i++){
        tmp.push("[" + debugTimings[i][0] + ", " + debugTimings[i][1] + "]");
    }
    console.log("[" + tmp.join(', ') + "]");
}

function __register_game_mode(gm, fn_draw, fn_keyPressed, rate){
    GAME_MODES[gm] = {'draw': fn_draw, 'keyPressed': fn_keyPressed, 'framerate': rate};
}

function __set_game_mode(m){
    CURRENT_MODE = m;
    frameRate(GAME_MODES[m]['framerate']);
}

function __get_text(name){
    if(name in LANGUAGES[CURRENT_LANG]){
        return LANGUAGES[CURRENT_LANG][name];
    }
    return "UNDEF";
}

function __add_song(data){
    SONGS.push(data);
}

function __extract_image(img, x, y, w, h){
    let tmp = createImage(w, h);
    tmp.copy(img, x, y, w, h, 0, 0, w, h);
    return tmp;
}

function __set_language(l){
    CURRENT_LANG = l;
    let el = document.getElementById('credits');
    el.innerHTML = CREDITS_TEXT.replace(/\{([A-Z_]+)\}/g, (match) => { let id = match.replace('{', '').replace('}', ''); return __get_text(id);})
}

function __reset_song(){
    let info = SONGS[CURRENT_SONG];
    timings = info['timings'].slice();
    debugTimings = [];
    accuracy = -1;
    inputRegistered = undefined;
    accuracyCounter = -1;
    songFrameCount = 0;
    song = info['sound_obj'];
    song.stop();
    song.play();
    song.onended(() => {
        if(DEBUG){
            __print_debug_timings();
        }
        input_cooldown = 5;
        __set_game_mode(GM_STATS);
    });
    stats = {
        'SONGPLAY_PERFECT': 0,
        'SONGPLAY_GOOD': 0,
        'SONGPLAY_BAD': 0,
        'SONGPLAY_MISS': 0
    }
    flip = false;
    points = 0;
    energy = 70;
}

function __resync_song(){
    songFrameCount = round(song.currentTime() * 30);
}
