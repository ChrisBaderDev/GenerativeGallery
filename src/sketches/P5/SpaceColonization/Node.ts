import p5 from "p5";

export class Node {
  /**
   * P5 Instance of the current canvas.
   */
  p: p5;
  /**
   * The positon of this node in space. Can be
   * on a 2D or 3D canvas.
   */
  position: p5.Vector;
  /**
   * Reference to the parent node of the system.
   * If the parent node is null, it is the root node.
   */
  parent: Node | null;
  /**
   * List of all children nodes that expand from this node.
   */
  children: Node[];
  /**
   * Averaged direction of growth of this node, depending on
   * all nodes influencing this node.
   */
  growthDirection: p5.Vector;

  constructor(p: p5, position: p5.Vector, parent: Node | null = null) {
    this.p = p;
    this.position = position;
    this.parent = parent;
    this.children = [];
    this.growthDirection = new p5.Vector(0, 0);
  }

  /**
   * Resets the growth accumulated by the influence of attractors
   * on this node.
   */
  resetGrowth() {
    this.growthDirection = new p5.Vector(0, 0);
  }

  /**
   * Calculates the normalized direction vector from the given attractorPositon
   * to the position of this attractor.
   * @param attractorPosition positon of the node to calculate the direction from
   * @returns the direction from this.positon to the attractorPosition
   */
  directionTo(attractorPosition: p5.Vector) {
    return p5.Vector.sub(attractorPosition, this.position).normalize();
  }

  /**
   * Adds a child to this node.
   * @param childNode the child to add to this node.
   */
  addChild(childNode: Node) {
    this.children.push(childNode);
  }

  /**
   * Updates the direction based on the averages of the attractors that currently
   * take influence on this node.
   * @param directionVectors the normalized direction vectors pointing to the attractors.
   */
  updateDirection(directionVectors: p5.Vector[]) {
    if (directionVectors.length === 0) return;
    let numberOfInfluences = 0;
    directionVectors.forEach((vec) => {
      this.growthDirection.add(vec);
      numberOfInfluences++;
    });

    this.growthDirection.div(numberOfInfluences);
    this.growthDirection.add(
      new p5.Vector(this.p.random(-0.05, 0.05), this.p.random(-0.05, 0.05))
    );
    this.growthDirection.normalize();
  }
}
