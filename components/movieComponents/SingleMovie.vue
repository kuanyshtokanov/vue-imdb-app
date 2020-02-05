<template>
  <v-card>
    <v-img :src="singleMovie.image ? singleMovie.image.medium : ''" :height="imgHeight" :aspect-ratio="imgRatio" />
    <v-card-title primary-title>
      <div>
        <h2>{{ singleMovie.name }}</h2>
        <div>Year: {{ singleMovie.premiered }}</div>
        <div>Type: {{ singleMovie.type }}</div>
      </div>
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-btn @click="chooseMovie(singleMovie.id)" text color="green">View</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ['movie', 'height', 'ratio'],
  data () {
    return {
      singleMovie: this.movie,
      imgHeight: this.height,
      imgRatio: this.ratio
    }
  },
  methods: {
    chooseMovie (id) {
      this.$router.push('/movies/' + id)
    }
  },
  watch: {
    movie (val) {
      this.singleMovie = val
    },
    imgHeight (val) {
      this.imgHeight = val
    },
    imgRatio (val) {
      this.imgRatio = val
    }
  }
}
</script>
