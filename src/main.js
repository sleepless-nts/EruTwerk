
// Assets
let eru, star;
let img_down, img_flip;

// Game Modes
let GM_LOADING     = 0,
    GM_SPLASH      = 1,
    GM_SONG_SELECT = 2,
    GM_SONG_PLAY   = 3,
    GM_STATS       = 4,
    GM_RETURN      = 5;

let GAME_MODES = [];
let CURRENT_LANG;
let CURRENT_MODE;
let CURRENT_SONG;


// Game state
let ALLOW_DEBUGGING = false;
let DEBUG = false;
let input_cooldown = 0;
let upf = 5;
let animate = -1;
let flip = false;
let inputRegistered = undefined;
let accuracyCounter = -1;
let accuracy = 0;
let songFrameCount = -1;
let timings;
let song;
let energy;
let points;
let stats;
let debugTimings = [];

let error_loading = false;
let TARGET_X = 550;
let TARGET_Y = 400;
let TARGET_RADIUS = 64;
let TARGET_SPACING = 100;

let ACCURACY_BANNER_X = 600;
let ACCURACY_BANNER_Y = 480;

let POINTS_X = 30;
let POINTS_Y = 570;
let TOTAL_TARGETS = 2;

// p5js functions
function preload(){
    eru = loadImage("assets/images/eru.jpg");
    img_down = loadImage("assets/images/down.png");
    img_flip = loadImage("assets/images/flip.png");
}

function setup(){
    createCanvas(800, 600);
    star = __extract_image(eru, 10, 160, 50, 70);
    __register_game_mode(GM_LOADING, gm_loading_draw, gm_loading_keyPressed, 5);
    __register_game_mode(GM_SPLASH, gm_splash_draw, gm_splash_keyPressed, 5);
    __register_game_mode(GM_SONG_SELECT, gm_song_select_draw, gm_song_select_keyPressed, 5);
    __register_game_mode(GM_SONG_PLAY, gm_song_play_draw, gm_song_play_keyPressed, 30);
    __register_game_mode(GM_STATS, gm_stats_draw, gm_stats_keyPressed, 5);
    __register_game_mode(GM_RETURN, gm_return_draw, gm_return_keyPressed, 5);
    __set_game_mode(GM_SPLASH);
    __set_language(LANG_ES);
    CURRENT_SONG = 0;
}

function draw(){
    push();
    GAME_MODES[CURRENT_MODE]['draw']();
    pop();
    if(DEBUG){
        text("DEBUG " + frameRate(), 5, height-30);
    }
    if(input_cooldown > 0){
        input_cooldown--;
    }
}

function keyPressed(){
    if(input_cooldown > 0){
        return;
    }
    if(ALLOW_DEBUGGING && (key == 'D' || key == 'd')){
        DEBUG = !DEBUG;
    }
    GAME_MODES[CURRENT_MODE]['keyPressed']();
}

// Custom onFocus()
function focus(){
    if(CURRENT_MODE == GM_SONG_PLAY){
        __resync_song();
    }
}


/**
 *  LOADING
 */
function gm_loading_draw(){
    background(222);
    textAlign(CENTER);
    text(__get_text('LOADING_LOADING'), width/2, height/2);
    if(error_loading){
        text(__get_text('LOADING_ERROR'), width/2, height/2 + 30);
    }
}

function gm_loading_keyPressed(){
    if(error_loading && (key == 'S' || key == 's')){
        error_loading = false;
        __set_game_mode(GM_SONG_SELECT);
    }
}

/**
 *  SPLASH
 */
function gm_splash_draw(){
    background(255);
    fill(254, 226, 143);
    stroke(50);
    strokeWeight(6);
    textSize(55);
    textAlign(CENTER);
    text(__get_text("SPLASH_TITLE"), width/2, height/4);
    imageMode(CENTER);
    image(eru, width/2, height/2, eru.width/3, eru.height/3);
    textSize(35);
    if(sin((frameCount % 30)) > 0){
        text(__get_text("SPLASH_PRESS_A"), width/2, (height/4) * 3);

    }
}

function gm_splash_keyPressed(){
    if(key == 'A' || key == 'a'){
        __set_game_mode(GM_SONG_SELECT);
    }
}

/**
 *  SONG SELECT
 */
function gm_song_select_draw(){
    background(255);
    textSize(20);
    text(__get_text("SONGSEL_SELSONG"), 30, 60);
    textSize(15);
    text(__get_text("SONGSEL_SELINSTR"), 30, 90);
    textSize(20);
    text(__get_text("SONGSEL_HOW2PLAY"), 30, 160);
    textSize(15);
    text(__get_text("SONGSEL_HOWINSTR"), 30, 190);
    text(__get_text("SONGSEL_HOWINST2"), 30, 430);

    text(__get_text("SONGPLAY_ENERGY"), 70, 490);
    drawEnergyBar(70, 500, 150, 20, map(sin(frameCount * 0.25), -1, 1, 0, 1));
    let info = SONGS[CURRENT_SONG];
    line(440, 30, 440, 570);
    textSize(15);
    text(__get_text("SONGSEL_TRACK") + " " + (CURRENT_SONG+1) + "/" + SONGS.length, 450, 100);
    textSize(35);
    text(info['title'], 450, 130);
    textSize(25);
    text(info['author'], 450, 160);
    textSize(15);
    text(__get_text('SONGSEL_LENGTH') + " " + info['length'], 450, 190);
    text(__get_text("SONGSEL_DIFF"), 450, 210);
    for(let i = 0; i < info['difficulty']; i++){
        image(star, 450 + (50*i), 220);
    }
    strokeWeight(2);
    noFill();
    ellipse(100, 330, 64);
    ellipse(200, 330, 64);
    ellipse(300, 330, 64);
    imageMode(CENTER);
    image(img_down, 100, 320);
    image(img_down, 200, 327);
    image(img_down, 300, 330);
    strokeWeight(1);
    textSize(25);
    textAlign(CENTER);
    stroke(255, 0, 0);
    fill(255, 0, 0);
    text(__get_text("SONGPLAY_MISS"), 100, 390);
    stroke(100, 100, 255);
    fill(100, 100, 255);
    text(__get_text("SONGPLAY_GOOD"), 200, 390);
    stroke(0, 255, 0);
    fill(0, 255, 0);
    text(__get_text("SONGPLAY_PERFECT"), 300, 390);
}

function gm_song_select_keyPressed(){
    if(key == 'A' || key == 'a'){
        let info = SONGS[CURRENT_SONG];
        if(info['sound_obj']){
            __set_game_mode(GM_SONG_PLAY);
            __reset_song();
        } else {
            loadSound(info['file'],
                      (e) => {
                          SONGS[CURRENT_SONG]['sound_obj'] = e;
                          __set_game_mode(GM_SONG_PLAY);
                          __reset_song();
                      },
                      (e) => {
                          error_loading = true;
                      });

            __set_game_mode(GM_LOADING);
        }
    }
    if(keyCode == LEFT_ARROW){
        CURRENT_SONG--;
        if(CURRENT_SONG < 0){
            CURRENT_SONG = SONGS.length-1;
        }
    }
    if(keyCode == RIGHT_ARROW){
        CURRENT_SONG++;
        if(CURRENT_SONG >= SONGS.length){
            CURRENT_SONG = 0;
        }
    }
}

/**
 *  SONG PLAY
 */
function gm_song_play_draw(){
    background(255);
    let w = eru.width;
    let h = eru.height;
    let x;
    x = 0;
    if(animate != -1){
        h = h - (animate * 10);
        animate--;
    }
    push();
    if(flip){
        scale(-1, 1);
        translate(-90, 0);
        x = -w;
    }
    image(eru, x, 10 + animate * 10, w, h);
    pop();
    drawTargets();
    textSize(15);
    text(__get_text("SONGPLAY_INSTR"), 10, height-10);

    if(inputRegistered){
        let beat = timings[0];
        if(beat){
            let targetFrame = beat[0];
            let type = beat[1];

            accuracy = targetFrame - inputRegistered[0] + 1;
            if(type != inputRegistered[1]){
                accuracy = 500;
                accuracyCounter = 10;
            } else {
                if(abs(accuracy) <= 10){
                    timings.splice(0, 1);
                }
                accuracyCounter = 10;
            }
            inputRegistered = undefined;
        }
    }
    if(!DEBUG){
        drawBeats();
        drawAccuracy();
    }

    text(__get_text('SONGPLAY_ENERGY'), 480, 40);
    text(__get_text('STATS_POINTS'), 695, 40);
    drawEnergyBar(480, 50, 200, 20, energy / 100);
    textSize(25);
    text(points, 695, 68);

    let info = SONGS[CURRENT_SONG];
    text(info['author'], 20, 545);
    textSize(35);
    text(info['title'], 20, 520);
    if(songFrameCount != -1){
        songFrameCount++;
    }
}

function getAccuracy(acc){
    if(abs(acc) <= 1){
        return {"text": "SONGPLAY_PERFECT", "color": [0, 255, 0], "points": 50, "energy": 10};
    }
    if(abs(acc) <= 2){
        return {"text": "SONGPLAY_GOOD", "color": [100, 100, 255], "points": 30, "energy": 5};
    }
    if(abs(acc) <= 3){
        return {"text": "SONGPLAY_BAD", "color": [235, 168, 52], "points": 10, "energy": 0};
    }
    if(abs(acc) <= 10){
        return {"text": "SONGPLAY_MISS", "color": [255, 0, 0], "points": 0, "energy": -20};
    }
    return {"text": "SONGPLAY_MISS", "color": [255, 0, 0], "points": -10, "energy": -20};
}

function drawEnergyBar(x, y, w, h, per){
    c = [];
    if(per < 0.25){
        c = [255, 0, 0];
    } else if(per < 0.5){
        c = [235, 168, 52];
    } else if(per < 0.75){
        c = [100, 100, 255];
    } else {
        c = [0, 255, 0];
    }
    push();
    noStroke();
    fill(c);
    rect(x, y, w * per, h);
    noFill();
    stroke(0);
    rect(x, y, w, h);
    pop();
}

function drawTargets(){
    push();
    strokeWeight(2);
    for(let i = 0; i < TOTAL_TARGETS; i++){
        ellipse(TARGET_X + (TARGET_SPACING * i), TARGET_Y, TARGET_RADIUS);
    }
    pop();

}

function drawBeats(){
    push();
    noFill();
    imageMode(CENTER);
    for(let i = 0; i < timings.length; i++){
        let beat = timings[i];
        let targetFrame = beat[0];
        let type = beat[1];
        let frameDiff = targetFrame - songFrameCount;
        if(frameDiff > 60){
            break;
        }
        if(frameDiff < -5){
            timings.splice(i, 1);
            i--;
            accuracy = 500;
            accuracyCounter = 10;
            continue;
        }
        let img = type == 0 ? img_down : img_flip;
        image(img, TARGET_X + (type * TARGET_SPACING), -frameDiff * upf + TARGET_Y);
    }
    pop();
}

function drawAccuracy(){
    if(accuracyCounter == -1){
        return;
    }
    push();
    strokeWeight(1);
    textSize(25);
    textAlign(CENTER);
    let acc = getAccuracy(accuracy);
    if(accuracyCounter == 10){
        points += acc['points'];
        energy += acc['energy'];
        if(energy > 100){
            energy = 100;
        }
        if(energy <= 0){
            song.onended(() => {});
            song.stop();
            input_cooldown = 5;
            __set_game_mode(GM_STATS);
            return;
        }
        stats[acc['text']]++;
    }
    stroke(acc['color']);
    fill(acc['color']);
    text(__get_text(acc['text']), ACCURACY_BANNER_X, ACCURACY_BANNER_Y);
    pop();
    accuracyCounter--;
}

function gm_song_play_keyPressed(){
    if(DEBUG){
        if(key == 'A' || key == 'a'){
            debugTimings.push([songFrameCount-1, 0]);
        }
        if(key == 'S' || key == 's'){
            debugTimings.push([songFrameCount-1, 1]);
        }
    }
    if(key == 'A' || key == 'a'){
        animate = 10;
        inputRegistered = [songFrameCount, 0];
    }

    if(key == 'S' || key == 's'){
        flip = !flip;
        inputRegistered = [songFrameCount, 1];
    }
    if(key == 'Q' || key == 'q'){
        song.onended(()=> {});
        song.stop();
        input_cooldown = 1;
        if(DEBUG){
            __print_debug_timings();
        }
        __set_game_mode(GM_RETURN);
    }
}


/**
 *  STATS
 */
function gm_stats_draw(){
    background(255);
    textAlign(CENTER);
    noStroke();
    let msg = energy <= 0 ? 'STATS_FAILURE' : 'STATS_SUCCESS';
    let c = energy <= 0 ? [255, 0, 0] : [0, 255, 0];
    textSize(60);
    fill(c);
    text(__get_text(msg), width/2, 100);
    fill(0)
    let info = SONGS[CURRENT_SONG];
    textSize(35);
    text(info['title'], width/2, 150);
    textSize(25);
    text(info['author'], width/2, 180);
    textSize(20);
    if(input_cooldown == 0){
        text(__get_text('RETURN_INSTR'), width/2, height-80);
    }
    textAlign(LEFT);
    text(__get_text('SONGPLAY_PERFECT'), width/2 - 85, 250);
    text(__get_text('SONGPLAY_GOOD'),  width/2 - 85, 280);
    text(__get_text('SONGPLAY_BAD'),  width/2 - 85, 310);
    text(__get_text('SONGPLAY_MISS'),  width/2 - 85, 340);
    text(__get_text('STATS_POINTS'),  width/2 - 85, 370);
    textAlign(RIGHT);
    text(stats['SONGPLAY_PERFECT'], width/2 + 85, 250);
    text(stats['SONGPLAY_GOOD'], width/2 + 85, 280);
    text(stats['SONGPLAY_BAD'], width/2 + 85, 310);
    text(stats['SONGPLAY_MISS'], width/2 + 85, 340);
    text(points, width/2 + 85, 370);
}

function gm_stats_keyPressed(){
    if(key == 'A' || key == 'a'){
        __reset_song();
        __set_game_mode(GM_SONG_PLAY);
    }

    if(key == 'S' || key == 's'){
        __set_game_mode(GM_SONG_SELECT);
    }
}

/**
 *  PAUSE/RETURN
 */
function gm_return_draw(){
    fill(255);
    stroke(0);
    rect(width/4, height/4, width/2, height/2);
    textAlign(CENTER);
    fill(0);
    noStroke();
    textSize(20);
    if(input_cooldown == 0){
        text(__get_text('RETURN_INSTR'), width/2, height/2 - 20);
    }
    fill(255);
    stroke(255);
    rect(10, height-25, 400, 25);
}

function gm_return_keyPressed(){
    if(key == 'A' || key == 'a'){
        __reset_song();
        __set_game_mode(GM_SONG_PLAY);
    }

    if(key == 'S' || key == 's'){
        __set_game_mode(GM_SONG_SELECT);
    }
}

// Add onfocus event
window.addEventListener('focus', (e) => {
    focus();
});
