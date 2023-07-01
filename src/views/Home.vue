<template>
  <div class="flex flex-col">
    <Searchbar :searchType="'name'" :searchFn="searchMealsByName" />
    <!-- Searched Meals -->
    <MealList :meals="meals" v-if="meals.length !== 0" />
    <!-- Random Meals -->
    <div v-if="meals.length === 0 && randomMeals">
      <h2 class="mb-4 text-orange-500 text-4xl font-bold">Random Meals</h2>
      <MealList :meals="randomMeals" />
    </div>
    <!-- Loading -->
    <div v-if="fetchStatus === 'loading'">
      <LoadingSpinner />
    </div>
  </div>
</template>

<!-- composition api -->
<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import store from '../store'
import MealList from '../components/MealList.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import Searchbar from '../components/Searchbar.vue'

const meals = computed(() => store.state.searchedMeals)
const randomMeals = computed(() => store.state.randomMeals)
const fetchStatus = computed(() => store.state.fetchStatus)

function searchMealsByName(value) {
  // store.dispatch('searchMeals', searchValue.value)
  store.dispatch('searchMeals', value)
}

onMounted(() => {
  if (randomMeals.value.length > 0) return
  store.dispatch('getRandomMeals')
})

onUnmounted(() => {
  store.dispatch('resetSearchedMeals')
})
</script>

<style lang=""></style>
