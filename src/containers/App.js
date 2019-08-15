import React from "react";
import "./App.css";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  onSearch = event => {
    this.setState({ searchField: event.target.value });
    console.log(event.target.value);
  };

  render() {
    const { robots, searchField } = this.state;
    const searchedRobot = robots.filter(robots => {
      return robots.name.toLowerCase().includes(searchField.toLowerCase());
    });
    console.log(searchedRobot);

    if (!robots.length) {
      return <h1 className='f1 tc'>Loading ...</h1>;
    } else {
      return (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearch} />
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

export default App;
