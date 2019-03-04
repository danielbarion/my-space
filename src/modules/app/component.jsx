/**
 * dependencies
 */
import React, { Component } from 'react'
import { MySpaceContext } from 'context/myspace'
import { debounce } from 'lodash'
import MarvelApi from 'utils/marvel/api'
import CharacterCard from 'components/character-card/component'
import Pagination from 'components/pagination/component'
import SideNav from 'components/side-nav/component'
import Groot from 'assets/img/groot/saddly-worried.jpg'
import GrootSaddly from 'assets/img/groot/saddly.jpg'
import {
	Search,
	KeyboardArrowLeftRounded,
	KeyboardArrowRightRounded
} from '@material-ui/icons'

class App extends Component {
	constructor(props) {
		super(props)
			this.state = {
				gettingData: true,
				searchBar: {
					searchBarExpanded: false,
					searchValue: '',
					searchResults: []
				},
				characters: [],
				customCards: [],
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
				},
				favorites: [],
				visibleFavorites: [],
				favoritesPagination: {
					/**
					 * vars
					 */
					page: 1,
					itemsPerPage: 1,

					/**
					 * funcs
					 */
					updateFavoritesPage: this.updateFavoritesPage.bind(this)
				},
				user: {}
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
		this.switchFavoriteItem = this.switchFavoriteItem.bind(this)
		this.setVisibleFavorites = this.setVisibleFavorites.bind(this)
		this.switchFavoritePage = this.switchFavoritePage.bind(this)
		this.calcItemsPerPage = this.calcItemsPerPage.bind(this)
		this.addCustomCard = this.addCustomCard.bind(this)
	}

	/**
	 * lifecycle
	 */
	componentWillMount() {
		let user = localStorage.getItem('activeUser')

		if (!user) {
			this.props.history.push(`/`)
		} else {
			user = JSON.parse(user)
			this.setState({
				user
			}, () => {
				this.setState({
					favorites: this.getFavorites()
				}, () => this.getMarvelCharacters())
			})

			window.addEventListener('resize', () => {
				this.calcItemsPerPage()
				this.setVisibleFavorites()
			})
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.calcItemsPerPage()
			this.setVisibleFavorites()
		}, 350)
	}

	/**
	 * funcs
	 */
	getMarvelCharacters() {
		const {
			pagination,
			searchBar,
			favorites
		} = this.state

		let params = {
			pagination
		}

		if (searchBar.searchValue) {
			params.searchBar = searchBar
		}

		MarvelApi.get(params)
			.then((response) => {
				if (!response) {
					this.setState({
						gettingData: false
					})
					return
				}

				const { data } = response
				pagination.total = data.total

				if (favorites.length > 0) {
					favorites.forEach(item => {
						data.results.forEach(result => {
							if (item.id === result.id) {
								result.favorite = true
							}
						})
					})
				}

				this.setState({
					characters: data.results,
					pagination,
					gettingData: false
				})
			}
		)
	}

	getFavorites() {
		const { user } = this.state
		let favorites = localStorage.getItem('favorites')

		if (favorites) {
			favorites = JSON.parse(favorites)

			const filterFavorites = favorites.filter(favorite => favorite.id === user.id)

			if (filterFavorites) {
				favorites = filterFavorites[0].favorites

				return favorites
			}
		}

		return []
	}

	calcItemsPerPage() {
		const { favoritesPagination } = this.state

		// get content to calc cards based on content width
		const content = document.querySelector('.app-content-card-list-favorites-cards')
		// get just the first card, we just need one
		const card = document.querySelector('.character-card')

		if (content && card) {
			if (window.innerWidth < 768) {
				favoritesPagination.itemsPerPage = 1
			} else {
				const initialAmountPossible = Math.floor((content.offsetWidth) / card.offsetWidth)
				favoritesPagination.itemsPerPage = Math.floor((content.offsetWidth - (initialAmountPossible * 16)) / card.offsetWidth)
			}
		} else {
			if (window.innerWidth < 768) {
				favoritesPagination.itemsPerPage = 1
			}
			if (window.innerWidth >= 768) {
				favoritesPagination.itemsPerPage = 3
			}
			if (window.innerWidth >= 1024) {
				favoritesPagination.itemsPerPage = 4
			}
		}

		this.setState({ favoritesPagination })
	}

	switchFavoriteItem(item) {
		let { favorites, characters } = this.state
		const {
			favoritesPagination,
			user
		} = this.state

		if (!item) {
			return
		}

		favorites = favorites.filter(favItem => favItem.id !== item.id)

		if (!item.favorite) {
			favorites.push(item)
		}

		item.favorite = !item.favorite

		characters.map(character => {
			if (item.id && character.id === item.id) {
				character.favorite = item.favorite
			}
			return character
		})

		favoritesPagination.total = favorites.length

		let localStorageFavorites = localStorage.getItem('favorites')

		let newFavorites = []
		if (localStorageFavorites) {
			const parsedLocalStorageFavorites = JSON.parse(localStorageFavorites)
			newFavorites = parsedLocalStorageFavorites.map(item => {
				if (item.id === user.id) {
					item.favorites = favorites
				}

				return item
			})
		} else {
			newFavorites = [{ id: user.id, favorites }]
		}

		localStorage.setItem('favorites', JSON.stringify(newFavorites))

		this.setState({
			favorites,
			favoritesPagination,
			characters
		}, () => this.setVisibleFavorites())
	}

	addCustomCard(card) {
		const {
			favorites,
			customCards
		} = this.state

		favorites.push(card)
		customCards.push(card)

		this.setState({
			favorites,
			customCards
		}, () => this.setVisibleFavorites())
	}

	updatePage(page) {
		const { pagination } = this.state
		pagination.page = page

		this.setState({
			pagination,
			characters: [],
			gettingData: true
		}, () => this.getMarvelCharactersDebounced())
	}

	updateFavoritesPage(page) {
		const { favoritesPagination } = this.state
		favoritesPagination.page = page

		this.setState({
			favoritesPagination
		})
	}

	setVisibleFavorites() {
		const { favoritesPagination } = this.state
		let {
			favorites,
			visibleFavorites
		} = this.state

		const maxIndex = favoritesPagination.itemsPerPage * favoritesPagination.page
		const minIndex = (favoritesPagination.itemsPerPage * (favoritesPagination.page - 1)) + 1

		visibleFavorites = favorites.reduce((acc, item, index) => {

			if (acc.length < favoritesPagination.itemsPerPage) {
				if (favoritesPagination.page > 1) {
					if ((index + 1) <= maxIndex && (index + 1) >= minIndex) {
						acc.push(item)
					}
				} else {
					if ((index + 1) <= maxIndex) {
						acc.push(item)
					}
				}
			}

			return acc
		}, [])

		this.setState({
			visibleFavorites
		})
	}

	switchFavoritePage(id) {
		const {
			favoritesPagination,
			favorites
		} = this.state

		let page = favoritesPagination.page
		const lastPage = Math.ceil(favorites.length / favoritesPagination.itemsPerPage)

		switch (id) {
			case 'previousFavoritePage':
				if (page === 1) {
					return
				}

				page -= 1

				break
			case 'nextFavoritePage':
				if (page === lastPage) {
					return
				}

				page += 1

				break

				default:
					break
			}

			favoritesPagination.page = page

		this.setState({
			favoritesPagination
		}, () => this.setVisibleFavorites())
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

	searchResults(event) {
		const { searchBar } = this.state
		const { value } = event.target

		searchBar.searchValue = value

		this.setState({
			searchBar,
			gettingData: true
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

	hasFavoriteAttr() {
		let hasFavorite = 'false'

		if (this.state.favorites.length > 0) {
			hasFavorite = 'true'
		}

		return hasFavorite
	}

	/**
	* React Render
	*/
	render() {
		/**
		 * classNames
		 */
		const _root = 'app'
		const _header = `${_root}-header`
		const _person = `${_header}-person`
		const _sideNav = `${_header}-nav`
		const _content = `${_root}-content`
		const _contentHeader = `${_content}-header`
		const _search = `${_contentHeader}-search`
		const _searchIcon = `${_search}-icon`
		const _searchInput = `${_search}-input`
		const _cardList = `${_content}-card-list`
		const _cardListFavorites = `${_content}-card-list-favorites`
		const _favoriteCards = `${_cardListFavorites}-cards`
		const _favoritePaginationLeft = `${_favoriteCards}-pagination-left`
		const _favoritePaginationRight = `${_favoriteCards}-pagination-right`
		const _outOfData = `${_cardList}-out-of-data`
		const _outOfDataMessage = `${_outOfData}-message`
		const _groot = `${_outOfData}-groot`
		const _grootSaddly = `${_outOfData}-groot-saddly`
		const _pagination = `${_contentHeader}-pagination`

		/**
		 * render functions
		 */
		const main = (context) => (
			<div className={_root}>
				{header()}
				{content()}
			</div>
		)

		const header = () => (
			<div className={_header}>
				{sideNav()}
				{person()}
			</div>
		)

		const sideNav = () => (
			<div className={_sideNav}>
				<SideNav
					addCustomCard={this.addCustomCard}
				/>
			</div>
		)

		const person = () => (
			<div className={_person}>
				<img src={this.state.user.avatar} alt='Avatar' />
				<span>
					{this.state.user.name}
				</span>
			</div>
		)

		const content = () => (
			<div className={_content}>
				{cardListFavorites()}
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

		const cardListFavorites = () => (
			<div className={_cardListFavorites} hasfavorite={this.hasFavoriteAttr()}>
				<div className={_favoritePaginationLeft}>
					<KeyboardArrowLeftRounded onClick={this.switchFavoritePage.bind(this, 'previousFavoritePage')} />
				</div>
				<div className={_favoriteCards}>
				{this.state.favorites.length > 0
					? this.state.visibleFavorites.map((character, index) => (
						<CharacterCard
							data={character}
							key={index}
							switchFavoriteItem={this.switchFavoriteItem.bind(this, character)}
						/>
					))
					: null}
				</div>
				<div className={_favoritePaginationRight}>
					<KeyboardArrowRightRounded onClick={this.switchFavoritePage.bind(this, 'nextFavoritePage')} />
				</div>
			</div>
		)

		const cardList = () => (
			<div className={_cardList} hasfavorite={this.hasFavoriteAttr()}>
				{this.state.characters.length > 0
					?	this.state.characters.map((character, index) => (
							<CharacterCard
								data={character}
								key={index}
								switchFavoriteItem={this.switchFavoriteItem.bind(this, character)}
							/>
						))
					: this.state.gettingData
						? this.preLoadCards(10)
						: outOfData()}
			</div>
		)

		const pagination = () => (
			<div className={_pagination}>
				<Pagination
					pagination={this.state.pagination}
				/>
			</div>
		)

		const outOfData = () => (
			<div className={_outOfData}>
				<div className={_grootSaddly}>
					<img src={GrootSaddly} alt='Groot Saddly'/>
				</div>
				<div className={_outOfDataMessage}>
					Não encontramos resultados para a sua busca
				</div>
				<div className={_groot}>
					<img src={Groot} alt='Groot'/>
				</div>
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