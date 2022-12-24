<template>
  <!-- Header Start -->
  <div class="container-fluid position-sticky sticky-top">
    <div class="row">
      <div class="col-lg-3 bg-secondary d-none d-lg-block">
        <a href="" class="
            navbar-brand
            w-100
            h-100
            m-0
            p-0
            d-flex
            align-items-center
            justify-content-center
          ">
          <h1 class="m-0 display-3 text-primary">
            <router-link @click="(tab = 4)" to="/blog">
              Blog
            </router-link>
          </h1>
        </a>
      </div>
      <div class="col-lg-9 bg-white">
        <div class="row bg-dark d-none d-lg-flex">
          <div class="col-lg-7 text-left text-white">
            <div class="
                h-100
                d-inline-flex
                align-items-center
                border-right border-primary
                py-2
                px-3
              ">
              <i class="fa fa-envelope text-primary mr-2"></i>
              <small>abdphyr@gmail.com</small>
            </div>
            <div class="h-100 d-inline-flex align-items-center py-2 px-2">
              <i class="fa fa-phone-alt text-primary mr-2"></i>
              <small>+998 88 492 90 98</small>
            </div>
          </div>
          <div class="col-lg-5 text-right">
            <div class="d-inline-flex align-items-center pr-2">
              <a class="text-primary p-2" href="">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a class="text-primary p-2" href="">
                <i class="fab fa-twitter"></i>
              </a>
              <a class="text-primary p-2" href="">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a class="text-primary p-2" href="">
                <i class="fab fa-instagram"></i>
              </a>
              <a class="text-primary p-2" href="">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <nav class="navbar navbar-expand-lg bg-white navbar-light p-0">
          <a href="" class="navbar-brand d-block d-lg-none">
            <h1 class="m-0 display-4 text-primary">Blog</h1>
          </a>
          <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div class="navbar-nav mr-auto py-0">
              <router-link @click="(tab = 4)" :class="`nav-item nav-link` + (tab === 4 ? ' active' : '')"
                to="/blog">Blog</router-link>
              <router-link @click="(tab = 5)" :class="`nav-item nav-link` + (tab === 5 ? ' active' : '')"
                to="/contact">Contact</router-link>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <router-link v-if="user && notifCount > 0" to="/notifications" class="btn p-2 m-0 btn-success mr-2">
                <div class="position-relative">
                  <span class="position-absolute bg-danger d-flex 
                  justify-content-center align-items-center text-small"
                    style="right:0;top: 0px; width: 14px;height: 14px; font-size: 10px; border-radius: 50%;">
                    {{ notifCount }}
                  </span>
                  <notif-icon ></notif-icon>
                </div>
              </router-link>
              <router-link @click="handleOpenAuthPage" v-if="!user" to="/login"
                class="btn btn-primary mr-3 d-none d-lg-block">
                Login
              </router-link>
              <div v-if="user" class="d-flex justify-content-between align-items-center">
                <div :class="width > 991 ? 'dropleft' : 'dropbottom'">
                  <a href="" class="dropdown-toggle text-black mr-2" data-toggle="dropdown">{{ user.username }}</a>
                  <div class="dropdown-menu rounded-0 me-5">
                    <router-link to="/create/blog" @click="(tab = 10000)" class="dropdown-item">
                      Create blog post
                    </router-link>
                    <router-link @click="handleLogut" class="dropdown-item" to="/blog/1">
                      Log out
                    </router-link>  
                  </div>
                </div>
                <div class="ms-2">
                  <img v-if="!user.avatar" src="../img/user1.webp" class="rounded-circle shadow-4" style="width: 50px;"
                    alt="Avatar" />
                  <img v-if="user.avatar" :src="`${user.avatar}`" class="rounded-circle shadow-4" style="width: 50px;"
                    alt="Avatar" />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
  <!-- Header End -->
</template>

<script lang="ts" setup>
import NotifIcon from './NotifIcon.vue';
import { ref, computed, onMounted } from 'vue';
import { useStore, authActionsCons, authpagesMutCons, notifActionsCons } from '@/store';
import { useLink } from 'vue-router';

const link = useLink({
  to: "/blog"
})
const store = useStore()
const user = computed(() => store.state.auth.value?.user);
const notifCount = computed(() => store.state.notifications.count);
const tab = ref()

const handleOpenAuthPage = () => {
  store.commit(authpagesMutCons.OPEN_AUTH_PAGES, true)
}

const width = ref(992)
window.addEventListener("resize", () => {
  width.value = window.innerWidth
})

onMounted(() => {
  if (user.value) {
    store.dispatch(notifActionsCons.GET_NOTIFS)
  }
})

const handleLogut = () => {
  store.dispatch(authActionsCons.LOGOUT, link.navigate)
}
</script>