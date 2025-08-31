import p5 from "p5";
import { Form } from "./Form";

export default function (p: p5) {
  let parent: HTMLElement | null;
  let faceForm: Form;
  // called once at startup
  p.setup = () => {
    parent = document.getElementById("p5-container")!;
    p.createCanvas(parent!.clientWidth, parent!.clientHeight);
    faceForm = new Form(p, new p5.Vector(p.width/2, p.height/2), 200, 400);
  };

  // called every frame
  p.draw = () => {
    p.background(220);
    faceForm.draw();
  };

  // called whenever window resizes
  p.windowResized = () => {
    p.resizeCanvas(parent!.clientWidth, parent!.clientHeight);
  };
}
