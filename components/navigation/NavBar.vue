<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <nuxt-link to="/" exact tag="span" style="cursor: pointer">
        MY IMDB APP2
      </nuxt-link>
      <!-- <router-link
        to="/"
        tag="span"
        style="cursor: pointer"
      >
        MY IMDB APP2
      </router-link> -->
    </v-toolbar-title>
    <v-spacer />
    <v-flex xs12 sm6 md3>
      <v-text-field
        v-model="searchString"
        label="Movie Name"
        v-on:keyup.enter="searchMovie"
      />
    </v-flex>
    <v-btn
      :disabled="!dataAvailable"
      @click="searchMovie"
      text
    >
      Search
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      searchString: ''
    }
  },
  computed: {
    dataAvailable () {
      return this.searchString !== null && this.searchString !== ''
    }
  },
  methods: {
    searchMovie () {
      this.$router.push('/search/' + this.searchString)
      this.searchString = ''
    }
  }
}
</script>
