import type p5 from "p5";
import { Network } from "./Network";
import { Attractor } from "./Attractor";

export default function (p: p5) {
  let parent: HTMLElement | null;
  let network: Network;

  // called once at startup
  p.setup = () => {
    parent = document.getElementById("p5-container")!;
    p.createCanvas(
      parent!.getBoundingClientRect().width,
      parent!.getBoundingClientRect().height
    );
    p.frameRate(30);

    let root = p.createVector(p.width / 2, p.height / 2);
    network = new Network(p, root, 10);

    // add some attractors randomly
    for (let i = 0; i < 1000; i++) {
      let pos = p.createVector(p.random(p.width), p.random(p.height));
      network.addAttractor(new Attractor(p, pos, 100, 10));
    }
  };

  // called every frame
  p.draw = () => {
    console.log(network.nodes.length);
    p.background(255);
    p.stroke(0);
    p.strokeWeight(2);
    p.noFill();

    // let the network grow one step
      network.grow();

    // draw the tree (lines from parent to child)
    network.draw();

    // optional: draw attractors as points
    p.noStroke();
    p.fill(255, 0, 0, 50);
    network.attractors.forEach((a) => {
      if (a.active) p.circle(a.position.x, a.position.y, 4);
    });
  };

  // called whenever window resizes
  p.windowResized = () => {
    p.resizeCanvas(
      parent!.getBoundingClientRect().width,
      parent!.getBoundingClientRect().height
    );
  };
}
