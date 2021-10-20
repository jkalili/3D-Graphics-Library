import { useState, useEffect, useRef } from 'react'
import './App.css'
import { getGL, initVertexBuffer, initSimpleShaderProgram } from './glsl-utilities'
import { getRotationMatrix, toggleOrthographic, VERTEX_SHADER, FRAGMENT_SHADER, randomValue } from './functions'
import Box from './shapes/Box'
import Sphere from './shapes/Sphere'
import Dodecahedron from './shapes/Dodecahedron'
import Scene from './Scene'
import Matrix from './Matrix'
import Group from './Group'
import Pyramid from './shapes/Pyramid'
import TriangularPrism from './shapes/TriangularPrism'
import { makeCar, makeBus, makeTree, makeFloor, makeMoon, makeStar, makeSaucer } from './composites/makeComposites'
let currentRotation = 0.0
let animationActive = true
let previousTimestamp = null

let lightXYZ = [-10, -10, -10] //how to position the scene light
let Matrixvals = [-3, 3, 3, -3, -10, 10] // default values for orthographic/perspective matrices
let positionType = toggleOrthographic(true, Matrixvals) //false if you want perspective matrix
let defaultUp = [0, 1, 0]
let carMove = false
let busMove = false
let carPos = 0.03
let saucerPos = 0.1
let rotationSpeed = 0.009

const scene = new Scene()

const Playground = () => {
  const [universe, setUniverse] = useState(null)
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const gl = getGL(canvas)
    gl.enable(gl.DEPTH_TEST)
    gl.clearColor(0.0, 0.0, 0.0, 0.0)
    gl.viewport(canvas.width / 2 - canvas.height / 2, 0, canvas.height, canvas.height)

    const floor = new Box(gl, 0, -1.8, 0, 0.5, 0.5, 0.5)
    const moon = new Sphere(gl, 0, 2.5, 0, 2.54, 2.52, 2.05)
    let colors = [randomValue(), randomValue(), randomValue()]

    let body = new Box(gl, 0, 0, 0, ...colors)
    const front = new Box(gl, 0.5, -0.1, 0, ...colors)
    const back = new Box(gl, -0.5, -0.1, 0, ...colors)

    const wheel1 = new Sphere(gl)
    const wheel2 = new Sphere(gl)
    const wheel3 = new Sphere(gl)
    const wheel4 = new Sphere(gl)

    const headlight1 = new Dodecahedron(gl, 0.73, 0, -0.15, 22.22, 22.22, 22.22)
    const headlight2 = new Dodecahedron(gl, 0.73, 0, 0.15, 22.22, 22.22, 22.22)

    const windshield = new Box(gl, 0.015, 0.12, 0, 1.22, 1.22, 1.22)

    const brakeLight1 = new Box(gl, -0.72, 0, 0.18, 1, 0, 0)
    const brakeLight2 = new Box(gl, -0.72, 0, -0.18, 1, 0, 0)
    const bodyBus = new Box(gl, 0, 0, 0, 1, 0, 0)
    const frontBus = new TriangularPrism(gl, 0.75, -0.1, 0, 1, 0, 0)
    const wheelBus1 = new Sphere(gl)
    const wheelBus2 = new Sphere(gl)
    const wheelBus3 = new Sphere(gl)
    const wheelBus4 = new Sphere(gl)
    const window1 = new Sphere(gl)
    const window2 = new Sphere(gl)
    const window3 = new Sphere(gl)
    const window4 = new Sphere(gl)
    const window5 = new Sphere(gl)
    const window6 = new Sphere(gl)
    const propeller = new TriangularPrism(gl, -0.8, -0.1, 0, 1.6, 0.82, 0.45)
    const windshieldBus = new Box(gl, 0.015, 0.12, 0, 0.535, 1.06, 1.35)

    const trunk = new Box(gl, 1.3, -1, 1, 0.58, 0.294, 0)
    const greenery = new Pyramid(gl, 1.3, 0, 1, 0, 0.9, 0)
    const greenery2 = new Pyramid(gl, 1.3, 0.4, 1, 0, 0.9, 0)
    const greenery3 = new Pyramid(gl, 1.3, 0.8, 1, 0, 0.9, 0)
    const apple = new Sphere(gl, 0.9, 0.02, 1.4, 1, 0, 0)
    const orange = new Sphere(gl, 1.4, 1, 0.9, 1, 0.65, 0)

    const starCore = new Sphere(gl, 0.2, 0.02, 0.02, ...colors)
    const starPoint1 = new Pyramid(gl, 1, 0, 0, 100, 100, 0)
    const starPoint2 = new Pyramid(gl, 0, 1, 0, 100, 100, 0)
    const starPoint3 = new Pyramid(gl, -1, 0, 0, 100, 100, 0)
    const starPoint4 = new Pyramid(gl, 0, -1, 0, 100, 100, 0)

    const starCore_2 = new Sphere(gl, 0.2, 0.02, 0.02, ...colors)
    const starPoint1_2 = new Pyramid(gl, 1, 0, 0, 100, 100, 0)
    const starPoint2_2 = new Pyramid(gl, 0, 1, 0, 100, 100, 0)
    const starPoint3_2 = new Pyramid(gl, -1, 0, 0, 100, 100, 0)
    const starPoint4_2 = new Pyramid(gl, 0, -1, 0, 100, 100, 0)

    const starCore_3 = new Sphere(gl, 0.2, 0.02, 0.02, ...colors)
    const starPoint1_3 = new Pyramid(gl, 1, 0, 0, 100, 100, 0)
    const starPoint2_3 = new Pyramid(gl, 0, 1, 0, 100, 100, 0)
    const starPoint3_3 = new Pyramid(gl, -1, 0, 0, 100, 100, 0)
    const starPoint4_3 = new Pyramid(gl, 0, -1, 0, 100, 100, 0)

    const saucerCockPit = new Sphere(gl, 0.2, 0.02, 0.02, 0, 1, 0)
    const saucerDisk = new Sphere(gl, 0.2, 0.02, 0.02, 1, 0, 0)

    const star = new Group()
    makeStar(star, starCore, starPoint1, starPoint2, starPoint3, starPoint4)
    star.scale(0.12, 0.12, 0.12)

    const star2 = new Group()
    makeStar(star2, starCore_2, starPoint1_2, starPoint2_2, starPoint3_2, starPoint4_2)
    star2.scale(0.15, 0.15, 0.15)
    star2.translate(3, 0.5, 1)

    const star3 = new Group()
    makeStar(star3, starCore_3, starPoint1_3, starPoint2_3, starPoint3_3, starPoint4_3)
    star3.scale(0.2, 0.2, 0.2)
    star3.translate(2, 2, -0.5)

    const saucer = new Group()
    makeSaucer(saucer, saucerCockPit, saucerDisk)
    saucer.scale(0.4, 0.4, 0.4)
    saucer.translate(8, 2, 0)

    const sedan = new Group()
    makeCar(
      sedan,
      body,
      front,
      back,
      wheel1,
      wheel2,
      wheel3,
      wheel4,
      headlight1,
      headlight2,
      windshield,
      brakeLight1,
      brakeLight2
    )
    const bus = new Group()
    makeBus(
      bus,
      bodyBus,
      frontBus,
      wheelBus1,
      wheelBus2,
      wheelBus3,
      wheelBus4,
      windshieldBus,
      window1,
      window2,
      window3,
      window4,
      window5,
      window6,
      propeller
    )

    const tree = new Group()
    makeTree(tree, trunk, greenery, greenery2, greenery3, apple, orange)

    makeFloor(floor)

    makeMoon(moon)

    sedan.translate(-1, -1, 1)
    bus.translate(0, -1, -1)

    scene.add(sedan)
    scene.add(moon)
    scene.add(floor)
    scene.add(tree)
    scene.add(bus)
    scene.add(star)
    scene.add(star2)
    scene.add(star3)
    scene.add(saucer)

    const createBuffers = object => {
      object.verticesBuffer = initVertexBuffer(gl, object.vertices)
      object.normalsBuffer = initVertexBuffer(gl, object.normals)
      if (!object.colors) {
        object.colors = []
        for (let i = 0, maxi = object.vertices.length / 3; i < maxi; i += 1) {
          object.colors = object.colors.concat(object.color.r, object.color.g, object.color.b)
        }
      }
      object.colorsBuffer = initVertexBuffer(gl, object.colors)
    }

    for (let i = 0; i < scene.terminals.length; i++) {
      if (scene.terminals[i].isGroup) {
        for (let object of scene.terminals[i].terminals) {
          createBuffers(object)
        }
      } else {
        createBuffers(scene.terminals[i])
      }
    }

    const shaderProgram = initSimpleShaderProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER)
    gl.useProgram(shaderProgram)

    //reference to shader program
    const vertexPosition = gl.getAttribLocation(shaderProgram, 'vertexPosition')
    const vertexColor = gl.getAttribLocation(shaderProgram, 'vertexColor')
    const getNormalPosition = gl.getAttribLocation(shaderProgram, 'normalPosition')
    const rotationMatrix = gl.getUniformLocation(shaderProgram, 'rotationMatrix')

    const getlookAtMatrix = gl.getUniformLocation(shaderProgram, 'lookAtMatrix')
    const projectionMatrix = gl.getUniformLocation(shaderProgram, 'projectionMatrix')

    //scale and translate
    const getTranslateMatrix = gl.getUniformLocation(shaderProgram, 'translateMatrix')
    const getScaleMatrix = gl.getUniformLocation(shaderProgram, 'scaleMatrix')
    const getLightPosition = gl.getUniformLocation(shaderProgram, 'lightPosition')

    const getInstanceRotateX = gl.getUniformLocation(shaderProgram, 'instanceRotateX')
    const getInstanceRotateY = gl.getUniformLocation(shaderProgram, 'instanceRotateY')
    const getInstanceRotateZ = gl.getUniformLocation(shaderProgram, 'instanceRotateZ')

    gl.enableVertexAttribArray(vertexPosition)
    gl.enableVertexAttribArray(vertexColor)
    gl.enableVertexAttribArray(getNormalPosition)

    const drawObject = object => {
      gl.bindBuffer(gl.ARRAY_BUFFER, object.colorsBuffer)
      gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0)
      gl.bindBuffer(gl.ARRAY_BUFFER, object.verticesBuffer)
      gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0)

      gl.bindBuffer(gl.ARRAY_BUFFER, object.normalsBuffer)
      gl.vertexAttribPointer(getNormalPosition, 3, gl.FLOAT, false, 0, 0)

      const translateMatrix = new Matrix().translate(object.location.x, object.location.y, object.location.z)
      const scaleMatrix = new Matrix().scale(object.scale.x, object.scale.y, object.scale.z)
      const instanceRotateX = new Matrix().xRotation(object.angle.x)
      const instanceRotateY = new Matrix().yRotation(object.angle.y)
      const instanceRotateZ = new Matrix().zRotation(object.angle.z)

      //for reach different object
      gl.uniformMatrix4fv(getTranslateMatrix, gl.FALSE, new Float32Array(translateMatrix))
      gl.uniformMatrix4fv(getScaleMatrix, gl.FALSE, new Float32Array(scaleMatrix))
      gl.uniformMatrix4fv(getInstanceRotateX, gl.FALSE, new Float32Array(instanceRotateX))
      gl.uniformMatrix4fv(getInstanceRotateY, gl.FALSE, new Float32Array(instanceRotateY))
      gl.uniformMatrix4fv(getInstanceRotateZ, gl.FALSE, new Float32Array(instanceRotateZ))

      gl.drawArrays(object.mode, 0, object.vertices.length / 3)
    }

    // displays scene

    const drawScene = () => {
      if (carMove && front.location.x < 0.9) {
        sedan.translate(carPos, 0, 0)
        wheel3.angle.z -= 1
        wheel1.angle.z -= 1
        wheel4.angle.z -= 1
        wheel2.angle.z -= 1
      }
      if (front.location.x >= 0.9 && apple.location.y >= -1.25) {
        apple.location.y -= 0.05
        apple.angle.x += 0.15
        apple.angle.y += 0.02
      }

      if (front.location.x > 0.9 && busMove) {
        bus.translate(carPos, 0.02, 0)
      }

      propeller.angle.x += 0.8
      moon.angle.y -= 0.01

      greenery.angle.y += 0.0022
      greenery2.angle.y -= 0.001
      greenery3.angle.y += 0.0018

      saucer.translate(saucerPos, -randomValue() * 0.01, 0)
      saucerDisk.angle.x += 0.1

      if (saucerCockPit.location.y < 2 && (saucerCockPit.location.x > 8 || saucerCockPit.location.x < -8)) {
        saucer.translate(0, 3, 0)
      }
      if (saucerCockPit.location.x > 8) {
        saucer.translate(-4, 0, 0)
        saucerPos = -saucerPos
      } else if (saucerCockPit.location.x < -8) {
        saucer.translate(4, 0, 0)
        saucerPos = -saucerPos
      }

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(getRotationMatrix(currentRotation, 0, 1, 0)))

      const lookAtMatrix = new Matrix().lookAt([0, 1.5, 0], [0, 1.5, -1], defaultUp) //manipulate these to cahnge camera

      gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, positionType)
      gl.uniform3f(getLightPosition, ...lightXYZ)
      gl.uniformMatrix4fv(getlookAtMatrix, gl.FALSE, new Float32Array(lookAtMatrix))
      //lookAt like projection

      if (animationActive) {
        previousTimestamp = null
        window.requestAnimationFrame(advanceScene)
      }
      for (let i = 0; i < scene.terminals.length; i++) {
        if (scene.terminals[i].isGroup) {
          for (let object of scene.terminals[i].terminals) {
            drawObject(object)
          }
        } else {
          drawObject(scene.terminals[i])
        }
      }
      gl.flush()
    }

    const advanceScene = timestamp => {
      if (!animationActive) {
        return
      }

      // Initialize the timestamp.
      if (!previousTimestamp) {
        previousTimestamp = timestamp
        window.requestAnimationFrame(advanceScene)
        return
      }

      // Check if it's time to advance.
      var progress = timestamp - previousTimestamp
      if (progress < 1000 / 60) {
        // Do nothing if it's too soon.
        window.requestAnimationFrame(advanceScene)
        return
      }

      currentRotation += rotationSpeed * progress
      drawScene()

      if (currentRotation >= 360.0) {
        currentRotation -= 360.0
      }

      // Request the next frame.
      previousTimestamp = timestamp
      window.requestAnimationFrame(advanceScene)
    }

    drawScene()

    setUniverse({
      toggleCar: () => {
        const audio = new Audio('http://cd.textfiles.com/maxsounds/WAV/EFEITOS/BUZINA1.WAV')
        audio.volume = 0.1
        audio.play()
        audio.currentTime = 0
        carMove = true
        window.requestAnimationFrame(advanceScene)
      },
      toggleBus: () => {
        if (front.location.x > 0.9) {
          busMove = true
        } else {
          alert('You have not exited your car yet!')
        }
        window.requestAnimationFrame(advanceScene)
      },
      resetCar: () => {
        if (carMove) {
          sedan.translate(-1.5, 0, 0)
        }
        carMove = false
        window.requestAnimationFrame(advanceScene)
      },
      toggleDisplay: () => {
        for (let i = 0; i < scene.terminals.length; i++) {
          if (scene.terminals[i].isGroup) {
            for (let object of scene.terminals[i].terminals) {
              //console.log(object)
              if (object.mode === gl.TRIANGLES) {
                object.mode = gl.LINES
              } else {
                object.mode = gl.TRIANGLES
              }
            }
          } else {
            if (scene.terminals[i].mode === gl.TRIANGLES) {
              scene.terminals[i].mode = gl.LINES
            } else {
              scene.terminals[i].mode = gl.TRIANGLES
            }
          }
        }
        window.requestAnimationFrame(advanceScene)
      }
    })
  }, [canvasRef])

  const handleToggleDisplay = () => universe.toggleDisplay()
  const interact = () => universe.toggleCar()
  const interactFly = () => universe.toggleBus()
  const reset = () => universe.resetCar()

  return (
    <article>
      {/* The canvas is square because the default WebGL space is a cube. */}
      <canvas
        width={window.innerWidth}
        height={window.innerHeight - 150}
        style={{ backgroundColor: '#0c1445' }}
        ref={canvasRef}
      >
        Your favorite update-your-browser message here.
      </canvas>
      <center>
        <article style={{ margin: 'auto' }}>
          <button className="button" onClick={universe && handleToggleDisplay}>
            Toggle Wireframe
          </button>
          <button className="button" onClick={universe && interact}>
            Zoom Zoom
          </button>
          <button className="button" onClick={universe && interactFly}>
            Fly Away
          </button>
          <button className="button" onClick={universe && reset}>
            Reset Sedan
          </button>
          <button className="button" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </article>
      </center>
    </article>
  )
}

export default Playground
