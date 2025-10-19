const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: {
    preload,
    create,
    update
  }
};

//TEMP
//DELETE THIS BEFORE PUSHING
const bigList = [[1, 2, 3], [4, 5, 6]]


const game = new Phaser.Game(config);


let player;
let cursors;
let bullets;
let aliens;
let lastFired = 0;


function preload() {
    //resize revsprite
    // ^prob don't need any more
    // maybe push images then use url??? think
  this.load.image('player', 'src/images/usethisrev (1).png');
  this.load.image('bullet', 'https://labs.phaser.io/assets/sprites/bullet.png');
  this.load.image('alien', 'src/images/longhornthing.png');
}

function create() {
  player = this.physics.add.sprite(400, 550, 'player').setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
  bullets = this.physics.add.group();
  aliens = this.physics.add.group();

    let yayornay = "no";
  // Create alien grid
  for (let y = 0; y < 4; y+=1.5) {
    for (let x = 0; x < 10; x+=2) {
      aliens.create(80 + x * 60, 80 + y * 50, 'alien');
    }
  }


//var txt = this.add.text(x, y, 'hello');
//^ EXAMPLE CODE REMEMBER THIS

  this.input.keyboard.on('keydown-SPACE', () => {
    this.physics.pause();
    while(yayornay !== "yes")
    {

        const index = Math.floor(Math.random() * bigList.length);
        var termtxt = this.add.text(20, 10, bigList[index][0]);
        termtxt.Visible = true;
        var defintxt = this.add.text(30, 30, "Enter the correct definition: ");
        defintxt.Visible = true;
        defintxt.Visible = false;
        var def = prompt();
        var deftxt= this.add.text(40, 50, def);
        deftxt.Visible = true;
        //display correct def
        var isrightplease = this.add.text(30, 400, "Is this correct? Enter yes or no.");
        isrightplease.Visible = true;
        var yayornay = prompt();
        termtxt.Visible = false;
        deftxt.Visible = false;
        isrightplease.Visible = false;
    }
    this.physics.resume()

    //ADD THING HERE
    const bullet = bullets.create(player.x, player.y - 20, 'bullet');
    bullet.setVelocityY(-400);
  });

  this.physics.add.overlap(bullets, aliens, hitAlien, null, this);

;
}

function update(time) {
  if (cursors.left.isDown) {
    player.setVelocityX(-300);
  } else if (cursors.right.isDown) {
    player.setVelocityX(300);
  } else {
    player.setVelocityX(0);
  }

}

function hitAlien(bullet, alien) {
  bullet.destroy();
  alien.destroy();
}



//full_export_text