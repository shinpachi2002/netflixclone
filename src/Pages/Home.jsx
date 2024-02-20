import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Request'
const Home = () => {
  return (
    <div>
      <Main></Main>
      <Row id="1" title='UpComming' requests={requests.requestUpcoming}></Row>
      <Row id="2" title='Popular' requests={requests.requestPopular}></Row>
      <Row id="3" title='Trending' requests={requests.requestTrending}></Row>
      <Row id="4" title='Top Rated' requests={requests.requestTopRated}></Row>
      <Row id="5" title='Horror' requests={requests.requestHorror}></Row>
    </div>
  )
}

export default Home
