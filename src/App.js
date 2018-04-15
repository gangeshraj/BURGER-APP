import React, { Component } from 'react';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder/>
        {/* the above component is responsible for burger  */}
      </Layout>
    );
  }
}

export default App;
