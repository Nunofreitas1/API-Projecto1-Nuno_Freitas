<script setup>
import {toRefs} from 'vue';
import {RouterLink} from 'vue-router';

const props = defineProps({
    image: String,
    title: String,
    subTitle: String,
    type: String,
    itemId : String
})
const { image, title, subTitle,type, itemId  } = toRefs(props)
</script>

<template>
    <RouterLink :to="`/Library/${type}/${itemId}`">
        <div class="bg-[#111111] p-4 rounded-md m-2 hover:bg-[#252525] cursor-pointer">
            <img class="rounded-md" :src="image">
            <div class="text-white pt-4 font-semibold text-[17px]">{{ title }}</div>
            <div class="text-gray-400 pt-1 pb-3 text-[14px]">{{ subTitle }}</div>
        </div>
    </RouterLink>
</template>