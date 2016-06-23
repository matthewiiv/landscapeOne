
var running = 0
var lastTime = 0
var lastXPos = 0
var totalElapsed = 0

var test = 0

function Move (time, distance, rotation, movementType, rotationType){

  var timeNow = Date.now()
  if (running == 0) {
    lastTime = 0
    lastXPos = 0
    totalElapsed = 0
    running = 1;
  }
  if (lastTime != 0) {
    var elapsed = timeNow - lastTime
    if (totalElapsed < time) {
      camera.position.x += movementType(distance.x, lastXPos, elapsed, time)
      camera.position.y += movementType(distance.y, lastXPos, elapsed, time)
      camera.position.z += movementType(distance.z, lastXPos, elapsed, time)
      camera.rotation.x += rotationType(rotation.x, lastXPos, elapsed, time)
      camera.rotation.y += rotationType(rotation.y, lastXPos, elapsed, time)
      camera.rotation.z += rotationType(rotation.z, lastXPos, elapsed, time)
      totalElapsed += elapsed
    } else {
      completedCameraMoves.push('moved')
      running = 0
    }
  }
  lastTime = timeNow
}



function sinMove(moveType, lastPos, elapsed, time) {
  lastXPos += Math.PI * (elapsed / time) / 6
  return (moveType / 2) * (-Math.cos(lastPos + Math.PI * (elapsed / time)) + Math.cos(lastPos)) //First part in brackets divides movement by the integral between - & PI
}

function cosMove(moveType, lastPos, elapsed, time) {
  lastXPos += Math.PI * (elapsed / time) / 6
  return (moveType) * (Math.sin(lastPos) - Math.sin(lastPos + Math.PI * (elapsed / time)))
}

function sinFastMove(moveType, lastPos, elapsed, time) {
  lastXPos += Math.PI * (elapsed / time) / 12
  return (moveType / 2) * (-Math.cos(lastPos + Math.PI * (elapsed / time)) + Math.cos(lastPos)) //First part in brackets divides movement by the integral between - & PI
}

function sinSlowMove(moveType, lastPos, elapsed, time) {
  lastXPos += Math.PI * (elapsed / time) / 12
  return (moveType / 2) * (-Math.cos(lastPos + Math.PI / 2 +  Math.PI * (elapsed / time)) + Math.cos(lastPos + Math.PI / 2)) //First part in brackets divides movement by the integral between - & PI
}

function linearMove(moveType, lastPos, elapsed, time) {
  lastXPos += (elapsed / time) / 6
  return moveType * (elapsed / time)
}

function squaredMove(moveType, lastPos, elapsed, time) {
  lastXPos += (elapsed / time) / 6
  return 3 * (moveType) * (Math.pow(lastPos + (elapsed / time), 3) / 3 - Math.pow(lastPos, 3) / 3)
}


// TODO: FIX
function squaredSlowDownMove(moveType, lastPos, elapsed, time) {
  lastXPos += (elapsed / time) / 6
  var x = lastPos + elapsed / time
  return (moveType) * ((Math.pow(x, 3) / 3 - 2 * x + 1) - (Math.pow(lastPos, 3) / 3 - 2 * lastPos + 1))
}
