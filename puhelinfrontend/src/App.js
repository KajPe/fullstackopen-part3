import React from 'react'
import Search from  './components/Search'
import Persons from  './components/Persons'
import PersonsService from './services/persons'
import Notification from  './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      search: '',
      error: null,
      info: null
    }
  }

  clearNotification = () => {
    this.setState({
      error: null,
      info: null
    })
  }

  componentDidMount() {
    PersonsService
      .getAll()
      .then(persons => {
        this.setState({ persons: persons })
      })
  }

  setSearch = (s) => {
    this.setState({ 
      search: s
    })
  }

  handleNumberChange = (event) => {
    this.setState({ 
      newNumber: event.target.value
    })
  }

  handleNewnameChange = (event) => {
    this.setState({ 
      newName: event.target.value
    })
  }

  removeUser = (id) => {
    const person = this.state.persons.find(person => person.id === id)
    const result = window.confirm('poistetaanko ' + person.name)
    if (result) {
      PersonsService
        .remove(id)
        .then(response => {
          const persons = this.state.persons.filter(n => n.id !== id)
          this.setState({
            persons: persons,
            info: `Henkilö ${person.name} poistettu`
          })
        })
        .catch(response => {
          this.setState({ 
            error: `Henkilön ${person.name} poistaminen epäonnistui, koska oli jo poistettu!`,
            persons: this.state.persons.filter(person => person.id !== id)
          })
        })
    }
  }

  addNewname = (event) => {
    event.preventDefault()
    const index = this.state.persons.findIndex(person => person.name === this.state.newName)

    if (index !== -1) {
      const person = this.state.persons[index]
      const id = person.id

      const result = window.confirm(this.state.newName + ' on jo luettelossa, korvataanko vanha numero uudella?')
      if (result) {
        const personObject = {
          name: this.state.newName,
          number: this.state.newNumber
        }

        PersonsService
          .update(id, personObject)
          .then(response => {
            const persons = this.state.persons.map(person => person.id !== id ? person : response)
            this.setState({
              persons: persons,
              newName: '',
              newNumber: '',
              info: `Henkilö ${person.name} päivitettiin`
            })
          })
          .catch(error => {
            PersonsService
              .getAll()
              .then(persons => {
                this.setState({ 
                  persons: persons,
                  error: `Henkilön ${person.name} päivitys epäonnistui. Kenties henkilö on poistettu, haetaan luettelo uudelleen.`
                })
              })
          })
      }
      return
    }

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    PersonsService
      .create(personObject)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newName: '',
          newNumber: '',
          info: `Henkilö ${personObject.name} lisättiin`
        })
      })
      .catch(error => {
        this.setState({
          error: `Henkilön ${personObject.name} lisäys epäonnistui. Ole hyvä ja yritä uudelleen.`
        })
      })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification errormessage={this.state.error} infomessage={this.state.info} clearNotification={this.clearNotification}/>
        <Search search={this.state.search} setSearch={this.setSearch} />
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addNewname}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNewnameChange} />
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <Persons persons={this.state.persons} search={this.state.search} removeUser={this.removeUser} />        
      </div>
    )
  }
}

export default App