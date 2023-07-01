<template>
  <div class="flex flex-col">
    <Searchbar :searchType="'name'" :searchFn="searchMealsByName" />
    <!-- Searched Meals -->
    <!-- <MealList v-if="meals.length !== 0" :meals="meals" /> -->
    <MealList v-if="searchQuery.length > 0" :meals="meals" />
    <!-- Random Meals -->
    <div v-if="meals.length === 0 && randomMeals && searchQuery.length === 0">
      <div class="flex justify-between gap-2 items-center">
        <h2 class="mb-4 text-orange-500 text-4xl font-bold">Random Meals</h2>
        <button
          type="button"
          title="Get another random meals"
          @click="getRandomMeals"
          class="text-orange-600 hover:text-orange-500 transition-colors"
        >
          <v-icon name="hi-refresh" scale="1.3" />
        </button>
      </div>
      <MealList :meals="randomMeals" />
    </div>
  </div>
</template>

<!-- composition api -->
<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import store from '../store'
import MealList from '../components/MealList.vue'
import Searchbar from '../components/Searchbar.vue'

const meals = computed(() => store.state.searchedMeals)
const randomMeals = computed(() => store.state.randomMeals)
const searchQuery = computed(() => store.state.searchQuery)

function searchMealsByName(value) {
  // store.dispatch('searchMeals', searchValue.value)
  store.dispatch('searchMeals', value)
}

function getRandomMeals() {
  store.dispatch('getRandomMeals')
}

onMounted(() => {
  if (randomMeals.value.length > 0) return
  getRandomMeals()
})

onUnmounted(() => {
  store.dispatch('resetSearchedMeals')
})
</script>

<style lang=""></style>
