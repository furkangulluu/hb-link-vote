<template>
  <div class="md:flex border-b py-4 relative" @mouseleave="isMouseOver = false" @mouseover="isMouseOver = true" >
    <div class="md:flex flex-row w-full">
      <div class="md:flex border rounded-full px-4 flex-col items-center bg-gray-200 py-4">
        <p class="uppercase text-red-500 text-4xl font-bold">{{ link.points }}</p>
        <p class="text-gray-600 font-bold">POINTS</p>
      </div>
      <div class="md:flex px-4 py-4 flex-col justify-between w-full">
        <p class="text-black font-bold">{{ link.name }}</p>
        <a :href="link.url" target="_blank" class="text-gray-500">{{ link.url }}</a>
      </div>
      <div class="md:flex py-4 flex-col justify-between w-48">
        <span class="text-gray-600 cursor-pointer text-green-600 hover:bg-green-100 px-2" @click="up(link)">
          <svg height="20" width="20" class="inline-flex align-top" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;" xml:space="preserve"><g><polygon points="128,48.907 0,176.907 30.187,207.093 128,109.28 225.813,207.093 256,176.907"/></g></svg>
          <span class="ml-2">Up</span>
        </span>
        <span class="text-gray-600 cursor-pointer text-red-600 flex-row hover:bg-red-100 px-2" @click="down(link)">
          <svg height="20" width="20" class="inline-flex" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;" xml:space="preserve"><g><polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093"/></g></svg>
          <span class="ml-2">Down</span>
        </span>
      </div>
      <div class="md:flex py-4 flex-col justify-between w-12">
        <button v-if="isMouseOver" class="h-full bg-red-500 hover:bg-red-700 text-white font-bold rounded" @click="deleteLink(link)">x</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LinkItem',
  props: {
    link: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      isMouseOver: false
    }
  },
  computed:
    mapState({
      links: state => state.links
    }),
  methods: {
    up(link) {
      this.$store.commit('upVote', link)
    },
    down(link) {
      this.$store.commit('downVote', link)
    },
    deleteLink(link) {
      this.$store.commit('deleteLink', link)
    }
  }
}
</script>
