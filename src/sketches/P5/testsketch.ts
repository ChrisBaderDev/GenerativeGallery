import type p5 from "p5";

export default function (p: p5) {
  let parent: HTMLElement | null;

  // called once at startup
  p.setup = () => {
    parent = document.getElementById("p5-container")!;
    p.createCanvas(parent!.getBoundingClientRect().width, parent!.getBoundingClientRect().height);
    p.frameRate(144);
  };

  // called every frame
  p.draw = () => {
    p.background(30);
    p.fill(200, 100, 255);
    p.noStroke();

    // draw a circle that follows mouse
    p.circle(p.mouseX, p.mouseY, 50);
  };

  // called whenever window resizes
  p.windowResized = () => {
    p.resizeCanvas(parent!.getBoundingClientRect().width, parent!.getBoundingClientRect().height);
  };
}
