import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import 'animate.css'

class Animate extends Component{
	render() {
		const {
			in: inMode,
			out: outMode
		} = this.props
		return (
			<div className={`animated ${inMode}`}>
				{this.props.children}
			</div>
		);
	}

	// componentDidMount() {
	// 	const element = ReactDOM.findDOMNode(this)
	// 	element.classList.add('animated', 'bounceInLeft')
	// }

}

class App extends Component{
	render() {
		return (
			<div>
				<Animate in='fadeIn' out='bounceOutDown'>
					<p>hello world</p>
				</Animate>
			</div>
		);
	}
}


export default App
