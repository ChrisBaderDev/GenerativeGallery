import p5 from "p5";
import { Form } from "./Form";
import { Eye } from "./Eye";
import type { FaceComponent } from "./FaceComponent";
import { Hair } from "./Hair";

export class Face {
  p: p5;
  components: FaceComponent[];
  volatility: number;
  width: number;
  height: number;
  center: p5.Vector;
  form: Form;
  hair: Hair;
  leftEye: Eye;
  rightEye: Eye;

  constructor(p: p5, volatility: number, center: p5.Vector, width: number, height: number) {
    this.p = p;
    this.volatility = volatility;
    this.components = [];
    this.width = width;
    this.height = height;
    this.center = center;
    this.form = new Form(p, center, width, height, this.volatility);
    this.hair = new Hair(p, 50, 10, this.volatility, this.form.getScalp());
    this.leftEye = this.createLeftEye(width, height);
    this.rightEye = this.createRightEye(width, height);

    // Add all components for common calls
    this.components.push(this.form, this.hair, this.leftEye, this.rightEye);
  }

  public draw() {
    this.p.push();
    this.components.forEach((comp) => comp.draw());
    this.p.pop();
  }

  private createLeftEye(width: number, height: number): Eye {
    return new Eye(
      this.p,
      this.center.copy().add(new p5.Vector(-width / 4, -height / 8)),
      new p5.Vector(Math.random() * 5 - 2.5, Math.random() * 5 - 2.5),
      width / 10 * (Math.random() + 0.5),
      this.volatility,
      width / 5,
      height / 10
    );
  }

  private createRightEye(width: number, height: number): Eye {
    return new Eye(
      this.p,
      this.center.copy().add(new p5.Vector(width / 4, -height / 8)),
      new p5.Vector(Math.random() * 5 - 2.5, Math.random() * 5 - 2.5),
      width / 10 * (Math.random() + 0.5),
      this.volatility,
      width / 5,
      height / 10
    );
  }
}
