const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16
canvas.height = 64 * 9

const collisionBlocks = []

const parsedCollisions = collisionsLevel1.parse2D()
parsedCollisions.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 292) {
            collisionBlocks.push(
                new collisionBlock({
                position: {
                    x: x * 64,
                    y: y * 64,
                },
            })
          )
        }
    })
})

const backgroundLevel1 = new Sprite ({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/backgroundLevel1.png'
})

const player = new Player({
    collisionBlocks,
    imageSrc: './img/king/idle.png',
})

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    }
}

function animate() {
    window.requestAnimationFrame(animate)

    backgroundLevel1.draw()
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw()
    })

    player.velocity.x = 0
    if (keys.d.pressed){
        player.velocity.x = 5
    } else if (keys.a.pressed){
        player.velocity.x = -5
    } 

    player.draw()
    player.update()

}

animate()
