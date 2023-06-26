<template>
  <div>
    <!-- Title -->
    <div class="relative flex justify-center">
      <h2
        class="text-center font-bold uppercase after:content-[''] after:h-1 after:w-full after:bg-blue-400 after:bottom-0 after:left-0 after:right-0 after:block"
      >
        Search by letter
      </h2>
      <!-- <div class="absolute h-1 bottom-0 w-full bg-blue-500"></div> -->
    </div>
    <!-- Letters -->
    <div class="flex justify-center flex-wrap gap-1 mt-5">
      <router-link
        :to="{ name: 'byLetter', params: { letter } }"
        :key="letter"
        v-for="letter of letters"
        class="hover:bg-blue-500 hover:text-white transition-colors px-1.5 py-1 rounded w-[2rem] text-center"
        :class="route.params.letter === letter ? 'bg-blue-400 text-white' : ''"
      >
        {{ letter }}
      </router-link>
    </div>
    <!-- Meal List -->
    <h4 v-if="route.params.letter" class="font-semibold">
      Meals starting with
      <span class="text-2xl text-blue-500">
        {{ route.params.letter }}
      </span>
    </h4>
    <MealList :meals="meals" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import store from '../store'
import MealList from '../components/MealList.vue'

const letters = 'ABCDEFGHIJKLMNOPQRSTUWXYZ'.split('')
const route = useRoute()
// ! const mealLetter = route.params.letter // ! not refresh data
const meals = computed(() => store.state.searchedMeals)

watch(route, () => {
  // store.dispatch('searchMealsByLetter', mealLetter) // ! not refresh data
  store.dispatch('searchMealsByLetter', route.params.letter)
})

onMounted(() => {
  console.log('route.params', route.params) // {letter: 'M'}
  if (route.params.letter) {
    store.dispatch('searchMealsByLetter', route.params.letter)
  }
})
</script>

<style lang="scss" scoped></style>
