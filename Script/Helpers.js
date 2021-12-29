const sprites = new Image();
sprites.src = "../Assets/sprites.png";

const root = document.querySelector("#root");
const ctx = root.getContext("2d");


/*
 *  FLAPPY BIRD: ???
 */

class FlappyBird {
  constructor() {
    this._sprite_xy = [0, 0];
    this._size = [33, 24];
    this._root_xy = [10, 50];

    this._grav = .2;
    this._speed = 0;
  }


  draw() {
    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      ...this._root_xy,
      ...this._size
    );
  }


  update() {
    // Soma a constante gravitacional com a velocidade (faz a queda acelerar)
    if(this._root_xy[1] < root.height) {
      this._speed += this._grav;
      this._root_xy[1] += this._speed;
    }
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

  draw() {
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

    // Isso cria uma cópia do backgroud e coloca do lado... DELETAR
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
    this._root_xy = [
      0, root.height - this._size[1]
    ];
  }

  draw() {
    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      ...this._root_xy,
      ...this._size
    );

    // Isso cria uma cópia do chão e coloca do lado... DELETAR
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


  draw() {
    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      ...this._root_xy,
      ...this._size
    );
  }
}

