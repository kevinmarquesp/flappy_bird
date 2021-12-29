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


  _get_ready_section() {
    return {
      load: () => {
        this._background.draw();
        this._get_ready.draw();
      },

      update: () => {
        return;
      },

      click: () => {
        this.change_section(this.list().game);
      }
    };
  }


  _game_section() {
    return {
      load: () => {
        this._background.draw();
        this._floor.draw();
        this._flappy_bird.draw();
      },

      update: () => {
        this._flappy_bird.update();
      },

      click: () => {
        return;
      }
    };
  }
}


function loop() {
  // Qualquer tecla precionada faz o passarinho pular, junto com o click do mouse...
  root.onclick = sections.current_section.click;
  window.onkeydown = sections.current_section.click;

  sections.current_section.update();
  sections.current_section.load();

  requestAnimationFrame(loop);
}


const sections = new Sections();
sections.change_section(sections.list().get_ready);

loop();

