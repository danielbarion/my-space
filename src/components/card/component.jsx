/**
 * dependencies
 */
import React, { Component } from 'react'
import { MySpaceContext } from 'context/myspace'

class Card extends Component {
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
		const _root = 'card'


		/**
		 * render functions
		 */
		const main = (context) => (
			<div className={_root}>
			</div>
		)

		return (
			<MySpaceContext.Consumer>
				{(context) => main(context)}
			</MySpaceContext.Consumer>
		)
	}
}

export default Card