/**
 * dependencies
 */
import React, { Component } from 'react'
import { MySpaceContext } from 'context/myspace'
import Input from 'components/input/component'
import AvatarPick from 'components/avatar-pick/component'
import Accounts from 'components/accounts/component'
import {
	Add,
	ArrowBack
} from '@material-ui/icons'

class Users extends Component {
	constructor(props) {
		super(props)
			this.state = {
				noUsersDetected: true,
				value: '',
				avatar: '',
				errorCount: 0,
				errorMessages: {
					0: 'Dude... Your name can\'t be empty. Try again...',
					1: 'This is your name, are your sure ? Try again...',
					2: 'Your name is less than 3 characters ? Come on, try again...',
					3: 'Really ? 3 times ? Are you kidding with me ? Try again...',
					4: 'OMG, you\'re so crazy! I give up, I\'ll let you go... But now it\'s my turn, wait 10 seconds hahaha',
				},
				waiting: false,
				buttonEnabled: true,
				showError: false,
				isInAvatarSelect: false,
				inUserAdd: false
			}

		/**
		 * binded funcs
		 */
		this.goToApp = this.goToApp.bind(this)
		this.handleChangeEvent = this.handleChangeEvent.bind(this)
		this.confirmButton = this.confirmButton.bind(this)
		this.blockedAttr = this.blockedAttr.bind(this)
		this.setAvatar = this.setAvatar.bind(this)
		this.saveNewUser = this.saveNewUser.bind(this)
		this.switchAddUser = this.switchAddUser.bind(this)
	}

	/**
	 * lifecycle
	 */
	componentWillMount() {
		const users = localStorage.getItem('users')

		if (users) {
			this.setState({ noUsersDetected: false })
		}
	}

	/**
	 * funcs
	 */
	goToApp() {
		this.props.history.push('/app')
	}

	setAvatar(avatar) {
		this.setState({
			avatar
		})
	}

	handleChangeEvent(event, inputName) {
		const { value } = event.target

		if (inputName) {
			switch (inputName) {
				case 'name':

					this.setState({ value })
					break

				default:
					break
			}
		}
	}

	switchAddUser() {
		let { inUserAdd } = this.state

		inUserAdd = !inUserAdd

		this.setState({ inUserAdd	})
	}

	saveNewUser() {
		const {
			value,
			avatar
		} = this.state

		const newUser = {
			id: 0,
			name: value,
			avatar
		}

		let users = localStorage.getItem('users')

		if (users) {
			users = JSON.parse(users)
			newUser.id = (users.length - 1) + 1

			users.push(newUser)
		} else {
			users = [newUser]
		}

		localStorage.setItem('users', JSON.stringify(users))
		localStorage.setItem('activeUser', JSON.stringify(newUser))
	}

	confirmButton() {
		const {
			value,
			avatar
		} = this.state
		let {
			errorCount,
			showError,
			buttonEnabled,
			isInAvatarSelect
		} = this.state

		if (!buttonEnabled) {
			return
		}

		if (isInAvatarSelect) {
			if (avatar) {
				this.saveNewUser()
				setTimeout(() => this.goToApp(), 200)
			}
		} else {
			if (value.length === 0) {
				errorCount = 0
				showError = true
				buttonEnabled = false

				this.setState({
					errorCount,
					showError,
					buttonEnabled
				}, () => {
					setTimeout(() => this.setState({
						showError: false,
						buttonEnabled: true
					}), 3000)
				})
			} else if (value.length < 3) {
				errorCount += 1
				showError = true
				buttonEnabled = false

				if (errorCount === 4) {
					this.setState({
						errorCount,
						showError,
						buttonEnabled
					}, () => {
						setTimeout(() => {
							this.setState({
								showError: false,
								buttonEnabled: true,
								isInAvatarSelect: true
							})
						}, 10000)
					})
				} else {
					this.setState({
						errorCount,
						showError,
						buttonEnabled
					}, () => {
							setTimeout(() => this.setState({
								showError: false,
								buttonEnabled: true
							}), 3000)
					})
				}
			} else {
				this.setState({
					isInAvatarSelect: true
				})
			}
		}
	}

	/**
	 * attrs
	 */
	blockedAttr() {
		const {
			isInAvatarSelect,
			avatar
		} = this.state
		let blocked = 'false'

		if (!this.state.buttonEnabled) {
			blocked = 'true'
		}

		// This validation can be mixed to `buttonEnabled` and use only one
		if (isInAvatarSelect && !avatar) {
			blocked = 'true'
		}

		return blocked
	}

	/**
	 * React Render
	 */
	render() {
		/**
		 * classNames
		 */
		const _root = 'users'
		const _card = 'card'
		const _background = `${_root}-background`
		const _users = `${_root}-users`
		const _header = `${_users}-header`
		const _sideNav = `${_header}-nav`
		const _add = `${_sideNav}-add`
		const _back = `${_sideNav}-back`
		const _list = `${_users}-list`
		const _content = `${_users}-content`
		const _avatarPick = `${_content}-avatar-pick`
		const _message = `${_content}-message`
		const _input = `${_content}-input`
		const _footer = `${_content}-footer`
		const _errorMessage = `${_footer}-error`
		const _button = `${_footer}-button`

		/**
		 * render functions
		 */
		const main = () => (
			<div className={_root}>
				{background()}
				{users()}
			</div>
		)

		const background = () => (
			<div className={_background}></div>
		)

		const users = () => (
			<div className={_users}>
				{!this.state.noUsersDetected
					? sideNav()
						: null}
				{this.state.noUsersDetected || this.state.inUserAdd
					? this.state.isInAvatarSelect
						? avatarPick()
							:	content()
					: list()}
			</div>
		)

		const list = () => (
			<div className={_list}>
				<Accounts
					onClick={this.setAvatar}
					goToApp={this.goToApp}
				/>
			</div>
		)

		const content = () => (
			<div className={`${_content} ${_card}`}>
				{this.state.inUserAdd
					? addMessage()
						: message()}
				{input()}
				{footer()}
			</div>
		)

		const avatarPick = () => (
			<div className={_avatarPick}>
				<AvatarPick
					onClick={this.setAvatar}
				/>
				{button()}
			</div>
		)

		const message = () => (
			<div className={_message}>
				Hey! <br/>
				This is your first time here ? <br/>
				Whats your...
			</div>
		)

		const addMessage = () => (
			<div className={_message}>
				Hey! <br/>
				You want add a new user ? <br/>
				Great! What is his..
			</div>
		)

		const footer = () => (
			<div className={_footer}>
				{errorMessage()}
				{button()}
			</div>
		)

		const errorMessage = () => (
			<div className={_errorMessage}>
				{this.state.showError
					? this.state.errorMessages[this.state.errorCount]
					: null}
			</div>
		)

		const button = () => (
			<div className={_button} onClick={this.confirmButton} blocked={this.blockedAttr()}>
				Confirm
			</div>
		)

		const input = () => (
			<div className={_input}>
				<Input
					label='Name ?'
					name='name'
					onChange={this.handleChangeEvent}
				/>
			</div>
		)

		const sideNav = () => (
			<div className={_sideNav}>
				{this.state.inUserAdd
					? back()
					: add()}
			</div>
		)

		const add = () => (
			<div className={_add} onClick={this.switchAddUser}>
				<Add />
				<span>New User</span>
			</div>
		)

		const back = () => (
			<div className={_back} onClick={this.switchAddUser}>
				<ArrowBack />
				<span>Select User</span>
			</div>
		)

		return (
			<MySpaceContext.Consumer>
				{(context) => main(context)}
			</MySpaceContext.Consumer>
		)
	}
}

export default Users