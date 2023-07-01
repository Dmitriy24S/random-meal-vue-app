import { axiosClient } from '../axiosClient'

export async function searchMeals({ commit }, keyword) {
  commit('setFetchStatus', 'loading')
  try {
    if (!keyword) return new Error('no keyword')
    const response = await axiosClient.get(`search.php?s=${keyword}`)
    // debugger
    if (response.data.meals === null) {
      commit('setSearchedMeals', [])
    } else {
      commit('setSearchedMeals', response.data.meals)
    }
  } catch (error) {
    console.log('searchMeals action error', error)
    commit('setSearchedMeals', [])
  }
}

export function resetSearchedMeals({ commit }) {
  commit('setSearchedMeals', [])
  commit('setFetchStatusIdle')
  commit('setSearchQuery', '')
}

export function resetMealDetails({ commit }) {
  commit('setMealDetails', null)
  commit('setFetchStatusIdle')
}

export async function getMealDetails({ commit }, id) {
  commit('setFetchStatus', 'loading')
  try {
    if (!id) throw new Error('no id')
    const response = await axiosClient.get(`/lookup.php?i=${id}`)
    // debugger
    commit('setMealDetails', response.data.meals[0])
  } catch (error) {
    console.log('getMealDetails action error', error)
    commit('setMealDetails', null) // reset meal details, i.e details -> home -> details
  }
}

export async function searchMealsByLetter({ commit }, letter) {
  // console.log('searchMealsByLetter letter', letter) // M
  commit('setFetchStatus', 'loading')
  try {
    if (!letter) throw new Error('no letter')
    const response = await axiosClient.get(`/search.php?f=${letter}`)
    // console.log('searchMealsByLetter response', response) // data: meals: Array(17)
    // debugger
    // console.log('response.data.meals', response.data.meals) // null when get meals by url http://localhost:5173/by-letter/X
    if (response.data.meals === null) {
      commit('setSearchedMeals', [])
    } else {
      commit('setSearchedMeals', response.data.meals)
    }
  } catch (error) {
    console.log('getMealsByLetter action error', error)
    commit('setSearchedMeals', []) // reset meal details
  }
}

export async function searchMealsByIngredient({ commit }, ingredient) {
  commit('setFetchStatus', 'loading')
  try {
    if (!ingredient) throw new Error('no ingredient')
    const response = await axiosClient.get(`/filter.php?i=${ingredient}`)
    if (response.data.meals === null) {
      commit('setSearchedMeals', [])
    } else {
      commit('setSearchedMeals', response.data.meals)
    }
  } catch (error) {
    console.log('searchMealsByIngredient action error', error)
    commit('setSearchedMeals', [])
  }
}

export async function getRandomMeals({ commit }) {
  const randomMeals = []
  commit('setFetchStatus', 'loading')
  try {
    for (let i = 0; i < 10; i++) {
      const randomMeal = await axiosClient.get('random.php')
      // debugger
      // data:
      // meals: {idMeal: '52995', strMeal: 'BBQ Pork Sloppy Joes', strDrinkAlternate: null, strCategory: 'Pork', strArea: 'American', …}
      // headers: AxiosHeaders {content-type: 'application/json'}
      // status: 200
      // statusText: ""
      randomMeals.push(randomMeal.data.meals[0])
    }
    commit('setRandomMeals', randomMeals)
  } catch (error) {
    console.log('getRandomMeals error', error)
  }
}

export function updateSearchQuery({ commit }, query) {
  commit('setSearchQuery', query)
}
