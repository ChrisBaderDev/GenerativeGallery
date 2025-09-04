import p5 from "p5";
import type { FaceComponent } from "./FaceComponent";

interface EyeOptions {
  center: p5.Vector;
  pupilOffset: p5.Vector;
  eyebrowOffset: p5.Vector;
  eyebrowLength: number;
  pupilDiameter: number;
  volatility: number;
  width: number;
  height: number;
}

export class Eye implements FaceComponent {
  p: p5;
  center: p5.Vector;
  pupilOffset: p5.Vector;
  eyebrowOffset: p5.Vector;
  eyebrowLength: number;
  pupilDiameter: number;
  volatility: number;
  width: number;
  height: number;

  constructor(
    p: p5,
    {
      center,
      pupilOffset,
      eyebrowOffset,
      eyebrowLength,
      pupilDiameter,
      volatility,
      width,
      height,
    }: EyeOptions
  ) {
    this.p = p;
    this.center = center;
    this.pupilOffset = pupilOffset;
    this.eyebrowOffset = eyebrowOffset;
    this.eyebrowLength = eyebrowLength;
    this.pupilDiameter = pupilDiameter;
    this.volatility = volatility;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.drawEyebrow();
    this.drawOutline();
    this.drawPupils();
  }

  private drawPupils() {
    this.p.push();
    this.p.fill(0);
    this.p.translate(this.center.copy().add(this.pupilOffset));
    this.p.circle(0, 0, this.pupilDiameter);
    this.p.pop();
  }

  private drawEyebrow() {
    this.p.push();
    this.p.translate(this.center.copy().add(this.eyebrowOffset));
    this.p.noFill();
    this.p.beginShape();

    const steps = 20; // number of eyebrow segments
    for (let i = 0; i <= steps; i++) {
      // x goes from -half length to +half length
      let x = this.p.map(
        i,
        0,
        steps,
        -this.eyebrowLength / 2,
        this.eyebrowLength / 2
      );

      // static noise — depends only on x + a random offset per eye
      let n = this.p.noise(x * 0.05, this.center.y);
      let y = this.height * 0.1 * (n - 0.5) * 2 * this.volatility;

      this.p.vertex(x, y);
    }

    this.p.endShape();
    this.p.pop();
  }

  private drawOutline() {
    this.p.push();
    this.p.beginShape();
    this.p.translate(this.center);
    this.p.beginShape();
    for (let angle = 0; angle < this.p.TWO_PI; angle += 0.05) {
      let x = (this.p.cos(angle) * this.width) / 2;
      let y = (this.p.sin(angle) * this.height) / 2;
      let nx = this.p.map(this.p.cos(angle), -1, 1, 0, 1);
      let ny = this.p.map(this.p.sin(angle), -1, 1, 0, 1);
      let n = this.p.noise(nx * this.volatility, ny * this.volatility, 1);
      let r = this.p.map(n, 0, 1, 0.8, 1.2);
      this.p.vertex(x * r, y * r);
    }
    this.p.endShape(this.p.CLOSE);
    this.p.pop();
  }
}
