import p5 from "p5";
import type { FaceComponent } from "./FaceComponent";

export interface FormOptions {
  center: p5.Vector;
  width: number;
  height: number;
  volatility: number;
}

export class Form implements FaceComponent {
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
    this.vertices.forEach((v) => this.p.vertex(v.x, v.y));
    this.p.endShape(this.p.CLOSE);
    this.p.pop();
    // this.drawEarPositions();
    // this.drawScalp();
  }

  drawScalp() {
    this.p.push();
    this.p.stroke(255, 0, 0);
    this.p.strokeWeight(10);
    this.p.beginShape();
    this.getScalp().forEach((v) => this.p.vertex(v.x, v.y));
    this.p.endShape();
    this.p.pop();
  }

  getScalp(): p5.Vector[] {
    // filter vertices above the center (top half)
    const top = this.vertices.filter(
      (v) => v.y <= this.center.y - this.height / 10
    );

    // you may want to close it by connecting last → first
    return top;
  }

  drawEarPositions() {
    const earPositions = this.getEarPositions();
    this.p.push();
    this.p.fill(255, 0, 0);
    this.p.circle(
      earPositions.leftEarCenter.x,
      earPositions.leftEarCenter.y,
      10
    );
    this.p.circle(
      earPositions.rightEarCenter.x,
      earPositions.rightEarCenter.y,
      10
    );
    this.p.circle(
      earPositions.leftEarTop.x,
      earPositions.leftEarTop.y,
      10
    );
    this.p.circle(
      earPositions.rightEarTop.x,
      earPositions.rightEarTop.y,
      10
    );
    this.p.circle(
      earPositions.leftEarBottom.x,
      earPositions.leftEarBottom.y,
      10
    );
    this.p.circle(
      earPositions.rightEarBottom.x,
      earPositions.rightEarBottom.y,
      10
    );
    this.p.pop();
  }

  getVertexAtFraction(f: number): p5.Vector {
    const idx = Math.floor(this.vertices.length * f) % this.vertices.length;
    return this.vertices[idx];
  }

  getEarPositions(): {
    leftEarCenter: p5.Vector;
    leftEarTop: p5.Vector;
    leftEarBottom: p5.Vector;
    rightEarCenter: p5.Vector;
    rightEarTop: p5.Vector;
    rightEarBottom: p5.Vector;
  } {
    return {
      leftEarCenter: this.getVertexAtFraction(0.5),
      leftEarTop: this.getVertexAtFraction(0.52),
      leftEarBottom: this.getVertexAtFraction(0.485),
      rightEarCenter: this.getVertexAtFraction(0.0),
      rightEarTop: this.getVertexAtFraction(0.02),
      rightEarBottom: this.getVertexAtFraction(0.985),
    };
  }
}
