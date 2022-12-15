//text assignment 

//using speech library to recognize the speech
//get the string 
//display them in terms of length of the string -WORKING IN PROGRESS
//map the texts to the color code - accordingly - create composition - poem 

//touch space bar to begin game
//eascape ESCAPE to exit the game 
//Enter to save the file of your own creaiton 

var myRec = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)
myRec.interimResults = false; // allow partial recognition (faster, less accurate)
myRec.continuous = true; // do continuous recognition

let word;
let words = [];
let speechString;
let textRec;
let timerforStartGame = 5;
let tempColor = 0;
let myCanvas;
let buttonGreet, inputName, greeting;
let greeted = false;
let gamePhase = "instructions";
let myFont;


function preload() {

    myFont = loadFont('NanumPenScript-Regular.ttf');
}

function setup() {
    myCanvas = createCanvas(600, 600);
    myRec.start();
    myRec.onResult = showResult; // bind callback function to trigger when speech is recognized
    colorMode(HSB, 100);
    nameInput();
}


function nameInput() {

    greeting = createElement('paragraph', 'Type your name');
    greeting.position(width / 2 - greeting.width / 2, height / 4);

    inputName = createInput();
    inputName.position(width / 2 - inputName.width / 2, height / 3.5);

    buttonGreet = createButton('submit');
    buttonGreet.position(width / 2 - buttonGreet.width / 2, height / 3
    );
    buttonGreet.mousePressed(greet);

}

function keyPressed() {

    //should use KEYPRESSED since it wont work here 
    if (key == " ") {
        //space bar
        gamePhase = "start";
        console.log("space bar typed");
    }
    if (keyCode === ESCAPE) {
        //ESCAPE key    
        console.log("ESCAPE key typed");
        gamePhase = "exit";
    }
    if ((key == 's') || ((key == 'S'))) {
        //enter key - 13 - ENTER
        gamePhase = "save";
        console.log("save the frame");
        // saveFrame();

    }
}
function greet() {
    startGame();
    const name = inputName.value();
    inputName.value('');
    console.log("name" + name);
    greeted = true;
}

function draw() {
    background(225);


    instructions();
    textFont(myFont);

    if (greeted) {
        buttonGreet.hide();
        inputName.hide();
        greeting.hide();

        if (gamePhase == "start") {
            startGame();
        }
        if (gamePhase == "exit") {
            exitGame();
        }
    }

}

function instructions() {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(width / 10);
    text('Release your wish', width / 2, height / 8);

    push();
    textSize(width / 15);
    textAlign(CENTER, BOTTOM);
    text('Space Bar to Start', width / 2, height / 2);
    text('Escape Key to End', width / 2, height / 8 * 5);
    // text('S to Save', width / 2, height / 8 * 6);
    pop();

}

function startGame() {
    background(220);
    //convert the speech into string 
    text('Say something', width / 2, height / 8 * 3);
    //in 2 seconds, show another blank screen
    text(timerforStartGame, width / 2, height / 2);

    if (frameCount % 60 == 0 && timerforStartGame > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timerforStartGame--;
    }
    if (timerforStartGame == 0) {
        background(220);
        showResult();

    }
}

function exitGame() {

    background(220);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(width / 10);
    // text('Save your secret by pressing S key', width / 2, height * 9 / 10);

}


function mapResultToColor(tempWord, tempPos) {
    // noStroke();
    push();
    if (tempWord.length > 0) {
        let tempWordAjustment = tempWord.length * 15;
        tempColor = map(tempWordAjustment, 0, 360, 0, width);
        console.log(tempColor);
        // fill(tempColor, random(20, 50), random(30, 80));
        fill(tempColor, 100, 100);

        ellipseMode(CENTER);
        noStroke();
        for (let i = 0; i < tempWordAjustment; i++) {
            ellipse(width / 2, tempPos, random(width / 15, width / 10));

        }
    }
    pop();
}

function showResult() {
    if (myRec.resultValue == true) {
        textRec = myRec.resultString;
        words = split(textRec, ' ');
        console.log(words);

        /********************Display String Descending ****************/

        //sort the words 
        let wordsSortted = words.sort((a, b) => b.length - a.length);
        let leading = width / 8;

        console.log(wordsSortted);

        /////if the length of sorted exceed - redraw on top of it/////////

        for (let i = 0; i < wordsSortted.length; i++) {
            mapResultToColor(wordsSortted[i], height / 8 + leading);

            push();
            fill(0);
            textSize(width / 13);
            text(wordsSortted[i], width / 2, height / 8 + leading);
            pop();


            if (i >= 8) {
                i = 0;
            }
            leading += width / 8;
            if (leading > height) {
                leading = width / 8;
            } //still have problems of overlapping - could place them into random places - but need to calculate the length/size of the string 
        }
    }

}