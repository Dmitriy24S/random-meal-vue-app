<template>
  <div class="bg-gray-100 min-h-screen">
    <Navbar />
    <main class="max-w-[800px] px-2 mx-2 md:mx-auto mt-5">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue'
</script>
