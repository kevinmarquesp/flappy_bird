const secs = new Section();
const get_local_storage = localStorage.getItem("best_score");

secs.current = secs.list().get_ready_sec;
secs.best_score =
    get_local_storage ? JSON.parse(get_local_storage) : 0;
    // Seleciona o best_score do armazenamento local...


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


update_game();

root.onclick = () => secs.current.click();
window.onkeydown = k => {
    switch(k.code) {
        case "Space":
            secs.current.click();
            break;

        case "Enter":
            paused = !paused;
            add_text(
                "P A U S E",
                [(root.width / 2) - 10, root.height - 30],
                "center"
            );

            break;
    }
};


