<template>
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2">
    <MealPreviewCard v-for="meal of meals" :key="meal.idMeal" :meal="meal" />
  </div>
  <div
    v-if="!meals.length && fetchStatus === 'done'"
    class="flex justify-center text-gray-600 p-8"
  >
    There are no meals
  </div>
</template>

<script setup>
import store from '../store'
import MealPreviewCard from './MealPreviewCard.vue'

import { computed } from 'vue'

const { meals } = defineProps({
  meals: {
    required: true,
    type: Array,
  },
})

const fetchStatus = computed(() => store.state.fetchStatus)
</script>
