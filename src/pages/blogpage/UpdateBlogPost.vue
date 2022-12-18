<template>
  <CreateUpdate
    :is-create="false"
    :old-post="oldPost"
    :post-id="postId"
  />
</template>
<script lang="ts" setup>
import CreateUpdate from './CreateUpdate.vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';

const { state: { post: { value: oldPost } } } = useStore()
const { params: { id: postId } } = useRoute();

</script>
