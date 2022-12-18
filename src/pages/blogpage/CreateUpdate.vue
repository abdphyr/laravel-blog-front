<template>
  <div class="container mt-5">
    <div v-if="request.isLoading">
      {{ isCreate ? "Creating ..." : "Updating ..." }}
    </div>
    <div v-if="request.error">
      <h2>{{ request.error }}</h2>
      <button @click="retryCreatePost" class="btn btn-warning">Qayta urinish</button>
    </div>
    <div v-if="!request.error && !request.isLoading">
      <div class="mb-3">
        <h1 class="text-center">{{ isCreate ? "Create post" : "Update post" }}</h1>
      </div>
      <div class="contact-form">
        <div id="success"></div>
        <form @submit.prevent="handleSubmit" id="contactForm" novalidate :accept="['image/*']">
          <div class="control-group">
            <input v-model="post.title" type="text" class="form-control p-4" id="name" placeholder="Post title" required
              data-validation-required-message="Please enter title" />
            <p class="help-block text-danger"><span v-if="request.validate.title">Sarlavha kiritish majburiy</span></p>
          </div>

          <div v-if="isCreate" class="control-group">
            <select v-model="category_id" class="form-select">
              <option v-for="{ name, id } in categories.value" class="" :value="id" :key="id">
                {{ name }}
              </option>
            </select>
            <p></p>
          </div>

          <div v-if="isCreate" class="control-group">
            <select v-model="post_tags" class="form-select" multiple>
              <option v-for="{ tag_name, id } in tags.value" class="" :value="id" :key="id">
                {{ tag_name }}
              </option>
            </select>
            <p></p>
          </div>

          <div class="control-group">
            <input v-model="post.short_content" type="text" class="form-control p-4" id="text"
              placeholder="Post short content" required
              data-validation-required-message="Please enter post short content" />
            <p class="help-block text-danger"><span v-if="request.validate.short_content">Qisqa kontent kiritish
                majburiy</span></p>
          </div>

          <div class="control-group">
            <label :class="`btn border ${post.photo ? 'btn-success' : ''}`" for="photo">
              {{ post.photo ? "Uploaded" : "Upload photo" }}
            </label>
            <input @change="onFileChange($event)" type="file" class="d-none" id="photo" placeholder="photo" required
              data-validation-required-message="Please enter a photo" />
            <p class="help-block text-danger"><span v-if="request.validate.photo.type">Rasm turidagi fayl kiriting !</span></p>
            <p class="help-block text-danger"><span v-if="request.validate.photo.size">3 MB o'lchamdan kichik rasm
                kiriting !</span></p>
          </div>

          <div class="control-group">
            <textarea v-model="post.content" class="form-control p-4" rows="6" id="message" placeholder="Post content"
              required data-validation-required-message="Please enter post content"></textarea>
            <p class="help-block text-danger"><span v-if="request.validate.content">Kontent kiritish majburiy</span></p>
          </div>

          <div class="col-sm-4 offset-sm-4">
            <button class="btn btn-primary btn-block py-3 px-5" type="submit" id="sendMessageButton">
              {{ isCreate ? "Create post" : "Update post" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { defineProps } from 'vue';
import { useLink } from 'vue-router';
import { ax, notifActionsCons } from '@/store';
import { IPost, useStore } from '@/store';
import { categoryActionsCons, tagActionsCons } from '@/store';
import { formValidate } from './validateForm';

const store = useStore();
const categories = computed(() => store.state.categories)
const tags = computed(() => store.state.tags);

interface CreateUpdatePost {
  isCreate: boolean;
  oldPost?: IPost | null;
  postId?: string | string[]
}

const { isCreate, oldPost, postId } = defineProps<CreateUpdatePost>()

onMounted(() => {
  store.dispatch(categoryActionsCons.GET_CATEGORIES);
  store.dispatch(tagActionsCons.GET_TAGS);
})

const postData = new FormData();
const link = useLink({
  replace: true,
  to: isCreate ? "/blog" : `/blog/${postId}`
});

const post = reactive({
  title: (!isCreate && oldPost) ? oldPost.title : '',
  short_content: (!isCreate && oldPost) ? oldPost.short_content : '',
  photo: ref<Blob>(),
  content: (!isCreate && oldPost) ? oldPost.content : ''
})

const category_id = ref<number>(1);
const post_tags = ref<number[]>([])


const request = reactive({
  validate: {
    title: false,
    short_content: false,
    content: false,
    photo: {
      type: false,
      size: false
    }
  },
  isLoading: false,
  error: null
})


const retryCreatePost = () => {
  request.validate.title = false;
  request.validate.short_content = false;
  request.validate.content = false;
  request.error = null;
}

const onFileChange = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    post.photo = target.files[0];
  }
}


const handleSubmit = () => {
  if (!formValidate(post, request)) return;
  postData.append("title", post.title);
  postData.append("short_content", post.short_content);
  postData.append("content", post.content);
  if (post.photo) {
    postData.append("photo", post.photo);    
  }
  request.isLoading = true;
  if (isCreate) {
    postData.append("category_id", String(category_id.value))
    postData.append("tags", JSON.stringify(post_tags.value))
    ax.post("/posts", postData)
      .then((res) => {
        link.navigate();
        request.isLoading = false;
        store.dispatch(notifActionsCons.GET_NOTIFS);
      })
      .catch(err => {
        request.isLoading = false;
        request.error = err.message
      })
  } else {
    ax.put(`/posts/${postId}`, { ...post, photo: null })
      .then(() => {
        link.navigate();
        request.isLoading = false;
      })
      .catch(err => {
        request.isLoading = false;
        request.error = err.message
      })
  }
}
</script>
