/**
 * dependencies
 */
import React, { Component } from 'react'
import { MySpaceContext } from 'context/myspace'

class Accounts extends Component {
	constructor(props) {
		super(props)
			this.state = {
				users: [],
				lastActiveUser: {},
				initializing: true
			}

		/**
		 * binded funcs
		 */
		this.selectAvatar = this.selectAvatar.bind(this)
		this.isSelectedAttr = this.isSelectedAttr.bind(this)
	}

	/**
	 * lifecycle
	 */
	componentWillMount() {
		let users = localStorage.getItem('users')

		if (!users) {
			this.props.history.push('/')
			return
		}

		users = JSON.parse(users)

		this.setState({	users })
	}

	componentDidMount() {
		let lastActiveUser = localStorage.getItem('activeUser')

		if (lastActiveUser) {
			lastActiveUser = JSON.parse(lastActiveUser)

			this.setState({	lastActiveUser }, () => {
				this.selectAvatar(lastActiveUser)
			})
		}
	}

	/**
	 * funcs
	 */
	selectAvatar(avatar) {
		let {	users	} = this.state
		const {	initializing	} = this.state

		users = users.map(item => {
			if (item.id === avatar.id) {
				item.selected = true
			} else {
				item.selected = false
			}

			return item
		})

		this.setState({ users	})

		if (!initializing) {
			localStorage.setItem('activeUser', JSON.stringify(avatar))

			this.props.goToApp()
		} else {
			this.setState({
				initializing: false
			})
		}
	}

	/**
	 * attrs
	 */
	isSelectedAttr(item) {
		let isSelected = 'false'

		if (item.selected) {
			isSelected = 'true'
		}

		return isSelected
	}

	/**
	 * React Render
	 */
	render() {
		/**
		 * classNames
		 */
		const _root = 'accounts'
		const _card = 'card'
		const _avatarImg = `${_root}-avatar-img`
		const _name = `${_avatarImg}-name`

		/**
		 * render functions
		 */
		const main = (context) => (
			<div className={_root}>
				{this.state.users.map((user, index) => avatarImg(user))}
			</div>
		)

		const avatarImg = (user, index) => (
			<div className={`${_avatarImg} ${_card}`}
				key={user.id}
				onClick={this.selectAvatar.bind(this, user)}
				isselected={this.isSelectedAttr(user)}
			>
				<img src={user.avatar} alt='Avatar' />
				{name(user)}
			</div>
		)

		const name = (user) => (
			<div className={_name}>
				{user.name}
			</div>
		)

		return (
			<MySpaceContext.Consumer>
				{(context) => main(context)}
			</MySpaceContext.Consumer>
		)
	}
}

export default Accounts