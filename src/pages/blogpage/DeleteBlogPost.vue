<template>
  <div class="container px-5 d-flex justify-content-center mt-5">
    <div class="col-lg-8 ">
      <p class="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
        Are you sure ?
      </p>
      <div class="d-flex justify-content-around">
        <button @click="handleDelete"  class="btn btn-danger btn-md">
          Delete
        </button>
        <router-link :to="`/blog/${postId}`" class="btn btn-outline-warning btn-md">
          Cancel
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ax, useStore } from '@/store';
import { computed } from 'vue';
import { useLink } from 'vue-router';

const store = useStore();
const postId = computed(() => store.state.post.value?.id)

const link = useLink({
  to: '/blog'
})


const handleDelete = () => {
  ax.delete(`/posts/${postId.value}`)
    .then(() => {
      link.navigate()
    })
    .catch((err) => {
      alert(err.message)
    })
}
</script>