<template>
  <form @submit.prevent="searchMeals" class="w-full flex justify-center">
    <div class="relative bg-white rounded">
      <div class="relative mr-[4.5rem]">
        <input
          type="text"
          id="search"
          :placeholder="`Search for meal by ${searchType}`"
          v-model="searchValue"
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
import { ref } from 'vue'
import store from '../store'

const { searchType, searchFn } = defineProps({
  searchType: {
    required: true,
    type: String,
  },
  searchFn: {
    required: true,
    type: Function,
  },
})

const searchValue = ref('')
const searchQuery = ref('')

function searchMeals() {
  if (!searchValue.value.trim()) return
  searchQuery.value = searchValue.value
  searchFn(searchValue.value)
}

function clearInput() {
  searchValue.value = ''
}

function clearResults() {
  searchQuery.value = ''
  searchValue.value = ''
  store.dispatch('resetSearchedMeals')
}
</script>
