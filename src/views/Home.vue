<template>
  <div class="flex flex-col">
    <!-- Search -->
    <form @submit="searchMeals" class="w-full flex justify-center">
      <div class="relative bg-white rounded">
        <div class="relative mr-[4.5rem]">
          <input
            type="text"
            id="search"
            placeholder="Search for meal by name"
            v-model="searchValue"
            class="rounded w-72 placeholder:text-gray-400 focus:outline-none focus:shadow-none focus:ring-0 focus:border-0 border-0"
          />
          <button
            type="button"
            title="Clear search input"
            v-if="searchValue"
            @click="clearInput"
            class="absolute right-2 text-gray-500 top-1/2 -translate-y-1/2 px-1"
          >
            X
          </button>
        </div>
        <button
          type="submit"
          :disabled="searchValue === ''"
          class="bg-blue-500 text-white px-2 py-1 rounded absolute right-1 top-1 bottom-1 hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          Search
        </button>
      </div>
    </form>

    <!-- Meals -->
    <div class="mt-5">
      <div v-if="searchQuery" class="flex justify-between">
        <p class="text-gray-500">
          Search results for
          <span class="italic font-medium text-black">"{{ searchQuery }}" </span>
        </p>
        <button type="button" @click="clearResults" class="text-gray-500 hover:underline">
          Clear
        </button>
      </div>
      <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2">
        <!-- Meal Card -->
        <div
          v-for="meal of meals"
          :key="meal.idMeal"
          @click="redirectToMealDetails($event, meal.idMeal)"
          class="outline outline-gray-200 rounded shadow-md hover:-translate-y-1 transition duration-300 overflow-hidden bg-white"
        >
          <img
            :src="meal.strMealThumb"
            loading="lazy"
            alt="Meal Thumbnail"
            class="h-[300px] w-full object-cover"
          />
          <div class="p-4">
            <router-link
              :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
              @click="redirectToMealDetails($event, meal.idMeal)"
            >
              <h4 class="font-semibold">
                {{ meal.strMeal }}
              </h4>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- composition api -->
<script setup>
import { useRouter } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import store from '../store'

const router = useRouter() // Access the router instance
const meals = computed(() => store.state.searchedMeals)

// search
const searchValue = ref('')
const searchQuery = ref('')

function searchMeals(e) {
  e.preventDefault()
  if (!searchValue.value.trim()) return
  searchQuery.value = searchValue.value
  store.dispatch('searchMeals', searchValue.value)
}

function clearInput() {
  searchValue.value = ''
}

function clearResults() {
  searchQuery.value = ''
  searchValue.value = ''
  store.dispatch('resetSearchedMeals')
}

// redirect to details
function redirectToMealDetails(event, mealId) {
  event.stopPropagation()
  router.push(`/meal/${mealId}`)
}

onMounted(() => {
  store.dispatch('getMealDetails', null)
})
</script>

<style lang=""></style>
