<template>
  <div>
    <Searchbar :searchType="'ingredient'" :searchFn="searchMealsByIngredient" />
    <MealList :meals="meals" />
  </div>
</template>

<script setup>
import { computed, onUnmounted } from 'vue'
import store from '../store/'
import MealList from '../components/MealList.vue'
import Searchbar from '../components/Searchbar.vue'

const meals = computed(() => store.state.searchedMeals)

function searchMealsByIngredient(value) {
  store.dispatch('searchMealsByIngredient', value)
}

onUnmounted(() => {
  store.dispatch('resetSearchedMeals') // otherwsie when go to home page -> home shows searched meals for ingredient?
})
</script>

<style lang="scss" scoped></style>
