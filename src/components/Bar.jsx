import { useEffect } from 'react';
import './Bar.css';



const Bar = (props) => {

	useEffect(() => {
		
	}, [])

	return (
		<div className='main-bar' style={{height: `${props.value}px`}}>
		</div>
	);
}

export default Bar;