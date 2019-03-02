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
		const _thumbnail = `${_root}-thumbnail`
		const _animationLoading = 'animationLoading'

		/**
		 * render functions
		 */
		const main = (context) => (
			<div className={`${_root} ${this.props.preLoad ? `${_preload} ${_animationLoading}` : _card}`}>
				{
					!this.props.preLoad
						? thumbnail()
						: ''
				}
			{console.log('hye card', this.props)}
			</div>
		)

		const thumbnail = () => (
			<div className={_thumbnail}>
				<img src={`${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`} alt='Thumbnail' />
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