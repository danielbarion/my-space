/**
 * dependencies
 */
import React, { Component } from 'react'
import { MySpaceContext } from 'context/myspace'

class CharacterCard extends Component {
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
		const _root = 'character-card'
		const _card = 'card'


		/**
		 * render functions
		 */
		const main = (context) => (
			<div className={`${_root} ${_card}`}>

			</div>
		)

		return (
			<MySpaceContext.Consumer>
				{(context) => main(context)}
			</MySpaceContext.Consumer>
		)
	}
}

export default CharacterCard