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
        <!-- Refresh meals button -->
        <Tooltip :text="'Refresh random meals'" :showTooltip="showTooltip">
          <button
            type="button"
            aria-label="Refresh random meals"
            title="Refresh random meals"
            @mouseover="showTooltip = true"
            @mouseleave="showTooltip = false"
            @focusCapture="showTooltip = true"
            @blurCapture="showTooltip = false"
            @click="getRandomMeals"
            class="text-orange-600 hover:text-orange-500 transition-colors"
          >
            <v-icon name="hi-refresh" scale="1.3" />
          </button>
        </Tooltip>
      </div>
      <MealList :meals="randomMeals" />
    </div>
  </div>
</template>

<!-- composition api -->
<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import store from '../store'
import MealList from '../components/MealList.vue'
import Searchbar from '../components/Searchbar.vue'
import Tooltip from '../components/Tooltip.vue'

const meals = computed(() => store.state.searchedMeals)
const randomMeals = computed(() => store.state.randomMeals)
const searchQuery = computed(() => store.state.searchQuery)
const showTooltip = ref(false)

function searchMealsByName(value) {
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
