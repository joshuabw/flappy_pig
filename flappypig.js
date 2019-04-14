var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');


var pig = new Image();
var background = new Image();
var floorground = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

pig.src = "images/pig.png";
background.src = "images/background.jpeg";
floorground.src = "images/floorground.jpeg";
pipeUp.src = "images/pipe_up.png";
pipeDown.src = "images/pipe_down.png";

//pipe gap
var gap = 150;
var constant;

//pig starting position
var pig_x = 10;
var pig_y = 150;

//gravity fall speed
var gravity = 1;

//initial score
var score = 0;
// on key down

//press keydown to double the moving speed
document.addEventListener("keydown", moveUp);

//keydown move up speed
function moveUp(){
    pig_y -= 20;
    fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(background,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeUp.height+gap;
        ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeDown,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 50 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeUp.height)-pipeUp.height
            }); 
        }

        // detect collision
        
        if( pig_x + pig.width >= pipe[i].x && pig_x <= pipe[i].x + pipeUp.width && (pig_y <= pipe[i].y + pipeUp.height || pig_y+pig.height >= pipe[i].y+constant) || pig_y + pig.height >=  cvs.height - floorground.height){
            location.reload(); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            
        }
        
        
    }

    ctx.drawImage(floorground, 0, cvs.height - floorground.height);
    
    ctx.drawImage(pig, pig_x, pig_y);
    
    pig_y += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " +score, 20, cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();

















draw();