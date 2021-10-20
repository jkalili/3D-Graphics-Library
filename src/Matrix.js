//import Vector from './shapes/Vector'

class Matrix {
  constructor(values) {
    const identityMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    if (values === undefined || values.length < 16) {
      this.values = identityMatrix
      this.length = identityMatrix.length
    } else {
      this.values = values
      this.length = values.length
    }
  }

  equalTo = matrix => {
    for (let i = 0; i < 16; i++) {
      if (this.values[i] !== matrix.values[i]) {
        return false
      }
    }
    return true
  }

  multiply = (a, b) => {
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

  scale = (x, y, z) => {
    let scaleMatrix = [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]
    return scaleMatrix
  }

  translate = (x, y, z) => {
    let translateMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]
    return translateMatrix
  }

  xRotation = angle => {
    let c = Math.cos(angle)
    let s = Math.sin(angle)

    return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]
  }

  yRotation = angle => {
    let c = Math.cos(angle)
    let s = Math.sin(angle)

    return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]
  }

  zRotation = angle => {
    let c = Math.cos(angle)
    let s = Math.sin(angle)

    return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }

  cross = (a, b) => {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  }

  subtractVectors = (a, b) => {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
  }

  normalizeVector = v => {
    var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])

    if (length > 0.00001) {
      return [v[0] / length, v[1] / length, v[2] / length]
    } else {
      return [0, 0, 0]

    }
  }

  dot = (vec1, vec2) => {
    var result = 0;
    for (var i = 0; i < 3; i++) {
      result += vec1[i] * vec2[i];
    }
    return result;
  }

  lookAt = (cameraPosition, target ,up) => {
    var zAxis = this.normalizeVector(
      this.subtractVectors(cameraPosition, target));
  var xAxis = this.normalizeVector(this.cross(up, zAxis));
  var yAxis = this.normalizeVector(this.cross(zAxis, xAxis));

  return [
    xAxis[0],
    yAxis[0],
    zAxis[0],
    0,

    xAxis[1],
    yAxis[1],
    zAxis[1],
    0,

    xAxis[2],
    yAxis[2],
    zAxis[2],
    0,

    -this.dot(cameraPosition, xAxis),
    -this.dot(cameraPosition, yAxis),
    -this.dot(cameraPosition, zAxis),
    1
  ];

  
  }
}

export default Matrix
