<script setup>
import DictionaryResults from "@/components/DictionaryResults.vue";
import { useDictionaryStore } from "@/stores/dictionary";
import { ref } from "vue";

const searchWord = ref("");

const dictionary = useDictionaryStore();
</script>

<template>
  <main class="pt-12 max-w-screen-sm mx-auto">
    <form
      @submit.prevent="dictionary.getData(searchWord), (searchWord = '')"
      class="flex gap-4 flex-1 items-center rounded-lg bg-gray-50 dark:bg-gray-800 group"
    >
      <input
        v-model="searchWord"
        class="w-full bg-transparent caret-violet-500 py-4 pl-4"
        type="text"
        placeholder="Search for any word"
      />
      <svg
        @click="dictionary.getData(searchWord), (searchWord = '')"
        class="mr-4 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <path
          class="group-hover:stroke-violet-600"
          fill="none"
          stroke="#A445ED"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
        />
      </svg>
    </form>

    <DictionaryResults />
  </main>
</template>
