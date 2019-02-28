/**
 * dependencies
 */
import React, { Component } from 'react'
import { Search } from '@material-ui/icons'

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
		// let myName = localStorage.getItem()
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
		const _navbar = `${_root}-navbar`
		const _content = `${_root}-content`
		const _search = `${_content}-search`
		const _searchIcon = `${_search}-icon`
		const _searchInput = `${_search}-input`
		const _cardList = `${_content}-card-list`
		const _card = `${_cardList}-card`

		/**
		 * render functions
		 */
		const main = () => (
			<div className={_root}>
				{navbar()}
				{content()}
			</div>
		)

		const navbar = () => (
			<div className={_navbar}>
			</div>
		)

		const content = () => (
			<div className={_content}>
				{search()}
				{cardList()}
			</div>
		)

		const search = () => (
			<div className={_search}>
				{searchIcon()}
				{searchInput()}
			</div>
		)

		const searchInput = () => (
			<div className={_searchInput}>

			</div>
		)
		const searchIcon = () => (
			<div className={_searchIcon}>
				<Search />
			</div>
		)

		const cardList = () => (
			<div className={_cardList}>
				<div className={_card}></div>
				<div className={_card}></div>
				<div className={_card}></div>
				<div className={_card}></div>
				<div className={_card}></div>
				<div className={_card}></div>
				<div className={_card}></div>
				<div className={_card}></div>
				<div className={_card}></div>
				<div className={_card}></div>
				{/* 10 */}
				<div className={_card}></div>
				<div className={_card}></div>
			</div>
		)

		return main()
	}
}

export default App