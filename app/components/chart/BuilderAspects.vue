<template>
  <g id="aspects">
    <line
      v-for="(aspect, i) in aspects"
      :key="'aspect-' + i"
      :x1="aspect.x1"
      :y1="aspect.y1"
      :x2="aspect.x2"
      :y2="aspect.y2"
      :stroke="aspect.colour"
      stroke-width="0.5"
    />
  </g>
</template>

<script setup>
// TODO:
// Could sort planet degrees which are needed for planetCoordinates[]
// earlier, perhaps in ChartBuilder.vue or even back in SwissEph

const props = defineProps({
  chartAspects: Object,
});

const aspects = [];
const planets = [];
const asc = props.chartAspects[2];
const planetCoordinates = ref([]);

// create Aspect array of objects from original object - maybe sort this in swiss eph
for (const aspectNo in props.chartAspects[0]) {
  if (
    props.chartAspects[0][aspectNo].planetOneName.includes('asc') ||
    props.chartAspects[0][aspectNo].planetOneName.includes('mc') ||
    props.chartAspects[0][aspectNo].planetOneName.includes('chiron') ||
    props.chartAspects[0][aspectNo].planetOneName.includes('true node') ||
    props.chartAspects[0][aspectNo].planetTwoName.includes('asc') ||
    props.chartAspects[0][aspectNo].planetTwoName.includes('mc') ||
    props.chartAspects[0][aspectNo].planetTwoName.includes('chiron') ||
    props.chartAspects[0][aspectNo].planetTwoName.includes('true node')
  )
    continue;
  aspects.push(props.chartAspects[0][aspectNo]);

  // DEV: structuredClone test ...
  // aspects.push(structuredClone(props.chartAspects[0][aspectNo]));
}

// create an Planet array of objects from original object - maybe sort this in swiss eph
for (const planetNo in props.chartAspects[1]) {
  if (
    props.chartAspects[1][planetNo].name.includes('asc') ||
    props.chartAspects[1][planetNo].name.includes('mc') ||
    props.chartAspects[1][planetNo].name.includes('chiron') ||
    props.chartAspects[1][planetNo].name.includes('true node')
  )
    continue;

  planets.push(props.chartAspects[1][planetNo]);
}

// console.log('Aspects:', aspects[0]);
// console.log('Planets:', planets[0]);

const getXCoordinates = (degrees) => {
  let x = 120 * Math.sin((Math.PI / 180) * (degrees - (asc - -90)));
  return Number.parseFloat(x).toFixed(4)
};

const getYCoordinates = (degrees) => {
  let y = 120 * Math.cos((Math.PI / 180) * (degrees - (asc - -90)));
  return Number.parseFloat(y).toFixed(4)
};

(() => {
  planets.forEach((el, i) => {
    planetCoordinates.value[i] = {
      name: planets[i].name,
      x: getXCoordinates(el.dms_degrees),
      y: getYCoordinates(el.dms_degrees),
      degrees: el.dms_degrees,
      index: i,
    };
  });
})();

(() => {
  for (let i = 0; i < aspects.length; i++) {
    let planet1 = aspects[i].planetOneId;
    let planet2 = aspects[i].planetTwoId;
    aspects[i].x1 = planetCoordinates.value[planet1].x;
    aspects[i].y1 = planetCoordinates.value[planet1].y;
    aspects[i].x2 = planetCoordinates.value[planet2].x;
    aspects[i].y2 = planetCoordinates.value[planet2].y;
  }
})();
</script>

<style></style>
