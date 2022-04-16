var score = 0;
var cross = true;
var gameover = new Audio('gameover.mp3');

document.onkeydown = function(e) {
    console.log("the code of key is", e.keyCode);
    if (e.keyCode == 38) {
        new Audio('jump.mp3').play();
        document.getElementById('dino').classList.add('animateDino');
        setTimeout(() => {
            document.getElementById('dino').classList.remove('animateDino');
        }, 700);
    } else if (e.keyCode == 39) {
        dino_x = parseInt(window.getComputedStyle(document.getElementById('dino'), null).getPropertyValue('left'));
        document.getElementById('dino').style.left = dino_x + 112 + "px";
    } else if (e.keyCode == 37) {
        dino_x = parseInt(window.getComputedStyle(document.getElementById('dino'), null).getPropertyValue('left'));
        document.getElementById('dino').style.left = (dino_x - 112) + "px";
    }
}

function updateScore(score) {
    document.getElementById('score').innerHTML = "Your Score is: " + score;
}

setInterval(() => {
    dino_x = parseInt(window.getComputedStyle(document.getElementById('dino'), null).getPropertyValue('left'));
    dino_y = parseInt(window.getComputedStyle(document.getElementById('dino'), null).getPropertyValue('top'));

    obstacle_x = parseInt(window.getComputedStyle(document.getElementById('obstacle'), null).getPropertyValue('left'));
    obstacle_y = parseInt(window.getComputedStyle(document.getElementById('obstacle'), null).getPropertyValue('top'));

    offsetX = Math.abs(dino_x - obstacle_x);
    offsetY = Math.abs(dino_y - obstacle_y);
    if (offsetX < 130 && offsetY < 170) {

        document.getElementById('gameover').style.visibility = 'visible';
        document.getElementById('play_button').style.visibility = 'visible';
        document.getElementById('score').classList.add('final_score');
        document.getElementById('obstacle').classList.remove('animateObstacle');
        document.getElementById('p_heading').classList.remove('animation_p_heading');
        gameover.play();
        setTimeout(() => {
            gameover.pause();
        }, 1200);

    } else if (offsetX < 130 && cross) {
        score = score + 50;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            animation_duration = parseFloat(window.getComputedStyle(document.getElementById('obstacle'), null).getPropertyValue('animation-duration'));
            new_duration = (animation_duration - 0.01);
            console.log("The animation duration is ", animation_duration);
            console.log("The new duration is ", new_duration);
            if (new_duration > 2) {
                document.getElementById('obstacle').style.animationDuration = new_duration + 's';
            }
        }, 800);
    }
}, 100);