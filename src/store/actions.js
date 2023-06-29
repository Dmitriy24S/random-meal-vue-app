import { axiosClient } from '../axiosClient'

export async function searchMeals({ commit }, keyword) {
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
}

export function resetMealDetails({ commit }) {
  commit('setMealDetails', null)
  commit('setFetchStatusIdle')
}

export async function getMealDetails({ commit }, id) {
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
