import { useEffect, useState } from 'react';
import Bar from './Bar';
import './Visualizer.css';



const Visualizer = () => {

	const [array, setArray] = useState([0])
	const [arraySize, setArraySize] = useState(170)

	const resetArray = () => {
		const temp = []
		for (let i = 0; i < arraySize; i++) {
			temp.push(Math.round(Math.random() * 700) + 10)
		}
		setArray(temp)
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
			<button onClick={resetArray}>
				Sort Array
			</button>
			<div className='bar-container'>
				{array.map((ele, idx) => (<Bar key={idx} value={ele}></Bar>))}
			</div>
		</div>
	);
}

export default Visualizer;