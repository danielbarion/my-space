/**
 * dependencies
 */
import React, { Component } from 'react'

class App extends Component {
	constructor(props) {
		super(props)
			this.state = {
				firstTimeInApp: true
			}

		/**
		 * binded funcs
		 */
		// this.goToApp = this.goToApp.bind(this)
	}

	/**
	 * lifecycle
	 */
	componentWillMount() {
		let myName = localStorage.getItem()
	}

	/**
	 * funcs
	 */

	/**
	* React Render
	*/
	render() {
		/**
		 * classNames
		 */
		const _root = 'app'

		/**
		 * render functions
		 */
		const main = () => (
			<div className={_root}>
				App Status = in Build proccess...
			</div>
		)

		return main()
	}
}

export default App