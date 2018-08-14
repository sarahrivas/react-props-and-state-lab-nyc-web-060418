import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = (event) => {
    this.setState({
     ...this.state,
     filters: {
       type: event.target.value
     }
    })
  }

   petClickHandler = (event) => {
     console.log("hi")
     if(this.state.filters.type === 'all') {
       fetch('/api/pets').then(resp=>resp.json()).then(data=>this.setState({
         ...this.state,
         pets: data
       }))
     } else {
       fetch(`/api/pets?type=${this.state.filters.type}`).then(resp=>resp.json()).then(data => this.setState({
         ...this.state,
         pets: data
       }))
     }
  }

  adoptHandler = (id) => {
    const newArray = this.state.pets.map(petObj => petObj.id === id ? {...petObj, isAdopted: true} : petObj)
    this.setState({
      pets: newArray
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.petClickHandler}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptHandler}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
