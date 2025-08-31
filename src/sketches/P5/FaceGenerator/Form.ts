import p5 from "p5";

export class Form {
  p: p5;
  center: p5.Vector;
  width: number;
  height: number;

  constructor(p: p5, center: p5.Vector, width: number, height: number) {
    this.p = p;
    this.center = center;
    this.width = width;
    this.height = height;
  }

  draw() {
    this.p.beginShape();
    this.p.translate(this.center);
    this.p.beginShape();
    for (let angle = 0; angle < this.p.TWO_PI; angle += 0.05) {
      let x = (this.p.cos(angle) * this.width) / 2;
      let y = (this.p.sin(angle) * this.height) / 2;
      let nx = this.p.map(this.p.cos(angle), -1, 1, 0, 1);
      let ny = this.p.map(this.p.sin(angle), -1, 1, 0, 1);
      let n = this.p.noise(nx * 2, ny * 2, 1);
      let r = this.p.map(n, 0, 1, 0.8, 1.2);
      this.p.vertex(x * r, y * r);
    }
    this.p.endShape(this.p.CLOSE);
  }
}
