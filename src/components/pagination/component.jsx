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
	}

	/**
	 * funcs
	 */
	animationPulse(id) {
		const { pagination } = this.props
		const element = document.querySelector(`#${id}`)
		const initialClassList = element.classList[0]

		element.className = `${element.classList} animationPulse`

		let page = pagination.page
		const lastPage = parseInt(pagination.total / 10)

		switch (id) {
			case 'firstPageArrow':
				if (page === 1) {
					return
				}

				page = 1

				break
			case 'previousPageArrow':
				if (page === 1) {
					return
				}

				page -= 1

				break
			case 'nextPageArrow':
				if (page === lastPage) {
					return
				}

				page += 1

				break
			case 'lastPageArrow':
				if (page === lastPage) {
					return
				}

				page = lastPage

				break

			default:
				break
		}

		this.updatePaginationPage(page)

		setTimeout(() => (
			element.className = initialClassList
		), 600)
	}

	updatePaginationPage(page) {
		const { pagination } = this.props

		pagination.updatePage(page)
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

		return (
			<MySpaceContext.Consumer>
				{(context) => main(context)}
			</MySpaceContext.Consumer>
		)
	}
}

export default Pagination