<template>
  <v-card>
    <v-img :src="movieData.image.original" max-height="600" aspect-ratio="1" contain />
    <v-card-title primary-title>
      <div>
        <h2 class="headline mb-0 grey--text">
          {{ movieData.name + ' ' }} {{ ' ' + movieData.premiered }}
        </h2>
        <p v-html="movieData.summary" />
        <div v-if="castList.length > 0">
          <h3  class="grey--text">Actors:</h3>
          <v-btn
            v-for="(actor, index) in castList"
            :key="index"
            @click="openDialog(actor)"
            text
            >
            {{ actor.person.name + ', ' }}
          </v-btn>
        </div>
        <div v-if="movieData.rating.average">
          <h4 class="grey--text">Rating:</h4>
          <p>{{ movieData.rating.average }}</p>
        </div>
        <div v-if="genres">
          <h4  class="grey--text">Genre:</h4>
          <p>{{ genres }}</p>
        </div>
        <h5  class="grey--text">Official site:</h5>
        <a v-bind:href="movieData.officialSite">
          <span>{{ movieData.officialSite }}</span>&#32;
        </a>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn @click="back" text color="green">
        back
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ['movie', 'cast', 'openDialog'],
  data () {
    return {
      movieData: this.movie,
      castList: this.cast
    }
  },
  computed: {
    genres () {
      return this.movieData.genres.join(', ')
    }
  },
  watch: {
    movie (val) {
      this.movieData = val
    },
    cast (val) {
      this.castList = val
    }
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  }
}
</script>
