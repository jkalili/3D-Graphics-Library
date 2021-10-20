import Vector from './shapes/Vector'

const VERTEX_SHADER = `
#ifdef GL_ES
precision highp float;
#endif

attribute vec3 vertexPosition;
attribute vec3 vertexColor;
attribute vec3 normalPosition;

uniform vec3 lightPosition;

varying vec4 finalVertexColor;
uniform mat4 projectionMatrix;
uniform mat4 translateMatrix;
uniform mat4 scaleMatrix;
uniform mat4 rotationMatrix;
uniform mat4 instanceRotateX;
uniform mat4 instanceRotateY;
uniform mat4 instanceRotateZ;
uniform mat4 lookAtMatrix;

void main(void) {
   vec3 lightVector = normalize(lightPosition - vertexPosition);
   vec3 normal = normalize(normalPosition);

    float normalFinal = max(dot(lightVector, normal), 0.0);

    finalVertexColor = vec4(normalFinal * vertexColor, 1.0);
  gl_Position =  projectionMatrix * rotationMatrix * lookAtMatrix * translateMatrix * scaleMatrix * instanceRotateZ * instanceRotateY * instanceRotateX * vec4(vertexPosition, 1.0);
}
`
const FRAGMENT_SHADER = `
#ifdef GL_ES
precision highp float;
#endif

varying vec4 finalVertexColor;

void main(void) {
  // We vary the color based on the fragment's z coordinate,
  // which, at this point, ranges from 0 (near) to 1 (far).
  // Note the ".rgb" subselector.

  //float ambientLevel = .99;
  gl_FragColor = vec4(finalVertexColor.rgb, 1.0);
}
`
const generateObject = function (color, vertices, mode) {
  return { color: color, vertices: vertices, mode: mode }
}

const projectionArray = (projectionType, l, r, t, b, n, f) => {
  return new Float32Array(projectionType(l, r, t, b, n, f))
}

const translationMatrix = (x, y, z) => {
  const matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]
  return matrix
}

const orthographicMatrix = (l, r, t, b, n, f) => {
  const matrix = [
    2 / (r - l),
    0,
    0,
    0,
    0,
    2 / (t - b),
    0,
    0,
    0,
    0,
    -2 / (f - n),
    0,
    -((r + l) / (r - l)),
    -((t + b) / (t - b)),
    -((f + n) / (f - n)),
    1
  ]
  return matrix
}

/*
 * If orthographic, projectionArray will be orthographic, if !orthographic, perspective
 */
const toggleOrthographic = (orthographic, matrixVals) => {
  let perspectiveType
  if (orthographic) {
    perspectiveType = projectionArray(orthographicMatrix, ...matrixVals)
  } else {
    perspectiveType = projectionArray(perspectiveMatrix, ...matrixVals)
  }
  return perspectiveType
}

const perspectiveMatrix = (l, r, t, b, n, f) => {
  const matrix = [
    (2 * n) / (r - l),
    0,
    0,
    0,
    0,
    (2 * n) / (t - b),
    0,
    0,
    (r + l) / (r - l),
    (t + b) / (t - b),
    -(f + n) / (f - n),
    -1,
    0,
    0,
    (-2 * n * f) / (f - n),
    0
  ]
  return matrix
}

const multiply = (a, b) => {
  var b00 = b[0 * 4 + 0]
  var b01 = b[0 * 4 + 1]
  var b02 = b[0 * 4 + 2]
  var b03 = b[0 * 4 + 3]
  var b10 = b[1 * 4 + 0]
  var b11 = b[1 * 4 + 1]
  var b12 = b[1 * 4 + 2]
  var b13 = b[1 * 4 + 3]
  var b20 = b[2 * 4 + 0]
  var b21 = b[2 * 4 + 1]
  var b22 = b[2 * 4 + 2]
  var b23 = b[2 * 4 + 3]
  var b30 = b[3 * 4 + 0]
  var b31 = b[3 * 4 + 1]
  var b32 = b[3 * 4 + 2]
  var b33 = b[3 * 4 + 3]
  var a00 = a[0 * 4 + 0]
  var a01 = a[0 * 4 + 1]
  var a02 = a[0 * 4 + 2]
  var a03 = a[0 * 4 + 3]
  var a10 = a[1 * 4 + 0]
  var a11 = a[1 * 4 + 1]
  var a12 = a[1 * 4 + 2]
  var a13 = a[1 * 4 + 3]
  var a20 = a[2 * 4 + 0]
  var a21 = a[2 * 4 + 1]
  var a22 = a[2 * 4 + 2]
  var a23 = a[2 * 4 + 3]
  var a30 = a[3 * 4 + 0]
  var a31 = a[3 * 4 + 1]
  var a32 = a[3 * 4 + 2]
  var a33 = a[3 * 4 + 3]

  return [
    b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
    b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
    b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
    b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
    b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
    b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
    b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
    b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
    b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
    b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
    b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
    b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
    b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
    b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
    b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
    b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33
  ]
}

const toRawLineArray = protoGeometry => {
  const result = []
  protoGeometry.facesByIndex.forEach(face => {
    for (let i = 0, maxI = face.length; i < maxI; i += 1) {
      result.push(...protoGeometry.vertices[face[i]], ...protoGeometry.vertices[face[(i + 1) % maxI]])
    }
  })
  return result
}

const getRotationMatrix = (angle, x, y, z) => {
  const axisLength = Math.sqrt(x * x + y * y + z * z)
  const s = Math.sin((angle * Math.PI) / 180.0)
  const c = Math.cos((angle * Math.PI) / 180.0)
  const oneMinusC = 1.0 - c
  x /= axisLength
  y /= axisLength
  z /= axisLength
  const x2 = x * x
  const y2 = y * y
  const z2 = z * z
  const xy = x * y
  const yz = y * z
  const xz = x * z
  const xs = x * s
  const ys = y * s
  const zs = z * s
  return [
    x2 * oneMinusC + c,
    xy * oneMinusC + zs,
    xz * oneMinusC - ys,
    0.0,

    xy * oneMinusC - zs,
    y2 * oneMinusC + c,
    yz * oneMinusC + xs,
    0.0,

    xz * oneMinusC + ys,
    yz * oneMinusC - xs,
    z2 * oneMinusC + c,
    0.0,

    0.0,
    0.0,
    0.0,
    1.0
  ]
}

const randomValue = () => {
  return Math.random().toFixed(1)
}

const toRawTriangleArray = protoGeometry => {
  const result = []
  protoGeometry.facesByIndex.forEach(face => {
    face.forEach(vertexIndex => {
      result.push(...protoGeometry.vertices[vertexIndex])
    })
  })
  return result
}

const normalCompute = object => {
  const vertNormals = []
  const result = []
  const normals = toNormalArray(object)
  const faces = object.facesByIndex
  const vertices = object.verts

  for (let i = 0; i < vertices.length; i++) {
    let vertNormal = new Vector(0, 0, 0)

    for (let j = 0; j < faces.length; j++) {
      for (let k = 0; k < 3; k++) {
        if (faces[j][k] === i) {
          vertNormal = vertNormal.add(normals[j])
        }
      }
    }

    vertNormals.push(vertNormal.elements)
  }

  //convert to raw array of numbers
  faces.forEach(face => {
    for (let i = 0, maxI = face.length; i < maxI; i += 1) {
      result.push(...vertNormals[face[i]], ...vertNormals[face[(i + 1) % maxI]])
    }
  })
  return toRawTriangleArray({ vertices: vertNormals, facesByIndex: faces })
}

const toNormalArray = object => {
  const normals = []
  object.facesByIndex.forEach(face => {
    normals.push(getNormal(object, face[0], face[1], face[2]))
  })

  return normals
}

function getNormal(object, f1, f2, f3) {
  const v0 = new Vector(object.verts[f1][0], object.verts[f1][1], object.verts[f1][2]),
    v1 = new Vector(object.verts[f2][0], object.verts[f2][1], object.verts[f2][2]).subtract(v0),
    v2 = new Vector(object.verts[f3][0], object.verts[f3][1], object.verts[f3][2]).subtract(v0)
  return v1.cross(v2)
}

export {
  toRawLineArray,
  toRawTriangleArray,
  generateObject,
  randomValue,
  multiply,
  orthographicMatrix,
  toggleOrthographic,
  perspectiveMatrix,
  projectionArray,
  translationMatrix,
  getRotationMatrix,
  normalCompute,
  toNormalArray,
  getNormal,
  VERTEX_SHADER,
  FRAGMENT_SHADER
}
