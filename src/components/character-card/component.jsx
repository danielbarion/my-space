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
		const _preload = `${_card}-pre-load`

		/**
		 * render functions
		 */
		const main = (context) => (
			<div className={`${_root} ${_card} ${this.props.preLoad ? _preload : ''}`}>
			{console.log('hye card')}
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