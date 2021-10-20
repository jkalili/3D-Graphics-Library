import { toRawTriangleArray, normalCompute } from '../functions'
import Vector from './Vector'

// /** Sourced from three.js SphereGeometry  */

class Sphere {
  constructor(
    gl,
    x,
    y,
    z,
    r,
    g,
    b,
    radius = 1,
    widthSegments = 8,
    heightSegments = 6,
    phiStart = 0,
    phiLength = Math.PI * 2,
    thetaStart = 0,
    thetaLength = Math.PI
  ) {
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
    this.parameters = {
      radius: radius,
      widthSegments: widthSegments,
      heightSegments: heightSegments,
      phiStart: phiStart,
      phiLength: phiLength,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    }

    widthSegments = Math.max(3, Math.floor(widthSegments))
    heightSegments = Math.max(2, Math.floor(heightSegments))

    const thetaEnd = Math.min(thetaStart + thetaLength, Math.PI)

    let index = 0
    const grid = []

    const facesByIndex = []
    const vertices = []
    const normals = []
    const uvs = []

    // generate vertices, normals and uvs

    for (let iy = 0; iy <= heightSegments; iy++) {
      const verticesRow = []

      const v = iy / heightSegments

      // special case for the poles

      let uOffset = 0

      if (iy === 0 && thetaStart === 0) {
        uOffset = 0.5 / widthSegments
      } else if (iy === heightSegments && thetaEnd === Math.PI) {
        uOffset = -0.5 / widthSegments
      }

      for (let ix = 0; ix <= widthSegments; ix++) {
        const u = ix / widthSegments

        const sinTheta = Math.sin(thetaStart + v * thetaLength)
        const sinPhi = Math.sin(phiStart + u * phiLength)
        const cosPhi = Math.cos(phiStart + u * phiLength)
        const cosTheta = Math.cos(thetaStart + v * thetaLength)

        vertices.push(-radius * cosPhi * sinTheta, radius * cosTheta, radius * sinPhi * sinTheta)

        // normal
        const normal = new Vector()
        const copy = normal.copy(vertices).unit
        normals.push(copy.x, copy.y, copy.z, normal.x, normal.y, normal.z)

        // uv

        uvs.push(u + uOffset, 1 - v)

        verticesRow.push(index++)
      }
      grid.push(verticesRow)
    }
    // indices

    for (let iy = 0; iy < heightSegments; iy++) {
      for (let ix = 0; ix < widthSegments; ix++) {
        const a = grid[iy][ix + 1]
        const b = grid[iy][ix]
        const c = grid[iy + 1][ix]
        const d = grid[iy + 1][ix + 1]

        if (iy !== 0 || thetaStart > 0) facesByIndex.push(a, b, d)
        if (iy !== heightSegments - 1 || thetaEnd < Math.PI) facesByIndex.push(b, c, d)
      }
    }

    let verticesResult = []
    for (let i = 0; i < vertices.length; i++) {
      if (i % 3 === 0) {
        verticesResult.push([])
      }
      verticesResult[Math.floor(i / 3)].push(vertices[i])
    }

    let facesByIndexResult = []
    for (let i = 0; i < facesByIndex.length; i++) {
      if (i % 3 === 0) {
        facesByIndexResult.push([])
      }
      facesByIndexResult[Math.floor(i / 3)].push(facesByIndex[i])
    }

    this.toTriangle = () => {
      this.vertices = toRawTriangleArray({ vertices: this.verts, facesByIndex: this.facesByIndex })
    }

    this.mode = gl.TRIANGLES

    this.verts = verticesResult
    this.facesByIndex = facesByIndexResult
    this.vertices = toRawTriangleArray({ vertices: this.verts, facesByIndex: this.facesByIndex })
    this.color = { r: r, g: g, b: b }
    this.normals = normalCompute(this)
  }
}

export default Sphere
