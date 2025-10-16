<template>
	<g id="planet-lines?">
		<line
			v-for="(planet, i) in planets"
			:key="'planet-' + i"
			:x1="planet.x1"
			:x2="planet.x2"
			:y1="planet.y1"
			:y2="planet.y2"
			:data-line-name="planet.name"
			stroke="#888" />
	</g>
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
			:data-name="planet.name"></image>
	</g>
</template>

<script setup>
	// import { svgs } from '~/assets/js/planetsdata.js';
	import { planetSvgs } from '~/utils/planetsLib';

	const props = defineProps({
		chartPlanets: Object,
	});

	// console.log('Planets', props.chartPlanets);

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
		'lime',
	];

	const planets = [];
	const orderByDegrees = [];
	const asc = props.chartPlanets[1];
	const planetCoordinates = ref([]);

	// create an Planet array of objects from original array of objects
	for (const planetIndex in props.chartPlanets[0]) {
		planets.push(props.chartPlanets[0][planetIndex]);
		orderByDegrees.push({
			degrees: props.chartPlanets[0][planetIndex].dms_degrees,
			planetIndex: parseInt(planetIndex),
			name: props.chartPlanets[0][planetIndex].name
		});
	}

	// also need to sort array of dms degrees in order so I can move planet icons forward so
	// they don't overlap
	const compareNumbers = (a, b) => a.degrees - b.degrees;
	orderByDegrees.sort(compareNumbers);

	const getPrevIndexDegrees = (i) => {
		let a = 0;
		if (i !== 0) {
			a = orderByDegrees[i - 1].degrees;
		} else {
			a = orderByDegrees[orderByDegrees.length - 1].degrees;
		}
		return a;
	};

	const getAdjustment = (p, i) => {
		let adjustBy = 0;
		// console.log('ADJUSTING', p, i);
		orderByDegrees.forEach((el, idx) => {
			if (parseInt(el.planetIndex) === i) {
				let prevIndexDegrees = getPrevIndexDegrees(idx);
				
				if (idx !== 0 && el.degrees - prevIndexDegrees < 7) {
					adjustBy = 4;
				} else if (idx === 0 && (el.degrees - prevIndexDegrees) + 360 < 7) {
					adjustBy = 4;
				}
			}
		});
		// console.log('AdjustBy', adjustBy);
		return adjustBy;
	};
	
	// console.log(orderByDegrees);
	
	const getXCoordinates = (degrees) => {
		let x = 150 * Math.sin((Math.PI / 180) * (degrees - (asc - -90)));
		return x;
	};

	const getYCoordinates = (degrees) => {
		let y = 150 * Math.cos((Math.PI / 180) * (degrees - (asc - -90)));
		return y;
	};

	(() => {
		planets.forEach((p, i) => {
			let adjustment = getAdjustment(p, i);
			let degrees = parseInt(p.dms_degrees) + parseInt(adjustment);
			// p.adjustedDegrees = parseInt(adjustment);
			planetCoordinates.value[i] = {
				name: planets[i].name,
				x: getXCoordinates(degrees),
				y: getYCoordinates(degrees),
				degrees: p.dms_degrees,
				index: i,
			};
		});
	})();

	(() => {
		for (let i = 0; i < planets.length; i++) {
			// Could do with sorting the asc/mc into a 'chart point' collection at some point instead 
			// of bundling into planets e.g. nodes, part of fortune, asc, mc ... 
			if (planets[i].name === 'asc' || planets[i].name === 'mc' || planets[i].name === 'true node') continue;
			planets[i].x = planetCoordinates.value[i].x;
			planets[i].y = planetCoordinates.value[i].y;
			planets[i].height = planetSvgs[i].height;
			planets[i].width = planetSvgs[i].width;
			planets[i].href = "data:image/svg+xml," + encodeURIComponent(planetSvgs[i].svg);
			planets[i].transform = `translate(-${planetSvgs[i].width / 2}, -${
				planetSvgs[i].height / 2
			})`; // position svg centrally
		}
	})();
</script>
