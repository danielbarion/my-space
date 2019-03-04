/**
 * dependencies
 */
import React, { Component } from 'react'
import Input from 'components/input/component'
import {
	Add
} from '@material-ui/icons'

class SideNav extends Component {
	constructor(props) {
		super(props)
			this.state = {
				isModalOpened: false,
				inputNameValue: '',
				inputImageValue: ''
			}
		/**
		 * binded funcs
		 */
		this.switchModal = this.switchModal.bind(this)
		this.handleOnClick = this.handleOnClick.bind(this)
		this.handleChangeEvent = this.handleChangeEvent.bind(this)
	}

	/**
	 * funcs
	 */
	 handleOnClick(event) {
		 const {
			inputNameValue,
			inputImageValue
		 } = this.state
		 event.persist()

		 	const card = {
					name: inputNameValue,
					thumbnail: inputImageValue,
					favorite: true
			 }

		 if(this.props.addCustomCard) {
			 this.props.addCustomCard(card)
		 }

		 setTimeout(() => this.switchModal(), 300)
	 }

	handleChangeEvent(event, inputName) {
		const { value } = event.target

		if (inputName) {
			switch (inputName) {
				case 'cardName':
					this.setState({ inputNameValue: value })
					break

				case 'cardImageUrl':
					this.setState({ inputImageValue: value })
					break

				default:
					break
			}
		}
	}

	 switchModal() {
		 const { isModalOpened } = this.state
		 this.setState({
			 isModalOpened: !isModalOpened
		 })
	 }

	/**
	 * React Render
	 */
	render() {
		/**
		 * classNames
		 */
		const _root = 'side-nav'
		const _add = `${_root}-add`

		const _overlay = `${_root}-overlay`
		const _modal = `${_root}-modal`
		const _modalHeader = `${_modal}-header`
		const _modalContent = `${_modal}-content`
		const _information = `${_modalContent}-information`
		const _input = `${_modalContent}-input`
		const _button = `${_modal}-button`


		/**
		 * render functions
		 */
		const main = () => (
			<div className={_root}>
				{add()}
				{modal()}
			</div>
		)

		const add = () => (
			<div className={_add} onClick={this.switchModal}>
				<Add />
				<span>Add Custom Card</span>
			</div>
		)

		// this could be a component when use in another place too
		const modal = () => (
			this.state.isModalOpened
				? <React.Fragment>
					{overlay()}
					<div className={_modal}>
						{modalHeader()}
						{modalContent()}
					</div>
				</React.Fragment>
				: null
		)

		const overlay = () => (
			<div className={_overlay} onClick={this.switchModal}></div>
		)

		const modalHeader = () => (
			<div className={_modalHeader}>
				<Add
					style={{
						transform: 'rotate(45deg)',
						color: '#CCC',
						fontSize: '32px',
						borderRadius: '32%',
						cursor: 'pointer'
					}}
					onClick={this.switchModal}
				/>
			</div>
		)

		const modalContent = () => (
			<div className={_modalContent}>
				{inputName()}
				{inputUrl()}
				{information()}
				{confirmButton()}
			</div>
		)

		const inputName = () => (
			<div className={_input}>
				<Input
					label='Card Name'
					name='cardName'
					onChange={this.handleChangeEvent}
					onChangeWithDebounce={true}
				/>
			</div>
		)

		const inputUrl = () => (
			<div className={_input}>
				<Input
					label='Card Image link'
					name='cardImageUrl'
					onChange={this.handleChangeEvent}
					onChangeWithDebounce={true}
				/>
			</div>
		)

		const information = () => (
			<div className={_information}>
				The custom card will automatically be added to favorites in the last page.
			</div>
		)

		const confirmButton = () => (
			<div className={_button} onClick={this.handleOnClick}>
				Confirm
			</div>
		)


		return main()
	}
}

export default SideNav