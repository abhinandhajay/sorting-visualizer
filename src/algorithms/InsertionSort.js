const insertionSort = (array) => {
	let sortedArray = array
	let animations = []
	for (let i = 1; i < sortedArray.length; i++) {
		let key = sortedArray[i]
		let j = i - 1

		while (j >= 0 && sortedArray[j] > key) {
			sortedArray[j + 1] = sortedArray[j]
			// Add animations
			animations.push({'comp': [j, j + 1]})
			animations.push({'comp': [j, j + 1]})
			animations.push({'swap': [j, j + 1]})
			j -= 1
		}
		sortedArray[j + 1] = key
	}
	return { sortedArray, animations }
}

export default insertionSort;