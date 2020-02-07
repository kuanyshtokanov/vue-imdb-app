<template>
  <v-card :height="cardHeight">
    <div @click="chooseMovie(singleMovie.id)">
      <v-img :src="singleMovie.image ? singleMovie.image.medium : ''" :height="imgHeight" :aspect-ratio="imgRatio" contain style="cursor:pointer;" />
    </div>
    <v-card-title primary-title class="movie-card">
      <div>
        <h3 class="grey--text">{{ singleMovie.name }}</h3>
        <h3 class="grey--text">Rating:</h3>
        <span> {{ singleMovie.rating? singleMovie.rating.average : ' ' }}</span>
        <div class="grey--text">Year: </div>
        <span>{{ singleMovie.premiered }}</span>
        <div class="grey--text">Type: </div>
        <span>{{ singleMovie.type }}</span>
      </div>
    </v-card-title>
  </v-card>
</template>
<script>
export default {
  props: ['movie', 'height', 'ratio', 'heightCard'],
  data () {
    return {
      singleMovie: this.movie,
      imgHeight: this.height,
      imgRatio: this.ratio,
      cardHeight: this.heightCard ? this.heightCard : '550'
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
    },
    heightCard (val) {
      this.cardHeight = val
    }
  },
  methods: {
    chooseMovie (id) {
      this.$router.push('/movies/' + id)
    }
  }
}
</script>
<style lang='stylus' scoped>
.flexcard {
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
}
.v-card__title {
  font-size: 1rem
}
</style>
