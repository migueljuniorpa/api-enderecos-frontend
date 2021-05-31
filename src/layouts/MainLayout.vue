<template>
  <q-layout view="lHh Lpr lff"  class="shadow-2 rounded-borders fullscreen" container>
    <q-header class="bg-white" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <span class="text-black text-weight-bold">Revenda</span><span class="text-negative">Mais</span>
        </q-toolbar-title>
        <q-btn icon="menu" color="blue-5" @click="drawer = !drawer" flat round dense />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="250"
      :breakpoint="400"
      show-if-above
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px;  border-right: 1px solid rgb(221, 221, 221);">
        <q-list padding>
          <q-item
            to="/"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="search" />
            </q-item-section>

            <q-item-section>
              Buscar
            </q-item-section>
          </q-item>

          <q-item
            to="/list"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>
              Listar
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top bg-blue-5" style="height: 150px; border-right: 1px solid rgb(221, 221, 221);">
        <div class="flex justify-center items-center full-width bg-blue-5">
          <q-avatar class="q-pa-none q-mr-none" size="60px">
            <img src="https://avatars.githubusercontent.com/u/8250298?v=4">
          </q-avatar>
        </div>

        <div class="absolute-bottom text-center bg-blue-5 text-black" style="">
            <span class="text-weight-bold text-white">Miguel Júnior</span>
            <q-separator color="blue-5" />
            <span class="text-white">@miguelzzitu</span>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  }
}
</script>
