/**
 * dependencies
 */
import React, { Component } from 'react'
import { toNumber } from 'lodash'
import grootAmazing from 'assets/img/groot/amazing.jpg'
import grootInSnow from 'assets/img/groot/groot-in-snow.jpg'
import grootWalkingWithGroot from 'assets/img/groot/groot-walking-with-groot.jpg'
import grootWithGroot from 'assets/img/groot/groot-with-groot.jpg'
import grootListeningMusic from 'assets/img/groot/listening-music.jpg'
import grootMindBreaked from 'assets/img/groot/mind-breaked.jpg'
import grootPenguins from 'assets/img/groot/penguins.jpg'
import grootRelaxing from 'assets/img/groot/relaxing.jpg'
import grootSaddly from 'assets/img/groot/saddly.jpg'
import grootSaddlyWorried from 'assets/img/groot/saddly-worried.jpg'
import grootSoBeauty from 'assets/img/groot/so-beauty.jpg'

class GrootNotFound extends Component {
	constructor(props) {
		super(props)
			this.state = {
				hidden: true
			}

		/**
		 * binded funcs
		 */
		this.showGroot = this.showGroot.bind(this)
	}

	/**
	 * lifecycle
	 */
	componentWillMount() {
		setTimeout(() => this.showGroot(), this.props.wait || 0)
	}

	componentWillUnmount() {
		this.setState({
			hidden: true
		})
	}

	shouldComponentUpdate(nextProps, nextState) {
		return false
	}

	/**
	 * funcs
	 */
	showGroot() {
		this.setState({
			hidden: false
		})
	}

	getGroot() {
		const grootImages = [
			grootAmazing,
			grootInSnow,
			grootWalkingWithGroot,
			grootWithGroot,
			grootListeningMusic,
			grootMindBreaked,
			grootPenguins,
			grootRelaxing,
			grootSaddly,
			grootSaddlyWorried,
			grootSoBeauty
		]

		const randomGrootIndex = () => {
			const index = Math.floor(Math.random() * grootImages.length)
			const lastRandomGrootIndex = localStorage.getItem('lastRandomGrootIndex')

			if (lastRandomGrootIndex && toNumber(lastRandomGrootIndex) === index) {
				randomGrootIndex()
			} else {
				localStorage.setItem('lastRandomGrootIndex', index)

				return index
			}
		}

		return grootImages[randomGrootIndex()]
	}

	/**
	 * attrs
	 */
	getHiddenAttr() {
		let hidden = false

		if (this.state.hidden) {
			hidden = true
		}

		return hidden
	}


	/**
	 * React Render
	 */
	render() {
		/**
		 * classNames
		 */
		const _root = 'groot-not-found'

		/**
		 * render functions
		 */
		const main = () => (
			<div className={_root}>
				<img src={this.getGroot()} alt="Groot" hidden={this.getHiddenAttr()} />
			</div>
		)

		return main()
	}
}

export default GrootNotFound