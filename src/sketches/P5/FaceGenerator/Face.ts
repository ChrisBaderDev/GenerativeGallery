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

  constructor(
    p: p5,
    volatility: number,
    center: p5.Vector,
    width: number,
    height: number
  ) {
    this.p = p;
    this.volatility = volatility;
    this.components = [];
    this.width = width;
    this.height = height;
    this.center = center;
    this.form = this.createForm();
    this.hair = this.createHair();
    this.leftEye = this.createLeftEye(this.width, this.height);
    this.rightEye = this.createRightEye(this.width, this.height);

    // Add all components for common calls
    this.components.push(this.form, this.hair, this.leftEye, this.rightEye);
  }

  public draw() {
    this.p.push();
    this.components.forEach((comp) => comp.draw());
    this.p.pop();
  }

  private createHair(): Hair {
    return new Hair(this.p, {
      length: 50,
      density: 10,
      volatility: this.volatility,
      scalp: this.form.getScalp(),
    });
  }

  private createForm(): Form {
    return new Form(this.p, {
      center: this.center,
      width: this.width,
      height: this.height,
      volatility: this.volatility,
    });
  }

  private createLeftEye(width: number, height: number): Eye {
    return new Eye(this.p, {
      center: this.center.copy().add(new p5.Vector(-width / 4, -height / 8)),
      pupilOffset: new p5.Vector(
        Math.random() * 5 - 2.5,
        Math.random() * 5 - 2.5
      ),
      eyebrowOffset: new p5.Vector(
        this.p.random(-1, 1),
        this.p.random(-height / 20, -height / 10)
      ),
      eyebrowLength: (Math.random() * width) / 5 + width / 10,
      pupilDiameter: (width / 10) + Math.random(),
      volatility: this.volatility,
      width: width / 5,
      height: height / 10,
    });
  }

  private createRightEye(width: number, height: number): Eye {
    return new Eye(this.p, {
      center: this.center.copy().add(new p5.Vector(this.width / 4, -this.height / 8)),
      pupilOffset: new p5.Vector(
        Math.random() * 5 - 2.5,
        Math.random() * 5 - 2.5
      ),
      eyebrowOffset: new p5.Vector(
        this.p.random(-1, 1),
        this.p.random(-height / 20, -height / 10)
      ),
      eyebrowLength: (Math.random() * width) / 5 + width / 10,
      pupilDiameter: (width / 10) + Math.random(),
      volatility: this.volatility,
      width: width / 5,
      height: height / 10,
    });
  }
}
