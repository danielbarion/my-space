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
				searchBarExpanded: false,
				page: 1
			}

		/**
		 * binded funcs
		 */
		this.switchSearchBarActive = this.switchSearchBarActive.bind(this)
		this.searchBarActiveAttr = this.searchBarActiveAttr.bind(this)
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

	switchSearchBarActive(event) {
		const { searchBarExpanded } = this.state
		const { type } = event

			switch (type) {
			case 'click':
				if (!searchBarExpanded) {
					const searchInput = document.querySelector('#search-input')

					this.setState({ searchBarExpanded: true }, () => {
						searchInput.focus()
					})
				}
				break
			case 'blur':
				if (searchBarExpanded) {
					this.setState({ searchBarExpanded: false })
				}
				break

			default:
				break
		}
	}

	animationPulse(id) {
		const element = document.querySelector(`#${id}`)
		const initialClassList = element.classList[0]

		element.className = `${element.classList} animationPulse`

		setTimeout(() => (
			element.className = initialClassList
		), 600)
	}

	/**
	 * attrs
	 */
	searchBarActiveAttr() {
		let active = ''

		if (this.state.searchBarExpanded) {
			active = 'true'
		}

		return active
	}

	/**
	* React Render
	*/
	render() {
		/**
		 * classNames
		 */
		const _root = 'app'
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
				{content()}
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
			<div className={_search} onClick={this.switchSearchBarActive} active={this.searchBarActiveAttr()}>
				{searchIcon()}
				{searchInput()}
			</div>
		)

		const searchInput = () => (
			<div className={_searchInput} active={this.searchBarActiveAttr()}>
				<input type='text' id='search-input' name='search' onBlur={this.switchSearchBarActive} />
			</div>
		)
		const searchIcon = () => (
			<div className={_searchIcon} active={this.searchBarActiveAttr()}>
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
				<div className={_paginationFirstPage} id='firstPageArrow' onClick={this.animationPulse.bind(this, 'firstPageArrow')}>
					<KeyboardCapslockRounded />
				</div>
				<div className={_paginationPreviousPage} id='previousPageArrow' onClick={this.animationPulse.bind(this, 'previousPageArrow')}>
					<KeyboardArrowLeftRounded />
				</div>
				<div className={_paginationNumber}>
					1
				</div>
				<div className={_paginationNextPage} id='nextPageArrow' onClick={this.animationPulse.bind(this, 'nextPageArrow')}>
					<KeyboardArrowRightRounded />
				</div>
				<div className={_paginationLastPage} id='lastPageArrow' onClick={this.animationPulse.bind(this, 'lastPageArrow')}>
					<KeyboardCapslockRounded />
				</div>
			</div>
		)

		return main()
	}
}

export default App