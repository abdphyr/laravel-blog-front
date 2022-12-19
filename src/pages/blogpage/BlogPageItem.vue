<template>
  <div v-for="post in posts" :key="post.id" class="col-lg-4 col-md-6 mb-5">
    <div class="position-relative mb-4">
      <img v-if="post.public_photo" class="img-fluid rounded w-100" :src="post.public_photo" alt="" />
      <img v-if="!post.public_photo" class="img-fluid rounded w-100" src="../../img/blog-1.jpg" alt="" />
      <div class="blog-date">
        <h4 class="font-weight-bold mb-n1">01</h4>
        <small class="text-white text-uppercase">Jan</small>
      </div>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <div class="d-flex mb-2">
        <a class="text-secondary text-uppercase font-weight-medium" href="">Admin</a>
        <span class="text-primary px-2">|</span>
        <a class="text-secondary text-uppercase font-weight-medium" href="">Cleaning</a>
      </div>
      <div class="rounded-1 p-1 bg-success text-white">
        {{ post.category_name }}
      </div>
    </div>
    <h5 class="font-weight-medium mb-2">{{ post.title }}</h5>
    <p class="mb-4">
      {{ post.short_content }}
    </p>
    <router-link exact :to="(`/blog/${post.id}`)" class="btn btn-sm btn-primary py-2" href="">Read More</router-link>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { IPost } from "@/store";
const { posts } = defineProps<{ posts: IPost[] }>()
</script>