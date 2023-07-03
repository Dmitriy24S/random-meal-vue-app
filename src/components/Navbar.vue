<template>
  <header
    class="max-w-[800px] flex items-center justify-between h-12 mx-2 md:mx-auto bg-white shadow-md px-2 sm:px-4 rounded-b-md"
  >
    <router-link
      :to="{ name: 'home' }"
      class="uppercase font-bold tracking-widest px-1 rounded text-blue-500 focus:bg-blue-600 focus:text-white focus:outline-none"
    >
      Meal App
    </router-link>
    <div class="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
      <router-link
        :to="{ name: 'byLetter' }"
        class="hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md transition capitalize focus:bg-blue-600 focus:text-white focus:outline-none"
      >
        <span class="hidden sm:inline-block"> Meals </span>
        by letter</router-link
      >
      <router-link
        :to="{ name: 'byIngredients' }"
        class="hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md transition capitalize focus:bg-blue-600 focus:text-white focus:outline-none"
      >
        <span class="hidden sm:inline-block"> Meals </span>
        by ingredient</router-link
      >
    </div>
  </header>
</template>
