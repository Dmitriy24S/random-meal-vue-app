<template>
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-2">
    <MealPreviewCard v-for="meal of meals" :key="meal.idMeal" :meal="meal" />
  </div>
</template>

<script setup>
import MealPreviewCard from './MealPreviewCard.vue'

const { meals } = defineProps({
  meals: {
    required: true,
    type: Array,
  },
})
</script>
