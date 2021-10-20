const makeCar = (
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
) => {
  body.scale.x = 0.75
  body.scale.y = 0.5
  body.scale.z = 0.5

  front.scale.x = 0.5
  front.scale.y = 0.29
  front.scale.z = 0.4

  back.scale.x = 0.5
  back.scale.y = 0.29
  back.scale.z = 0.45

  wheel1.location.x = -0.5
  wheel1.location.y = -0.2
  wheel1.location.z = 0.2
  wheel1.scale.x = 0.12
  wheel1.scale.y = 0.12
  wheel1.scale.z = 0.12

  wheel2.location.x = 0.5
  wheel2.location.y = -0.2
  wheel2.location.z = 0.15
  wheel2.scale.x = 0.12
  wheel2.scale.y = 0.12
  wheel2.scale.z = 0.12

  wheel3.location.x = -0.5
  wheel3.location.y = -0.2
  wheel3.location.z = -0.2
  wheel3.scale.x = 0.12
  wheel3.scale.y = 0.12
  wheel3.scale.z = 0.12

  wheel4.location.x = 0.5
  wheel4.location.y = -0.2
  wheel4.location.z = -0.15
  wheel4.scale.x = 0.12
  wheel4.scale.y = 0.12
  wheel4.scale.z = 0.12

  wheel1.color.r = 0.5
  wheel1.color.g = 0.5
  wheel1.color.b = 0.5
  wheel2.color.r = 0.5
  wheel2.color.g = 0.5
  wheel2.color.b = 0.5
  wheel3.color.r = 0.5
  wheel3.color.g = 0.5
  wheel3.color.b = 0.5
  wheel4.color.r = 0.5
  wheel4.color.g = 0.5
  wheel4.color.b = 0.5

  headlight1.scale.x = 0.03
  headlight1.scale.y = 0.03
  headlight1.scale.z = 0.03
  headlight2.scale.x = 0.03
  headlight2.scale.y = 0.03
  headlight2.scale.z = 0.03

  windshield.scale.x = 0.799
  windshield.scale.y = 0.2
  windshield.scale.z = 0.38

  brakeLight1.scale.x = 0.1
  brakeLight1.scale.y = 0.1
  brakeLight1.scale.z = 0.1
  brakeLight2.scale.x = 0.1
  brakeLight2.scale.y = 0.1
  brakeLight2.scale.z = 0.1

  sedan.add(body)
  sedan.add(front)
  sedan.add(back)
  sedan.add(wheel1)
  sedan.add(wheel2)
  sedan.add(wheel3)
  sedan.add(wheel4)
  sedan.add(headlight1)
  sedan.add(headlight2)
  sedan.add(windshield)
  sedan.add(brakeLight1)
  sedan.add(brakeLight2)
}

const makeBus = (
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
) => {
  bodyBus.scale.x = 1.5
  bodyBus.scale.y = 0.5
  bodyBus.scale.z = 0.5

  frontBus.scale.x = 0.4
  frontBus.scale.y = 0.6
  frontBus.scale.z = 0.5

  frontBus.angle.x = Math.PI / 2
  frontBus.angle.y = 0
  frontBus.angle.z = Math.PI / 2

  wheelBus1.location.x = -0.5
  wheelBus1.location.y = -0.2
  wheelBus1.location.z = 0.2
  wheelBus1.scale.x = 0.12
  wheelBus1.scale.y = 0.12
  wheelBus1.scale.z = 0.12

  wheelBus2.location.x = 0.5
  wheelBus2.location.y = -0.2
  wheelBus2.location.z = 0.2
  wheelBus2.scale.x = 0.12
  wheelBus2.scale.y = 0.12
  wheelBus2.scale.z = 0.12

  wheelBus3.location.x = -0.5
  wheelBus3.location.y = -0.2
  wheelBus3.location.z = -0.2
  wheelBus3.scale.x = 0.12
  wheelBus3.scale.y = 0.12
  wheelBus3.scale.z = 0.12

  wheelBus4.location.x = 0.5
  wheelBus4.location.y = -0.2
  wheelBus4.location.z = -0.2
  wheelBus4.scale.x = 0.12
  wheelBus4.scale.y = 0.12
  wheelBus4.scale.z = 0.12

  window1.scale.x = 0.12
  window1.scale.y = 0.12
  window1.scale.z = 0.03

  window1.location.x = 0.3
  window1.location.y = 0.1
  window1.location.z = -0.24
  window1.color.r = 0.535
  window1.color.g = 1.06
  window1.color.b = 1.35

  window2.scale.x = 0.12
  window2.scale.y = 0.12
  window2.scale.z = 0.03

  window2.location.x = -0.08
  window2.location.y = 0.1
  window2.location.z = -0.24
  window2.color.r = 0.535
  window2.color.g = 1.06
  window2.color.b = 1.35

  window3.scale.x = 0.12
  window3.scale.y = 0.12
  window3.scale.z = 0.03

  window3.location.x = -0.45
  window3.location.y = 0.1
  window3.location.z = -0.24
  window3.color.r = 0.535
  window3.color.g = 1.06
  window3.color.b = 1.35

  window4.scale.x = 0.12
  window4.scale.y = 0.12
  window4.scale.z = 0.03

  window4.location.x = 0.3
  window4.location.y = 0.1
  window4.location.z = 0.24
  window4.color.r = 0.535
  window4.color.g = 1.06
  window4.color.b = 1.35

  window5.scale.x = 0.12
  window5.scale.y = 0.12
  window5.scale.z = 0.03

  window5.location.x = -0.08
  window5.location.y = 0.1
  window5.location.z = 0.24
  window5.color.r = 0.535
  window5.color.g = 1.06
  window5.color.b = 1.35

  window6.scale.x = 0.12
  window6.scale.y = 0.12
  window6.scale.z = 0.03

  window6.location.x = -0.45
  window6.location.y = 0.1
  window6.location.z = 0.24
  window6.color.r = 0.535
  window6.color.g = 1.06
  window6.color.b = 1.35

  wheelBus1.color.r = 0
  wheelBus1.color.g = 0
  wheelBus1.color.b = 0
  wheelBus2.color.r = 0
  wheelBus2.color.g = 0
  wheelBus2.color.b = 0
  wheelBus3.color.r = 0
  wheelBus3.color.g = 0
  wheelBus3.color.b = 0
  wheelBus4.color.r = 0
  wheelBus4.color.g = 0
  wheelBus4.color.b = 0

  windshieldBus.scale.x = 1.55
  windshieldBus.scale.y = 0.2
  windshieldBus.scale.z = 0.38

  propeller.scale.x = 0.2
  propeller.scale.y = 0.2
  propeller.scale.z = 0.2
  propeller.angle.x = Math.PI / 2

  bus.add(bodyBus)
  bus.add(frontBus)
  bus.add(wheelBus1)
  bus.add(wheelBus2)
  bus.add(wheelBus3)
  bus.add(wheelBus4)
  bus.add(window1)
  bus.add(window2)
  bus.add(window3)
  bus.add(window4)
  bus.add(window5)
  bus.add(window6)
  bus.add(windshieldBus)
  bus.add(propeller)
}

const makeTree = (tree, trunk, greenery, greenery2, greenery3, apple, orange) => {
  trunk.scale.x = 0.3
  trunk.scale.z = 0.3

  greenery2.scale.x = 0.9
  greenery2.scale.y = 0.9
  greenery2.scale.z = 0.9

  greenery3.scale.x = 0.6
  greenery3.scale.y = 0.6
  greenery3.scale.z = 0.6

  apple.scale.x = 0.1
  apple.scale.y = 0.1
  apple.scale.z = 0.1

  orange.scale.x = 0.1
  orange.scale.y = 0.1
  orange.scale.z = 0.1

  tree.add(trunk)
  tree.add(greenery)
  tree.add(greenery2)
  tree.add(greenery3)
  tree.add(apple)
  tree.add(orange)
}

const makeMoon = moon => {
  moon.scale.x = 0.3
  moon.scale.y = 0.3
  moon.scale.z = 0.3
}

const makeFloor = floor => {
  floor.scale.x = 4
  floor.scale.z = 4
}

const makeStar = (star, starCore, starPoint1, starPoint2, starPoint3, starPoint4) => {
  starCore.scale.x = 0.5
  starCore.scale.y = 0.5
  starCore.scale.z = 0.5
  starCore.location.x = -1.5
  starCore.location.y = 2

  starPoint1.location.x = -1.4
  starPoint1.location.y = 2
  starPoint1.angle.x = Math.PI / 2
  starPoint1.angle.y = Math.PI / 2

  starPoint2.location.x = -1.5
  starPoint2.location.y = 2.1
  starPoint2.angle.x = (-4 * Math.PI) / 2
  starPoint2.angle.y = Math.PI / 2

  starPoint3.location.x = -1.6
  starPoint3.location.y = 2
  starPoint3.angle.x = Math.PI / 2
  starPoint3.angle.y = -Math.PI / 2

  starPoint4.location.x = -1.5
  starPoint4.location.y = 1.9
  starPoint4.angle.x = (-2 * Math.PI) / 2
  starPoint4.angle.y = -Math.PI / 2

  star.add(starCore)
  star.add(starPoint1)
  star.add(starPoint2)
  star.add(starPoint3)
  star.add(starPoint4)
}

const makeSaucer = (saucer, saucerCockPit, saucerDisk) => {
  saucerCockPit.scale.x = 0.2
  saucerCockPit.scale.y = 0.2
  saucerCockPit.scale.z = 0.2
  saucerCockPit.location.x = -1.5
  saucerCockPit.location.y = 2

  saucerDisk.location.x = -1.5
  saucerDisk.location.y = 2
  saucerDisk.scale.x = 0.8
  saucerDisk.scale.y = 0.1
  saucerDisk.scale.z = 0.8

  saucer.add(saucerCockPit)
  saucer.add(saucerDisk)
}

export { makeCar, makeBus, makeTree, makeFloor, makeMoon, makeStar, makeSaucer }
