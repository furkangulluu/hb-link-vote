<template>
  <div class="max-w-xl rounded overflow-hidden mx-auto my-6">
    <div v-if="links.length > 0">
      <select v-model="sortBy" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 mb-4 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option value="most">Highest</option>
        <option value="less">Lowest</option>
      </select>
      <LinkItem v-for="(link, key) in sort(links)" :key="key" :link="link" />
    </div>
    <div v-else class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
      <div class="flex">
        <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        <div>
          <p class="font-bold">No links found!</p>
        </div>
      </div>
    </div>
    <div class="max-w-xl mx-auto my-12">
      <Pagination 
        :total-pages="totalPages" 
        :total="total" 
        :per-page="perPage" 
        :current-page="currentPage"
        :has-more-pages="hasMorePages" 
        @pagechanged="pageChanged">
      </Pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LinkItem from '@/components/LinkItem.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Links',
  components: {
    LinkItem,
    Pagination
  },
  data() {
    return {
      page: 1,
      totalPages: 1,
      total: 0,
      perPage: 5,
      currentPage: 1,
      hasMorePages: true,
      showLinks:[],
      first:0,
      last:5
    }
  },
  computed: {
    ...mapState({
      links: state => state.links
    }),
    sortBy: {
      get () { return this.$store.state.sortBy },
      set (value) { this.$store.commit('update_sorting', value) }
    }
  },
  methods: {
    sort(arr) {
      arr = arr.slice().sort((a, b) => {
        if (this.sortBy === 'most') {
          return b.points - a.points
        } else {
          return a.points - b.points
        }
      })
      return arr.slice(this.first,this.last)
    },
    showMore(page) {
      this.page = page;
      this.currentPage = page;
    },
    setPagination() {
      this.totalPages = Math.ceil(this.links.length/5)
      this.total = this.links.length
      this.showLinks = this.links.slice(this.first,this.last)
    },
    pageChanged(page) {
      this.page = page
      this.currentPage = page
      this.last = page * this.perPage
      this.first = this.last - this.perPage
      this.showLinks = this.links.slice(this.first,this.last)
    }
  },
  watch: {
    links : {
      immediate: true,
      handler: function() {
        this.setPagination()
      },
      deep: true
    },
  }
}
</script>
