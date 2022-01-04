const root = document.querySelector("canvas#root");
const ctx =  root.getContext("2d");

const sprite_table = new Image();
sprite_table.src = "Assets/sprites.png";


// [ Classe para criar os sprites de carregaá-los na tela ]

class Sprite {
    constructor(sprite_xy, size_wh, root_xy, mv_xy = [0, 0]) {
        this.sprite_xy = sprite_xy;
        this.size_wh = size_wh;
        this.root_xy = root_xy;

        // Movimento do sprite
        this.mv_xy = mv_xy;
    }


    render() {
        this.root_xy[0] += this.mv_xy[0];
        this.root_xy[1] += this.mv_xy[1];

        ctx.drawImage(
            sprite_table,
            ...this.sprite_xy,      // Cordenadas do ponto de recorte
            ...this.size_wh,        // Tamanho do recorte
            ...this.root_xy,        // Cordenadas da posição do desenho
            ...this.size_wh         // Tamanho do desenho no canvas
        );
    }
}


// [ Configurações do jogo ]

let paused = false;
let fb_sprite_state = fb_next_state = 0;
let frame = 0;

// Coordenadas de cada sprite diferente do flappybird
const fb_states = [
    [0, 0], [0, 26], [0, 52]
];


// [ Informações de cada sprite ]

const background = new Sprite(
    [390, 0],
    [275, 204],
    [null, null]
);

const floor = new Sprite(
    [0, 610],
    [224, 112],
    [0, null],
    [-1, 0]
);

background.root_xy[1] = root.height - background.size_wh[1]; // Altura do fundo...
floor.root_xy[1] = root.height - floor.size_wh[1];  // Altura do chão...

const flappy_bird = new Sprite(
    fb_states[0],
    [33, 24],
    [25, 50]
);


