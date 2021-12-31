const sprites = new Image();
sprites.src = "Assets/sprites.png";

const root = document.querySelector("#root");
const ctx = root.getContext("2d");


/*
 *  FLAPPY BIRD: ???
 */

class FlappyBird {
  constructor() {
    // Array com as cordenadas dos sprites na tabela
    this._states = [
      [0, 0], [0, 26], [0, 52]
    ];

    this._sprite_xy = this._states[0];

    // Necessário para o cálculo da colisão
    this.size = [33, 24];
    this.root_xy = [10, 50];

    // Constantes para fazer o flappybird pular
    this.grav = .2;
    this.speed = 0;
    this.jump = 4.2;
  }


  render(sprite_state) {
    this._sprite_xy = this._states[sprite_state];

    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this.size,
      ...this.root_xy,
      ...this.size
    );
  }
}


/*
 *  BACKGROUND SPRITE: ???
 */

class Background {
  constructor() {
    this._sprite_xy = [390, 0];
    this._size = [275, 204];
    this._root_xy = [
      0, root.height - this._size[1]
    ];
  }


  render() {
    // Desenha a cor de fundo para o `root`
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(
      0, 0, root.width, root.height
    );

    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      ...this._root_xy,
      ...this._size
    );

    // Isso cria uma cópia do backgroud e coloca do lado...
    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      this._root_xy[0] + this._size[0], this._root_xy[1],
      ...this._size
    );
  }
}


/*
 *  FLOOR SPRITE: ???
 */

class Floor {
  constructor() {
    this._sprite_xy = [0, 610];
    this._size = [224, 112];

    // Necessário para o cálculo da colisão
    this.root_xy = [
      0, root.height - this._size[1]
    ];
  }


  render() {
    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      ...this.root_xy,
      ...this._size
    );

    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      this.root_xy[0] + this._size[0], this.root_xy[1],
      ...this._size
    );
  }


  // Faz o chão se mover para o lado (não tem relação com o jogo)
  local_update() {
    const floor_x = this.root_xy[0];
    const reset_pos = -this._size[0] / 2;

    if(floor_x <= reset_pos) {
      this.root_xy[0] = 0;
    }

    this.root_xy[0]--;
  }
}


/*
 *  GETREADY SPRITE: ???
 */

class GetReady {
  constructor() {
    this._sprite_xy = [134, 0];
    this._size = [174, 152];

    // NOTA: -10 por causa do menu lateral
    this._root_xy = [
      root.width / 2 - this._size[0] / 2 - 10,
      50 
    ];
  }


  render() {
    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      ...this._root_xy,
      ...this._size
    );
  }
}


/*
 *  PIPES: ???
 */

class Pipes {
  constructor() {
    this._floor_xy = [0, 169];
    this._sky_xy = [52, 169];

    this.size = [52, 400];
    this.space = 95;
  }


  render(pipes_arr) {
    pipes_arr.forEach(pair => {
      const root_sky_xy = [
        pair.x, pair.y
      ];

      const root_floor_xy = [
        pair.x,
        pair.y + this.size[1] + this.space 
      ];

      ctx.drawImage(
        sprites,
        ...this._sky_xy,
        ...this.size,
        ...root_sky_xy,
        ...this.size
      );

      ctx.drawImage(
        sprites,
        ...this._floor_xy,
        ...this.size,
        ...root_floor_xy,
        ...this.size
      );
    });
  }
}


/*
 *  SCOREBOARD: ???
 */

class Scoreboard {
  constructor() {
    this._root_xy = [10, 30]
  }


  render(str) {
    ctx.font = "30px 'VT323'";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";

    ctx.fillText(
      `Score: ${str}`,
      ...this._root_xy
    )
  }
}


class GameOver {
  constructor() {
    this._sprite_xy = [134, 152];
    this._size = [226, 201];

    // NOTA: -10 por causa do menu lateral
    this._root_xy = [
      root.width / 2 - this._size[0] / 2 - 10,
      50 
    ];

    this._score_root_xy = [230, 145];
    this._best_root_xy = [230, 185];

    this._sprite_empty_medal = [0, 78];
    this._sprite_bronze_medal = [48, 124];
    this._sprite_silver_medal = [48, 78];
    this._sprite_gold_medal = [0, 124];

    this._medal_size = [44, 44];
    this._medal_root_xy = [63, 137];
  }


  render(score, best) {
    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      ...this._root_xy,
      ...this._size
    );

    this._render_text(score, best);
    this._render_medal(score);
  }


  _render_text(score, best) {
    ctx.font = "20px 'VT323'";
    ctx.fillStyle = "white";
    ctx.textAlign = "right";

    ctx.fillText(score, ...this._score_root_xy);
    ctx.fillText(best, ...this._best_root_xy);
  }


  _render_medal(score) {
    if(score >= 100) {
      ctx.drawImage(
        sprites,
        ...this._sprite_gold_medal,
        ...this._medal_size,
        ...this._medal_root_xy,
        ...this._medal_size
      );

    } else if(score >= 66) {
      ctx.drawImage(
        sprites,
        ...this._sprite_silver_medal,
        ...this._medal_size,
        ...this._medal_root_xy,
        ...this._medal_size
      );

    } else if(score >= 33) {
      ctx.drawImage(
        sprites,
        ...this._sprite_bronze_medal,
        ...this._medal_size,
        ...this._medal_root_xy,
        ...this._medal_size
      );

    } else if(score < 33) {
      ctx.drawImage(
        sprites,
        ...this._sprite_empty_medal,
        ...this._medal_size,
        ...this._medal_root_xy,
        ...this._medal_size
      );
    }
  }
}
