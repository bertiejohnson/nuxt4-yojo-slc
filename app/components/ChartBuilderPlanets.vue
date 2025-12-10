<template>
  <g id="planet-svg-icons">
    <image
      v-for="(planet, i) in planets"
      :key="i"
      :x="planet.x"
      :y="planet.y"
      :transform="planet.transform"
      :height="planet.height"
      :width="planet.width"
      :href="planet.href"
      :data-name="planet.name"
    />
  </g>
</template>

<script setup>
import { planetSvgs } from '~/utils/planetsLib'

const props = defineProps({
  chartPlanets: Object
})

const planets = []
const orderByDegrees = []
const asc = props.chartPlanets[1]
const planetCoordinates = ref([])

// create an Planet array of objects from original array of objects
for (const planetIndex in props.chartPlanets[0]) {
  if (props.chartPlanets[0][planetIndex].name === 'asc' || props.chartPlanets[0][planetIndex].name === 'mc' || props.chartPlanets[0][planetIndex].name === 'true node') continue
  planets.push(props.chartPlanets[0][planetIndex])
  orderByDegrees.push({
    degrees: props.chartPlanets[0][planetIndex].dms_degrees,
    planetIndex: parseInt(planetIndex),
    name: props.chartPlanets[0][planetIndex].name
  })
}

// also need to sort array of dms degrees in order so I can move planet icons forward so
// they don't overlap
const compareNumbers = (a, b) => a.degrees - b.degrees
orderByDegrees.sort(compareNumbers)

const getPrevIndexDegrees = (i) => {
  let a = 0
  if (i !== 0) {
    a = orderByDegrees[i - 1].degrees
  } else {
    a = orderByDegrees[orderByDegrees.length - 1].degrees
  }
  return a
}

const getAdjustment = (p, i) => {
  let adjustBy = 0
  orderByDegrees.forEach((el, idx) => {
    if (parseInt(el.planetIndex) === i) {
      const prevIndexDegrees = getPrevIndexDegrees(idx)

      if (idx !== 0 && el.degrees - prevIndexDegrees < 7) {
        adjustBy = 4
      } else if (idx === 0 && (el.degrees - prevIndexDegrees) + 360 < 7) {
        adjustBy = 4
      }
    }
  })
  return adjustBy
}

const getXCoordinates = (degrees) => {
  const x = 150 * Math.sin((Math.PI / 180) * (degrees - (asc - -90)))
  return Number.parseFloat(x).toFixed(4)
}

const getYCoordinates = (degrees) => {
  const y = 150 * Math.cos((Math.PI / 180) * (degrees - (asc - -90)))
  return Number.parseFloat(y).toFixed(4)
}

if (planets.length > 0) {
  for (let i = 0; i < planets.length; i++) {
    const adjustment = getAdjustment(planets[i], i)
    const degrees = parseInt(planets[i].dms_degrees) + parseInt(adjustment)
    planetCoordinates.value[i] = {
      name: planets[i].name,
      x: getXCoordinates(degrees),
      y: getYCoordinates(degrees),
      degrees: planets[i].dms_degrees,
      index: i
    }
  }

  for (let i = 0; i < planets.length; i++) {
    // planets[i].x = planetCoordinates.value[i].x
    // planets[i].y = planetCoordinates.value[i].y
    planets[i].x = getXCoordinates(parseInt(planets[i].dms_degrees) + getAdjustment(planets[i], i))
    planets[i].y = getYCoordinates(parseInt(planets[i].dms_degrees) + getAdjustment(planets[i], i))
    // console.log('X coordinates', planets[i].x, 'Y coordinates', planets[i].y)
    planets[i].height = planetSvgs[i].height
    planets[i].width = planetSvgs[i].width
    planets[i].href = 'data:image/svg+xml,' + encodeURIComponent(planetSvgs[i].svg)
    planets[i].transform = `translate(-${planetSvgs[i].width / 2}, -${planetSvgs[i].height / 2})` // position svg centrally
  }
}
</script>
