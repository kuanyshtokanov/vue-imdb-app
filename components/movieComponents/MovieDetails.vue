<template>
  <v-card>
    <v-img :src="movieData.image.original" max-height="600" aspect-ratio="1" contain />
    <v-card-title primary-title>
      <div>
        <h2 class="headline mb-0">
          {{ movieData.name + ' ' }}-{{ ' ' + movieData.premiered }}
        </h2>
        <p v-html="movieData.summary" />
        <h3>Actors:</h3>
        <v-btn
          v-for="(actor, index) in castList"
          :key="index"
          @click="openDialog(actor)"
          text
        >
          {{ actor.person.name + ', ' }}
        </v-btn>
        <h4>Rating:</h4>
        {{ movieData.rating.average }}
        <h4>Genre:</h4>
        <p>{{ genres }}</p>
        <h5>Official site:</h5>
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
