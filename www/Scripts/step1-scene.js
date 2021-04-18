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
var mainBody;
var ballCenter;
var frictionSurface = 0.004;
var surfaceType = "Friction"
var bodyMass = 5;
var frictionSmooth = 0;

beginScene = function () {
engine = Engine.create({
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
mainBody = Bodies.circle(400, 394, 30,{
  friction: frictionSurface,
  restitution: 0.5, frictionAir: 0, isStatic: false, render: {
    fillStyle: "transparent",
    sprite : { texture: './images/ball.png', xOffset: 0, xScale : 1, yOffset : 0, yScale : 1 }
  }
});
mainBody.collisionFilter = {'group': -1, 'category': 4, 'mask': 2};
Matter.Body.setMass(mainBody, bodyMass);

gravityline = Bodies.rectangle(400, 450, 2.5, 50, { isStatic: true, render: { fillStyle: "black" } });
gravityText = Bodies.rectangle(400, 485, 20, 20, { isStatic: true, render: { fillStyle: "transparent", strokeStyle: "transparent", text: { content: "Fg", color: "black", size: 15 } } })
reactionline = Bodies.rectangle(400, 340, 2.5, 50, { isStatic: true, render: { fillStyle: "black" } });
reactionText = Bodies.rectangle(400, 305, 20, 20, { isStatic: true, render: { fillStyle: "transparent", strokeStyle: "transparent", text: { content: "FN", color: "black", size: 15 } } })
reactionTextWithForce = Bodies.rectangle(400, 305, 20, 20, { isStatic: true, render: { fillStyle: "transparent", strokeStyle: "transparent", visible: false, text: { content: "FN + Fsin(θ)", color: "black", size: 15 } } })
frictionlineright = Bodies.rectangle(437.5, 394, 75, 2.5, { isStatic: true, render: { fillStyle: "black", visible: false } });
frictionTextright = Bodies.rectangle(505, 394, 60, 20, { isStatic: true, render: { fillStyle: "transparent", strokeStyle: "transparent", visible: false, text: { content: "Ff", color: "black", size: 15 } } })
frictionlineleft = Bodies.rectangle(362.5, 394, 75, 2.5, { isStatic: true, render: { fillStyle: "black", visible: false } });
frictionTextleft = Bodies.rectangle(295, 394, 60, 20, { isStatic: true, render: { fillStyle: "transparent", strokeStyle: "transparent", visible: false, text: { content: "Ff", color: "black", size: 15 } } })

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
leftWall = Bodies.rectangle(60, 362.5, 20, 125, { isStatic: true, friction : 0, render: { fillStyle: "brown", strokeStyle: "transparent", lineWidth: 1 } });
rightWall = Bodies.rectangle(740, 362.5, 20, 125, { isStatic: true, friction : 0, render: { fillStyle: "brown", strokeStyle: "transparent", lineWidth: 1 } });

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
  reactionTextWithForce,
  frictionlineright,
  frictionTextright,
  frictionlineleft,
  frictionTextleft
]);
World.add(engine.world, [mainBody]);
Events.on(engine, 'beforeUpdate', function () {
  Matter.Body.setPosition(gravityline, { x: mainBody.position.x, y: 450 })
  Matter.Body.setPosition(gravityText, { x: mainBody.position.x, y: 485 })
  Matter.Body.setPosition(reactionline, { x: mainBody.position.x, y: 340 })
  Matter.Body.setPosition(reactionText, { x: mainBody.position.x, y: 305 })
  Matter.Body.setPosition(reactionTextWithForce, { x: mainBody.position.x, y: 305 })

  if (Math.abs(mainBody.position.x - mainBody.positionPrev.x) <= 0.1 || base.render.fillStyle !== "brown"){
    reactionTextWithForce.render.visible = false;
    frictionlineright.render.visible = false;
    frictionTextright.render.visible = false;
    frictionlineleft.render.visible = false;
    frictionTextleft.render.visible = false;
    reactionText.render.visible = true;
  }
  else if (mainBody.position.x < mainBody.positionPrev.x) {
    reactionText.render.visible = false;
    reactionTextWithForce.render.visible = true;
    frictionlineright.render.visible = true;
    frictionTextright.render.visible = true;
    frictionlineleft.render.visible = true;
    frictionTextleft.render.visible = true;
    frictionTextleft.render.text.content = "Ff";
    frictionTextright.render.text.content = "Fcos(θ)"
    Matter.Body.setPosition(frictionlineleft, { x: mainBody.position.x + 67.5, y: 394 })
    Matter.Body.setPosition(frictionTextleft, { x: mainBody.position.x + 135, y: 394 })
    Matter.Body.setPosition(frictionlineright, { x: mainBody.position.x - 67.5, y: 394 })
    Matter.Body.setPosition(frictionTextright, { x: mainBody.position.x - 135, y: 394 })
  }
  else if(mainBody.position.x > mainBody.positionPrev.x){
    reactionText.render.visible = false;
    reactionTextWithForce.render.visible = true;
    frictionlineleft.render.visible = true;
    frictionTextleft.render.visible = true;
    frictionlineright.render.visible = true;
    frictionTextright.render.visible = true;
    frictionTextright.render.text.content = "Ff";
    frictionTextleft.render.text.content = "Fcos(θ)"
    Matter.Body.setPosition(frictionlineright, { x: mainBody.position.x - 67.5, y: 394 })
    Matter.Body.setPosition(frictionTextright, { x: mainBody.position.x - 135, y: 394 })
    Matter.Body.setPosition(frictionlineleft, { x: mainBody.position.x + 67.5, y: 394 })
    Matter.Body.setPosition(frictionTextleft, { x: mainBody.position.x + 135, y: 394 })
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
    Body.applyForce(mainBody, { x: mainBody.position.x, y: mainBody.position.y }, { x: (HF * 70 / 100)/10, y: 0 });
}
applyHFL = function (HF) {
    Body.applyForce(mainBody, { x: mainBody.position.x, y: mainBody.position.y }, { x: (HF * 70 / 100)/10, y: 0 });
}

changeBodyPosition = function(newX) {
  if(typeof(mainBody) === "undefined" || mainBody === null)return;
  Matter.Body.applyForce(
    mainBody, 
    {x:mainBody.position.x, y:mainBody.position.y },
    { x: -1 *(mainBody.velocity.x * mainBody.mass) / Math.pow(Runner.create().deltaMin, 2), y: -1 *(mainBody.velocity.y * mainBody.mass) / Math.pow(Runner.create().deltaMin,2) }
  )
  Matter.Body.setPosition(mainBody, {x : newX, y : 394});
}

changeBaseBackground = function(surfaceTypeInput) {
  if(typeof(base) === "undefined" || base === null)return;
  surfaceType = surfaceTypeInput;
  base.render.fillStyle = surfaceType == "Smooth" ? "#9ED8F0" : "brown";
  mainBody.friction = surfaceType != "Smooth" ? frictionSurface : frictionSmooth;
} 

changeBody = function(bodyType) {
  if(typeof(mainBody) === "undefined" || mainBody === null)return;
  if(bodyType === "Ball") {
    World.remove(engine.world, [mainBody]);
    frictionSurface = 0.004;
    bodyMass = 5;
    mainBody = Bodies.circle(400, 394, 30, {
      friction: surfaceType == "Smooth" ? frictionSmooth : frictionSurface,
      restitution: 0.5, frictionAir: 0, isStatic: false, render: {
        fillStyle: "transparent",
        sprite : { texture: './images/ball.png', xOffset: 0, xScale : 1, yOffset : 0, yScale : 1 }
      }
    });
    mainBody.collisionFilter = { 'group': -1, 'category': 4, 'mask': 2 };
    Matter.Body.setMass(mainBody, bodyMass);
    World.add(engine.world, [mainBody]);
  }
  else if(bodyType === "Fishtank") {
    World.remove(engine.world, [mainBody]);
    frictionSurface = 0.007;
    bodyMass = 10;
    mainBody = Bodies.rectangle(400, 394, 60, 60, {
      friction: surfaceType == "Smooth" ? frictionSmooth : frictionSurface,
      restitution: 0.5, frictionAir: 0, isStatic: false, render: {
        fillStyle: "transparent",
        sprite : { texture: './images/fishtank.png', xOffset: 0, xScale : 1, yOffset : 0, yScale : 1 }
      }
    });
    mainBody.collisionFilter = { 'group': -1, 'category': 4, 'mask': 2 };
    Matter.Body.setMass(mainBody, bodyMass);
    World.add(engine.world, [mainBody]);
  }
  else if(bodyType === "Toycar") {
    World.remove(engine.world, [mainBody]);
    frictionSurface = 0.009;
    bodyMass = 15;
    mainBody = Bodies.rectangle(400, 394, 60, 60, {
      friction: surfaceType == "Smooth" ? frictionSmooth : frictionSurface,
      restitution: 0.5, frictionAir: 0, isStatic: false, render: {
        fillStyle: "transparent",
        sprite : { texture: './images/toycar1.png', xOffset: 0, xScale : 1, yOffset : 0, yScale : 1 }
      }
    });
    mainBody.collisionFilter = { 'group': -1, 'category': 4, 'mask': 2 };
    Matter.Body.setMass(mainBody, bodyMass);
    World.add(engine.world, [mainBody]);
  }
}
