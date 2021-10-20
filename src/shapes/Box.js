import { toRawTriangleArray, normalCompute } from '../functions'

class Box {
  constructor(gl, x, y, z, r, g, b) {
    this.location = {
      x: x,
      y: y,
      z: z
    }

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
        [-0.5, 0.5, -0.5],
        [0.5, -0.5, -0.5],
        [0.5, 0.5, -0.5],

        [-0.5, -0.5, 0.5],
        [-0.5, 0.5, 0.5],
        [0.5, -0.5, 0.5],
        [0.5, 0.5, 0.5]
      ]
    }
    createVertices(this.location.x, this.location.y, this.location.z)

    this.facesByIndex = [
      [0, 1, 3],
      [0, 3, 2],
      //fix wireframe
      [0, 2, 3],

      [2, 3, 7],
      [2, 7, 6],
      //fix wireframe
      [2, 6, 7],

      [6, 7, 5],
      [6, 5, 4],
      //fix wireframe
      [6, 4, 5],

      [4, 5, 1],
      [4, 1, 0],
      //fix wireframe
      [4, 0, 1],

      [0, 2, 6],
      [6, 4, 0],
      //fix wireframe
      [0, 2, 4],
      [6, 4, 2],

      [1, 3, 7],
      [7, 5, 1],
      //fix wireframe
      [1, 3, 5],
      [7, 5, 3]
    ]

    this.toTriangle = () => {
      this.vertices = toRawTriangleArray({ vertices: this.verts, facesByIndex: this.facesByIndex })
    }
    this.vertices = toRawTriangleArray({ vertices: this.verts, facesByIndex: this.facesByIndex })

    this.normals = normalCompute(this)
  }
}
export default Box
