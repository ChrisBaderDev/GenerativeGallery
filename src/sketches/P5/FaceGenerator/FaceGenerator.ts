import p5 from "p5";
import { Form } from "./Form";
import { Eye } from "./Eye";
import { Face } from "./Face";

export default function (p: p5) {
  let parent: HTMLElement | null;
  let face: Face
  let noiseSeed = 0;
  let randomSeed = 0;

  let faceForm: Form;
  // called once at startup
  p.setup = () => {
    parent = document.getElementById("p5-container")!;
    p.createCanvas(parent!.clientWidth, parent!.clientHeight);
    face = new Face(p, new p5.Vector(p.width / 2, p.height / 2), 200, 400);
    p.frameCount = 60;
    p.noiseSeed(noiseSeed);
  };

  // called every frame
  p.draw = () => {
    p.background(220);
    face.draw();

    if (p.frameCount % 60 === 0) {
      noiseSeed++;
      p.noiseSeed(noiseSeed);
    }
  };

  // called whenever window resizes
  p.windowResized = () => {
    p.resizeCanvas(parent!.clientWidth, parent!.clientHeight);
  };
}
