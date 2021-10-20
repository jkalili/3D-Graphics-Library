import { useState, useEffect, useRef } from 'react'
import './App.css'
import { getGL, initVertexBuffer, initSimpleShaderProgram } from './glsl-utilities'
import { randomValue, toggleOrthographic, FRAGMENT_SHADER, getRotationMatrix } from './functions'
import Pyramid from './shapes/Pyramid'
import Box from './shapes/Box'
import Tetrahedron from './shapes/Tetrahedron'
import Diamond from './shapes/Diamond'
import TriangularPrism from './shapes/TriangularPrism'
import Sphere from './shapes/Sphere'
import Dodecahedron from './shapes/Dodecahedron'
import Scene from './Scene'
import Matrix from './Matrix'
import Group from './Group'

let currentRotation = 0.0
let animationActive = true
let previousTimestamp = null

let lightXYZ = [0, 0, 100] //how to position the scene light
let Matrixvals = [-1, 1, 1, -1, -1, 1] // default values for orthographic/persepctive Matricies
let positionType = toggleOrthographic(true, Matrixvals) //false if you want perspective matrix

const VERTEX_SHADER = `
#ifdef GL_ES
precision highp float;
#endif

attribute vec3 vertexPosition;

// Note this new additional output.
attribute vec3 vertexColor;
uniform vec3 lightPosition;

varying vec4 finalVertexColor;
uniform mat4 projectionMatrix;
uniform mat4 rotationMatrix;
uniform mat4 translateMatrix;
uniform mat4 scaleMatrix;
uniform mat4 instanceRotateX;
uniform mat4 instanceRotateY;
uniform mat4 instanceRotateZ;


void main(void) {
   vec3 lightVector = normalize(lightPosition - vertexPosition);
   vec3 fakeNormal = normalize(vertexPosition);

    float contribution = max(dot(lightVector, fakeNormal), 0.0);

  gl_Position =  projectionMatrix * rotationMatrix * translateMatrix * scaleMatrix * instanceRotateZ * instanceRotateY * instanceRotateX * vec4(vertexPosition, 1.0);
  finalVertexColor = vec4(contribution * vertexColor, 1.0);
}
`

const scene = new Scene()

const Sandbox = () => {
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

    const triPrismObj = new TriangularPrism(gl, -0.5, 0, 0, randomValue(), randomValue(), randomValue())
    const pyramidObj = new Pyramid(gl, 0.5, 0.5, 0, randomValue(), randomValue(), randomValue())
    const boxObj = new Box(gl, 0.6, 0, 0, randomValue(), randomValue(), randomValue())
    const tetraHedronObj = new Tetrahedron(gl, 0.5, -0.5, 0, randomValue(), randomValue(), randomValue())
    const diamondObj = new Diamond(gl, 0, -0.5, 0, randomValue(), randomValue(), randomValue())
    const sphereObj = new Sphere(gl, 0, 0, 0, randomValue(), randomValue(), randomValue())
    const dodecahedronObj = new Dodecahedron(gl, 0, 0.6, 0, randomValue(), randomValue(), randomValue())

    dodecahedronObj.scale.x = 0.5
    dodecahedronObj.scale.y = 0.5
    dodecahedronObj.scale.z = 0.5
    triPrismObj.scale.x = 1.5
    triPrismObj.scale.y = 1.5
    triPrismObj.scale.z = 1.5

    const group = new Group()
    group.add(pyramidObj)
    group.add(boxObj)
    group.add(tetraHedronObj)
    group.add(diamondObj)
    group.add(triPrismObj)
    group.add(sphereObj)
    group.add(dodecahedronObj)

    scene.add(group)
    group.angle(0.1, 0.3, 0.3)
    group.scale(0.3, 0.3, 0.3)

    const createBuffers = object => {
      object.verticesBuffer = initVertexBuffer(gl, object.vertices)
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
    const projectionMatrix = gl.getUniformLocation(shaderProgram, 'projectionMatrix')
    const rotationMatrix = gl.getUniformLocation(shaderProgram, 'rotationMatrix')

    //scale and translate
    const getTranslateMatrix = gl.getUniformLocation(shaderProgram, 'translateMatrix')
    const getScaleMatrix = gl.getUniformLocation(shaderProgram, 'scaleMatrix')
    const getLightPosition = gl.getUniformLocation(shaderProgram, 'lightPosition')

    const getInstanceRotateX = gl.getUniformLocation(shaderProgram, 'instanceRotateX')
    const getInstanceRotateY = gl.getUniformLocation(shaderProgram, 'instanceRotateY')
    const getInstanceRotateZ = gl.getUniformLocation(shaderProgram, 'instanceRotateZ')

    gl.enableVertexAttribArray(vertexPosition)
    gl.enableVertexAttribArray(vertexColor)

    const drawObject = object => {
      //console.log(object)
      gl.bindBuffer(gl.ARRAY_BUFFER, object.colorsBuffer)
      gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0)
      gl.bindBuffer(gl.ARRAY_BUFFER, object.verticesBuffer)
      gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0)

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
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(getRotationMatrix(currentRotation, 0.1, 0.1, 0.1)))

      gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, positionType)
      gl.uniform3f(getLightPosition, ...lightXYZ)

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

    //animation
    const FRAMES_PER_SECOND = 60
    const MILLISECONDS_PER_FRAME = 1000 / FRAMES_PER_SECOND
    const DEGREES_PER_MILLISECOND = 0.009
    const FULL_CIRCLE = 360.0

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
      if (progress < MILLISECONDS_PER_FRAME) {
        // Do nothing if it's too soon.
        window.requestAnimationFrame(advanceScene)
        return
      }

      currentRotation += DEGREES_PER_MILLISECOND * progress
      //actual render
      drawScene()

      if (currentRotation >= FULL_CIRCLE) {
        currentRotation -= FULL_CIRCLE
      }

      // Request the next frame.
      previousTimestamp = timestamp
      window.requestAnimationFrame(advanceScene)
    }

    drawScene()

    setUniverse({
      toggleDisplay: () => {
        for (let i = 0; i < scene.terminals.length; i++) {
          if (scene.terminals[i].isGroup) {
            for (let object of scene.terminals[i].terminals) {
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
      },
      toggleRotate: () => {
        let tilt = 0.1
        for (let i = 0; i < scene.terminals.length; i++) {
          scene.angle(scene.terminals[i], tilt++, tilt++, tilt++)
        }
        window.requestAnimationFrame(advanceScene)
      },
      remove: () => {
        if (!scene.terminals.length) {
          return
        }
        scene.removed.push(scene.terminals.pop())
        window.requestAnimationFrame(advanceScene)
      },
      removeSphere: () => {
        if (!scene.terminals.length) {
          return
        }
        group.remove(sphereObj)
        //scene.removed.push(scene.terminals.pop())
        window.requestAnimationFrame(advanceScene)
      },
      add: () => {
        if (!scene.removed.length) {
          return
        }
        scene.add(scene.removed.pop())
        window.requestAnimationFrame(advanceScene)
      }
    })
  }, [canvasRef])

  const handleToggleDisplay = () => universe.toggleDisplay()
  const handleAdd = () => universe.add()
  const handleRemove = () => universe.remove()
  const handleRemoveSphere = () => universe.removeSphere()
  return (
    <article>
      {/* The canvas is square because the default WebGL space is a cube. */}
      <canvas
        width={window.innerWidth}
        height={window.innerHeight - 150}
        id="canvas"
        ref={canvasRef}
        style={{ backgroundColor: 'dodgerblue' }}
      >
        Your favorite update-your-browser message here.
      </canvas>
      <article style={{ marginLeft: '40%' }}>
        <button className="button" onClick={universe && handleToggleDisplay}>
          Toggle Wireframe
        </button>
        <button className="button" onClick={universe && handleRemove}>
          Remove
        </button>
        <button className="button" onClick={universe && handleAdd}>
          Add
        </button>
      </article>
      <div style={{ marginLeft: '90%', marginTop: '-50px', position: 'absolute' }}>
        <button className="button" onClick={universe && handleRemoveSphere}>
          Remove Sphere
        </button>
      </div>
      <div style={{ marginLeft: '3%', marginTop: '-50px', position: 'absolute' }}>
        <button className="button" onClick={() => window.location.reload()}>
          Reset
        </button>
      </div>
    </article>
  )
}

export default Sandbox
