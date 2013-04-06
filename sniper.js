var paper = Raphael('paper');
paper.setSize(800, 600);

var setAgents = function (num) {
  document.getElementById('agents').innerHTML = num;
};

function Agent(r) {
  this.r = r;
  this.alive = true;
  this.circle = paper.circle();
  this.range = paper.circle();
};

Agent.prototype.update = function () {
  this.circle.attr('cx', this.x);
  this.circle.attr('cy', this.y);
  this.circle.attr('r', 3);
  this.circle.attr('stroke-width', 0);
  
  
  this.range.attr('cx', this.x);
  this.range.attr('cy', this.y);
  this.range.attr('r', this.r);
  this.range.attr('fill', '#0000');
  this.range.attr('stroke-width', 1);
  
  if (this.alive) {
    this.circle.attr('fill', 'black');
    this.range.attr('stroke', 'black')
  } else {
    this.circle.attr('fill', 'red');
    this.range.attr('stroke', 'red')
  }
}

var agents = [];
for (var i = 0; i < 20; i++)
  agents.push(new Agent(10));

setAgents(agents.length);

function Sniper(r) {
  this.r = r;
  this.x = r + Math.random() * (paper.width - 2 * r);
  this.y = r + Math.random() * (paper.height - 2 * r);
};

Sniper.prototype.reveal = function(alive) {
  var color = alive ? 'black' : 'red';
  paper.circle(this.x, this.y, 3)
      .attr('fill', color)
      .attr('stroke-width', 0);
  paper.circle(this.x, this.y, this.r)
      .attr('fill', '#0000')
      .attr('stroke', color)
      .attr('stroke-width', 1);
};

var sniper = new Sniper(150);

paper.canvas.onclick = function(evt) {
  if (agents.length) {
    var agent = agents.pop();
    
    agent.x = evt.offsetX;
    agent.y = evt.offsetY;
    
    var dx = agent.x - sniper.x;
    var dy = agent.y - sniper.y;
    var r = Math.sqrt(dx * dx + dy * dy);
    
    if (r < agent.r) {
      // You win!
      sniper.reveal(false);
      // Stop the game.
      agents.length = 0;
    } else if (r < sniper.r) {
      // This agent is dead.
      agent.alive = false;
      setAgents(agents.length);
      if (agents.length == 0) {
        // You lose.
        sniper.reveal(true);
      }
    } else {
      // Use this agent again.
      agents.unshift(agent);
    }
    
    agent.update();
  }
};
