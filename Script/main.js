/*
 *  GERENCIADOR DE TELAS: ???
 */

class Sections {
  constructor() {
    this._background = new Background();
    this._get_ready = new GetReady();
    this._floor = new Floor();
    this._flappy_bird = new FlappyBird();

    this.current_section = null;
    this._sprite_state = 0;
    this._frame = 0;
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


  // Atualiza o valor do frame atual, se for 15 ele muda o sprite do passarinho
  _update_frame() {
    const frame_rate = 15;
    const change_sprite = () => {
      if(this._sprite_state < 2) {
        this._sprite_state++;
      } else {
        this._sprite_state = 0;
      }
    }

    if(this._frame >= frame_rate) {
      change_sprite();
      this._frame = 0;
    }

    this._frame++;
  }


  _get_ready_section() {
    return {
      load: () => {
        this._background.render();
        this._floor.render();
        this._flappy_bird.render(this._sprite_state); // Desenha com o sprite atual
        this._get_ready.render();
      },

      update: () => {
        this._flappy_bird = new FlappyBird();

        this._floor.update();
        this._flappy_bird.update();

        this._update_frame();
      },

      click: () => {
        this.change_section(this.list().game);
      }
    };
  }


  _game_section() {
    return {
      load: () => {
        this._background.render();
        this._flappy_bird.render(this._sprite_state); // Desenha com o sprite atual
        this._floor.render();
      },

      update: () => {
        const flappybird_y = this._flappy_bird.root_xy[1] + this._flappy_bird.size[1];
        const floor_y = this._floor.root_xy[1];

        // Colisão: se a base do sprite bater no topo do chão...
        if(flappybird_y >= floor_y) {
          this.change_section(this.list().get_ready);
          return;
        }

        this._flappy_bird.update();
        this._floor.update();

        this._update_frame();
      },

      click: () => {
        this._flappy_bird.jump();
      }
    };
  }
}


// Qualquer tecla precionada faz o passarinho pular, junto com o click do mouse...
function loop() {
  root.onclick = sections.current_section.click;
  window.onkeydown = sections.current_section.click;

  sections.current_section.update();
  sections.current_section.load();

  requestAnimationFrame(loop);
}


const sections = new Sections();
sections.change_section(sections.list().get_ready);

loop();

