class Section {
    constructor() {
        this.current;

        this._pipe_arr = new Array();
        this._score = this.best_score = 0;
    }


    // Getter que dá acesso a todas as telas do jogo
    list() {
        return {
            get_ready_sec: this._get_ready_sec(),
            game_sec: this._game_sec(),
            game_over_sec: this._game_over_sec()
        };
    }

    
    // [ Funções privadas de cada sessão ]

    _floor_sky_colision() {
        const fb_top = flappy_bird.root_xy[1];
        const fb_bottom = flappy_bird.root_xy[1] + flappy_bird.size_wh[1];

        const sky = 0;
        const floor_top = floor.root_xy[1];

        if(fb_bottom > floor_top || fb_top < sky) {
            this._lose_the_game();
        }
    }


    _spawn_pipes() {
        const frame_rate = 65;

        const gap = flappy_bird.size_wh[1] * 4;
        const y_axis = random(-350, -170);
        const speed = 4;

        if(frame % frame_rate === 0) {
            const pipe_1 = new Sprite(
                [52, 169],
                [52, 400],
                [root.width, y_axis]
            );

            const pipe_2 = new Sprite(
                [0, 169],
                [52, 400],
                [
                    // Desce o tamanho do cano, e desce mais o gap...
                    root.width, y_axis + pipe_1.size_wh[1] + gap
                ]
            );

            // Adiciona os canos gerados na lista, e faz eles se moverem
            this._pipe_arr.push(pipe_1, pipe_2);
            pipe_1.mv_xy[0] = pipe_2.mv_xy[0] = -speed;
        }
    }


    _pipe_colision(e) {
        // Anatomia do flappybird; no entanto, a hitbox foi diminuida...
        const fb = {
            top: flappy_bird.root_xy[1] +4,
            front: flappy_bird.root_xy[0] + flappy_bird.size_wh[0] -4,
            bottom: flappy_bird.root_xy[1] + flappy_bird.size_wh[1] -4,
            back: flappy_bird.root_xy[0] +6
        };

        // Anatomia dos canos
        const pipe = {
            top: e.root_xy[1],
            front: e.root_xy[0] + e.size_wh[0],
            bottom: e.root_xy[1] + e.size_wh[1],
            back: e.root_xy[0]
        };


        const x_area =
            fb.bottom > pipe.top && fb.top < pipe.bottom;
            // Verifica se o flappybird está dentro do eixo X de um dos canos

        const y_area =
            fb.front > pipe.back && fb.back < pipe.front;
            // Verifica se o flappybird está dentro do exio Y de um dos canos

        // Se ele estiver nos dois, significa que o player colidiu com o cano!
        if(x_area && y_area) {
            this._lose_the_game();
        }
    }


    // Salva o best_score no armazenamento local e troca sessão para a tela de game over...
    _lose_the_game() {
        this.best_score =
            this._score > this.best_score ? this._score : this.best_score;

        localStorage.setItem("best_score", JSON.stringify(this.best_score));
        this.current = this.list().game_over_sec;
    }


    // Verifica se o cano colidiu e tira ele do this._pipe_arr quando sair da tela...
    _update_pipe_arr() {
        this._pipe_arr.forEach(e => {
            const pipe_front = e.root_xy[0] + e.size_wh[0];

            this._pipe_colision(e);

            if(pipe_front < 0) {
                if(e.root_xy[1] < 0) {
                    this._score++;
                }

                this._pipe_arr.shift();
            }
        });
    }


    // Seleciona um sprite para medalha com base na pontuação e no bestscore :D
    _update_medal() {
        const empty = [0, 78];
        const bronze = [48, 124];
        const silver = [48, 78];
        const gold = [0, 124];

        if(this._score < 10) {
            return empty;

        } else if(this._score >= this.best_score) {
            return gold;

        } else if(this._score > this.best_score / 2) {
            return silver;

        } else if(this._score >= 10) {
            return bronze;
        }
    }


    // [ Telas que o jogo vai carregar ]

    _get_ready_sec() {
        const gr_sprite = new Sprite(
            [134, 0],
            [174, 152],
            [null, 50]
        );

        // Centraliza o sprite no centro da tela
        gr_sprite.root_xy[0] =
            (root.width / 2) - (gr_sprite.size_wh[0] / 2) - 10;

        return {
            update: () => {
                flappy_bird.root_xy = [25, 50]; // Muda a posição do flappybird na tela
                flappy_bird.mv_xy[1] = 0;       // Desativa a gravidade X dele
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
        const gravity = .2; // Velocidade que será somada ao movimento de queda
        const jump = 4.2;   // Velocidade do pulo (chamada de forma negativa)

        return {
            update: () => {
                flappy_bird.mv_xy[1] += gravity;

                this._floor_sky_colision();
                this._spawn_pipes();
                this._update_pipe_arr();
            },

            // Carrega o flappybird e todos os canos na tela
            load: () => {
                flappy_bird.render();
                this._pipe_arr.forEach(e => {
                    e.render();
                });

                // Escreve a pontuação do player no canto
                add_text(
                    `Score: ${this._score}`,
                    [10, 20], "left"
                );
            },

            click: () => {
                flappy_bird.mv_xy[1] = -jump;
            }
        };
    }


    _game_over_sec() {
        const medal = new Sprite(
            [0, 78],    // A medalha padrão eh nenhuma...
            [44, 44],
            [63, 137]
        );

        const game_over = new Sprite(
            [134, 152],
            [226, 201],
            [null, 50]
        );

        // Centraliza a tela de game_over no meio do canvas
        game_over.root_xy[0] =
            (root.width / 2) - (game_over.size_wh[0] / 2) - 10;

        return {
            update: () => {
                medal.sprite_xy = this._update_medal();

                // Faz o player e os canos ficarem parados na tela...
                flappy_bird.mv_xy[1] = 0;
                this._pipe_arr.forEach(e => {
                    e.mv_xy[0] = 0;
                });
            },

            load: () => {
                flappy_bird.render();
                this._pipe_arr.forEach(e => {
                    e.render();
                });

                game_over.render();
                medal.render();

                add_text(this._score, [240, 140], "right");
                add_text(this.best_score, [240, 180], "right");
            },

            click: () => {
                this._pipe_arr = new Array();
                this._score = 0;

                this.current = this.list().get_ready_sec;
            }
        };
    }
}


