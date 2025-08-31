import p5 from "p5";
import { Node } from "./Node";
import { Attractor } from "./Attractor";

export class Network {
  p: p5;
  nodes: Node[];
  attractors: Attractor[];
  stepSize: number;
  branchProbability: number;

  constructor(
    p: p5,
    rootPosition: p5.Vector,
    stepSize: number = 5,
    branchProbability: number = 0.1
  ) {
    this.p = p;
    this.nodes = [new Node(p, rootPosition), new Node(p, rootPosition)];
    this.attractors = [];
    this.stepSize = stepSize;
    this.branchProbability = branchProbability;
  }

  addAttractor(attractor: Attractor) {
    this.attractors.push(attractor);
  }

  grow() {
    const growingNodes = this.nodes;
    // Phase 1: Attractors influence nodes
    this.attractors.forEach((attractor) => {
      if (!attractor.active) return;

      let closest: Node | null = null;
      let minDist = Infinity;

      for (const node of growingNodes) {
        let dist = attractor.distanceTo(node.position);
        if (dist < attractor.influenceRadius && dist < minDist) {
          minDist = dist;
          closest = node;
        }
        if (dist < attractor.killRadius) {
          attractor.active = false;
        }
      }

      if (closest && attractor.active) {
        let dir = closest.directionTo(attractor.position).normalize();
        closest.updateDirection([dir]);
      }
    });

    this.attractors = this.attractors.filter((a) => a.active);

    // Phase 2: Grow once per leaf
    for (const node of growingNodes) {
      if (node.growthDirection.mag() > 0) {
        let newPos = p5.Vector.add(
          node.position,
          node.growthDirection.copy().setMag(this.stepSize)
        );
        let newNode = new Node(this.p, newPos, node);
        node.addChild(newNode);
        this.nodes.push(newNode);
      }
    }
  }
  draw() {
    this.nodes.forEach((node) => {
      node.children.forEach((child) => {
        this.p.line(
          node.position.x,
          node.position.y,
          child.position.x,
          child.position.y
        );
      });
    });
  }
}
