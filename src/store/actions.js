import { axiosClient } from '../axiosClient'

export async function searchMeals({ commit }, keyword) {
  try {
    const response = await axiosClient.get(`search.php?s=${keyword}`)
    // debugger
    commit('setSearchedMeals', response.data.meals)
  } catch (error) {
    console.log('searchMeals action error', error)
  }
}

export function resetSearchedMeals({ commit }) {
  commit('setSearchedMeals', [])
}

export async function getMealDetails({ commit }, id) {
  try {
    const response = await axiosClient.get(`/lookup.php?i=${id}`)
    // debugger
    commit('setMealDetails', response.data.meals[0])
  } catch (error) {
    console.log('getMealDetails action error', error)
    commit('setMealDetails', null) // reset meal details, i.e details -> home -> details
  }
}
