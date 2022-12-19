<template>
  <div v-if="!postSt.load">
    <!-- Page Header Start -->
    <div class="container-fluid bg-primary py-5 mb-5">
      <div class="container py-5">
        <div class="row align-items-center py-4">
          <div class="col-md-6 text-center text-md-left">
            <h1 class="display-4 mb-4 mb-md-0 text-secondary text-uppercase">
              Post
            </h1>
          </div>
          <div class="col-md-6 text-center text-md-right">
            <div class="d-inline-flex align-items-center">
              <a class="btn btn-sm btn-outline-light" href="">Home</a>
              <i class="fas fa-angle-double-right text-light mx-2"></i>
              <a class="btn btn-sm btn-outline-light disabled" href="">{{ "Detail" }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Page Header End -->

    <!-- Detail Start -->
    <div class="container-fluid py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="mb-5">
              <div class="d-sm-flex mb-2 justify-content-between">
                <div class="d-flex mb-4 mb-sm-0">
                  <!-- <a class="text-secondary text-uppercase font-weight-medium" href="">Admin</a>
                  <span class="text-primary px-2">|</span>
                  <a class="text-secondary text-uppercase font-weight-medium" href="">Cleaning</a>
                  <span class="text-primary px-2">|</span> -->
                  <a class="text-secondary text-uppercase font-weight-medium" href="">{{ postSt.value?.created_at }}</a>
                </div>
                <div v-if="access() || isAdmin()" class="d-flex justify-content-between mb-4 mb-sm-0">
                  <router-link @click="handleUpdate"
                    :to="isAdmin() ? `/blog/update/${postSt.value?.id}` : '/confirm-password'"
                    class="btn btn-sm btn-warning mr-2">
                    Update
                  </router-link>
                  <router-link @click="handleDelete"
                    :to="isAdmin() ? `/blog/delete/${postSt.value?.id}` : '/confirm-password'"
                    class="btn btn-sm btn-danger mr-2">
                    Delete
                  </router-link>
                </div>
              </div>
              <h1 class="mb-5">
                {{ postSt.value?.title }}
              </h1>
              <h4 class="mt-5 text-danger text-center p-2 bg-warning d-inline border-2 rounded">
                {{ postSt.value?.category.name }}
              </h4>
            </div>
            <div class="mb-5">
              <img v-if="postSt.value?.public_photo" class="img-fluid rounded w-100 mb-4"
                :src="postSt.value?.public_photo" alt="Image" />
              <img v-if="!postSt.value?.public_photo" class="img-fluid rounded w-100 mb-4" src="../../img/blog-1.jpg"
                alt="Image" />
              <p>
                {{ postSt.value?.content }}
              </p>
            </div>

            <div class="mb-5">
              <h3 class="mb-4 section-title">{{ comments.count }} Comments</h3>
              <div v-for="comment in comments.value" :key="comment.id" class="media mb-4">
                <img v-if="!comment.user.avatar" src="../../img/user1.webp" alt="Image"
                  class="img-fluid rounded-circle mr-3 mt-1" style="width: 45px" />
                <img v-if="comment.user.avatar" :src="comment.user.avatar" alt="Image"
                  class="img-fluid rounded-circle mr-3 mt-1" style="width: 45px" />
                <div class="media-body">
                  <h6>
                    {{ comment.user.username }} <small><i>{{ comment.created_at }}</i></small>
                  </h6>
                  <p>
                  <div class="" >
                    {{ comment.body }}
                  </div>
                  </p>
                  <!-- <button class="btn btn-sm btn-light">Reply</button> -->
                </div>
              </div>
            </div>
            <div v-if="user" class="bg-light rounded p-3 p-sm-5">
              <h3 class="mb-4 section-title">Leave a comment</h3>
              <form @submit.prevent="handleSubmitCommit">
                <div class="form-group">
                  <label for="message">Message *</label>
                  <textarea v-model="commitBody" id="message" cols="30" rows="5" class="form-control"></textarea>
                </div>
                <div class="form-group mb-0">
                  <input :disabled="commitBody === ''" type="submit" value="Leave Comment" class="btn btn-primary" />
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-4 mt-5 mt-lg-0">
            <div class=" d-flex flex-column text-center bg-secondary rounded mb-5 py-5 px-4">
              <img v-if="postSt.value?.user.avatar" :src="postSt.value?.user.avatar"
                class="img-fluid rounded-circle mx-auto mb-3" style="width: 100px" />
              <img v-if="!postSt.value?.user.avatar" src="../../img/user1.webp"
                class="img-fluid rounded-circle mx-auto mb-3" style="width: 100px" />
              <h3 class="text-white mb-3">
                {{ postSt.value?.user.username }}
              </h3>
              <p class="text-white m-0">
                {{ postSt.value?.user.info }}
              </p>
            </div>
            <div class="mb-5">
              <div class="w-100">
                <div class="input-group">
                  <input type="text" class="form-control" style="padding: 25px" placeholder="Keyword" />
                  <div class="input-group-append">
                    <button class="btn btn-primary px-4">Search</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-5">
              <h3 class="mb-4 section-title">Categories</h3>
              <ul class="list-inline m-0">
                <li v-for="{ name, id, post_count } in categories.value" :key="id" class="mb-1 py-2 px-3 bg-light d-flex
                  justify-content-between
                  align-items-center
                ">
                  <a class="text-dark" href="#">
                    <i class="fa fa-angle-right text-secondary mr-2"></i>
                    {{ name }}
                  </a>
                  <span class="badge badge-primary badge-pill">{{ post_count }}</span>
                </li>
              </ul>
            </div>
            <div class="mb-5">
              <img src="../../img/blog-1.jpg" alt="" class="img-fluid rounded" />
            </div>
            <div class="mb-5">
              <h3 class="mb-4 section-title">Recent Post</h3>
              <div v-for="lpost in latestPostsSt.value" :key="lpost.id"
                class="d-flex align-items-center border-bottom mb-3 pb-3">
                <img class="img-fluid rounded" :src="lpost.public_photo"
                  style="width: 80px; height: 80px; object-fit: cover" alt="" />
                <div class="d-flex flex-column pl-3">
                  <a class="text-dark mb-2" href="">{{ lpost.title }}</a>
                  <div class="d-flex">
                    <small><a class="text-secondary text-uppercase font-weight-medium" href="">Admin</a></small>
                    <small class="text-primary px-2">|</small>
                    <small><a class="text-secondary text-uppercase font-weight-medium" href="">Cleaning</a></small>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-5">
              <img src="../../img/blog-2.jpg" alt="" class="img-fluid rounded" />
            </div>
            <div class="mb-5">
              <h3 class="mb-4 section-title">Tag Cloud</h3>
              <div class="d-flex flex-wrap m-n1">
                <a href="" v-for="{ id, tag_name } in postSt.value?.tags" :key="id"
                  class="btn btn-outline-secondary m-1">
                  {{ tag_name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div v-if="postSt.load">
      <!-- Detail End -->
      Post is loading...
    </div>
    <div v-if="latestPostsSt.load">
      <!-- Detail End -->
      Latest posts are loading...
    </div>
    <div v-if="postSt.error">
      {{ postSt.error }}
    </div>
    <div v-if="latestPostsSt.error">
      {{ latestPostsSt.error }}
    </div>
    <div v-if="comments.error">
      {{ comments.error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import {
  useStore,
  postActionsCons,
  commentActionsCons,
  categoryActionsCons,
  authMutationCons,
  ax
} from '@/store';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();
const id = Number(route.params.id);

const postSt = computed(() => store.state.post);
const latestPostsSt = computed(() => store.state.latest_posts);
const comments = computed(() => store.state.comments);
const categories = computed(() => store.state.categories);
const user = computed(() => store.state.auth.value?.user)

const commitBody = ref('')

const handleSubmitCommit = () => {
  const commit = new FormData()
  commit.append("post_id", String(postSt.value.value?.id))
  commit.append("body", commitBody.value)
  ax.post(`/comments`, commit)
    .then(res => {
      store.dispatch(commentActionsCons.GET_COMMENTS, postSt.value.value?.id);
      commitBody.value = '';
    })
    .catch(err => {
      alert(err.message)
    })
}
const isAdmin = () => {
  if (user.value) {
    return user.value.roles.some(item => item.role_name === "admin")
  }
  return false;
}

const access = () => {
  if (user.value && postSt.value.value) {
    return postSt.value.value.user_id === user.value.id;
  }
  return false;
}

const handleUpdate = () => {
  if (!isAdmin()) {
    store.commit(authMutationCons.CONFIRM_PASSWORD,
      `/blog/update/${postSt.value.value?.id}`)
  }
}

const handleDelete = () => {
  if (!isAdmin()) {
    store.commit(authMutationCons.CONFIRM_PASSWORD,
      `/blog/delete/${postSt.value.value?.id}`)
  }
}

onMounted(() => {
  store.dispatch(postActionsCons.GET_POST, id);
  store.dispatch(postActionsCons.GET_LATEST_POSTS, id);
  store.dispatch(commentActionsCons.GET_COMMENTS, id);
  store.dispatch(categoryActionsCons.GET_CATEGORIES);
})
</script>