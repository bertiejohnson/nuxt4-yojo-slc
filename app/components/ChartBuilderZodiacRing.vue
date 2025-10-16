<template>
  <g :style="rotateIt" id="sign-name-group" class="sign-name-group">
    <path
      v-for="(path, i) in signPathData"
      class="path-arc"
      stroke="#000"
      fill="#f1f5f9"
      stroke-width="1"
      :key="'sign-' + i"
      :d="path"
    ></path>

    <path
      v-for="(path, i) in signNamePathData"
      :id="'signarc-' + path.sign"
      :key="'sign-arc-' + i"
      class="name-path-arc"
      fill="none"
      stroke="none"
      :d="path.path"
    />

    <text
      v-for="(path, i) in signNamePathData"
      :id="'signarc-' + path.sign"
      :dy="setDy(path.sign)"
      :key="'sign-text-' + i"
    >
      <textPath
        :href="'#signarc-' + path.sign"
        startOffset="50%"
        style="text-anchor: middle"
      >
        {{ path.sign }}
      </textPath>
    </text>
  </g>
</template>

<script setup>
import { arc } from "d3-shape";

const props = defineProps({
  chartAsc: Number,
});


const signPathData = ref([]);
const signNamePathData = ref([]);
const rotateIt = reactive({ transform: "" });
const asc = ref(props.chartAsc);
const textDy = ref([null]);

let myDyArr = [];

let colours = [
  'blue',
  'red',
  'green',
  'orange',
  'purple',
  'teal',
  'cyan',
  'pink',
  'yellow',
  'violet',
  'gray',
  'lime'
];

// move to library ...?
let signNamesArr = [
  { sign: "Aries", startDegree: 0 },
  { sign: "Taurus", startDegree: 30 },
  { sign: "Gemini", startDegree: 60 },
  { sign: "Cancer", startDegree: 90 },
  { sign: "Leo", startDegree: 120 },
  { sign: "Virgo", startDegree: 150 },
  { sign: "Libra", startDegree: 180 },
  { sign: "Scorpio", startDegree: 210 },
  { sign: "Sagitarius", startDegree: 240 },
  { sign: "Capricorn", startDegree: 270 },
  { sign: "Aquarius", startDegree: 300 },
  { sign: "Pisces", startDegree: 330 },
];
signNamesArr.reverse();

signPathData.value = getPathArcs(getPathsReady(166, 190));

signNamePathData.value = getSignNames(getPathArcs(getPathsReady(171, 172)));

// offset for names that need flipping ... 
// myDyArr[] is presently initialised in getHousePathsReady() so this call needs to sit after it 
textDy.value = [...myDyArr]; 

function setDy(sign) {
  return textDy.value.includes(sign) ? 10 : 0;
}

function getPathsReady(iR, oR, theArr) {
    let haveArr = theArr ? true : false; // theArr is used for houses
    let radianAccumulator = 0;
    const radians = 0.5235987755982988; // = 30 degrees - used for signs

    let arr = haveArr ? theArr : [...Array(12).keys()]; // create array with a length of 12

    for (let i = 0; i < arr.length; i++) {
      if (!haveArr) arr[i] = {};
      arr[i].startAngle = parseFloat(radianAccumulator);
      radianAccumulator += haveArr
        ? parseFloat(arr[i].radians)
        : parseFloat(radians);
      arr[i].endAngle = parseFloat(radianAccumulator);
      arr[i].innerRadius = iR;
      arr[i].outerRadius = oR;
    }
    return arr;
}

function getPathArcs(arr) {
  let pathGenArr = [];
  let pathArr = [];
  for (let i = 0; i < arr.length; i++) {
    pathGenArr[i] = arc();
    pathArr[i] = pathGenArr[i](arr[i]);
  }
  return pathArr;
}

function getSignNames(arr) {
  let nameArcArr = [];
  let myDesc = asc.value > 180 ? asc.value - 180 : asc.value + 180;
  let flipRange1 = myDesc < 180 ? 360 - asc.value : null;

  // needs testing for rotation consistency
  rotateIt.transform = `rotate(${asc.value - 90}deg)`;

  for (let i = 0; i < arr.length; i++) {
    let flipText = 0;
    let startDeg = signNamesArr[i].startDegree;

    if (flipRange1) {
      // desc less than 180
      if (startDeg < myDesc || startDeg > asc.value) {
        flipText = 1;
      }
    } else {
      // handle cases where desc is > 180

      if (startDeg > asc.value && startDeg < myDesc) {
        flipText = 1;
      }
    }

    nameArcArr[i] = {
      path: arr[i],
      sign: signNamesArr[i].sign,
      fliptext: flipText,
    };

    if (nameArcArr[i].fliptext === 1) {
      // load up the array with the signs that need to be flipped
      myDyArr[i] = nameArcArr[i].sign;
    }

    let firstArcSection = /(^.+?)L/;

    //Grab everything up to the first Line statement
    nameArcArr[i].path = firstArcSection.exec(nameArcArr[i].path)[1];
    nameArcArr[i].path = nameArcArr[i].path.replace(/,/g, " ");

    if (nameArcArr[i].fliptext === 1) {
      let startLoc = /M(.*?)A/, //Everything between the first capital M and first capital A of the path string
        middleLoc = /A(.*?)0 0 1/, //Everything between the first capital A and 0 0 1 of the path string
        endLoc = /0 0 1 (.*?)$/; //Everything between the first 0 0 1 and the end of the path string (denoted by $)

      //Flip the direction of the arc by switching the start en end point (and sweep flag)
      //of those elements that are below the horizontal line
      let newStart = endLoc.exec(nameArcArr[i].path)[1],
        newEnd = startLoc.exec(nameArcArr[i].path)[1],
        middleSec = middleLoc.exec(nameArcArr[i].path)[1];

      //Build up the new arc notation, set the sweep-flag to 0
      nameArcArr[i].path =
        "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
    }
  }
  return nameArcArr;
}
</script>