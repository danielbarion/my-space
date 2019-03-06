/**
 * dependencies
 */
import React, { Component } from 'react'
import { MySpaceContext } from 'context/myspace'
import Pagination from 'components/pagination/component'

class Accounts extends Component {
	constructor(props) {
		super(props)
			this.state = {
				users: [],
				lastActiveUser: {},
				initializing: true,
				usersPagination: {
					/**
					 * vars
					 */
					page: 1,
					itemsPerPage: 3,
					total: 0,

					/**
					 * funcs
					 */
					updatePage: this.updatePage.bind(this)
				},
				visibleUsers: []
			}

		/**
		 * binded funcs
		 */
		this.selectAvatar = this.selectAvatar.bind(this)
		this.isSelectedAttr = this.isSelectedAttr.bind(this)
		this.calcUsersPerPage = this.calcUsersPerPage.bind(this)
		this.resizeScreen = this.resizeScreen.bind(this)
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

		const { usersPagination } = this.state

		usersPagination.total = users.length

		this.setState({
			users,
			usersPagination
		})

		window.addEventListener('resize', this.resizeScreen)
	}

	componentDidMount() {
		let lastActiveUser = localStorage.getItem('activeUser')

		if (lastActiveUser) {
			lastActiveUser = JSON.parse(lastActiveUser)

			this.setState({	lastActiveUser }, () => {
				this.selectAvatar(lastActiveUser)
			})
		}

		setTimeout(() => {
			this.calcUsersPerPage()
			this.setVisibleUsers()
		}, 350)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeScreen)
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

	resizeScreen() {
		this.calcUsersPerPage()
		this.setVisibleUsers()
	}

	calcUsersPerPage() {
		const { usersPagination } = this.state

		if (window.innerWidth < 768) {
			usersPagination.itemsPerPage = 3
		}
		if (window.innerWidth >= 768) {
			usersPagination.itemsPerPage = 6
		}
		if (window.innerWidth >= 1024) {
			usersPagination.itemsPerPage = 6
		}

		this.setState({ usersPagination })
	}

	updatePage(page) {
		const { usersPagination } = this.state
		usersPagination.page = page

		this.setState({
			usersPagination
		}, () => this.setVisibleUsers())
	}

	setVisibleUsers() {
		const { usersPagination } = this.state
		let {
			users,
			visibleUsers
		} = this.state

		const maxIndex = usersPagination.itemsPerPage * usersPagination.page
		const minIndex = (usersPagination.itemsPerPage * (usersPagination.page - 1)) + 1

		visibleUsers = users.reduce((acc, item, index) => {

			if (acc.length < usersPagination.itemsPerPage) {
				if (usersPagination.page > 1) {
					if ((index + 1) <= maxIndex && (index + 1) >= minIndex) {
						acc.push(item)
					}
				} else {
					if ((index + 1) <= maxIndex) {
						acc.push(item)
					}
				}
			}

			return acc
		}, [])

		this.setState({
			visibleUsers
		})
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
		const _userList = `${_root}-user-list`
		const _avatarImg = `${_userList}-avatar-img`
		const _name = `${_avatarImg}-name`

		/**
		 * render functions
		 */
		const main = (context) => (
			<div className={_root}>
				{userList()}
				<Pagination
					pagination={this.state.usersPagination}
				/>
			</div>
		)

		const userList = () => (
			<div className={_userList}>
				{this.state.visibleUsers.map((user, index) => avatarImg(user))}
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