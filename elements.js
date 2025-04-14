class Cargo {
    constructor(x, y, player){
        this.x = x;
        this.y = y;
        //this.z = z;
        this.coordinate = createVector(x, y);
        this.speed = 0;
        this.direction = 0;
        this.hook = null;
        this.old_hook = null;
        this.player = player
        this.score = 0;

        switch (this.player) {
            case 0:
                this.red = 255;
                this.green = 255;
                this.blue = 0;
              break;
            case 1:
                this.red = 50;
                this.green = 250;
                this.blue = 215;
             
          }
        
        this.caught = false;
        this.r = 20;

    }
    attach(){
        for (let hok of circles){
            //console.log(hok)
            let dis = this.coordinate.dist(hok.hook_coordinate);
            
            //console.log(dis)
            if (dis < this.r-5 && hok != this.old_hook && hok.cargo == null && !this.caught && hok.active){
                
                this.hook = hok;
                this.hook.cargo = this
                //console.log("caught")
                this.caught = true
                


                this.hook.red = this.red
                this.hook.green = this.green
                this.hook.blue = this.blue


                if (this.hook.belong == null){
                    this.score += 1;
                    this.hook.belong = this
                    captured += 1
                } else if (this.hook.belong != this && this.hook.belong != null){
                    this.score += 1;
                    this.hook.belong.score -= 1;
                    this.hook.belong = this

                }
                break;

                


                }
        }
        
    }

    release(){

        this.hook.cargo = null;
        this.old_hook = this.hook;
        this.caught = false;
        //this.hook.active = false
        this.hook = null;
        //console.log("released"); 
         
    }

    move(){
        if(this.hook==null){
            this.coordinate.x += cos(this.direction) * this.speed;
            this.coordinate.y += sin(this.direction) * this.speed;
        } else {
            this.direction = this.hook.f+PI/2;
            this.coordinate.x = this.hook.hookx + cos(this.hook.f) * this.r/2;
            this.coordinate.y = this.hook.hooky + sin(this.hook.f) * this.r/2;
            this.speed = sin(this.hook.w) * this.hook.r;
            
        }
        if (this.coordinate.x > width || this.coordinate.x < 0 || this.coordinate.y > height || this.coordinate.y < 0) {

            switch (this.player) {
                case 0:
                    player_hook.active = true
                    cargo.hook = player_hook;
                    player_hook.cargo = cargo;
                  break;
                case 1:
                    player_hook2.active = true
                    cargo2.hook = player_hook2;
                    player_hook2.cargo = cargo2;
                 
              }
            
            
        }

    }

    show(){

        switch (this.player) {
            case 0:
                strokeWeight(1);
                stroke(255,255,255);
                fill(255,255,0);
              break;
            case 1:
                strokeWeight(1);
                stroke(255,255,255,255);
                fill(50,250,215);
             
          }
        
        ellipse(this.coordinate.x, this.coordinate.y, this.r);
    }
}

class Hook{
    constructor(x, y, r){
        this.x = random(600, x-600);
        this.y = random(400, y-400);
        this.coordinate = createVector(this.x, this.y);
        this.w = random(-0.05, 0.05); // 0.1;
        this.r = random(r2, r);
        this.f = 0;
        this.cargo = null;
        this.released = false;
        this.hookx = 0; 
        this.hooky = 0;
        this.red = 150;
        this.green = 150;
        this.blue = 150;

        this.active = true;

        this.belong = null;


        this.class = random([0, 1])
        if (this.class != 0){
            this.w = random(0.05, 0.1)-0.0003*this.r;
        } else {
            this.w = random(-0.1, -0.05)+0.0002*this.r;
        }

        this.class2 = random([1,2,3])

        //switch (this.class2) {
        //    case 1:
        //        this.red = 255;
        //        this.green = 0;
        //        this.blue = 0;
        //      break;
        //    case 2:
        //        this.red = 0;
        //        this.green = 255;
        //        this.blue = 0;
        //      break;
        //    case 3:
        //        this.red = 255;
        //        this.green = 0;
        //        this.blue = 255;
        //  }
       
    }

    rotate(){


            this.f += this.w;
            this.hookx = this.x + cos(this.f) * this.r; 
            this.hooky = this.y + sin(this.f) * this.r;
            this.hook_coordinate = createVector(this.hookx, this.hooky);
        
        
    }

    show(){

            var red = this.red
            var green = this.green
            var blue = this.blue
            //tint(255, 3);
            //push()
            noStroke()
            fill(red,green,blue, 55)
            circle(this.coordinate.x,this.coordinate.y, this.r)
            //pop()
            strokeWeight(6);
            stroke(red,green,blue, 255);
            line(this.coordinate.x,this.coordinate.y,this.hookx,this.hooky);

        

    }
}