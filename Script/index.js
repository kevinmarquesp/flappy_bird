

// [ Função principal que faz o jogo carregar ]

function update_game() {
    frame_rate();

    if(!paused) {
        load_background();
        load_floor();

        update_fb_sprite();

        current_section.update();
        current_section.load();
    }

    window.onkeydown = current_section.click;
    root.onclick = current_section.click;

    requestAnimationFrame(update_game);
}


update_game();
