<template>
  <div class="container px-5 d-flex justify-content-center mt-5">
    <div class="col-lg-8 ">
      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
        Confirm password
      </p>
      <div class="alert alert-danger" v-if="error">
        {{ error }}
      </div>
      <form @submit.prevent="handleConfirm" class="mx-1 mx-md-2">
        <div class="d-flex flex-row align-items-center mb-4">
          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
          <div class="form-outline flex-fill mb-0">
            <input v-model="password" placeholder="Your password" type="password" id="form3Example4c"
              class="form-control rounded-2" />
            <!-- <label class="form-label" for="form3Example4c">Password</label> -->
          </div>
        </div>
        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <button type="submit" class="btn btn-primary btn-md">
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore, authpagesMutCons, ax } from '@/store';
import { ref, computed, onUnmounted, onMounted } from 'vue';
import { useLink } from 'vue-router';

const store = useStore();
const link = useLink({
  to: computed(() => store.state.auth.conf_pass_succ_path) ?? '/'
})

const password = ref<string>();
const error = ref<string>();

const handleConfirm = () => {
  ax.post('/confirm-password', { password: password.value })
    .then(res => {
      link.navigate();
    })
    .catch(err => {
      error.value = "The provided password does\'nt match";
    })
}


onMounted(() => {
  store.commit(authpagesMutCons.OPEN_AUTH_PAGES, true);
})
onUnmounted(() => {
  store.commit(authpagesMutCons.OPEN_AUTH_PAGES, false);
})
</script>