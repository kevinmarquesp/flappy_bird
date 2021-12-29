const sprites = new Image();
sprites.src = "../Assets/sprites.png";

const root = document.querySelector("#root");
const ctx = root.getContext("2d");


class FlappyBird {
  constructor() {
    this._sprite_xy = [0, 0];
    this._size = [33, 24];
    this._canvas_xy = [10, 50];
  }

  draw() {
    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      ...this._canvas_xy,
      ...this._size
    );
  }
}


class Background {
  constructor() {
    this._sprite_xy = [390, 0];
    this._size = [275, 204];
    this._canvas_xy = [
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
      ...this._canvas_xy,
      ...this._size
    );

    // Isso cria uma cópia do backgroud e coloca do lado... DELETAR
    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      this._canvas_xy[0] + this._size[0], this._canvas_xy[1],
      ...this._size
    );
  }
}


class Floor {
  constructor() {
    this._sprite_xy = [0, 610];
    this._size = [224, 112];
    this._canvas_xy = [
      0, root.height - this._size[1]
    ];
  }

  draw() {
    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      ...this._canvas_xy,
      ...this._size
    );

    // Isso cria uma cópia do chão e coloca do lado... DELETAR
    ctx.drawImage(
      sprites,
      ...this._sprite_xy,
      ...this._size,
      this._canvas_xy[0] + this._size[0], this._canvas_xy[1],
      ...this._size
    );
  }
}


const flappy_bird = new FlappyBird();
const background = new Background();
const floor = new Floor();
