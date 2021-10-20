import { toRawTriangleArray, normalCompute } from '../functions'

class Dodecahedron {
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
      const t = (1 + Math.sqrt(5))/2
      const r = 1/t
      this.verts = [
        [-1, -1, -1], //0
        [-1, -1, 1], //1
        [-1, 1, -1], //2
        [-1, 1, 1], //3
        [1, -1, -1], //4
        [1, -1, 1], //5
        [1, 1, -1], //6
        [1, 1, 1], //7

        [0, -r, -t], //8
        [0, -r, t],
        [0, r, -t],
        [0, r, t],

        [-r, -t, 0],
        [-r, t, 0],
        [r, -t, 0],
        [r, t, 0],

        [-t, 0, -r],
        [t, 0, -r],
        [-t, 0, r],
        [t, 0, r]
      ]
    }
    createVertices(this.location.x, this.location.y, this.location.z)
    this.facesByIndex = [
      [3, 11, 7],
      [3, 7, 15],
      [3, 15, 13],
      [7, 19, 17],
      [7, 17, 6],
      [7, 6, 15],
      [17, 4, 8],
      [17, 8, 10],
      [17, 10, 6],
      [8, 0, 16],
      [8, 16, 2],
      [8, 2, 10],
      [0, 12, 1],
      [0, 1, 18],
      [0, 18, 16],
      [6, 10, 2],
      [6, 2, 13],
      [6, 13, 15],
      [2, 16, 18],
      [2, 18, 3],
      [2, 3, 13],
      [18, 1, 9],
      [18, 9, 11],
      [18, 11, 3],
      [4, 14, 12],
      [4, 12, 0],
      [4, 0, 8],
      [11, 9, 5],
      [11, 5, 19],
      [11, 19, 7],
      [19, 5, 14],
      [19, 14, 4],
      [19, 4, 17],
      [1, 12, 14],
      [1, 14, 5],
      [1, 5, 9]
    ]
    this.toTriangle = () => {
      this.vertices = toRawTriangleArray({ vertices: this.verts, facesByIndex: this.facesByIndex })
    }
    this.vertices = toRawTriangleArray({ vertices: this.verts, facesByIndex: this.facesByIndex })
    this.normals = normalCompute(this)
  }
}
export default Dodecahedron
