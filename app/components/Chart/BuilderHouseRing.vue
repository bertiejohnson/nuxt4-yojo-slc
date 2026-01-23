<template>
	<g
		id="housePathData"
		style="transform: rotate(-90deg)">
		<path
			v-for="(path, i) in housePathData"
			stroke="#000"
			fill-opacity="0"
			:id="'house-' + (12 - i)"
			:key="'house-' + i"
			:d="path"></path>
	</g>

	<g id="angles">
		<line
			v-for="(angle, i) in angles"
			:x1="angle.x1"
			:y1="angle.y1"
			:x2="angle.x2"
			:y2="angle.y2"
			:key="'angle-' + i"
			:id="'angle-' + i"
			stroke="black"
			stroke-width="3" />
	</g>
</template>

<script setup>
	import { arc, lineRadial } from 'd3-shape';

	const props = defineProps({
		chartHouses: Object,
	});

	const houseCusps = props.chartHouses.cuspvalues;
	const housePathData = ref([]);

	const asc = props.chartHouses.asc;
	const mc = props.chartHouses.mc;

	// console.log('chartHouses Prop', props.chartHouses);

	// console.log('Radial Line', lineRadial()([0.2324324, 4]));

	let houseArr = [];

	// create array from object - maybe sort this in swiss eph?
	for (const houseNo in houseCusps) {
		houseArr.push(houseCusps[houseNo]);
	}

	// Remove the first object which SwissEph puts in then reverse
	// as the houses run counter-clockwise
	houseArr.reverse();

	housePathData.value = getPathArcs(
		getPathsReady(40, 166, getHousePathsReady(houseArr))
	);

	function getPathArcs(arr) {
		let pathGenArr = [];
		let pathArr = [];
		for (let i = 0; i < arr.length; i++) {
			pathGenArr[i] = arc();
			pathArr[i] = pathGenArr[i](arr[i]);
		}
		return pathArr;
	}

	function getPathsReady(iR, oR, theArr) {
		let haveArr = theArr ? true : false; // theArr is used for houses
		let radianAccumulator = 0;
		const radians = 0.5235987755982988; // = 30 degrees - used for signs ... not here so safe to remove?

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
			arr[i].houseNumber = 12 - i; // dev
			arr[i].numberPositionRadians =
				arr[i].startAngle + radianAccumulator / 2;
		}
		// console.log('arr', arr);
		return arr;
	}

	function getHousePathsReady(houseArr) {
		const radMin = (Math.PI * 2) / (360 * 60); // 0.0002908882086657216 - the radian for one minute/degree of arc

		let newArr = [];

		for (let i = 0; i < houseArr.length; i++) {
			newArr[i] = {};

			let lowerDegree = houseArr[i]
				? parseFloat(houseArr[i].values.dec_degrees)
				: 0;
			let higherDegree = 0;

			if (i === 0) {
				higherDegree = parseFloat(houseArr[11].values.dec_degrees);
			} else if (houseArr[i - 1]) {
				higherDegree = parseFloat(houseArr[i - 1].values.dec_degrees);
			}

			if (lowerDegree > higherDegree) {
				lowerDegree = 360 - parseFloat(lowerDegree);
				newArr[i].radians =
					(parseFloat(higherDegree) + parseFloat(lowerDegree)) *
					60 *
					radMin;
			} else {
				newArr[i].radians =
					(parseFloat(higherDegree) - parseFloat(lowerDegree)) *
					60 *
					radMin;
			}
		}
		return newArr;
	}

	const getXCoordinates = (degrees, r) => {
		let x = r * Math.sin((Math.PI / 180) * (degrees - (asc - -90)));
		return x;
	};

	const getYCoordinates = (degrees, r) => {
		let y = r * Math.cos((Math.PI / 180) * (degrees - (asc - -90)));
		return y;
	};

	// console.log('x1', getXCoordinates(mc, 166), 'y1', getYCoordinates(mc, 166));
	// console.log('x2', getXCoordinates(mc, 40), 'y2', getYCoordinates(mc, 40));
	// console.log('MC', mc);

	let ic = 0;

	if (mc <= 180) {
		ic = mc + 180;
	} else {
		ic = mc - 180;
	}

	// ic = mc <= 180 ? mc + 180 : mc - 180;

	let angles = [
		// ASC / DESC
		{
			x1: -166,
			y1: 0,
			x2: -40,
			y2: 0,
		},
		{
			x1: 40,
			y1: 0,
			x2: 166,
			y2: 0,
		},
		{
			// ASC outer marker
			x1: -200,
			y1: 0,
			x2: -190,
			y2: 0,
		},
		{
			// DESC outer marker
			x1: 200,
			y1: 0,
			x2: 190,
			y2: 0,
		},
		// MC / IC - need to write outer and inner radius numbers once somewhere ...
		{
			x1: getXCoordinates(mc, 166),
			y1: getYCoordinates(mc, 166),
			x2: getXCoordinates(mc, 40),
			y2: getYCoordinates(mc, 40),
		},
		{
			x1: getXCoordinates(ic, 166),
			y1: getYCoordinates(ic, 166),
			x2: getXCoordinates(ic, 40),
			y2: getYCoordinates(ic, 40),
		},
		{
			// MC outer marker
			x1: getXCoordinates(mc, 200),
			y1: getYCoordinates(mc, 200),
			x2: getXCoordinates(mc, 190),
			y2: getYCoordinates(mc, 190),
		},
		{
			// IC outer marker
			x1: getXCoordinates(ic, 200),
			y1: getYCoordinates(ic, 200),
			x2: getXCoordinates(ic, 190),
			y2: getYCoordinates(ic, 190),
		},
	];
</script>

<style scoped></style>
