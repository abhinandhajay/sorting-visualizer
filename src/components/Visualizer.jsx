/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import bubbleSort from '../algorithms/bubbleSort';
import selectionSort from '../algorithms/SelectionSort';
import Bar from './Bar';
import Button from './Button';
import './Visualizer.css';

// const ANIMATION_DELAY_MS = 10

const Visualizer = () => {

	const [array, setArray] = useState([])
	const [arraySize, ] = useState(170)

	const resetArray = () => {
		const temp = []
		const allBars = document.querySelectorAll(`.main-bar`)
		for (let i = 0; i < arraySize; i++) {
			temp.push(Math.round(Math.random() * 650) + 10)
			if (allBars[i]) {
				allBars[i].style.backgroundColor = `var(--app-green)`
			}
		}
		setArray(temp)
		for (let i = 0; i < arraySize; i++) {
			if (allBars[i]) {
				allBars[i].style.backgroundColor = `var(--app-green)`
				allBars[i].style.height = `${temp[i]}px`
			}
		}
	}

	const runSelectionSort = () => {
		const ANIMATION_DELAY_MS = 5
		const { animations } = selectionSort(array)

		const allBars = document.querySelectorAll(`.main-bar`)

		for (let i = 0; i < animations.length; i++) {

			setTimeout(() => {
				if (animations[i].comp !== undefined) {
					allBars[animations[i].comp[0]].style.backgroundColor = i % 3 === 0 ? `var(--app-red)` : `var(--app-green)`
					allBars[animations[i].comp[1]].style.backgroundColor = i % 3 === 0 ? `var(--app-red)` : `var(--app-green)`
				}
				if (animations[i].swap !== undefined) {
					let temp = allBars[animations[i].swap[0]].style.height
					allBars[animations[i].swap[0]].style.height = allBars[animations[i].swap[1]].style.height
					allBars[animations[i].swap[1]].style.height = temp
					allBars[animations[i].swap[0]].style.backgroundColor = `var(--app-pink)`
				}
			}, ANIMATION_DELAY_MS * i)
		}
	}

	const runBubbleSort = () => {
		const ANIMATION_DELAY_MS = 1

		const { animations } = bubbleSort(array)

		const allBars = document.querySelectorAll(`.main-bar`)

		for (let i = 0; i < animations.length; i++) {

			setTimeout(() => {
				if (animations[i].comp !== undefined) {
					allBars[animations[i].comp[0]].style.backgroundColor = i % 3 === 0 ? `var(--app-red)` : `var(--app-green)`
					allBars[animations[i].comp[1]].style.backgroundColor = i % 3 === 0 ? `var(--app-red)` : `var(--app-green)`
				}
				if (animations[i].swap !== undefined) {
					let temp = allBars[animations[i].swap[0]].style.height
					allBars[animations[i].swap[0]].style.height = allBars[animations[i].swap[1]].style.height
					allBars[animations[i].swap[1]].style.height = temp
					if (animations[i].sorted === true) {
						allBars[animations[i].swap[1]].style.backgroundColor = `var(--app-pink)`
					}
				}
			}, ANIMATION_DELAY_MS * i)
		}
		for (let i = 0; i < arraySize; i++) {
			setTimeout(() => {
				allBars[i].style.backgroundColor = `var(--app-pink)`
			}, ANIMATION_DELAY_MS * animations.length)
		}
	}


	// const playAnimations = (animations) => {
	// 	const allBars = document.querySelectorAll(`.main-bar`)

	// 	for (let i = 0; i < animations.length; i++) {

	// 		setTimeout(() => {
	// 			if (animations[i].comp !== undefined) {
	// 				allBars[animations[i].comp[0]].style.backgroundColor = i % 3 === 0 ? `var(--app-red)` : 'aquamarine'
	// 				allBars[animations[i].comp[1]].style.backgroundColor = i % 3 === 0 ? `var(--app-red)` : 'aquamarine'
	// 			}
	// 			if (animations[i].swap !== undefined) {
	// 				let temp = allBars[animations[i].swap[0]].style.height
	// 				allBars[animations[i].swap[0]].style.height = allBars[animations[i].swap[1]].style.height
	// 				allBars[animations[i].swap[1]].style.height = temp
	// 				allBars[animations[i].swap[1]].style.backgroundColor = `var(--app-pink)`
	// 			}
	// 		}, ANIMATION_DELAY_MS * i)
	// 	}
	// }

	// const testAlgorithms = () => {
	// 	let temp = []
	// 	console.log('TESTING SELECTION')
	// 	for (let i = 0; i < 100 ; i++) {
	// 		temp = []
	// 		for (let i = 0; i < arraySize; i++) {
	// 			temp.push(Math.round(Math.random() * 700) + 10)
	// 		}

	// 		let jsSorted = temp.sort((a, b) => a - b)
	// 		let { sortedArray } = selectionSort(temp)

	// 		if (checkEquality(sortedArray, jsSorted)) {
	// 			console.log(true)
	// 		} else {
	// 			console.log(false)
	// 		}
	// 	}
		
	// }

	// const checkEquality = (sortedArray, jsSorted) => {
	// 	if (sortedArray.length !== jsSorted.length) {
	// 		return false
	// 	}
	// 	for (let i = 0 ; i < sortedArray.length; i++) {
	// 		if (sortedArray[i] !== jsSorted[i]) {
	// 			return false
	// 		}
	// 	}
	// 	return true
	// }

	useEffect(() => {
		resetArray()
	}, [])


	return (
		<div>
			<h1>Sorting Visualizer</h1>
			<Button onClick={resetArray} className={'bg-red'}>
				Reset Array
			</Button>
			<Button onClick={runSelectionSort}>
				Selection Sort
			</Button>
			<Button onClick={runBubbleSort}>
				Bubble Sort
			</Button>
			{/* <Button onClick={testAlgorithms}>
				Test Algorithms
			</Button> */}
			<div className='bar-container'>
				{array.map((ele, idx) => (<Bar key={idx} value={ele}></Bar>))}
			</div>
		</div>
	);
}

export default Visualizer;