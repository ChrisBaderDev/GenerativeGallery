import p5 from "p5";
import type { FaceComponent } from "./FaceComponent";

export interface FormOptions {
  center: p5.Vector;
  width: number;
  height: number;
  volatility: number;
}

export class Form implements FaceComponent{
  p: p5;
  center: p5.Vector;
  width: number;
  height: number;
  volatility: number;
  vertices: p5.Vector[] = [];

  constructor(p: p5, { center, width, height, volatility }: FormOptions) {
    this.p = p;
    this.center = center;
    this.width = width;
    this.height = height;
    this.volatility = volatility;
    this.updateVertices();
  }

  private updateVertices() {
    this.vertices = [];
    for (let angle = 0; angle < this.p.TWO_PI; angle += 0.05) {
      let x = (this.p.cos(angle) * this.width) / 2;
      let y = (this.p.sin(angle) * this.height) / 2;
      let nx = this.p.map(this.p.cos(angle), -1, 1, 0, 1);
      let ny = this.p.map(this.p.sin(angle), -1, 1, 0, 1);
      let n = this.p.noise(nx * this.volatility, ny * this.volatility, 1);
      let r = this.p.map(n, 0, 1, 0.8, 1.2);

      this.vertices.push(
        this.p.createVector(this.center.x + x * r, this.center.y + y * r)
      );
    }
  }

  draw() {
    this.updateVertices();
    this.p.push();
    this.p.beginShape();
    this.vertices.forEach(v => this.p.vertex(v.x, v.y));
    this.p.endShape(this.p.CLOSE);
    this.p.pop();
    // this.drawScalp();
  }

  drawScalp() {
    this.p.push();
    this.p.stroke(255, 0, 0);
    this.p.strokeWeight(10);
    this.p.beginShape();
    this.getScalp().forEach(v => this.p.vertex(v.x, v.y));
    this.p.endShape();
    this.p.pop();
  }

  getScalp(): p5.Vector[] {
    // filter vertices above the center (top half)
    const top = this.vertices.filter(v => v.y <= this.center.y - this.height / 10);

    // you may want to close it by connecting last → first
    return top;
  }
}
