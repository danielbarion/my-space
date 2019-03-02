/**
 * dependencies
 */
import React, { Component } from 'react'
import CharacterCard from 'components/character-card/component'
import Pagination from 'components/pagination/component'
import {
	Search,
	Person
} from '@material-ui/icons'

class App extends Component {
	constructor(props) {
		super(props)
			this.state = {
				firstTimeInApp: true,
				searchBarExpanded: false,
				characters: [],
				pagination: {
					page: 1,
					total: 0
				}
			}

		/**
		 * binded funcs
		 */
		this.switchSearchBarActive = this.switchSearchBarActive.bind(this)
		this.searchBarActiveAttr = this.searchBarActiveAttr.bind(this)
		this.getMarvelCharacters = this.getMarvelCharacters.bind(this)
		this.preLoadCards = this.preLoadCards.bind(this)
	}

	/**
	 * lifecycle
	 */
	componentWillMount() {
		// let myName = localStorage.getItem()
		this.getMarvelCharacters()
	}

	/**
	 * funcs
	 */
	getMarvelCharacters() {
		let { pagination } = this.state
		const url = `https://gateway.marvel.com:443/v1/public/characters?limit=10&offset=${pagination.page > 1 ? pagination.page : 0}&apikey=7f01d88c02623145666b4af6c47029d6`

		fetch(url).then(response => {
			const { status } = response

			if (status !== 200) {
				console.warn('status of response !== 200')
				return
			}

			return response.json()
		}).then(response => {
			const { data } = response
			pagination.total = data.total

			this.setState({
				characters: data.results,
				pagination
			})

		}).catch(error => {
			console.error(error)
		})
	}

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

	preLoadCards(amount) {
		const cards = []

		for (let index = 0; index < amount; index++) {
			cards.push(
				<CharacterCard
					preLoad={true}
					key={index}
				/>
			)
		}

		return cards
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
		const _person = `${_root}-person`
		const _content = `${_root}-content`
		const _contentHeader = `${_content}-header`
		const _search = `${_contentHeader}-search`
		const _searchIcon = `${_search}-icon`
		const _searchInput = `${_search}-input`
		const _cardList = `${_content}-card-list`
		const _pagination = `${_contentHeader}-pagination`

		/**
		 * render functions
		 */
		const main = () => (
			<div className={_root}>
				{person()}
				{content()}
			</div>
		)

		const person = () => (
			<div className={_person}>
				<Person />
				<span>
					Daniel Barion
				</span>
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
				{ this.state.characters.length > 0
					?	this.state.characters.map((character, index) => (
							<CharacterCard
								data={character}
								key={index}
							/>
						))
					: this.preLoadCards(10) }
			</div>
		)

		const pagination = () => (
			<div className={_pagination}>
				<Pagination />
			</div>
		)

		return main()
	}
}

export default App