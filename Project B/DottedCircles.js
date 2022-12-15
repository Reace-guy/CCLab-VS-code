//create a class of ellipse bouncing slowly 

let wingsColor = "LightCoral";
let centralColor = "DeepPink";
let faceColor = "RosyBrown";
let NUM_OF_PARTICLES = 300;
let particles = [];

function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(0, 200, 255);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        //p.move();
        p.display();
    }
    // limit
    while (particles.length > NUM_OF_PARTICLES) {
        particles.splice(0, 1);
    }
    angleMode(DEGREES);

    //background (clouds)
    push();
    noStroke();
    ellipse(210, 45, 85, 30);
    ellipse(200, 40, 80, 50);
    pop();

    //drawDragonfly(width / 2, height / 2);
}

function keyPressed() {
    if (key == " ") {
        particles.push(new DragonFly(random(width), random(height)));
    }
}

//

class DragonFly {