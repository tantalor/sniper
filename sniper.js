var paper = Raphael('paper');
paper.setSize(800, 600);

var setAgents = function (num) {
  document.getElementById('agents').innerHTML = num;
};

var agents = [];
for (var i = 0; i < 20; i++)
  agents.push(paper.circle());

setAgents(agents.length);

function Sniper(r) {
  this.r = r;
  this.x = r + Math.random() * (paper.width - 2 * r);
  this.y = r + Math.random() * (paper.height - 2 * r);
};

var sniper = new Sniper(150);

var rkill = 20;

paper.canvas.onclick = function(evt) {
  if (agents.length) {
    var agent = agents.pop();
    
    var x = evt.offsetX, y = evt.offsetY;
    // var a = paper.circle(x, y, 3).;
    agent.attr('cx', x);
    agent.attr('cy', y);
    agent.attr('r', 3);
    agent.attr('stroke-width', 0);
    // debugger;
    
    var dx = x - sniper.x;
    var dy = y - sniper.y;
    var r2 = dx * dx + dy * dy;
    if (r2 < rkill * rkill) {
      paper.circle(sniper.x, sniper.y, sniper.r)
          .attr('fill', '#0000')
          .attr('stroke', 'red')
          .attr('stroke-width', 1);
      paper.circle(sniper.x, sniper.y, rkill)
          .attr('fill', '#0000')
          .attr('stroke', 'black')
          .attr('stroke-width', 1);
      agent.attr('fill', 'black');
      agents.unshift(agent);
    } else if (r2 < sniper.r * sniper.r) {
      agent.attr('fill', 'red');
    } else {
      agent.attr('fill', 'black');
      agents.unshift(agent);
    }
        
    setAgents(agents.length);
  }
};
