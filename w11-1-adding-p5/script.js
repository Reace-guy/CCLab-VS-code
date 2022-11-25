console.log('Test')
function setup() {
    createCanvas(400, 400);
    background(255, 0, 0);

    let cnv = createCanvas(400, 400)
    cnv.parent("canvasContainer")
}
function draw() {
    //
}
function buttonClicked() {
    background(random(255), random(255), random(255));
    alert("Clicked!🤣🤣")
}


