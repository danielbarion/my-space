/**
 * dependencies
 */
import React, { Component } from 'react'
import { MySpaceContext } from 'context/myspace'
import { debounce, toNumber } from 'lodash'
import MarvelApi from 'utils/marvel/api'
import CharacterCard from 'components/character-card/component'
import Pagination from 'components/pagination/component'
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
import {
	Search,
	Person
} from '@material-ui/icons'

class App extends Component {
	constructor(props) {
		super(props)
			this.state = {
				gettingData: false,
				searchBar: {
					searchBarExpanded: false,
					searchValue: '',
					searchResults: []
				},
				characters: [],
				pagination: {
					/**
					 * vars
					 */
					page: 1,
					total: 0,

					/**
					 * funcs
					 */
					updatePage: this.updatePage.bind(this)
				}
			}

		/**
		 * debounced funcs
		 */
		this.getMarvelCharactersDebounced = debounce(() => this.getMarvelCharacters(), 1000)

		/**
		 * binded funcs
		 */
		this.switchSearchBarActive = this.switchSearchBarActive.bind(this)
		this.searchBarActiveAttr = this.searchBarActiveAttr.bind(this)
		this.getMarvelCharacters = this.getMarvelCharacters.bind(this)
		this.preLoadCards = this.preLoadCards.bind(this)
		this.searchResults = this.searchResults.bind(this)
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
		const {
			pagination,
			searchBar
		} = this.state
		let { gettingData } = this.state

		if (!gettingData) {
			this.setState({
				gettingData: true
			}, () => {
				let params = {
					pagination
				}

				if (searchBar.searchValue) {
					params.searchBar = searchBar
				}

				MarvelApi.get(params)
					.then((response) => {
						const { data } = response
						pagination.total = data.total

						this.setState({
							characters: data.results,
							pagination,
							gettingData
						})
					})
			})
		}
	}

	updatePage(page) {
		const { pagination } = this.state
		pagination.page = page

		this.setState({
			pagination,
			characters: []
		}, () => this.getMarvelCharactersDebounced())
	}

	switchSearchBarActive(event) {
		const { searchBar } = this.state
		const { type } = event

		if (searchBar.searchValue) {
			return
		}

		switch (type) {
			case 'click':
				if (!searchBar.searchBarExpanded) {
					const searchInput = document.querySelector('#search-input')

					searchBar.searchBarExpanded = true

					this.setState({ searchBar }, () => {
						searchInput.focus()
					})
				}
				break
			case 'blur':
				if (searchBar.searchBarExpanded) {
					searchBar.searchBarExpanded = false
					this.setState({ searchBar })
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

	searchResults(event) {
		const { searchBar } = this.state
		const { value } = event.target

		searchBar.searchValue = value

		this.setState({
			searchBar
		}, () => this.getMarvelCharactersDebounced())
	}

	/**
	 * attrs
	 */
	searchBarActiveAttr() {
		let active = ''

		if (this.state.searchBar.searchBarExpanded) {
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
		const _noResults = `${_content}-no-content`
		const _search = `${_contentHeader}-search`
		const _searchIcon = `${_search}-icon`
		const _searchInput = `${_search}-input`
		const _cardList = `${_content}-card-list`
		const _pagination = `${_contentHeader}-pagination`

		/**
		 * render functions
		 */
		const main = (context) => (
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
				<input type='text' id='search-input' name='search' onBlur={this.switchSearchBarActive} onChange={this.searchResults} />
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
					: this.state.gettingData
						? this.preLoadCards(10)
						: noResults()}
			</div>
		)

		const pagination = () => (
			<div className={_pagination}>
				<Pagination
					pagination={this.state.pagination}
				/>
			</div>
		)

		const noResults = () => (
			<div className={_noResults}>
				<img src={this.getGroot()} alt="Groot"/>
			</div>
		)

		return (
			<MySpaceContext.Consumer>
				{(context) => main(context)}
			</MySpaceContext.Consumer>
		)
	}
}

export default App