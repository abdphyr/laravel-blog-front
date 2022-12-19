<template>
  <div v-if="(!postsSt.load && !postsSt.error)">
    <!-- Page Header Start -->
    <div class="container-fluid bg-primary py-5 mb-5">
      <div class="container py-5">
        <div class="row align-items-center py-4">
          <div class="col-md-6 text-center text-md-left">
            <h1 class="display-4 mb-4 mb-md-0 text-secondary text-uppercase">
              Blog
            </h1>
          </div>
          <div class="col-md-6 text-center text-md-right">
            <div class="d-inline-flex align-items-center">
              <a class="btn btn-sm btn-outline-light" href="">Home</a>
              <i class="fas fa-angle-double-right text-light mx-2"></i>
              <a class="btn btn-sm btn-outline-light disabled" href="">Blog</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Page Header End -->

    <!-- Blog Start -->
    <div class="container-fluid py-5">
      <div class="container">
        <div class="row align-items-end mb-4">
          <div class="col-lg-6">
            <h6 class="text-secondary font-weight-semi-bold text-uppercase mb-3">
              Latest Blog
            </h6>
            <h1 class="section-title mb-3">Latest Articles From Our Blog Post</h1>
          </div>
          <div class="col-lg-6">
            <h4 class="font-weight-normal text-muted mb-3">
              Eirmod kasd duo eos et magna, diam dolore stet sea clita sit ea erat
              lorem. Ipsum eos ipsum magna lorem stet
            </h4>
          </div>
        </div>
        <div class="row">
          <BlogPageItem :posts="postsSt.value.data" />
          <div class="col-12">
            <nav aria-label="Page navigation">
              <ul class="pagination pagination-lg justify-content-center mb-0">
                <li :class="`page-item ${postsSt.value.meta.current_page === 1 ? 'disabled' : ''}`">
                  <a @click="getData(page - 1)" class="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <ul class="pagination pagination-lg justify-content-center mb-0">
                  <li v-for="pg in postsSt.value.meta.last_page" :key="pg" @click="getData(pg)"
                    :class="`page-item ${pg === page ? 'active' : ''}`">
                    <a class="page-link">{{ pg }}</a>
                  </li>
                </ul>
                <li :class="`page-item ${postsSt.value.meta.current_page === postsSt.value.meta.last_page ? 'disabled' : ''}`">
                  <a @click="getData(page + 1)" class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- Blog End -->
  </div>
  <div class="container">
    <div v-if="postsSt.load">
      Looading...
    </div>
    <div v-if="postsSt.error">
      {{ postsSt.error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useStore, postActionsCons, notifActionsCons } from '@/store';
import BlogPageItem from './BlogPageItem.vue';

const store = useStore();
const user = computed(() => store.state.auth.value?.user);
const postsSt = computed(() => store.state.posts);
const page = ref(1);

onMounted(() => {
  store.dispatch(postActionsCons.GET_POSTS, page.value);
  if (user.value) {
    store.dispatch(notifActionsCons.GET_NOTIFS);
  }
})

const getData = (pg: number) => {
  page.value = pg;
  store.dispatch(postActionsCons.GET_POSTS, page.value);
}
</script>