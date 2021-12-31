/*
 *  GERENCIADOR DE TELAS: ???
 */

class Sections {
  constructor() {
    this._background = new Background();
    this._get_ready = new GetReady();
    this._floor = new Floor();
    this._flappy_bird = new FlappyBird();
    this._pipes = new Pipes();

    this.current_section;
    this._frame = 1;

    // Valores para a mudança do sprite do passarinho
    this._sprite_state = 0;
    this._sprite_next = 0;

    this._flappy_bird_body = {
      head: this._flappy_bird.root_xy[1],
      nose: this._flappy_bird.root_xy[0] + this._flappy_bird.size[0],
      foot: this._flappy_bird.root_xy[1] + this._flappy_bird.size[1]
    };

    this._pipes_arr = new Array();
  }


  // Isso é um setter para mudar a tela que está sendo carregada no momento
  change_section(new_section) {
    this.current_section = new_section;
  }


  // Getter de todas as telas que o jogo possui
  list() {
    return {
      get_ready: this._get_ready_section(),
      game: this._game_section()
    };
  }


  // ---------- [FUNÇÕES PRIVADAS DA CLASSE] ---------- //

  // Conta cada frame e volta depois que passar de 500
  update_frame() {
    this._change_flappybird_sprite();
    this._floor.local_update();

    if(this._frame >= 500) {
      this._frame = 1;
    } else {
      this._frame++;
    }
  }


  // A cada 15 frames, o sprite do flappybird muda
  _change_flappybird_sprite() {
    const flappybird_framerate = 15;

    if(this._frame % flappybird_framerate === 0) {
      if(this._sprite_state == 0 || this._sprite_state === 2) {
        this._sprite_state = 1;

      } else {
        this._sprite_state = this._sprite_next;
        this._sprite_next = this._sprite_next === 0 ? 2 : 0;
      }
    }
  }


  // Faz um par de canos aparecer a cada 120 frames
  _spawn_pipe() {
    const pipes_framerate = 120;

    if(this._frame % pipes_framerate === 0) {
      this._pipes_arr.push({
        x: root.width,
        y: -150 * (Math.random() + 1)
      });
    }
  }


  // Faz o flappybird perder se ele encostar em um dos canos..
  _pipe_colision(pair) {
    const fb = this._flappy_bird_body;
    const pipe_hitbox = {
      side: pair.x,
      top: pair.y + this._pipes.size[1],
      bottom: pair.y + this._pipes.size[1] + this._pipes.space
    };

    if(fb.nose >= pipe_hitbox.side) {
      if(fb.head <= pipe_hitbox.top) {
        this._is_dead();
      }

      if(fb.foot >= pipe_hitbox.bottom) {
        this._is_dead();
      }
    }
  }


  // Essa função é chamada quando o flappybird morrer...
  _is_dead() {
    sections.change_section(sections.list().get_ready);
  }


  // ---------- [FUNÇÕES PARA ATUALIZAR OS ELEMENTOS DA TELA] ---------- //
  
  // Faz o flappybird acelerar durante a queda
  _flappy_bird_update() {
    this._flappy_bird.speed += this._flappy_bird.grav;
    this._flappy_bird.root_xy[1] += this._flappy_bird.speed;
  }


  // Verifica se o flappybird colidiu com o chão
  _floor_update() {
    const fb = this._flappy_bird_body;
    const floor_ground = this._floor.root_xy[1];

    if(fb.foot >= floor_ground) {
      this._is_dead();
      return;
    }
  }


  // Limpa a quantidade de canos na tela e faz eles se moverem...
  _pipes_update() {
    this._pipes_arr.forEach(pair => {
      if(pair.x + this._pipes.size[0] <= 0) {
        this._pipes_arr.shift();
      }

      this._pipe_colision(pair);
      pair.x -= 2.5
    });
  }


  // ---------- [TELAS QUE O JOGO VAI CARREGAR] ---------- //

  _get_ready_section() {
    this._pipes_arr = new Array(); // Limpa a lista de canos, e tiras eles da tela...

    return {
      update: () => {
        this._flappy_bird = new FlappyBird(); // Cria um passarinho novo a todo momento, o que faz ele ficar parado
      },

      load: () => {
        this._background.render();
        this._floor.render();
        this._flappy_bird.render(this._sprite_state); // Desenha com o sprite atual
        this._get_ready.render();
      },

      click: () => {
        this.change_section(this.list().game);
      }
    };
  }


  _game_section() {
    return {
      update: () => {
        // Atualiza os valores de cada parte do corpo do passarinho...
        this._flappy_bird_body = {
          head: this._flappy_bird.root_xy[1],
          nose: this._flappy_bird.root_xy[0] + this._flappy_bird.size[0],
          foot: this._flappy_bird.root_xy[1] + this._flappy_bird.size[1]
        };

        this._pipes_update(); // Faz os canos se mexerem
        this._spawn_pipe();

        this._floor_update();
        this._flappy_bird_update();
      },

      load: () => {
        this._background.render();
        this._floor.render();
        this._flappy_bird.render(this._sprite_state); // Desenha com o sprite atual

        this._pipes.render(this._pipes_arr); // Desenha todos os pares de canos
      },

      // Mudas as variáveis do flappybird, fazendo ele pular
      click: () => {
        this._flappy_bird.speed = -this._flappy_bird.jump;
      }
    };
  }

}


const sections = new Sections();


// Qualquer tecla precionada faz o passarinho pular, junto com o click do mouse...
function loop() {
  root.onclick = sections.current_section.click;
  window.onkeydown = sections.current_section.click;

  sections.current_section.update();
  sections.current_section.load();

  sections.update_frame();

  requestAnimationFrame(loop);
}


sections.change_section(sections.list().get_ready);

loop();

