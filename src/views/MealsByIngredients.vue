<template>
  <div>
    <Searchbar
      :searchType="'ingredient'"
      :searchFn="searchMealsByIngredient"
      :selectedIngredient="searchQuery"
    />
    <MealList :meals="meals" v-if="searchQuery.length > 0" />
    <!-- all ingredients -->
    <div
      v-if="computedIngredients.length > 0 && meals.length === 0"
      class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
    >
      <button
        v-for="ingredient of computedIngredients"
        :key="ingredient.idIngredient"
        @click.prevent="selectIngredientAndSearch(ingredient.strIngredient)"
        class="border border-slate-300 py-1 rounded hover:bg-orange-600 hover:text-white focus-visible:bg-orange-600 focus-visible:text-white transition-colors duration-75 focus-visible:outline-orange-200"
      >
        <h4>{{ ingredient.strIngredient }}</h4>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { axiosClient } from '../axiosClient'
import store from '../store/'
import MealList from '../components/MealList.vue'
import Searchbar from '../components/Searchbar.vue'

const meals = computed(() => store.state.searchedMeals)
const searchValue = ref('') // input value
const searchQuery = computed(() => store.state.searchQuery) // current active search text
const ingredients = ref([])
const computedIngredients = computed(() => {
  if (!computedIngredients) return ingredients.value
  return ingredients.value.filter((i) =>
    i.strIngredient.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function searchMealsByIngredient(value) {
  store.dispatch('searchMealsByIngredient', value)
}

function selectIngredientAndSearch(value) {
  if (!value.trim()) return
  value = value.toLowerCase()
  searchValue.value = value // input value
  store.dispatch('updateSearchQuery', value)
  searchMealsByIngredient(value) // store.dispatch('searchMealsByIngredient', value)
}

onMounted(async () => {
  try {
    const response = await axiosClient.get('list.php?i=list')
    // debugger
    // meals:  Array(574)
    // [0 … 99]
    // 0: idIngredient: "1"
    // strDescription: "The chicken is a ..."
    // strIngredient: "Chicken"
    if (response.data.meals !== null) {
      ingredients.value = response.data.meals
    }
  } catch (error) {
    console.log('onmount fetch ingredients error:', error)
  }
})

onUnmounted(() => {
  store.dispatch('resetSearchedMeals') // otherwise when go to home page -> home shows searched meals for ingredient?
})
</script>

<style lang="scss" scoped></style>
