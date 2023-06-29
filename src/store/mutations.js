export function setSearchedMeals(state, meals) {
  state.searchedMeals = meals
  state.fetchStatus = 'done'
}

export function setMealDetails(state, mealDetails) {
  state.mealDetails = mealDetails
  state.fetchStatus = 'done'
}

export function setFetchStatusIdle(state) {
  state.fetchStatus = 'idle'
}
