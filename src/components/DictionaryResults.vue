<template>
  <div class="mt-12">
    <div
      v-if="dictionary.isLoading"
      class="text-center mt-12 flex flex-col gap-8"
    >
      <div class="text-4xl">🙃</div>
      <div
        class="text-center w-16 h-16 rounded-full border-y border-violet-600 animate-spin mx-auto"
      ></div>
    </div>
    <div v-if="dictionary.errMsg" class="text-center flex flex-col gap-8 mt-12">
      <p class="text-4xl">🤔</p>
      <p>{{ dictionary.errMsg }}</p>
    </div>
    <div
      v-if="
        dictionary.wordData.length !== 0 &&
        !dictionary.isLoading &&
        !dictionary.errMsg
      "
    >
      <div class="flex justify-between flex-wrap items-center mb-12">
        <div>
          <h1 class="text-3xl sm:text-5xl font-semibold">
            {{ dictionary.wordData.word }}
          </h1>
          <p class="text-lg text-violet-500">
            {{ dictionary.wordData.phonetic }}
          </p>
        </div>
        <button
          type="button"
          v-if="dictionary.wordData.audio"
          @click="playAudio"
          :disabled="isPlaying"
        >
          <svg
            class="w-16 h-16 sm:w-[75px] sm:h-[75px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 75 75"
          >
            <g class="group" fill="#A445ED" fill-rule="evenodd">
              <circle
                class="group-hover:fill-purple-700"
                cx="37.5"
                cy="37.5"
                r="37.5"
                opacity=".25"
              />
              <path
                class="group-hover:fill-purple-700"
                d="M29 27v21l21-10.5z"
              />
            </g>
          </svg>
        </button>
      </div>
      <div
        v-for="meaning in dictionary.wordData.meanings"
        :key="meaning.partOfSpeech"
      >
        <div class="flex items-center my-8">
          <h3 class="text-lg italic">
            {{ meaning.partOfSpeech }}
          </h3>
          <span
            class="ml-4 flex-1 border-b border-gray-200 dark:border-gray-800"
          ></span>
        </div>
        <p class="text-gray-400 mb-4">Meaning</p>
        <div class="definitions">
          <ul
            v-for="(def, index) in meaning.definitions"
            :key="index"
            class="definition"
          >
            <li class="list-disc list-inside mb-1 text-violet-500">
              <span class="text-gray-800 dark:text-gray-100">{{
                def.definition
              }}</span>
            </li>
            <p v-if="def.example" class="text-gray-400 text-sm ml-4 mb-1">
              "{{ def.example }}"
            </p>
          </ul>
        </div>
        <div
          v-if="meaning.synonyms.length"
          class="flex gap-4 mt-6 mb-4 text-sm"
        >
          <p>Synonyms</p>
          <p class="text-violet-600">{{ meaning.synonyms.join(", ") }}</p>
        </div>

        <div
          v-if="meaning.antonyms.length"
          class="flex gap-4 mt-6 mb-4 text-sm"
        >
          <p>Antonyms:</p>
          <p class="text-violet-600">{{ meaning.antonyms.join(", ") }}</p>
        </div>
      </div>
      <div
        class="mt-12 text-sm text-gray-400"
        v-if="dictionary.wordData.sourceUrl"
      >
        <p>
          Source:
          <a
            class="ml-4 hover:underline active:underline underline-offset-4"
            :href="dictionary.wordData.sourceUrl"
            target="_blank"
            >{{ dictionary.wordData.sourceUrl }}</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDictionaryStore } from "@/stores/dictionary";
import { ref } from "vue";

const dictionary = useDictionaryStore();
const isPlaying = ref(false);
const audio = ref(null);

const playAudio = () => {
  if (!audio.value) {
    audio.value = new Audio(dictionary.wordData.audio);
  }

  isPlaying.value = true;
  audio.value.play();
  audio.value.onended = () => {
    isPlaying.value = false;
    audio.value = "";
  };
};
</script>
