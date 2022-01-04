// [ Gerenciador de sessões para o jogo ]

class Section {
    constructor() {
        this.current;
    }


    list() {
        return {
            get_ready_sec: this._get_ready_sec(),
            game_sec: this._game_sec()
        };
    }


    // Sessões que o jogo pode carregar

    _get_ready_sec() {
        const gr_sprite = new Sprite(
            [134, 0],
            [174, 152],
            [null, 50]
        );

        gr_sprite.root_xy[0] =
            (root.width / 2) - (gr_sprite.size_wh[0] / 2) - 10;

        return {
            update: () => {
                flappy_bird.mv_xy[1] = 0;
            },

            load: () => {
                flappy_bird.render();
                gr_sprite.render();
            },

            click: () => {
                this.current = this.list().game_sec;
            }
        };
    }

    _game_sec() {
        const gravity = .2;
        const jump = 4.2;

        return {
            update: () => {
                flappy_bird.mv_xy[1] += gravity;
                return;
            },

            load: () => {
                flappy_bird.render();
            },

            click: () => {
                flappy_bird.mv_xy[1] = -jump;
                return;
            }
        };
    }
}


// [ Função principal que faz o jogo carregar ]

function update_game() {
    frame_rate();

    if(!paused) {
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

window.onkeydown = (e) => {
    switch(e.code) {
        case "Space":
            secs.current.click();
            break;

        case "Enter":
            paused = !paused;
            break;
    }
};

root.onclick = () => secs.current.click();
