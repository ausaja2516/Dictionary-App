import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useDictionaryStore = defineStore("Dictionary", () => {
  const isLoading = ref(false);
  const errMsg = ref("");
  const wordData = ref([]);

  const getData = async (searchWord) => {
    isLoading.value = !isLoading.value;
    try {
      if (searchWord !== "") {
        errMsg.value = "";
        const res = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
        );
        const data = res.data[0];

        wordData.value = {
          word: data.word,
          phonetic: data.phonetic || "",
          audio: data.phonetics.find((p) => p.audio)?.audio || "",
          meanings: data.meanings.map((meaning) => ({
            partOfSpeech: meaning.partOfSpeech,
            definitions: meaning.definitions.map((def) => ({
              definition: def.definition,
              example: def.example || "",
            })),
            synonyms: meaning.synonyms || [],
            antonyms: meaning.antonyms || [],
          })),
          sourceUrl: data.sourceUrls?.[0] || "",
        };

        isLoading.value = !isLoading.value;
      } else {
        isLoading.value = !isLoading.value;
        // errMsg.value = "Can not leave the input empty";
      }
    } catch (error) {
      isLoading.value = !isLoading.value;
      errMsg.value = `Oops could not find the information about the word you entered, try some other words
        or check your internet connection.`;
    }
  };

  return { getData, isLoading, wordData, errMsg };
});
