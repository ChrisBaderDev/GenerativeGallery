import p5 from "p5";
import type { FaceComponent } from "./FaceComponent";

interface EarOptions {
  center: p5.Vector;
  top: p5.Vector;
  bottom: p5.Vector;
  volatility: number;
}

export class Ear implements FaceComponent {
  p: p5;
  center: p5.Vector;
  top: p5.Vector;
  bottom: p5.Vector;
  volatility: number;

  constructor(p: p5, { center, top, bottom, volatility }: EarOptions) {
    this.p = p;
    this.center = center;
    this.top = top;
    this.bottom = bottom;
    this.volatility = volatility;
  }

  draw(): void {

  }

  private drawOuterEar() {
    
  }
}
