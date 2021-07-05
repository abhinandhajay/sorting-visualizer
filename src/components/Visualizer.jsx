/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import selectionSort from '../algorithms/SelectionSort';
import Bar from './Bar';
import './Visualizer.css';

const ANIMATION_DELAY_MS = 5

const Visualizer = () => {

	const [array, setArray] = useState([])
	const [arraySize, setArraySize] = useState(170)

	const resetArray = () => {
		const temp = []
		const allBars = document.querySelectorAll(`.main-bar`)
		for (let i = 0; i < arraySize; i++) {
			temp.push(Math.round(Math.random() * 700) + 10)
			if (allBars[i]) {
				allBars[i].style.backgroundColor = 'aquamarine'
			}
		}
		setArray(temp)
	}

	const runSelectionSort = () => {
		const { animations } = selectionSort(array)

		let allBars = document.querySelectorAll(`.main-bar`)

		for (let i = 0; i < animations.length; i++) {

			setTimeout(() => {
				if (animations[i].comp !== undefined) {
					allBars[animations[i].comp[0]].style.backgroundColor = i % 3 === 0 ? 'red' : 'aquamarine'
					allBars[animations[i].comp[1]].style.backgroundColor = i % 3 === 0 ? 'red' : 'aquamarine'
				}
				if (animations[i].swap !== undefined) {
					let temp = allBars[animations[i].swap[0]].style.height
					allBars[animations[i].swap[0]].style.height = allBars[animations[i].swap[1]].style.height
					allBars[animations[i].swap[1]].style.height = temp
					allBars[animations[i].swap[0]].style.backgroundColor = 'plum'
				}
			}, ANIMATION_DELAY_MS * i)
		}
	}

	const testAlgorithms = () => {
		let temp = []
		console.log('TESTING SELECTION')
		for (let i = 0; i < 100 ; i++) {
			temp = []
			for (let i = 0; i < arraySize; i++) {
				temp.push(Math.round(Math.random() * 700) + 10)
			}

			let jsSorted = temp.sort((a, b) => a - b)
			let { sortedArray } = selectionSort(temp)

			if (checkEquality(sortedArray, jsSorted)) {
				console.log(true)
			} else {
				console.log(false)
			}
		}
		
	}

	const checkEquality = (sortedArray, jsSorted) => {
		if (sortedArray.length !== jsSorted.length) {
			return false
		}
		for (let i = 0 ; i < sortedArray.length; i++) {
			if (sortedArray[i] !== jsSorted[i]) {
				return false
			}
		}
		return true
	}

	useEffect(() => {
		resetArray()
	}, [])


	return (
		<div>
			<h1>Sorting Visualizer</h1>
			<button onClick={resetArray}>
				Reset Array
			</button>
			<button onClick={runSelectionSort}>
				Selection Sort
			</button>
			<button onClick={testAlgorithms}>
				Test Algorithms
			</button>
			<div className='bar-container'>
				{array.map((ele, idx) => (<Bar key={idx} value={ele}></Bar>))}
			</div>
		</div>
	);
}

export default Visualizer;