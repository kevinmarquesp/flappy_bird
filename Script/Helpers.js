function load_floor() {
    const floor_reset = floor.size_wh[0] / 2;   // Limita para dar um reset

    // Se metade do sprite sair da tela, ele volta...
    if(floor.root_xy[0] < -floor_reset) {
        floor.root_xy[0] = 0;
    }

    // Carrega o chão e depois põe o X pra direita
    floor.render();
    floor.root_xy[0] += floor.size_wh[0];

    // Carrega o chão e depois põe o X pra esquerda denovo
    floor.render();
    floor.root_xy[0] -= floor.size_wh[0];

}


// Reseta sempre no frame 120, voltando pro 1
function frame_rate() {
    frame++;
    frame %= 120;
}


function load_background() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, root.width, root.height);

    // Reseta o valor de X para o lado esquerdo da tela
    background.root_xy[0] = 0;
    background.render();

    // Desenha outro sprite, mas do lado da primeiro sprite
    background.root_xy[0] = background.size_wh[0];
    background.render();
}


function update_fb_sprite() {
    if(frame % 15 === 0) {
        switch(fb_sprite_state) {
            case 0: case 2:
                fb_next_state = fb_sprite_state ? 0 : 2;
                fb_sprite_state = 1;
                break;

            default:
                fb_sprite_state = fb_next_state;
        }

        flappy_bird.sprite_xy = fb_states[fb_sprite_state];
    }
}
