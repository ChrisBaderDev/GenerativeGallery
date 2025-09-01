import p5 from "p5";
import type { FaceComponent } from "./FaceComponent";

export class Eye implements FaceComponent{
  p: p5;
  center: p5.Vector;
  pupilOffset: p5.Vector;
  pupilDiameter: number;
  volatility: number;
  width: number;
  height: number;

  constructor(
    p: p5,
    center: p5.Vector,
    pupilOffset: p5.Vector,
    pupilDiameter: number,
    volatility: number,
    width: number,
    height: number
  ) {
    this.p = p;
    this.center = center;
    this.pupilOffset = pupilOffset;
    this.pupilDiameter = pupilDiameter;
    this.volatility = volatility;
    this.width = width;
    this.height = height;
  }

  draw() {
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
