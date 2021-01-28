import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { filterBeers } from '../lib/common/features/beers'
import 'twin.macro'

class Header extends React.Component {
  getFilteredBeers = () => this.props.actions.filterBeers()
  render() {
    return (
      <div tw='flex flex-wrap pb-2'>
        <div tw='w-full'>
          <nav tw='relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-500 rounded'>
            <div tw='container px-4 mx-auto flex flex-wrap items-center justify-between'>
              <div tw='w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start'>
                <Link
                  tw='text-sm justify-center font-bold leading-relaxed inline-block mr-4 py-2 uppercase text-white'
                  to='/'
                >
                  {this.props.beerDetails ? 'Go back' : 'Beer Home page'}
                </Link>
              </div>
              <div tw='lg:flex flex-grow items-center' id='example-navbar-info'>
                {!this.props.isDetailsPage && (
                  <ul tw='flex flex-col lg:flex-row list-none lg:ml-auto'>
                    <li css='nav-item'>
                      <a
                        tw='px-3 py-2 flex justify-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                        href='#pablo'
                      >
                        Showing {this.props.beerCount} Beers
                      </a>
                    </li>
                    <li>
                      <button
                        tw='focus:outline-none ml-2 bg-indigo-500 h-8 w-full text-sm text-white text-center font-bold flex items-center justify-center rounded-full'
                        onClick={this.getFilteredBeers}
                      >
                        {(!this.props.isFiltered && 'Filter by year') ||
                          'Unfilter'}
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isDetailsPage: state.router.location.pathname.startsWith('/beer/'),
    isFiltered: state.beers.beersFiltered.length > 0,
    beerCount:
      state.beers.beersFiltered.length > 0
        ? state.beers.beersFiltered.length
        : state.beers.beersList.length,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ filterBeers }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
