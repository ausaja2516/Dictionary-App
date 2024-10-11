<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { computed, ref } from "vue";

const fontFamily = ref("font-serif");
const isOpen = ref(false);

const fontOptions = [
  { label: "Mono", value: "font-mono" },
  { label: "Sans", value: "font-sans" },
  { label: "Serif", value: "font-serif" },
];

const getCurrentFontLabel = computed(() => {
  return (
    fontOptions.find((option) => option.value === fontFamily.value)?.label ||
    "Serif"
  );
});

const selectFont = (value) => {
  fontFamily.value = value;
  isOpen.value = false;
};

const isDark = useDark();
const toggleTheme = useToggle(isDark);
</script>

<template>
  <div
    class="min-h-screen py-12 px-4 md:px-0 text-pretty bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100"
    :class="`${fontFamily}`"
  >
    <header class="max-w-screen-sm mx-auto">
      <nav class="flex justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="38"
          viewBox="0 0 34 38"
        >
          <g
            :class="{ 'stroke-violet-500': isDark }"
            fill="none"
            fill-rule="evenodd"
            stroke="#838383"
            stroke-linecap="round"
            stroke-width="1.5"
          >
            <path
              d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"
            />
            <path stroke-linejoin="round" d="M5 37a4 4 0 1 1 0-8" />
            <path d="M11 9h12" />
          </g>
        </svg>

        <div class="flex gap-4 items-center">
          <div class="relative border-r border-gray-200 dark:border-gray-800">
            <!-- Custom Dropdown Button -->
            <button
              @click="isOpen = !isOpen"
              class="flex items-center justify-between gap-4 px-5 rounded-md text-lg"
            >
              <span>{{ getCurrentFontLabel }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="8"
                viewBox="0 0 14 8"
                class="transition-all duration-300 ease-in-out"
                :class="{
                  'rotate-180 ': isOpen,
                }"
              >
                <path
                  fill="none"
                  stroke="#A445ED"
                  stroke-width="1.5"
                  d="m1 1 6 6 6-6"
                />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-show="isOpen"
              class="absolute mt-1 w-full bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                <li
                  v-for="option in fontOptions"
                  :key="option.value"
                  @click="selectFont(option.value)"
                  class="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="option.value"
                >
                  {{ option.label }}
                </li>
              </ul>
            </div>
          </div>
          <button
            @click="toggleTheme()"
            class="inline-flex items-center px-1 w-12 h-6 rounded-full"
            :class="isDark ? 'bg-violet-500' : 'bg-gray-50'"
            aria-label="Toggle theme"
          >
            <span
              class="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded-full"
              :class="{ 'translate-x-6': isDark }"
            ></span>
          </button>

          <div @click="toggleTheme()" class="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path
                :class="{ 'stroke-violet-500': isDark }"
                fill="none"
                stroke="#838383"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
              />
            </svg>
          </div>
        </div>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style>
* {
  outline: none;
}
</style>
