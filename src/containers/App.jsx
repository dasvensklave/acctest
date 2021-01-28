import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import tw from 'twin.macro'
import { getBeers, getMoreBeers } from '../lib/common/features/beers'
import { Button } from '../components'
import BeerCard from '../components/BeerCard'

class App extends React.Component {
  getBeers = () => {
    this.props.actions.getBeers()
  }
  getMoreBeers = () => {
    this.props.actions.getMoreBeers()
  }
  filterBeers = () => {
    // this.props.actions.filterBeers()
  }
  render() {
    return (
      <>
        <div tw='container mx-auto'>
          <div tw='md:flex content-center flex-wrap rounded shadow-lg'>
            {this.props.beersList.map((beerId, index) => (
              <BeerCard key={beerId} beerId={beerId} index={index} />
            ))}
          </div>
        </div>
        <div
          css={[
            tw`flex flex-col items-center justify-center h-screen`,
            tw`bg-gradient-to-b from-electric to-ribbon`,
          ]}
        >
          <div tw='flex flex-col justify-center h-full space-y-5'>
            {this.props.beersList.length === 0 && (
              <Button isPrimary onClick={this.getBeers}>
                Get Beers
              </Button>
            )}
            {!!this.props.beersList.length && (
              <Button isSecondary onClick={this.getMoreBeers}>
                Load more Beers
              </Button>
            )}
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = ({ beers }) => ({
  beersList:
    beers.beersFiltered.length > 0 ? beers.beersFiltered : beers.beersList,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getBeers, getMoreBeers }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
