<template>
  <form @submit.prevent="searchMeals" class="flex justify-center">
    <div
      class="relative bg-white sm:bg-transparent rounded border-2 border-transparent sm:focus-within:border-blue-500 sm:focus-within:border-2 flex flex-col p-2 sm:p-0"
    >
      <input
        type="text"
        id="search"
        :placeholder="`Search for meal by ${searchType}`"
        v-model="searchValue"
        @input="handleSearchInput"
        ref="searchInputRef"
        class="rounded w-72 sm:w-[21rem] placeholder:text-gray-400 focus:outline-none focus:shadow-none focus:ring-0 border-transparent border-2 sm:pr-24 pl-2 pr-8 sm:focus:border-transparent"
      />
      <button
        type="button"
        title="Clear search input"
        v-if="searchValue"
        @click="clearInput"
        class="text-gray-500 px-1 text-xl mr-1.5 absolute right-2 sm:right-[4.5rem] top-3.5 flex items-center justify-center pb-0.5 sm:top-1.5"
      >
        &times;
      </button>
      <button
        type="submit"
        :disabled="searchValue === ''"
        class="bg-blue-500 text-white px-2 py-1.5 sm:py-1 mt-2 sm:mt-0 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 sm:absolute sm:right-1 sm:top-1/2 sm:-translate-y-1/2"
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
const searchInputRef = ref() // input element ref
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
  searchInputRef.value.focus()
}

function clearResults() {
  searchValue.value = ''
  store.dispatch('resetSearchedMeals')
}

watch(selectedIngredientRef, (newValue) => {
  searchValue.value = newValue // input value, update input with selected ingredient from MealsByIngredients component/page
})
</script>
