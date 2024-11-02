const WIDTH= 400;
const HEIGHT = 300;
const BLOCK_SIZE = 10;

let snake = null;//instance de l'objet c'est - à - dire un seul ou un arret
let Foods= [];

class Snake{ //objet qui renferme les instance de l'objet
    constructor ({x =0,y = 0,dirX = 1, dirY = 0, color = "yellow"} = {}){ //sachant que le snake il va de gauche à droit ou de haut en bas(lorseque la dirX=1 et dirY=0 le snake marche horizontalement mais lorsque la dirX=0 et dirY=-1 la marche est verticale)
        this.x =x; //la référence des variable à l'intérieur de ma classe
        this.y =y;
        this.dirX =dirX;
        this.dirY =dirY;
        this.color =color;//définition des choses à l'extérieur du serpent pour qu'on puisse le placé sur la grille
        this.speed=BLOCK_SIZE;//déplacement de block par block
        this.length=2;//longueur du snake deux block
        this.tail=[];
      
    } //definition de le direction de l'instanciation pour le démarrage
    dir(dir){
        switch(dir){
            case "up":
                if(this.dirY === 1){
                    return;
                }//pour bloquer le retournement de direction à la mm position
                this.dirX= 0;
                this.dirY= -1;
                break;
            case "right":
                if(this.dirX === -1){
                    return;
                }
                this.dirX= 1;
                this.dirY= 0;
                break;
            case "down":
                if(this.dirY === -1){
                    return;
                }
                this.dirX= 0;
                this.dirY= 1;
                break;
            case "left":
                if(this.dirX === 1){
                    return;
                }
                this.dirX= -1;
                this.dirY= 0;
                break;

        }
    }
    fillColor(){
       const ColorTab= {
            yellow: [255, 177, 30],
            blue : [57, 177, 198],
            orange : [209, 98, 0],
            darkblue : [39, 121, 134],
            lightblue : [240, 249, 238],
       } ;

       const colors =ColorTab[this.color] || "darkblue";

       fill(colors[0],colors[1],colors[2]);
    }//methode de couleur
    draw() {
        this.fillColor();//le remplir de couleur
        rect(this.x, this.y,BLOCK_SIZE,BLOCK_SIZE);//rectangle à la position x et ses cotés vu que c'est un carrée
        this.tail.forEach(({x, y}) => {
            rect(x, y,BLOCK_SIZE,BLOCK_SIZE);
        });//pour chaque this.tail
    } //création d'une méthode pour dessiner notre snake
    move() {
        if(this.tail.length === this.length){
            this.tail.shift();//pour effacer le premier element creé  du tableau
        }
        if(this.tail.length < this.length){
            this.tail.push({
                x: this.x,
                y: this.y,
            });
        }//si la longueur de tail est inférieur à lenght qui vaut 2 ==> si tail contient 0(null),1,2
        this.x += this.dirX * this.speed;//additionner la position par la direction prise fois nombre de block parcourir
        this.y += this.dirY * this.speed;

        this.tail.forEach(({x, y}) => {
            if (this.x === x && this.y === y){
                this.reset();
            }
        })
        if (this.x >= WIDTH){
            this.x = 0;
        }
        if(this.x < 0){
            this.x = WIDTH;
        }
        if (this.y >= HEIGHT){
            this.x = 0;
        }
        if(this.y < 0){
            this.x = HEIGHT;
        }

        // reset(){
        //     this.tail.splice(0, this.tail.length - 2);
        //     this.length = 2;
        // }
    }//création d'une méthode pour le faire bouger
}//creation de la structure du snake

class food{
    constructor({x = 0, y = 0} = {}){
        this.x = x;
        this.y = y;
    }

    draw(){
        fill(255, 0, 0);
        rect(this.x+1, this.y+1, BLOCK_SIZE-2, BLOCK_SIZE-2);
    }
}

function setup(){
    createCanvas(WIDTH,HEIGHT);
    const randDir = Math.random()< .5 ? 1 : 0 // qui renvoie un nombre inférieur à 1

    frameRate(5);//changer le frame par seconde
    snake = new Snake ({
        //random permet d'avoir un nombre au hasard entre deux nombre qui sont ces paramètres
        //parseInt permet de transformer les nombre en entier
        x: parseInt(random(0, WIDTH)/ BLOCK_SIZE) * BLOCK_SIZE,
        y: parseInt(random(0, HEIGHT)/ BLOCK_SIZE) * BLOCK_SIZE,
        dirX : randDir === 1 ? 1 : 0,//si randdir==1 alor dirX=1 ou 0
        dirY : randDir === 0 ? 1 : 0,
    });//instancié l'enfant à l'objet (toute les valeurs y est)

    Foods.push (new food({
        x: parseInt(random(0, WIDTH)/ BLOCK_SIZE) * BLOCK_SIZE,
        y: parseInt(random(0, HEIGHT)/ BLOCK_SIZE) * BLOCK_SIZE,
        dirX : randDir === 1 ? 1 : 0,//si randdir==1 alor dirX=1 ou 0
        dirY : randDir === 0 ? 1 : 0,
    }));
}

function draw(){
    background(0);

    snake.draw();
    snake.move();

    Foods[0].draw();
    if(collideRectRect(snake.x, snake.y, BLOCK_SIZE, BLOCK_SIZE, Foods[0].x + 1, Foods[0].y + 1, BLOCK_SIZE-2, BLOCK_SIZE - 2)){
        Foods.shift();
        Foods.push (new food({
            x: parseInt(random(0, WIDTH)/ BLOCK_SIZE) * BLOCK_SIZE,
            y: parseInt(random(0, HEIGHT)/ BLOCK_SIZE) * BLOCK_SIZE,
            // dirX : randDir === 1 ? 1 : 0,//si randdir==1 alor dirX=1 ou 0
            // dirY : randDir === 0 ? 1 : 0,
        }));
        snake.length++; 
    }
}//s'effectue 60 frame  par  seconde

function keyPressed(){
    switch(keyCode){
        case UP_ARROW:
            snake.dir("up");
            break;
        case RIGHT_ARROW:
            snake.dir("right");
            break;
        case DOWN_ARROW:
            snake.dir("down");
            break;
        case LEFT_ARROW:
            snake.dir("left");
            break;

    }
}