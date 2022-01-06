function update_game() {
    if(!paused) {
        frame_rate();

        load_background();
        load_floor();

        update_fb_sprite();

        secs.current.update();
        secs.current.load();
    }

    requestAnimationFrame(update_game);
}


const secs = new Section();
secs.current = secs.list().get_ready_sec;


update_game();

root.onclick = () => secs.current.click();

window.onkeydown = k => {
    switch(k.code) {
        case "Space":
            secs.current.click();
            break;

        case "Enter":
            paused = !paused;
            break;
    }
};


