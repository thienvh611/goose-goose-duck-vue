<template>
    <div class="m-0 p-0 w-screen h-screen overflow-hidden relative flex justify-center items-center">
        <img src="/assets/images/background.jpg" alt="background" class="w-full h-full">
        <div class="z-10 absolute top-50 left-50">
            <RouterLink to="/game" class="relative inline-block text-lg group">
                <span
                    class="relative z-10 block px-5 py-3 overflow-hidden font-bold leading-tight text-rose-700 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-amber-300">
                    <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                    <span
                        class="absolute left-0 w-56 h-56 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                    <span class="relative text-3xl">Enjoy Game</span>
                </span>
                <span
                    class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                    data-rounded="rounded-lg"></span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped></style>