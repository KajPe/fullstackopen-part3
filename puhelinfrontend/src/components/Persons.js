import React from 'react'
import Person from  './Person'

class Persons extends React.Component {
  render() {
    return (
      <div>
        <h2>Numerot</h2>
        <div>
          <table>
            <tbody>
              {this.props.persons
                .filter(person => person.name.toLowerCase().includes(this.props.search.toLowerCase()))
                .map(person => <Person key={person.name} person={person} removeUser={this.props.removeUser} />)
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Persons