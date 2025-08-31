import p5 from "p5";

export class Attractor {
  /**
   * P5 Instance of the current canvas.
   */
  p: p5;

  /**
   * The fixed position of the Attractor in space.
   * Vector can be 2D or 3D depending on the implementation.
   */
  position: p5.Vector;

  /**
   * The maximum distance at which this attractor influences nodes.
   * If a node is farther than this radius, it feels no pull.
   */
  influenceRadius: number;

  /**
   * Distance radius under which this attractor is considered "reached"
   * and will be removed from the simulation. (By setting active = false)
   */
  killRadius: number;

  /**
   * Describes wether the attractor is still active, i.e. not yet
   * consumed by a node.
   */
  active: boolean = true;

  constructor(
    p: p5,
    position: p5.Vector,
    influenceRadius: number,
    killRadius: number
  ) {
    this.p = p;
    this.position = position;
    this.influenceRadius = influenceRadius;
    this.killRadius = killRadius;
  }

  /**
   * Calculates the distance between the positon of a node (nodePosition)
   * and the position of this attractor.
   * @param nodePosition position of the node to calculate this distance to
   * @returns the distance between this attractor and the given nodePositon as p5.Vector
   */
  distanceTo(nodePosition: p5.Vector) {
    return p5.Vector.dist(this.position, nodePosition);
  }

  /**
   * Calculates the normalized direction vector from the given nodePosition
   * to the position of this attractor.
   * @param nodePosition positon of the node to calculate the direction from
   * @returns the direction from this.postion to the NodePosition
   */
  directionTo(nodePosition: p5.Vector) {
    return p5.Vector.sub(nodePosition, this.position).normalize();
  }
}
