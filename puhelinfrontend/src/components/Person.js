import React from 'react'

class Person extends React.Component {
  removeUser = (event) => {
    event.preventDefault()
    this.props.removeUser(this.props.person.id)
  }

  render() {
    return (
      <tr>
        <td>{this.props.person.name}</td>
        <td>{this.props.person.number}</td>
        <td><button onClick={this.removeUser}>Poista</button></td>
      </tr>
    )
  }
}

export default Person