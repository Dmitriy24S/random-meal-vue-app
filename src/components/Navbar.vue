<template>
  <header
    class="max-w-[800px] flex items-center justify-between h-12 mx-2 md:mx-auto bg-white shadow-md px-4 rounded-b-md"
  >
    <router-link
      :to="{ name: 'home' }"
      class="uppercase font-bold tracking-widest text-blue-500"
    >
      Meal App
    </router-link>
    <div class="flex items-center gap-4">
      <router-link
        :to="{ name: 'byLetter' }"
        class="hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md transition"
        >Meals by letter</router-link
      >
      <router-link
        :to="{ name: 'byIngredients' }"
        class="hover:bg-blue-600 hover:text-white px-2 py-1 rounded-md transition"
        >Meals by ingredient</router-link
      >
    </div>
  </header>
</template>
