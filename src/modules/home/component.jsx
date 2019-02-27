/**
 * dependencies
 */
import React, { Component } from 'react'
import logoSvg from 'assets/svg/logo.svg'

class Home extends Component {
	constructor(props) {
		super(props)
			this.state = {
			}

		/**
		 * binded funcs
		 */
		this.goToApp = this.goToApp.bind(this)
	}

	/**
	 * funcs
	 */
	goToApp() {
		this.props.history.push(`/app`)
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

		return main()
	}
}

export default Home