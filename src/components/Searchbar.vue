<template>
  <form @submit.prevent="searchMeals" class="w-full flex justify-center">
    <div class="relative bg-white rounded">
      <div class="relative mr-[4.5rem]">
        <input
          type="text"
          id="search"
          :placeholder="`Search for meal by ${searchType}`"
          v-model="searchValue"
          @input="handleSearchInput"
          class="rounded w-72 placeholder:text-gray-400 focus:outline-none focus:shadow-none focus:ring-0 focus:border-0 border-0"
        />
        <button
          type="button"
          title="Clear search input"
          v-if="searchValue"
          @click="clearInput"
          class="absolute right-2 text-gray-500 top-1/2 -translate-y-1/2 px-1 text-xl"
        >
          &times;
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
  </div>
</template>

<script setup>
import { ref, watch, toRef, computed } from 'vue'
import { debounce } from 'lodash'

import store from '../store'

const props = defineProps({
  searchType: {
    required: true,
    type: String,
  },
  searchFn: {
    required: true,
    type: Function,
  },
  selectedIngredient: {
    required: false,
    type: String,
    // default: '',
    default: null,
  },
})

const { searchType, searchFn } = props
const searchValue = ref('') // input value
const searchQuery = computed(() => store.state.searchQuery) // active search query
const selectedIngredientRef = toRef(props, 'selectedIngredient')
const searchedMeals = computed(() => store.state.searchedMeals)

const handleSearchInput = debounce(() => {
  console.log('Debounce! searchValue:', searchValue.value)
  if (searchType === 'name') return // prevent updating search query on Home page when searching by name, wait for submission, and show random meals before submission
  if (searchedMeals.value.length > 0) return // prevent updating search query if showing active search results, change only input without updaing search query
  store.dispatch('updateSearchQuery', searchValue.value)
}, 300)

function searchMeals() {
  if (!searchValue.value.trim()) return
  searchFn(searchValue.value)
  store.dispatch('updateSearchQuery', searchValue.value)
}

function clearInput() {
  searchValue.value = ''
}

function clearResults() {
  searchValue.value = ''
  store.dispatch('resetSearchedMeals')
}

watch(selectedIngredientRef, (newValue) => {
  searchValue.value = newValue // input value, update input with selected ingredient from MealsByIngredients component/page
})
</script>
