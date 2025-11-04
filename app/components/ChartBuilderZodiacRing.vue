<template>
  <g
    :id="'sign-name-group-' + randomId()"
    :style="rotateIt"
    class="sign-name-group"
  >
    <path
      v-for="(path, i) in signPathData"
      :key="'sign-' + i"
      class="path-arc"
      stroke="#000"
      fill="#f1f5f9"
      stroke-width="1"
      :d="path"
    />

    <path
      v-for="(path, i) in signNamePathData"
      :id="'signarc-' + path.sign + '-text-' + pathTextPath"
      :key="'sign-arc-' + i"
      class="name-path-arc"
      fill="none"
      stroke="none"
      :d="path.path"
    />

    <text
      v-for="(path, i) in signNamePathData"
      :id="'signarc-' + path.sign + '-text-' + randomId()"
      :key="'sign-text-' + i"
      :dy="setDy(path.sign)"
    >
      <textPath
        :href="'#signarc-' + path.sign + '-text-' + pathTextPath"
        startOffset="50%"
        style="text-anchor: middle"
      >
        {{ path.sign }}
      </textPath>
    </text>
  </g>
</template>

<script setup>
import { arc } from 'd3-shape'

const props = defineProps({
  chartAsc: Number
})

const randomId = (length = 6) => Math.random().toString(36).substring(2, length + 2)

// This provides unique id for the path Id and the corresponding textPath href
// Without this, multiple charts on the same page would have conflicting IDs and the textPaths are not 'flipped correctly'
// Will change to something more prosaic and predictable later on when making chart more interactive
const pathTextPath = randomId()

const rotateIt = { transform: '' }
const asc = props.chartAsc
rotateIt.transform = `rotate(${asc - 90}deg)`
const myDyArr = []

// move to library ...?
const signNamesArr = [
  { sign: 'Aries', startDegree: 0 },
  { sign: 'Taurus', startDegree: 30 },
  { sign: 'Gemini', startDegree: 60 },
  { sign: 'Cancer', startDegree: 90 },
  { sign: 'Leo', startDegree: 120 },
  { sign: 'Virgo', startDegree: 150 },
  { sign: 'Libra', startDegree: 180 },
  { sign: 'Scorpio', startDegree: 210 },
  { sign: 'Sagitarius', startDegree: 240 },
  { sign: 'Capricorn', startDegree: 270 },
  { sign: 'Aquarius', startDegree: 300 },
  { sign: 'Pisces', startDegree: 330 }
]

signNamesArr.reverse()

const signPathData = getPathArcs(getPathsReady(166, 190))

const signNamePathData = getSignNames(getPathArcs(getPathsReady(171, 172)))

function setDy(sign) {
  return myDyArr.includes(sign) ? 10 : 0
}

function getPathsReady(iR, oR) {
  let radianAccumulator = 0
  const radians = 0.5235987755982988 // = 30 degrees - used for signs

  const arr = [...Array(12).keys()] // create array with a length of 12

  for (let i = 0; i < arr.length; i++) {
    arr[i] = {}
    arr[i].startAngle = parseFloat(radianAccumulator)
    radianAccumulator += parseFloat(radians)
    arr[i].endAngle = parseFloat(radianAccumulator)
    arr[i].innerRadius = iR
    arr[i].outerRadius = oR
  }
  return arr
}

function getPathArcs(arr) {
  const pathGenArr = []
  const pathArr = []
  for (let i = 0; i < arr.length; i++) {
    pathGenArr[i] = arc()
    pathArr[i] = pathGenArr[i](arr[i])
  }
  return pathArr
}

function getSignNames(arr) {
  const nameArcArr = [null]
  const myDesc = asc > 180 ? asc - 180 : asc + 180
  const flipRange1 = myDesc < 180 ? 360 - asc : null

  for (let i = 0; i < arr.length; i++) {
    let flipText = 0
    const startDeg = signNamesArr[i].startDegree

    if (flipRange1) {
      // desc less than 180
      if (startDeg < myDesc || startDeg > asc) {
        flipText = 1
      }
    } else {
      // handle cases where desc is > 180
      if (startDeg > asc && startDeg < myDesc) {
        flipText = 1
      }
    }

    nameArcArr[i] = {
      path: arr[i],
      sign: signNamesArr[i].sign,
      fliptext: flipText
    }

    if (nameArcArr[i].fliptext === 1) {
      // load up the array with the signs that need to be flipped
      myDyArr[i] = nameArcArr[i].sign
    }

    const firstArcSection = /(^.+?)L/

    // Grab everything up to the first Line statement
    nameArcArr[i].path = firstArcSection.exec(nameArcArr[i].path)[1]
    nameArcArr[i].path = nameArcArr[i].path.replace(/,/g, ' ')

    if (nameArcArr[i].fliptext === 1) {
      const startLoc = /M(.*?)A/ // Everything between the first capital M and first capital A of the path string
      const middleLoc = /A(.*?)0 0 1/ // Everything between the first capital A and 0 0 1 of the path string
      const endLoc = /0 0 1 (.*?)$/ // Everything between the first 0 0 1 and the end of the path string (denoted by $)

      // Flip the direction of the arc by switching the start en end point (and sweep flag)
      // of those elements that are below the horizontal line
      const newStart = endLoc.exec(nameArcArr[i].path)[1]
      const newEnd = startLoc.exec(nameArcArr[i].path)[1]
      const middleSec = middleLoc.exec(nameArcArr[i].path)[1]

      // Build up the new arc notation, set the sweep-flag to 0
      nameArcArr[i].path
        = 'M' + newStart + 'A' + middleSec + '0 0 0 ' + newEnd
    }
  }
  return nameArcArr
}
</script>
