var inc = 0.1;
var scl = 40;
var cols, rows;
let n_cargo = 40;
let n_hooks;
let cargos = [];
let hooks = [];
var r = 10;
var r2 = 30;
var l;
var sizer = 50;
//var zoff = 0;
var circles = [];
let extraCanvas;
let timer = 0;
let timer_start = false;
let extraCanvas2;
let f = 0;
let end_hook;
let link = "";
let player1score  = 0;
let player2score = 0;
let cargo;
let cargo2;
let player_hook;
let player_hook2;
let captured = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  randomSeed(0);

  l = ( height / scl)
  
  //fr = createP("");

  //let circ1 = new Hook(width, height, r, 0.01);
  //circles.push(circ1);
  
  n_hooks = 50;

  var circle = new Hook(200, height/2, r);
  circle.x = 300;
  circle.y = height/2
  circle.r = 50;
  circle.w = 0.1
  circle.coordinate = createVector(circle.x, circle.y)
  circle.red = 255;
  circle.green = 255;
  circle.blue = 255;
  circles.push(circle);
  var circle2 = new Hook(200, height/2, r);
  circle2.x = width-300;
  circle2.y = height/2
  circle2.r = 50;
  circle2.w = -0.1
  circle2.coordinate = createVector(circle2.x, circle2.y)
  circle2.red = 255;
  circle2.green = 255;
  circle2.blue = 255;
  circles.push(circle2);

  cargo = new Cargo(0,0,0);
  cargo2 = new Cargo(0,0,1);
  player_hook = circle
  player_hook2 = circle2;
  cargo.hook = player_hook;
  player_hook.cargo = cargo;
  cargo2.hook = player_hook2;
  player_hook2.cargo = cargo2;
  
  while (circles.length < n_hooks) {
    var circle = new Hook(width, height, r);

    var overlapping = false;
    var protection = 0;
    for (let j = 0; j < circles.length; j++){
      var other = circles[j];
      var d = other.coordinate.dist(circle.coordinate);
      if (d < other.r + circle.r) {
        overlapping = true;
        break;
      }
     
      }
    if (!overlapping) {
        circles.push(circle);
    }
    protection++
    if (protection > 10000) {
      break;
    }
  }

  //n_hooks = cols * rows;
  //for (var y = 0; y < rows; y++) {
  //  for (var x = 0; x < cols; x++) {
  //    let hoook = new Hook(x*scl+sizer, y*scl+sizer, l, random(-0.1,0.1));
  //    hooks.push(hoook)
  //    
  //    }
  //    
  //}
  //let cargo = new Cargo(0,0);
  //let start_hook = hooks[cols*(rows-1)]
  //end_hook = hooks[cols-1];
  //cargo.hook = start_hook;
  //start_hook.cargo = cargo;
  //cargos.push(cargo);
}

function draw() {
  
  
  background(0);

  textSize(75)
  
  fill(255,255,0);
  text(round(cargo.score, 2), 400, height-200);
  fill(50,250,215);
  text(round(cargo2.score, 2), width-400, height-200);

  if (captured == circles.length-2){
    if (cargo.score > cargo2.score){

      fill(255,255,0);
      text("Game Over! Player 1 wins!", width/2, height-200);

    } else {
      fill(50,150,255);
      text("Game Over! Player 2 wins!", width/2, height-200);
    }
    
    
  }


  
  for (let cir of circles){
    cir.rotate();
    cir.show();
  }

  
  cargo.move();
  
  if (!cargo.caught){
    cargo.attach();
    
    //console.log("checked")
  }
  cargo.show()

  cargo2.move();
  if (!cargo2.caught){
    cargo2.attach();
    player2score = cargo2.score
  }
  cargo2.show()
  
  //fr.html(floor(frameRate()))
  f += 0.01;


}

function keyPressed() {
  // https://www.toptal.com/developers/keycode
  if (keyCode == 65) {
    cargo.release();
     
  }
  if (keyCode == 83 && cargo.hook == null) {
   

      cargo.hook = player_hook;
      player_hook.cargo = cargo;
       
    
  }

  if (keyCode == 76) {
    cargo2.release(); 
  }
  if (keyCode == 75 && cargo2.hook == null) {
    

      cargo2.hook = player_hook2;
      player_hook2.cargo = cargo2;

    
  }
  

}
