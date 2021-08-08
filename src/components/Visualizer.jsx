/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import bubbleSort from '../algorithms/BubbleSort';
import insertionSort from '../algorithms/InsertionSort';
import quickSort from '../algorithms/QuickSort';
import selectionSort from '../algorithms/SelectionSort';
import Bar from './Bar';
import Button from './Button';
import './Visualizer.css';

// const ANIMATION_DELAY_MS = 10

const Visualizer = () => {

	// const maxSize = window.innerWidth / 9
	// const minSize = window.innerWidth / 60
	const [array, setArray] = useState([])
	const [sortedArray, setSortedArray] = useState([])
	const [arraySize, ] = useState(window.innerWidth / 9)
	const [arrayHeight, ] = useState(window.innerHeight / 1.4)
	// const [currentSize, setCurrentSize] = useState(3)
	// const [barWidth,] = useState(currentSize * .025)
	const [barWidth,] = useState(Math.floor(arraySize / window.innerWidth * 40))
	const timeoutIdList = []

	const resetArray = () => {
		const temp = []
		const allBars = document.querySelectorAll(`.main-bar`)
		for (let i = 0; i < arraySize; i++) {
			temp.push(Math.round(Math.random() * arrayHeight) + 10)
			if (allBars[i]) {
				allBars[i].style.backgroundColor = `var(--app-gray)`
			}
		}
		setArray(temp)
		setSortedArray(temp.map(x => x).sort((a, b) => a - b))
		for (let i = 0; i < arraySize; i++) {
			if (allBars[i]) {
				allBars[i].style.backgroundColor = `var(--app-gray)`
				allBars[i].style.height = `${temp[i]}px`
			}
		}
		for (let timeout of timeoutIdList) {
			clearTimeout(timeout)
		}
	}

	const runSelectionSort = () => {
		const ANIMATION_DELAY_MS = 1000 / arraySize
		const { animations } = selectionSort(array)

		playAnimations(animations, ANIMATION_DELAY_MS)
	}

	const runBubbleSort = () => {
		const ANIMATION_DELAY_MS = 100 / arraySize
		const { animations } = bubbleSort(array)

		playAnimations(animations, ANIMATION_DELAY_MS)
	}

	const runInsertionSort = () => {
		const ANIMATION_DELAY_MS = 100 / arraySize
		const { animations } = insertionSort(array)

		playAnimations(animations, ANIMATION_DELAY_MS)
	}

	const runQuickSort = () => {
		const ANIMATION_DELAY_MS = 600 / arraySize
		const animations = []
		quickSort(array, 0, array.length - 1, animations)

		playAnimations(animations, ANIMATION_DELAY_MS)
	}
	
	const playAnimations = (animations, ANIMATION_DELAY_MS) => {
		const allBars = document.querySelectorAll(`.main-bar`)

		for (let i = 0; i < animations.length; i++) {

			let timeoutId = setTimeout(() => {
				if (animations[i].comp !== undefined) {
					allBars[animations[i].comp[0]].style.backgroundColor = i % 3 === 0 ? `rgb(var(--app-red))` : `var(--app-gray)`
					allBars[animations[i].comp[1]].style.backgroundColor = i % 3 === 0 ? `rgb(var(--app-red))` : `var(--app-gray)`
				}
				if (animations[i].swap !== undefined) {
					let temp = allBars[animations[i].swap[0]].style.height
					allBars[animations[i].swap[0]].style.height = allBars[animations[i].swap[1]].style.height
					allBars[animations[i].swap[1]].style.height = temp
					if (`${sortedArray[animations[i].swap[0]]}px` === allBars[animations[i].swap[0]].style.height) {
						allBars[animations[i].swap[0]].style.backgroundColor = `var(--app-turquoise)`
					}
					if (`${sortedArray[animations[i].swap[1]]}px` === allBars[animations[i].swap[1]].style.height) {
						allBars[animations[i].swap[1]].style.backgroundColor = `var(--app-turquoise)`
					}
				}
			}, ANIMATION_DELAY_MS * i)

			timeoutIdList.push(timeoutId)
		}
	}

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
			<div className="sort-button-container">
				<Button onClick={runSelectionSort}>
					Selection
				</Button>
				<Button onClick={runBubbleSort}>
					Bubble
				</Button>
				<Button onClick={runInsertionSort}>
					Insertion
				</Button>
				<Button onClick={runQuickSort}>
					Quick
				</Button>
				{/* <Button onClick={testAlgorithms}>
				Test Algorithms
				</Button> */}
			</div>
			<Button onClick={resetArray} className={'bg-red'}>
				Reset Array
			</Button>
			<div className='bar-container'>
				{array.map((ele, idx) => (<Bar key={idx} height={ele} width={barWidth}></Bar>))}
			</div>
		</div>
	);
}

export default Visualizer;