import "crisp-game-lib";

const title = "Cannons";

const description = ``;

const characters : any = [];



let enemies: Vector[];
let cannons: Vector[];
let bullets: Vector[];
let coords: Vector[] = [vec(100, 30), vec(100, 50), vec(100, 70), vec(100, 90)];

function update() {
  if (!ticks) {
    enemies = [];
    bullets = [];
    cannons = [vec(10, 30), vec(10, 50), vec(10, 70), vec(10, 90)];
  }

  console.log(difficulty);
  //enemies spawner
  let chance = Math.floor(rnd(Math.floor(50 / difficulty)));
  if (!chance) {
    let posSpawn = Math.floor(rnd(3));
    let insert: Vector = vec(coords[posSpawn].x, coords[posSpawn].y);
    enemies.push(insert);
  }

  //enemies moving
  enemies!.forEach((enemy) => {
    enemy.x--;
  });
  enemies.forEach(() => {
    remove(enemies, (p) => {
      return p.x <= 0;
    });
  });
  //bullets moving
  bullets!.forEach((bullet) => {
    bullet.x++;
  });
  bullets.forEach(() => {
    remove(bullets, (p) => {
      return p.x >= 100;
    });
  });

  cannons!.forEach((p) => {
    color("green");
    box(p, 10, 10);
    if(input.isJustPressed && p.x - 5 <= input.pos.x && input.pos.x <= p.x + 5 && p.y - 5 <= input.pos.y && input.pos.y <= p.y + 5){
      bullets.push(vec(p.x + 8, p.y));
    }
  });
  bullets.forEach((p) => {
    color("blue");
    box(p, 3, 3);
  });
  enemies!.forEach((p) => {
    color("black");
    remove(enemies, (p) => {
      let ok: boolean = false;
      if(box(p, 16, 16).isColliding.rect?.blue){
        ok = true;
        remove(bullets, (bullet) => {
          return box(bullet, 3, 3).isColliding.rect?.black;
        });
        addScore(Math.floor(difficulty), p);
      } 
      return ok;
    });
    if (box(p, 15, 15).isColliding.rect?.green) {
      end("Game Over");
    }
  });
  console.log(bullets);
}


init({
  update,
  title,
  description,
  characters,
  options: {},
});