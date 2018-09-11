import React from 'react'

class Search extends React.Component {
  handleSearch = (event) => {
    this.props.setSearch(event.target.value)
  }

  render() {
    return (
      <div>
        Rajaa näytettäviä: <input value={this.props.search} onChange={this.handleSearch} />
      </div>
    )
  }
}

export default Search