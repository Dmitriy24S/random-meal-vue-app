<template>
  <div
    class="rounded-md shadow-sm hover:-translate-y-1 transition duration-300 overflow-hidden bg-white"
    @click="redirectToMealDetails($event, meal.idMeal)"
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
  <!-- <div v-if="!meals.length" class="flex justify-center text-gray-600 p-8">
    There are no meals
  </div> -->
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const { meal } = defineProps({
  meal: {
    required: true,
    type: Object,
  },
})

function redirectToMealDetails(event, mealId) {
  event.stopPropagation()
  router.push(`/meal/${mealId}`)
}
</script>
