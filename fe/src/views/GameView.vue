<script setup>
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import debounce from "lodash.debounce";

let allCharacters = ref([]);
let selectedType = ref('');
let searchName = ref('');
let openDetails = ref('');
let detailsData = ref();

const handleClickCard = async (id) => {
    openDetails.value = id;
    if (id) {
        await
            axios.get(`http://localhost:5000/api/character/${id}`)
                .then(response => detailsData.value = response.data);
    } else {
        detailsData.value = null;
    }
}

const fetchCharacters = async () => {
    await
        axios.get('http://localhost:5000/api/character/get-all-characters?name=')
            .then(response => allCharacters.value = response.data);
};

const debouncedWatch = debounce(async () => {
    await
        axios.get(`http://localhost:5000/api/character/get-all-characters?name=${searchName.value}`)
            .then(response => allCharacters.value = response.data);
}, 500);

onMounted(async () => {
    console.log('onMounted');
    await fetchCharacters();
});

watch(selectedType, async (newType) => {
    if (newType.trim().length > 0) {
        await
            axios.get(`http://localhost:5000/api/character/filter?type=${newType}`)
                .then(response => allCharacters.value = response.data.filteredCharacters);
    } else {
        await fetchCharacters();
    }
}, {
    deep: true
});

// watch(openDetails, async (newOpenDetails) => {
//     console.log(newOpenDetails);
//     if (newOpenDetails && newOpenDetails !== '') {
//         await
//             axios.get(`http://localhost:5000/api/character/${newOpenDetails}`)
//                 .then(response => detailsData.value = response.data);
//     }
// }, {
//     deep: true
// });

watch(searchName, debouncedWatch);

onBeforeUnmount(() => {
    debouncedWatch.cancel();
})

</script>

<template>
    <div class="relative w-full h-full overflow-hidden flex flex-col">
        <!-- Header -->
        <div class="absolute top-0 left-0 z-10">
            <RouterLink to="/"
                class="ml-12 mt-4 relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                <span
                    class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="1.5em" viewBox="0 0 448 512">
                        <path
                            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>
                </span>
                <span
                    class="absolute flex items-center justify-center w-full h-full font-bold text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">BACK</span>
                <span class="relative invisible">BACK</span>
            </RouterLink>
        </div>

        <div class="mt-2 w-full flex justify-center">
            <img src="/assets/images/title.png" alt="title" class="w-56">
        </div>

        <div class="absolute top-0 right-0 z-10">
            <div
                class="cursor-pointer mr-12 mt-4 relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                <span
                    class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                <span
                    class="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                    <span class="relative text-white">New Game</span>
                </span>
            </div>
        </div>

        <!-- Main -->
        <div class="flex justify-end my-10 mx-12 items-center gap-8">
            <input type="text" placeholder="Search name..." v-model="searchName"
                class="border text-sm rounded-lg block w-80 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
            <div class="flex gap-2 justify-center items-center">
                <label for="countries" class="w-32 text-base font-medium text-white">Filter by</label>
                <select v-model="selectedType" id="countries"
                    class="border text-base rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                    <option selected value="">ALL</option>
                    <option value="NGỖNG">NGỖNG</option>
                    <option value="VỊT">VỊT</option>
                    <option value="PHE THỨ 3">PHE THỨ 3</option>
                </select>
            </div>
        </div>

        <!-- List Card -->
        <div class="w-full h-full px-12 py-6 flex justify-center flex-wrap gap-8 overflow-y-auto">
            <div v-for="character in allCharacters"
                class="cursor-pointer w-56 h-56 transform rounded-xl sm:h-64 sm:w-64 shadow-xl transition duration-300 hover:scale-105"
                :class="character.type === 'NGỖNG' ? 'bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600' : character.type === 'VỊT' ? 'bg-gradient-to-b from-orange-500 to-yellow-300' : 'bg-gradient-to-b from-sky-400 to-sky-200'"
                :key="character._id" @click="handleClickCard(character._id)">
                <div class="flex h-full justify-center items-center flex-col gap-3">
                    <img class="w-20 h-20 rounded-full"
                        :src="character.type === 'NGỖNG' ? '/assets/images/goose.png' : character.type === 'VỊT' ? '/assets/images/duck.jpg' : '/assets/images/other.png@900xAUTO'"
                        alt="bg-character">
                    <p class="text-2xl font-bold text-white text-center"
                        :class="character.type === 'NGỖNG' ? 'text-green-500' : character.type === 'VỊT' ? 'text-red-500' : 'text-blue-500'">
                        {{ character.name }}</p>
                </div>
            </div>
        </div>

        <!-- Modal Details -->
        <div v-if="openDetails !== ''"
            class="absolute w-full h-full top-0 left-0 bg-orange-100/20 z-[50] overflow-x-hidden overflow-y-auto hs-overlay flex justify-center items-center">
            <div class="relative z-[50] flex w-[600px] h-[400px]">
                <div class="p-8 rounded-lg w-full shadow flex gap-4"
                    :class="detailsData.data.type === 'NGỖNG' ? 'bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600' : detailsData.data.type === 'VỊT' ? 'bg-gradient-to-b from-orange-500 to-yellow-300' : 'bg-gradient-to-b from-sky-400 to-sky-200'">
                    <div class="h-full w-full flex justify-center items-center">
                        <img class="w-40 h-40 rounded-full"
                            :src="detailsData.data.type === 'NGỖNG' ? '/assets/images/goose.png' : detailsData.data.type === 'VỊT' ? '/assets/images/duck.jpg' : '/assets/images/other.png@900xAUTO'"
                            alt="bg-character">
                    </div>
                    <div class="flex flex-col">
                        <h2 class="text-4xl text-center font-bold mb-4"
                            :class="detailsData.data.type === 'NGỖNG' ? 'text-green-500' : detailsData.data.type === 'VỊT' ? 'text-red-500' : 'text-blue-500'">
                            {{ detailsData.data.name }}
                        </h2>
                        <p class="text-white"> {{ detailsData.data.description }}</p>
                    </div>
                </div>
                <button @click="handleClickCard('')"
                    class="absolute -right-4 -top-4 z-[100] text-3xl hover:text-4xl w-10 h-10 rounded-full focus:outline-none text-rose-500 font-bold transition delay-300 duration-700 ease-in-out">
                    &cross;
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>