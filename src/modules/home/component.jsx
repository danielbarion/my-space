/**
 * dependencies
 */
import React, { Component } from 'react'
import { MySpaceContext } from 'context/myspace'
import logoSvg from 'assets/svg/logo.svg'

class Home extends Component {
	constructor(props) {
		super(props)
			this.state = {}

		/**
		 * binded funcs
		 */
		this.goToApp = this.goToApp.bind(this)
	}

	/**
	 * funcs
	 */
	goToApp() {
		setTimeout(() => (
			this.props.history.push(`/app`)
		), 150)
	}

	/**
	 * React Render
	 */
	render() {
		/**
		 * classNames
		 */
		const _root = 'home'
		const _background = `${_root}-background`
		const _overlay = `${_root}-overlay`
		const _logo = `${_root}-logo`
		const _button = `${_root}-button`

		/**
		 * render functions
		 */
		const main = () => (
			<div className={_root}>
				{background()}
				{logo()}
				{button()}
			</div>
		)

		const background = () => (
			<div className={_background}>
				<div className={_overlay}></div>
			</div>
		)

		const logo = () => (
			<div className={_logo}>
				<img src={logoSvg} alt='Logo My Space'/>
			</div>
		)

		const button = () => (
			<div className={_button} onClick={this.goToApp}>
				Enter in MySpace
			</div>
		)

		return (
			<MySpaceContext.Consumer>
				{(context) => main(context)}
			</MySpaceContext.Consumer>
		)
	}
}

export default Home