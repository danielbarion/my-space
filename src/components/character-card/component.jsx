/**
 * dependencies
 */
import React, { Component } from 'react'
import { MySpaceContext } from 'context/myspace'
import {
	FavoriteRounded,
	FavoriteBorderRounded
} from '@material-ui/icons'

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
		const _content = `${_root}-content`
		const _thumbnail = `${_content}-thumbnail`
		const _thumbnailOverlay = `${_thumbnail}-overlay`
		const _animationLoading = 'animationLoading'
		const _favorite = `${_thumbnail}-favorite`

		/**
		 * render functions
		 */
		const main = (context) => (
			<div className={`${_root} ${this.props.preLoad ? `${_preload} ${_animationLoading}` : _card}`}>
				{!this.props.preLoad
						? content()
						: ''}
			</div>
		)

		const content = () => (
			<div className={_content}>
				{thumbnail()}
			</div>
		)

		const thumbnail = () => (
			<div className={_thumbnail}>
				<img src={`${this.props.data.thumbnail.path}.${this.props.data.thumbnail.extension}`} alt='Thumbnail' />
				{overlay()}
				{favorite()}
			</div>
		)

		const overlay = () => (
			<div className={_thumbnailOverlay}>
				<span>{this.props.data.name}</span>
			</div>
		)

		const favorite = () => (
			<div className={_favorite} onClick={this.props.switchFavoriteItem || null}>
				{this.props.data.favorite
					? <FavoriteRounded style={{ color: 'red', opacity: 0.9 }} />
					: <FavoriteBorderRounded style={{ color: 'darkslategray' }} />}
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