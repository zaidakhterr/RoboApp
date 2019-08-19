import React from "react";
import { connect } from "react-redux";
import "./App.css";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import { setSearchField } from "../actions";

const mapStateToProps = state => ({
  searchField: state.searchField,
});

const mapDispatchToProps = dispatch => ({
  onSearchChange: event => dispatch(setSearchField(event.target.value)),
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
    };
  }

  componentDidMount() {
    //console.log(this.props.store.getState());
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const searchedRobot = robots.filter(robots => {
      return robots.name.toLowerCase().includes(searchField.toLowerCase());
    });
    //console.log(searchedRobot);

    if (!robots.length) {
      return <h1 className='f1 tc'>Loading ...</h1>;
    } else {
      return (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={searchedRobot} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
