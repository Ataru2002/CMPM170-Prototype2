import "crisp-game-lib";

const title = "ScaryBox";

const description = ``;

const characters : any = [];

const jack: Vector = vec(50, 50);
const activator: Vector = vec(90, 90);
let chance: number = 100;

function update() {
  if (!ticks) {
    
  }
  box(activator, 12, 12);
  if(Math.floor(Math.random() * score) == chance){
    color("red");
    box(jack, 16, 16);
    end("game over");
  }else{
    color("black");
    box(jack, 16, 16);
  }
  if(input.isJustPressed && activator.x - 6 <= input.pos.x && input.pos.x <= activator.x + 6 && activator.y - 6 <= input.pos.y && input.pos.y <= activator.y + 6){
    addScore(1, activator);
  }
}


init({
  update,
  title,
  description,
  characters,
  options: {},
});