/**
 * dependencies
 */
import React, { Component } from 'react'

class Input extends Component {
	constructor(props) {
		super(props)
			this.state = {
				value: '',
				isValid: null
			}

		/**
		 * binded funcs
		 */
		this.handleChangeEvent = this.handleChangeEvent.bind(this)
	}

	/**
	 * funcs
	 */
	handleChangeEvent(event) {
		const { value } = event.target
		const { isValid } = this.state
		const { onChange } = this.props

		event.persist()


		if (isValid !== null) {
			this.setState({
				isValid: null
			})
		}

		if (onChange !== undefined) {
			onChange(event)
		}

		this.setState({ value })
	}

	inputValidation(event) {
		let { isValid } = this.state

		this.setState({
			isValid
		})
	}

	/**
	* React Render
	*/
	render() {
		/**
		 * classNames
		 */
		const _root = 'input'

		/**
		 * render functions
		 */
		const main = () => (
			<div className={`${_root} ${this.props.baseClass || ''}`}>
				{input()}
				{label()}
			</div>
		)

		const input = () => (
			<input
				className='input'
				type='text'
				maxLength={this.props.maxLength}
				value={this.state.value}
				onChange={this.handleChangeEvent}
				style={this.props.style}
				required
			/>
		)

		const label = () => (
			<label className="label" htmlFor="name">{ this.props.label || '' }</label>
		)

		return main()
	}
}

export default Input