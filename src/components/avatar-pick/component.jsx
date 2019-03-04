/**
 * dependencies
 */
import React, { Component } from 'react'
import { MySpaceContext } from 'context/myspace'
import BlackWidow from 'assets/img/heroes/black-widow.png'
import CapAmerica from 'assets/img/heroes/cap-america.png'
import DoctorStrange from 'assets/img/heroes/doctor-strange.png'
import GreenLantern from 'assets/img/heroes/green-lantern.png'
import IronMan from 'assets/img/heroes/iron-man.png'

class AvatarPick extends Component {
	constructor(props) {
		super(props)
			this.state = {
				avatars: [
					{
						name: 'Black Widow',
						image: BlackWidow
					},
					{
						name: 'Cap America',
						image: CapAmerica
					},
					{
						name: 'Doctor Strange',
						image: DoctorStrange
					},
					{
						name: 'Green Lantern',
						image: GreenLantern
					},
					{
						name: 'Iron Man',
						image: IronMan
					}
				]
			}

		/**
		 * binded funcs
		 */
		this.selectAvatar = this.selectAvatar.bind(this)
		this.isSelectedAttr = this.isSelectedAttr.bind(this)
	}

	/**
	 * funcs
	 */
	selectAvatar(avatar) {
		let { avatars } = this.state

		avatars = avatars.map(item => {
			if (item.name === avatar.name) {
				item.selected = true
			} else {
				item.selected = false
			}

			return item
		})

		this.setState({ avatars	})

		if (this.props.onClick) {
			this.props.onClick(avatar.image)
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
		const _root = 'avatar-pick'
		const _card = 'card'
		const _avatarImg = `${_root}-avatar-img`
		const _name = `${_avatarImg}-name`

		/**
		 * render functions
		 */
		const main = (context) => (
			<div className={_root}>
			{this.state.avatars.map((avatar, index) => avatarImg(avatar, index))}
			</div>
		)

		const avatarImg = (avatar, index) => (
			<div className={`${_avatarImg} ${_card}`}
				key={index}
				onClick={this.selectAvatar.bind(this, avatar)}
				isselected={this.isSelectedAttr(avatar)}
			>
				<img src={avatar.image} alt='Avatar' />
				{name(avatar)}
			</div>
		)

		const name = (avatar) => (
			<div className={_name}>
				{avatar.name}
			</div>
		)

		return (
			<MySpaceContext.Consumer>
				{(context) => main(context)}
			</MySpaceContext.Consumer>
		)
	}
}

export default AvatarPick