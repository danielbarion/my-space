/**
 * dependencies
 */
import React, { Component } from 'react'
import {
	Add
} from '@material-ui/icons'

class SideActions extends Component {
	constructor(props) {
		super(props)
			this.state = {}
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
		const _root = 'side-actions'
		const _add = `${_root}-add`

		/**
		 * render functions
		 */
		const main = (context) => (
			<div className={_root}>
				{add()}
			</div>
		)

		const add = () => (
			<div className={_add}>
				<Add />
				<span>Add Custom Card</span>
			</div>
		)

		return main()
	}
}

export default SideActions