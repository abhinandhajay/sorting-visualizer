const selectionSort = (array) => {
	let sortedArray = array
	let temp
	let animations = []
	for (let i = 0; i < sortedArray.length; i++) {
		let minHeight = sortedArray[i]
		let minPos = i
		for (let j = i + 1; j < sortedArray.length; j++) {
			if (minHeight > sortedArray[j]) {
				minHeight = sortedArray[j]
				minPos = j
			}
		}
		temp = sortedArray[i]
		sortedArray[i] = sortedArray[minPos]
		sortedArray[minPos] = temp

		// Add animations
		animations.push({'comp': [i, minPos]})
		animations.push({'comp': [i, minPos]})
		animations.push({'swap': [i, minPos]})
	}
	return { sortedArray, animations }
}

export default selectionSort;