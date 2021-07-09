const quickSort = (array, low, high, animations) => {

	if (low < high) {
		let pi = partition(array, low, high, animations);

		quickSort(array, low, pi - 1, animations);
		quickSort(array, pi + 1, high, animations);
	}
}

const partition = (array, low, high, animations) => {
	let temp
	let pivot = array[high];
	let i = (low - 1) 

	for (let j = low; j <= high - 1; j++) {
		if (array[j] < pivot) {
			i++;

			temp = array[i]
			array[i] = array[j]
			array[j] = temp

			animations.push({'comp': [i, j]})
			animations.push({'comp': [i, j]})
			animations.push({'swap': [i, j]})
		}
	}
	temp = array[i + 1]
	array[i + 1] = array[high]
	array[high] = temp

	animations.push({'comp': [i + 1, high]})
	animations.push({'comp': [i + 1, high]})
	animations.push({'swap': [i + 1, high]})
	return (i + 1)
}

export default quickSort;