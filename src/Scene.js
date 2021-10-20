//special group object that has children/terminals
//perhaps

//should be able to remove individual objects from scene but must redefine group class
//remove an individual object from group
//translate code from group; make functions for changing location, angle, scale, and color

class Scene {
  constructor() {
    this.terminals = []
    this.removed = []
  }

  find = object => {
    return this.terminals.indexOf(object)
  }

  //Scene.add
  add = object => {
    //object.group = false
    this.terminals.push(object)
  }

  //Scene.remove
  remove = object => {
    //find the object to remove
    const index = this.find(object)
    if (index > -1) {
      return this.terminals.splice(index, 1)
    } else {
      console.log(`Cannot find ${object} to remove.`)
    }
    console.log(this.terminals)
  }

  scale = (object, x, y, z) => {
    if (object.isGroup) {
      return object.scale(x, y, z)
    }
    const index = this.find(object)
    if (index > -1) {
      this.terminals[index].scale.x = x
      this.terminals[index].scale.y = y
      this.terminals[index].scale.z = z
    } else {
      console.log(`Cannot find ${object} to scale.`)
    }
  }

  translate = (object, x, y, z) => {
    if (object.isGroup) {
      return object.translate(x, y, z)
    }
    const index = this.find(object)
    if (index > -1) {
      this.terminals[index].location.x = x
      this.terminals[index].location.y = y
      this.terminals[index].location.z = z
    } else {
      console.log(`Cannot find ${object} to translate.`)
    }
  }

  angle = (object, x, y, z) => {
    if (object.isGroup) {
      return object.angle(x, y, z)
    }
    const index = this.find(object)
    if (index > -1) {
      this.terminals[index].angle.x = x
      this.terminals[index].angle.y = y
      this.terminals[index].angle.z = z
    } else {
      console.log(`Cannot find ${object} to angle.`)
    }
  }

  color = (object, r, g, b) => {
    if (object.isGroup) {
      return object.color(r, g, b)
    }
    const index = this.find(object)
    if (index > -1) {
      this.terminals[index].color.r = r
      this.terminals[index].color.g = g
      this.terminals[index].color.b = b
    } else {
      console.log(`Cannot find ${object} to color.`)
    }
  }

  //add scale, translate, angle for both groups and objects
  //location, scale, angle
  //try to fix wireframe
}

export default Scene
