import { toRawTriangleArray, normalCompute } from '../functions'

class Pyramid {
  constructor(gl, x, y, z, r, g, b) {
    this.location = {
      x: x,
      y: y,
      z: z
    }
    //make varaible names clearer

    this.angle = {
      x: 0,
      y: 0,
      z: 0
    }

    this.scale = {
      x: 1,
      y: 1,
      z: 1
    }

    this.color = {
      r: r,
      g: g,
      b: b
    }
    this.mode = gl.TRIANGLES

    const createVertices = () => {
      this.verts = [
        [-0.5, -0.5, -0.5],
        [0.5, -0.5, -0.5],
        [0, 0.5, 0],
        [0.5, -0.5, 0.5],
        [-0.5, -0.5, 0.5]
      ]
    }
    createVertices(this.location.x, this.location.y, this.location.z)

    this.facesByIndex = [
      [0, 1, 2],
      [1, 3, 2],
      [3, 4, 2],
      [4, 0, 2],
      [0, 3, 4],
      [0, 1, 3]
    ]

    this.toTriangle = () => {
      this.vertices = toRawTriangleArray({ vertices: this.verts, facesByIndex: this.facesByIndex })
    }
    this.vertices = toRawTriangleArray({ vertices: this.verts, facesByIndex: this.facesByIndex })
    this.normals = normalCompute(this)
  }
}

export default Pyramid
