<template>
  <div id="app" class="App min-w-screen min-h-screen flex flex-col bg-grey-lightest font-sans">
    <Header />
    <div class="container mx-auto px-4">
      <Navbar />
      <Links v-if="!submitClicked" />
      <Create v-else />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/Header.vue'
import Navbar from '@/components/Navbar.vue'
import Create from '@/components/Create.vue'
import Links from '@/components/Links.vue'

export default {
  name: 'App',
  components: {
    Header,
    Navbar,
    Links,
    Create
  },
  computed:
    mapState({
      submitClicked: state => state.submitClicked,
      links: state => state.links
    })
}
</script>
