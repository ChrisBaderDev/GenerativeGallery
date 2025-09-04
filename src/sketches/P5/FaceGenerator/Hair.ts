import p5 from "p5";
import type { FaceComponent } from "./FaceComponent";

interface HairBase {
  root: p5.Vector;
  direction: p5.Vector;
  hairLength: number;
}

export interface HairOptions {
  length: number;
  density: number;
  volatility: number;
  scalp: p5.Vector[];
}

export class Hair implements FaceComponent {
  p: p5;
  length: number;
  density: number;
  volatility: number;
  hairBasis: HairBase[];

  constructor(p: p5, { length, density, volatility, scalp }: HairOptions) {
    this.p = p;
    this.length = length;
    this.density = density;
    this.volatility = volatility;
    this.hairBasis = this.calculateHairBasis(scalp);
  }

  draw() {
    this.p.push();
    this.hairBasis.forEach((basis) => {
      this.p.beginShape();
      for (let i = 0; i < this.hairBasis.length; i += 5) {
        let pos = basis.root
          .copy()
          .add(basis.direction.copy().mult(i).mult(-0.1));
        this.p.vertex(pos.x, pos.y);
      }
      this.p.endShape();
    });
    this.p.pop();
  }

  private calculateHairBasis(points: p5.Vector[]): HairBase[] {
    let hairbasis: HairBase[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      let dx = points[i + 1].x - points[i].x;
      let dy = points[i + 1].y - points[i].y;
      let normal = new p5.Vector(-dy, dx).normalize();
      let midPoint = new p5.Vector(
        (points[i + 1].x + points[i].x) / 2,
        (points[i + 1].y + points[i].y) / 2
      );
      hairbasis.push({
        root: midPoint,
        direction: normal,
        hairLength: this.length * Math.random(),
      });
    }
    return hairbasis;
  }
}
