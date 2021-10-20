class Group {
  constructor() {
    this.terminals = []
    this.isGroup = true
  }

  add = object => {
    this.terminals.push(object)
  }

  remove = object => {
    const index = this.terminals.indexOf(object)
    if (index > -1) {
      this.terminals.splice(index, 1)
    } else {
      console.log(`Cannot find ${object} to remove from group.`)
    }
  }

  scale = (x, y, z) => {
    for (let object of this.terminals) {
      object.scale.x *= x
      object.scale.y *= y
      object.scale.z *= z
    }
  }

  translate = (x, y, z) => {
    for (let object of this.terminals) {
      object.location.x += x
      object.location.y += y
      object.location.z += z
    }
  }

  angle = (x, y, z) => {
    for (let object of this.terminals) {
      object.angle.x *= x
      object.angle.y *= y
      object.angle.z *= z
    }
  }

  color = (r, g, b) => {
    for (let object of this.terminals) {
      object.color.r = r
      object.color.g = g
      object.color.b = b
    }
  }
}

export default Group
