<template>
  <hea-der v-if="!authpages"/>
  <router-view />
  <foo-ter v-if="!authpages"/>
</template>

<script lang="ts" setup>
import HeaDer from "./layouts/HeaDer.vue";
import FooTer from "./layouts/FooTer.vue";
import { computed, onMounted } from "vue";
import { useStore, authMutationCons, IAuth } from "./store";

const store = useStore();
const authpages = computed(() => store.state.authpages);

onMounted(() => {
  // localStorage.removeItem("auth")
  const auth = localStorage.getItem("auth");
  if (auth) {
    const parsedAuth = JSON.parse(auth) as IAuth;
    store.commit(authMutationCons.SET_AUTH, parsedAuth);
  } else {
    store.commit(authMutationCons.SET_AUTH, undefined);
  }
})
</script>