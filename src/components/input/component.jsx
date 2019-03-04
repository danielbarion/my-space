/**
 * dependencies
 */
import React, { Component } from 'react'
import { debounce } from 'lodash'

class Input extends Component {
	constructor(props) {
		super(props)
			this.state = {
				value: '',
				isValid: null
			}

		/**
		 * debounced funcs
		 */
		this.onChangeWithDebounce = debounce((event) => this.props.onChange(event, this.props.name), 600)

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
		const {
			onChange,
			onChangeWithDebounce
		} = this.props

		event.persist()


		if (isValid !== null) {
			this.setState({
				isValid: null
			})
		}

		if (onChange !== undefined) {
			if (onChangeWithDebounce) {
				this.onChangeWithDebounce(event, this.props.name || null)
			} else {
				onChange(event, this.props.name || null)
			}
		}

		this.setState({ value })
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
				name={this.props.name}
				maxLength={this.props.maxLength}
				value={this.state.value}
				onChange={this.handleChangeEvent}
				style={this.props.style}
				required
			/>
		)

		const label = () => (
			<label className="label" htmlFor={this.props.name}>{ this.props.label || '' }</label>
		)

		return main()
	}
}

export default Input