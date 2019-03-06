/**
 * dependencies
 */
import React, { Component } from 'react'
import { MySpaceContext } from 'context/myspace'
import {
	KeyboardArrowLeftRounded,
	KeyboardArrowRightRounded,
	KeyboardCapslockRounded
} from '@material-ui/icons'

class Pagination extends Component {
	constructor(props) {
		super(props)
			this.state = {}

		/**
		 * binded funcs
		 */
		this.canShowPagination = this.canShowPagination.bind(this)
	}

	/**
	 * funcs
	 */
	animationPulse(id) {
		const { pagination } = this.props
		const element = document.querySelector(`#${id}`)
		const initialClassList = element.classList[0]
		let canUpdatePage = true

		element.className = `${element.classList} animationPulse`

		let page = pagination.page
		const lastPage = Math.ceil(pagination.total / pagination.itemsPerPage)

		switch (id) {
			case 'firstPageArrow':
				if (page === 1) {
					canUpdatePage = false
				}

				page = 1

				break
			case 'previousPageArrow':
				if (page === 1) {
					canUpdatePage = false
				}

				page -= 1

				break
			case 'nextPageArrow':
				if (page === lastPage) {
					canUpdatePage = false
				}

				page += 1

				break
			case 'lastPageArrow':
				if (page === lastPage) {
					canUpdatePage = false
				}

				page = lastPage

				break

			default:
				break
		}

		if (canUpdatePage) {
			this.updatePaginationPage(page)
		}

		setTimeout(() => (
			element.className = initialClassList
		), 600)
	}

	updatePaginationPage(page) {
		const { pagination } = this.props

		pagination.updatePage(page)
	}

	canShowPagination() {
		const { pagination } = this.props

		return !(1 === Math.ceil(pagination.total / pagination.itemsPerPage))
	}

	/**
	 * React Render
	 */
	render() {
		/**
		 * classNames
		 */
		const _root = 'pagination'
		const _paginationNumber = `${_root}-number`
		const _paginationFirstPage = `${_root}-first-page`
		const _paginationPreviousPage = `${_root}-previous-page`
		const _paginationNextPage = `${_root}-next-page`
		const _paginationLastPage = `${_root}-last-page`

		/**
		 * render functions
		 */
		const main = (context) => (
			this.canShowPagination() ? (
				<div className={_root}>
					<div className={_paginationFirstPage} id='firstPageArrow' onClick={this.animationPulse.bind(this, 'firstPageArrow')}>
						<KeyboardCapslockRounded />
					</div>
					<div className={_paginationPreviousPage} id='previousPageArrow' onClick={this.animationPulse.bind(this, 'previousPageArrow')}>
						<KeyboardArrowLeftRounded />
					</div>
					<div className={_paginationNumber}>
						{this.props.pagination.page}
					</div>
					<div className={_paginationNextPage} id='nextPageArrow' onClick={this.animationPulse.bind(this, 'nextPageArrow')}>
						<KeyboardArrowRightRounded />
					</div>
					<div className={_paginationLastPage} id='lastPageArrow' onClick={this.animationPulse.bind(this, 'lastPageArrow')}>
						<KeyboardCapslockRounded />
					</div>
				</div>
			)
				: null
		)

		return (
			<MySpaceContext.Consumer>
				{(context) => main(context)}
			</MySpaceContext.Consumer>
		)
	}
}

export default Pagination