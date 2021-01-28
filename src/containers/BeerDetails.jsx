import React from 'react'
import { connect } from 'react-redux'
import BeerCard from '../components/BeerCard'
import 'twin.macro'

class BeerDetails extends React.Component {
  render() {
    return (
      <div tw='w-full'>
        <BeerCard beerDetails={true} beerId={this.props.beerId} />
      </div>
    )
  }
}

const mapStateToProps = (_, ownProps) => {
  console.log(ownProps)
  const { id: beerId } = ownProps.match.params
  return {
    beerId,
  }
}

// const mapDispatchToProps = (dispatch) => ({
//     actions: bindActionCreators({ getBeers }, dispatch),
// })
export default connect(mapStateToProps)(BeerDetails)
