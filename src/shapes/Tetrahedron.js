import { toRawTriangleArray, normalCompute } from '../functions'

class Tetrahedron {
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
        [0.5, 0.5, 0.5], //0
        [-0.5, -0.5, 0.5], //1
        [-0.5, 0.5, -0.5], //2
        [0.5, -0.5, -0.5] //3
      ]
    }
    createVertices(this.location.x, this.location.y, this.location.z)
    this.facesByIndex = [
      [2, 1, 0],
      [0, 3, 2],
      [1, 3, 0],
      [2, 3, 1],

      //fix wireframe
      [0, 1, 2],
      [1, 0, 3]
    ]
    this.toTriangle = () => {
      this.vertices = toRawTriangleArray({ vertices: this.verts, facesByIndex: this.facesByIndex })
    }
    this.vertices = toRawTriangleArray({ vertices: this.verts, facesByIndex: this.facesByIndex })
    this.normals = normalCompute(this)
  }
}
export default Tetrahedron
