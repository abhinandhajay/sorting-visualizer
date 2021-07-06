const bubbleSort = (array) => {
	console.log('Performing Bubble Sort')
	let sortedArray = array
	let temp
	let animations = []
	for (let i = 0; i < sortedArray.length - 1; i++) {
		for (let j = 0; j < sortedArray.length - i - 1; j++) {
			if (sortedArray[j] > sortedArray[j+1]) {
				temp = sortedArray[j]
				sortedArray[j] = sortedArray[j+1]
				sortedArray[j+1] = temp

				// Add animations
				animations.push({'comp': [j, j+1]})
				animations.push({'comp': [j, j+1]})
				animations.push({'swap': [j, j+1], 'sorted': false})
			}
		}
		animations[animations.length-1].sorted = true
	}
	return { sortedArray, animations }
}

export default bubbleSort;

