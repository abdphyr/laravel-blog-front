<template>
  <div class="container p-5">
    <div class="d-flex flex-column flex-sm-row justify-content-between px-3">
      <h2 class="text-center">
        Notifications
      </h2>
      <div class="d-flex justify-content-between px-3 mb-3">
        <button @click="handleNotifReadAll" class="btn btn-sm btn-outline-primary rounded-1">
          Read all
        </button>
        <button @click="handleNotifDeleteAll" class="ms-2 btn btn-sm btn-outline-danger rounded-1">
          Delete all
        </button>
      </div>
    </div>
    <div v-for="notif in notifs" :key="notif.id" class="d-flex justify-content-between border rounded-2 p-1 p-sm-4 m-0 m-sm-3 mb-3">
      <div>
        <div class="mb-2">
          {{ notif.created_at }}
        </div>
        <div class="d-flex justify-content-between mb-2">
          <div class="font-weight-bold text-primary mb-2">
            <span class="text-black">Post title: </span>{{ notif.data.title }}
          </div>
        </div>
        <div>
          Post id: <strong>{{ notif.data.id }}</strong>
        </div>
        <div>
          <button v-if="notif.read_at === null" @click="handleAsRead(notif.id)" class="btn btn-primary btn-sm">
            Read
          </button>
        </div>
      </div>
      <div>
        <div v-if="notif.read_at === null" class="mb-5">
          <div class="position-relative">
            <div class="blog-date">
              <h4 class="font-weight-bold mb-n1">New</h4>
            </div>
          </div>
        </div>
        <button @click="handleNotifDelete(notif.id)" class="mt-5 btn btn-danger btn-sm">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ax, notifActionsCons, useStore } from '@/store';
import { computed } from 'vue';

const store = useStore()
const notifs = computed(() => store.state.notifications.notifications);


const handleNotifDeleteAll = () => {
  ax.delete(`/notifications/deleteall`)
    .then(res => {
      store.dispatch(notifActionsCons.GET_NOTIFS);
    })
    .catch(err => {
      alert(err.message)
    })
}

const handleNotifDelete = (id: string) => {
  ax.delete(`/notifications/${id}`)
    .then(res => {
      store.dispatch(notifActionsCons.GET_NOTIFS);
    })
    .catch(err => {
      alert(err.message)
    })
}

const handleAsRead = (id: string) => {
  ax.get(`/notifications/${id}/read`)
    .then(res => {
      store.dispatch(notifActionsCons.GET_NOTIFS);
    })
    .catch(err => {
      alert(err.message)
    })
}
const handleNotifReadAll = () => {
  ax.get(`/notifications/readall`)
    .then(res => {
      store.dispatch(notifActionsCons.GET_NOTIFS);
    })
    .catch(err => {
      alert(err.message)
    })
}
</script>
