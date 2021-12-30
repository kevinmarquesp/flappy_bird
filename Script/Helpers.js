const sprites = new Image();
sprites.src = "../Assets/sprites.png";

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

    this._grav = .2;
    this._speed = 0;
    this._jump = 5.2;
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


  // Soma a constante gravitacional com a velocidade (faz a queda acelerar)
  update() {
    this._speed += this._grav;
    this.root_xy[1] += this._speed;
  }


  jump() {
    this._speed = -this._jump;
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

    // Isso cria uma cópia do chão e coloca do lado...
    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      this.root_xy[0] + this._size[0], this.root_xy[1],
      ...this._size
    );
  }


  // Faz o chão se mover para o lado
  update() {
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

