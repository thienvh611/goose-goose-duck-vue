<template>
    <div
        class="m-0 p-0 w-screen h-screen bg-[url('https://img.freepik.com/free-vector/gradient-hexagonal-background_23-2148954968.jpg?w=1380&t=st=1695888473~exp=1695889073~hmac=2152e15ea4c090a4a411d03b778a689d4add9f3069828a49e9f91a78b76e5a80')] bg-no-repeat bg-cover">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped></style>