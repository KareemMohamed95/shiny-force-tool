var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Body = Matter.Body,
Bodies = Matter.Bodies,
Mouse = Matter.Mouse,
Runner = Matter.Runner,
Events = Matter.Events,
MouseConstraint = Matter.MouseConstraint;
var engine;
var render;
var ballA;
var ballCenter;
var frictionSurface = 0.009;
var frictionSmooth = 0;

beginScene = function () {
engine = Engine.create({
  // positionIterations: 20
});
render = Render.create({
  element: document.getElementById("scene"),
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
    background: "#0993F3"
  }
});
ballA = Bodies.circle(400, 394, 30,{
  friction: frictionSurface,
  restitution: 0.5, frictionAir: 0, frictionStatic : 0, isStatic: false, render: {
    fillStyle: "#d9b51c",
    text: {
      content: "5kg",
      color: "black",
      size: 15,
    }
  }
});
ballA.collisionFilter = {
  'group': -1,
  'category': 4,
  'mask': 2
};
Matter.Body.setMass(ballA, 5);
gravityline = Bodies.rectangle(400, 475, 2.5, 100, { isStatic: true, render: { fillStyle: "black" } });
gravityText = Bodies.rectangle(400, 535, 20, 20, { isStatic: true, render: { fillStyle: "transparent", strokeStyle: "transparent", text: { content: "Fg", color: "black", size: 20 } } })
reactionline = Bodies.rectangle(400, 315, 2.5, 100, { isStatic: true, render: { fillStyle: "black" } });
reactionText = Bodies.rectangle(400, 255, 20, 20, { isStatic: true, render: { fillStyle: "transparent", strokeStyle: "transparent", text: { content: "FN", color: "black", size: 20 } } })
frictionlineright = Bodies.rectangle(480, 394, 100, 2.5, { isStatic: true, render: { fillStyle: "black", visible: false } });
frictionTextright = Bodies.rectangle(540, 394, 20, 20, { isStatic: true, render: { fillStyle: "transparent", strokeStyle: "transparent", visible: false, text: { content: "Ff", color: "black", size: 20 } } })
frictionlineleft = Bodies.rectangle(320, 394, 100, 2.5, { isStatic: true, render: { fillStyle: "black", visible: false } });
frictionTextleft = Bodies.rectangle(260, 394, 20, 20, { isStatic: true, render: { fillStyle: "transparent", strokeStyle: "transparent", visible: false, text: { content: "Ff", color: "black", size: 20 } } })

gravityline.collisionFilter.group = -1;
gravityText.collisionFilter.group = -1;
reactionline.collisionFilter.group = -1;
reactionText.collisionFilter.group = -1;
frictionlineright.collisionFilter = {'group' : -1}
frictionTextright.collisionFilter = {'group' : -1}
frictionlineleft.collisionFilter = {'group' : -1}
frictionTextleft.collisionFilter = {'group' : -1}

ground = Bodies.rectangle(400, 525, 800, 150, { isStatic: true, friction : 0, render: { fillStyle: "green", strokeStyle: "black", lineWidth: 1 } });
base = Bodies.rectangle(400, 437.5, 700, 25, { isStatic: true, friction : 0,render: { fillStyle: "brown", strokeStyle: "transparent", lineWidth: 1 } });
leftWall = Bodies.rectangle(60, 362.5, 20, 600, { isStatic: true, friction : 0, render: { fillStyle: "brown", strokeStyle: "transparent", lineWidth: 1 } });
rightWall = Bodies.rectangle(740, 362.5, 20, 600, { isStatic: true, friction : 0, render: { fillStyle: "brown", strokeStyle: "transparent", lineWidth: 1 } });

ground.collisionFilter = { category: 2, mask: 4 }
base.collisionFilter = { category: 2, mask: 4 }
leftWall.collisionFilter = { category: 2, mask: 4 }
rightWall.collisionFilter = { category: 2, mask: 4 }

World.add(engine.world, [
  ground,
  base,
  leftWall,
  rightWall,
  gravityline,
  gravityText,
  reactionline,
  reactionText,
  frictionlineright,
  frictionTextright,
  frictionlineleft,
  frictionTextleft
]);
World.add(engine.world, [ballA]);
Events.on(engine, 'beforeUpdate', function () {
  Matter.Body.setPosition(gravityline, { x: ballA.position.x, y: 475 })
  Matter.Body.setPosition(gravityText, { x: ballA.position.x, y: 535 })
  Matter.Body.setPosition(reactionline, { x: ballA.position.x, y: 315 })
  Matter.Body.setPosition(reactionText, { x: ballA.position.x, y: 255 })
  if (Math.abs(ballA.position.x - ballA.positionPrev.x) <= 0.1 || base.render.fillStyle !== "brown"){
    frictionlineright.render.visible = false;
    frictionTextright.render.visible = false;
    frictionlineleft.render.visible = false;
    frictionTextleft.render.visible = false;
  }
  else if (ballA.position.x < ballA.positionPrev.x) {
    frictionlineright.render.visible = false;
    frictionTextright.render.visible = false;
    frictionlineleft.render.visible = true;
    frictionTextleft.render.visible = true;
    Matter.Body.setPosition(frictionlineleft, { x: ballA.position.x + 80, y: 394 })
    Matter.Body.setPosition(frictionTextleft, { x: ballA.position.x + 140, y: 394 })
  }
  else if(ballA.position.x > ballA.positionPrev.x){
    frictionlineleft.render.visible = false;
    frictionTextleft.render.visible = false;
    frictionlineright.render.visible = true;
    frictionTextright.render.visible = true;
    Matter.Body.setPosition(frictionlineright, { x: ballA.position.x - 80, y: 394 })
    Matter.Body.setPosition(frictionTextright, { x: ballA.position.x - 140, y: 394 })
  }
});
Runner.run(engine);
Render.run(render);
}

initScene = function () {
if (document.getElementById("scene") === undefined || document.getElementById("scene") === null) {
  window.setTimeout(initScene, 500);
  return;
}
beginScene();
}

initScene();
applyHFR = function (HF) {
    Body.applyForce(ballA, { x: ballA.position.x, y: ballA.position.y }, { x: HF, y: 0 });
}
applyHFL = function (HF) {
    Body.applyForce(ballA, { x: ballA.position.x, y: ballA.position.y }, { x: HF, y: 0 });
}

changeBodyMass = function(newMass) {
    if(typeof(ballA) === "undefined" || ballA === null)return;
    Matter.Body.setMass(ballA, newMass);
    ballA.render.text.content = newMass.toString()+"kg"
}

changeBodyPosition = function(newX) {
  if(typeof(ballA) === "undefined" || ballA === null)return;
  Matter.Body.applyForce(
    ballA, 
    {x:ballA.position.x, y:ballA.position.y },
    { x: -1 *(ballA.velocity.x * ballA.mass) / Math.pow(Runner.create().deltaMin, 2), y: -1 *(ballA.velocity.y * ballA.mass) / Math.pow(Runner.create().deltaMin,2) }
  )
  Matter.Body.setPosition(ballA, {x : newX, y : 394});
}

changeBaseBackground = function() {
  if(typeof(base) === "undefined" || base === null)return;
  base.render.fillStyle = base.render.fillStyle === "brown" ? "#9ED8F0" : "brown";
  ballA.friction = base.render.fillStyle === "brown" ? frictionSurface : frictionSmooth;
} 