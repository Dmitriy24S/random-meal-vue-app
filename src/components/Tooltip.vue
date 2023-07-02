<template>
  <div class="relative">
    <!-- TODO: how to have showTooltip state inside? -->
    <!-- <slot -->
    <!-- @mouseover="showTooltip = true" -->
    <!-- @mouseleave="showTooltip = false" -->
    <!-- @focusCapture="showTooltip = true" -->
    <!-- @blurCapture="showTooltip = false" -->
    <!-- ></slot> -->
    <slot></slot>
    <!-- Refresh button tooltip -->
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-if="showTooltip"
        class="absolute bg-slate-900 text-white bottom-full right-0 px-2 py-1 rounded-md whitespace-nowrap"
      >
        {{ text }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
const { text, showTooltip } = defineProps({
  text: {
    type: String,
    required: true,
  },
  showTooltip: {
    type: Boolean,
    requred: true,
  },
})
</script>
