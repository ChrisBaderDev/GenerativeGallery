import p5 from "p5";
import { Form } from "./Form";
import { Eye } from "./Eye";
import type { FaceComponent } from "./FaceComponent";

export class Face {
  p: p5;
  components: FaceComponent[];
  width: number;
  height: number;
  center: p5.Vector;
  form: Form;
  leftEye: Eye;
  rightEye: Eye;

  constructor(p: p5, center: p5.Vector, width: number, height: number) {
    this.p = p;
    this.components = [];
    this.width = width;
    this.height = height;
    this.center = center;
    this.form = new Form(p, center, width, height);
    this.leftEye = this.createLeftEye(width, height);
    this.rightEye = this.createRightEye(width, height);

    // Add all components for common calls
    this.components.push(this.form, this.leftEye, this.rightEye);
  }

  public draw() {
    this.p.push();
    this.components.forEach((comp) => comp.draw());
    this.p.pop();
  }

  private createLeftEye(width: number, height: number): Eye {
    const faceCenter = this.center.copy();
    return new Eye(
      this.p,
      this.center.copy().add(new p5.Vector(-width / 4, -height / 8)),
      new p5.Vector(Math.random() * 5 - 2.5, Math.random() * 5 - 2.5),
      width / 10,
      width / 5,
      height / 10
    );
  }

  private createRightEye(width: number, height: number): Eye {
    const faceCenter = this.center.copy();
    return new Eye(
      this.p,
      this.center.copy().add(new p5.Vector(width / 4, -height / 8)),
      new p5.Vector(Math.random() * 5 - 2.5, Math.random() * 5 - 2.5),
      width / 10,
      width / 5,
      height / 10
    );
  }
}
