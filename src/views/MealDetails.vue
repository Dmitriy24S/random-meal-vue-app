<template>
  <!-- Meal Details -->
  <template v-if="mealDetails">
    <!-- Meal Card -->
    <div
      class="rounded shadow-md transition overflow-hidden md:flex sm:items-start bg-white"
    >
      <!-- Image, Area/Category, Tags-->
      <div class="flex flex-col gap-1 w-full md:w-1/2">
        <!-- Image -->
        <img
          :src="mealDetails.strMealThumb"
          loading="lazy"
          alt="Meal Thumbnail"
          class="h-[300px] md:h-[350px] object-cover"
        />
        <div class="flex flex-col gap-2 px-4">
          <!-- Area/Category -->
          <div class="flex justify-between gap-2">
            <p>Area: {{ mealDetails.strArea }}</p>
            <p>Category: {{ mealDetails.strCategory }}</p>
          </div>
          <!-- Tags -->
          <div v-if="mealDetails.strTags" class="flex gap-1">
            <h4 class="font-semibold">Tags</h4>
            <p>
              {{ mealDetails.strTags }}
            </p>
          </div>
        </div>
      </div>
      <!-- Details -->
      <div class="flex flex-col gap-4 p-4 md:w-1/2">
        <div class="flex flex-col gap-1">
          <h3 class="font-semibold capitalize text-2xl">
            {{ mealDetails.strMeal }}
          </h3>
        </div>
        <div class="flex flex-col gap-1">
          <h4 class="font-semibold">Instructions</h4>
          <p>
            {{ mealDetails.strInstructions }}
          </p>
        </div>
        <!-- Ingredients & Measurements-->
        <table
          aria-describedby="ingredients and measurements"
          v-if="computedIngredients.length > 0 && computedMeasurements.length > 0"
        >
          <tr>
            <th>Ingredients</th>
            <th>Measurements</th>
          </tr>
          <!-- {{ computedIngredients.map((ingredient,index) => ( -->
          <template v-for="(ingredient, index) in computedIngredients" :key="index">
            <tr class="text-center">
              <td>
                {{ ingredient }}
              </td>
              <td>{{ computedMeasurements[index] }}</td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </template>
  <!-- Skeleton while waiting for meal details -->
  <template v-else>
    <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8">
      <!-- md:flex md:items-center -->
      <div
        class="flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-gray-700"
      >
        <!-- sm:w-96 -->
        <svg
          class="w-12 h-12 text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path
            d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
          />
        </svg>
      </div>
      <div class="w-full">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div
          class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"
        ></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div
          class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"
        ></div>
        <div
          class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"
        ></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  </template>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, onUnmounted } from 'vue'
import store from '../store'
const route = useRoute()
const mealId = ref('')
const mealDetails = computed(() => store.state.mealDetails)
console.log('mealDetails', mealDetails.value)

// let ingredients = []
// let measurements = []
// if (mealDetails) {
//   console.log('Object.entries(mealDetails)', Object.entries(mealDetails))
//   ingredients = Object.entries(mealDetails)
//     .filter(([key, value]) => key.startsWith('strIngredient'))
//     .map(([key, value]) => value)
//     .filter((value) => value !== '' && value !== null)
//   measurements = Object.entries(mealDetails)
//     .filter(([key, value]) => key.startsWith('strMeasure'))
//     .map(([key, value]) => value)
//   // .filter((value) => value !== '')
// }

const computedIngredients = computed(() => {
  if (mealDetails.value) {
    return Object.entries(mealDetails.value)
      .filter(([key, value]) => key.startsWith('strIngredient'))
      .map(([key, value]) => value)
      .filter((value) => value !== '' && value !== null)
  } else {
    return []
  }
})
// [ "Butter", "Sour Cream", "Sugar", "Cream Cheese", "Caster Sugar", "Plain Flour", "Lemon Juice", "Eggs", "Sour Cream", "Sour Cream", "Caster Sugar", "Lemon Juice" ]

const computedMeasurements = computed(() => {
  if (mealDetails.value) {
    // console.log('Object.entries(mealDetails.value)', Object.entries(mealDetails.value))
    // (53) [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), ...]
    // 0: (2) ['idMeal', '52858']
    // 1: (2) ['strMeal', 'New York cheesecake']
    // 2: (2) ['strDrinkAlternate', null]
    // 3: (2) ['strCategory', 'Dessert']
    // 4: (2) ['strArea', 'American']
    return Object.entries(mealDetails.value)
      .filter(([key, value]) => key.startsWith('strMeasure'))
      .map(([key, value]) => value)
  } else {
    return []
  }
})
// [ "85g", "140g", "1tbsp", "900g", "250g", "3 tbs", "1 ½ teaspoons", "3 Large", "250ml", "150ml", "1 tbsp", "2 tsp", "", "", "", "", "", "", "", "" ]

onMounted(() => {
  mealId.value = route.params.id
  if (mealId.value) {
    store.dispatch('getMealDetails', mealId.value)
  }
})
onUnmounted(() => {
  // store.dispatch('getMealDetails', null)
  // store.dispatch('searchMeals', []) // ! specific 25 array items sets
  store.dispatch('resetMealDetails')
})
</script>
