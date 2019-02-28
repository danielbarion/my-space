/**
 * dependencies
 */
import React, { Component } from 'react'
import {
	Search,
	KeyboardArrowLeftRounded,
	KeyboardArrowRightRounded,
	KeyboardCapslockRounded
} from '@material-ui/icons'

class App extends Component {
	constructor(props) {
		super(props)
			this.state = {
				firstTimeInApp: true,
				page: 1
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
		const _contentHeader = `${_content}-header`
		const _search = `${_contentHeader}-search`
		const _searchIcon = `${_search}-icon`
		const _searchInput = `${_search}-input`
		const _cardList = `${_content}-card-list`
		const _card = `${_cardList}-card`
		const _pagination = `${_contentHeader}-pagination`
		const _paginationNumber = `${_pagination}-number`
		const _paginationFirstPage = `${_pagination}-first-page`
		const _paginationPreviousPage = `${_pagination}-previous-page`
		const _paginationNextPage = `${_pagination}-next-page`
		const _paginationLastPage = `${_pagination}-last-page`

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
				{contentHeader()}
				{cardList()}
			</div>
		)

		const contentHeader = () => (
			<div className={_contentHeader}>
				{search()}
				{pagination()}
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
				{/* <div className={_card}></div>
				<div className={_card}></div> */}
			</div>
		)

		const pagination = () => (
			<div className={_pagination}>
				<div className={_paginationFirstPage}>
					<KeyboardCapslockRounded />
				</div>
				<div className={_paginationPreviousPage}>
					<KeyboardArrowLeftRounded />
				</div>
				<div className={_paginationNumber}>
					1
				</div>
				<div className={_paginationNextPage}>
					<KeyboardArrowRightRounded />
				</div>
				<div className={_paginationLastPage}>
					<KeyboardCapslockRounded />
				</div>
			</div>
		)

		return main()
	}
}

export default App