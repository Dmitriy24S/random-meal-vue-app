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
        class="hover:bg-blue-500 hover:text-white transition-colors px-1.5 py-1 rounded"
      >
        {{ letter }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const letters = 'ABCDEFGHIJKLMNOPQRSTUWXYZ'.split('')
</script>

<style lang="scss" scoped></style>
