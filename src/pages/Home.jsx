import React from 'react';
import Main from '../components/Main';
import Row from '../components/Row';
import requests from '../Requests';

const Home = () => {
  return (
    <>
      <Main />
      <Row
        title="Netflix Originals"
        fetchURL={requests.requestNetflixOriginals}
        isLargeRow={true}
      />
      <Row title="Upcoming Movies" fetchURL={requests.requestUpcoming} />
      <Row title="Trending Movies" fetchURL={requests.requestTrending} />
      <Row title="Top Rated Movies" fetchURL={requests.requestTopRated} />
      <Row title="Action Movies" fetchURL={requests.requestAction} />
      <Row title="Horror Movies" fetchURL={requests.requestHorror} />
    </>
  );
};

export default Home;
