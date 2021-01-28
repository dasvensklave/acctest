import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBeers } from '../lib/common/features/beers'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'

// there we could probably use functional component
// but then anyway we would need to create class component as a wrapper!
// I'll not go into this at the moment to deeply nested explanation of why :D
class BeerCard extends React.Component {
  render() {
    if (!this.props.isBeersLoaded) {
      /* 
        by using epics we could even add isAllDataLoaded at the app root level
        and render some fancy stuff while all app data is fetched/prepared
    */
      return <div>THIS COULD BE LOADER COMPONENT</div>
    }
    const wrapperCss = this.props.beerDetails
      ? tw`w-full`
      : tw`md:w-1/3 lg:w-1/4`
    return (
      <div css={[tw`md:flex`, wrapperCss, tw`px-2 py-2`]}>
        <div
          className='group'
          tw='w-full flex flex-col bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden'
        >
          <Link to={`/beer/${this.props.id}`} tw='flex flex-col flex-1'>
            <div tw='flex relative pb-48 overflow-hidden block'>
              <img
                tw='absolute inset-0 h-full mx-auto h-full object-cover'
                src={this.props.image}
                alt=''
              />
              <div tw='p-4 border-t border-b text-sm w-full bg-gray-200 bg-opacity-90 text-gray-700 absolute hidden group-hover:block'>
                <span tw='flex items-center mb-1 font-medium'>Tagline:</span>
                <span tw='flex items-center'>{this.props.tagline}</span>
              </div>
            </div>
            <div tw='p-4 flex-col flex-1'>
              <span tw='inline-block px-2 py-1 leading-none bg-yellow-200 text-yellow-800 rounded-full font-semibold tracking-wide text-xs'>
                {this.props.first_brewed}
              </span>
              <h2 tw='mt-2 mb-2  font-bold'>{this.props.name}</h2>
              <p tw='text-sm'>{this.props.description}</p>
              <div tw='mt-3 flex items-center'>
                <span tw='text-sm font-semibold'>ph</span>&nbsp;
                <span tw='font-bold text-xl'>{this.props.ph}</span>&nbsp;
                <span tw='text-sm font-semibold'></span>
              </div>
            </div>
            {this.props.beerDetails && (
              <div tw='p-4 border-t border-b text-xs text-gray-700'>
                <span tw='flex items-center mb-1'>
                  <i tw='mr-2 text-gray-900'></i> Food pairing:
                </span>
                <span tw='flex items-center'>
                  <i tw='text-gray-900 mr-2'></i>{' '}
                  {this.props.food_pairing.join(', ')}
                </span>
              </div>
            )}
            {this.props.beerDetails && (
              <div tw='p-4 border-t border-b text-xs text-gray-700'>
                <span tw='flex items-center mb-1'>
                  <i tw='mr-2 text-gray-900'></i> fermentation: temp{' '}
                  {this.props.method.fermentation.value},{' '}
                  {this.props.method.fermentation.unit}
                </span>
                {this.props.method.mash.map((item, index) => (
                  <span key={index} tw='flex items-center'>
                    <i tw='text-gray-900 mr-2'></i> {item}
                  </span>
                ))}
              </div>
            )}
          </Link>
          {this.props.beerDetails && (
            <div tw='p-4 text-sm text-gray-600'>
              <span tw='ml-2'>Brewer tips:</span>
              <div tw='ml-2'>{this.props.brewers_tips}</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const makeMapStateToProps = (_, { match, beerId }) => {
  // this shows how we can prepare mapStatetoProps
  // and isolate/encapsulate for each list item
  // and or conditionally create props for specific component type
  // so we can reuse this in various ways
  // this runs only once whne component is mounted rendered
  // and this could be stored in a separate file
  // or even we can create mapstateToProps factory in combinatin with reselect :)
  const isBeerDetails = (match && match.params.id) || false
  const selectedBeerId = isBeerDetails ? match.params.id : beerId
  return (state) => {
    // by this I just wanted to show how we can get rid of any unnecessary rerenders
    // when we carefully select state props for specific component
    // we can be sure there will be no rerenders
    // we can't just return state.beers.beersById[selectedBeerId]
    // cos there are nested props with objects and arrays
    // of course we can normalize state slices or use immutable
    // but it will cost a lot and make things overcomplicated
    return state.beers.beersById[selectedBeerId]
      ? {
          method: state.beers.beersById[selectedBeerId].method,
          brewers_tips: state.beers.beersById[selectedBeerId].brewers_tips,
          food_pairing: state.beers.beersById[selectedBeerId].food_pairing,
          name: state.beers.beersById[selectedBeerId].name,
          image: state.beers.beersById[selectedBeerId].image_url,
          description: state.beers.beersById[selectedBeerId].description,
          ph: state.beers.beersById[selectedBeerId].ph,
          first_brewed: state.beers.beersById[selectedBeerId].first_brewed,
          id: selectedBeerId,
          isBeersLoaded: true,
        }
      : {
          isBeersLoaded: false,
        }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getBeers }, dispatch),
})
export default connect(makeMapStateToProps, mapDispatchToProps)(BeerCard)
