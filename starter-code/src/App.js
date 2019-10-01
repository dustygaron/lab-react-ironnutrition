import React from 'react'
import './App.css'
import FoodBox from './components/FoodBox'
import foodList from './foods.json'
import 'bulma/css/bulma.css'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      allFoods: foodList,
      visibleFoods: foodList,
      newFoodName: "",
      newFoodCalorie: "",
      newFoodImage: "",
      isFormShowing: false,
    }
  }


  showAllTheFoods = () => {
    return this.state.visibleFoods.map((eachfood, i) => {
      return (
        <FoodBox key={i}
          theName={eachfood.name}
          theCalories={eachfood.calories}
          theImage={eachfood.image}
        />
      )
    })
  }


  addNewFood = (e) => {
    e.preventDefault()

    let all = [...this.state.allFoods];
    let visible = [...this.state.visibleFoods]

    let newFood = {
      name: this.state.newFoodName,
      calories: this.state.newFoodCalorie,
      image: this.state.newFoodImage
    };

    all.unshift(newFood);
    visible.unshift(newFood);

    this.setState({
      allFoods: all,
      visibleFoods: visible,
      newFoodName: "",
      newFoodCalorie: "",
      newFoodImage: "",
      isFormShowing: false,
      searchTerm: "",
    })
  }


  updateInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  toggleForm = () => {
    this.setState({ isFormShowing: !this.state.isFormShowing })
  }


  search = (e) => {
    this.setState({ searchTerm: e.target.value }, () => {

      let clone = [...this.state.visibleFoods]

      let filteredFoods = this.state.allFoods.filter((eachFood) => {
        return eachFood.name.toUpperCase().includes(this.state.searchTerm.toUpperCase())

      })
      this.setState({ visibleFoods: filteredFoods })
    })
  }




  render() {
    return (
      <div>

        <div className="container">
          <h2 className="is-size-2">IronNutrition</h2>
          <section className="search-container">
            <div class="field">
              <div class="control">
                <input class="input" type="text" onChange={this.search} value={this.state.searchTerm} placeholder='Search for foods...' />
              </div>
            </div>
          </section>


          <main className="flex">

            <section className="left">
              <h2 className="is-size-4">Foods</h2>
              <div> {this.showAllTheFoods()} </div>
            </section>

            <section className="right">
              {!this.state.isFormShowing &&
                <button onClick={this.toggleForm} className="button is-success">
                  Add New Food
                  </button>}

              {this.state.isFormShowing &&
                <form onSubmit={this.addNewFood}>

                  <h2 className="is-size-4">Add a new food to the list</h2>

                  <input className="input" name="newFoodName" type="text" value={this.state.newFoodName} onChange={this.updateInput} placeholder="Name of Food" />
                  <input className="input" name="newFoodCalorie" type="number" value={this.state.newFoodCalorie} onChange={this.updateInput} placeholder="Number of Calories" />
                  <br />
                  <label>Image of Food</label>
                  {/* <input className="input" name="newFoodImage" type="file" value={this.state.newFoodImage} onChange={this.updateInput} alt=""/> */}
                  <input className="input" name="newFoodImage" type="file" value={this.state.newFoodImage} onChange={this.updateInput} alt="" />

                  <br />

                  <button>Submit</button>
                </form>}

            </section>
          </main>
        </div>


      </div>
    );
  }
}

export default App
