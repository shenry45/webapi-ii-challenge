import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import getPosts from './actions/getPosts';

class App extends React.Component {
 
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <div className="App">
        {
          this.props.success.map(post => {
            return <p key={post.id}>Here is a post!</p>
          })
        }
      </div>
    )
  }
}

const mapStatetoProps = {
  return {
    success: 
  }
}

export default connect(null, { getPosts })(App);
