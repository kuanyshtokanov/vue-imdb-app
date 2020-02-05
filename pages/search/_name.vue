<template>
  <v-container>
    <v-container v-if="loading">
      <Progress showWait="Prepare for AWESOME MOVIES SEARCH!" />
    </v-container>

    <v-container v-else grid-list-xl style="padding-top: 60px">
      <v-layout wrap>
        <v-flex v-for="(item, index) in moviesList" :key="index" xs4 mb-2>
          <v-card>
            <v-img :src="item.show.image ? item.show.image.medium : ''" aspect-ratio="1" />
            <v-card-title primary-title>
              <div>
                <h2>{{ item.Title }}</h2>
                <div>Year: {{ item.show.premiered }}</div>
                <div>Type: {{ item.show.type }}</div>
                <div>IMDB-id: {{ item.imdbID }}</div>
              </div>
            </v-card-title>

            <v-card-actions class="justify-center">
              <v-btn @click="singleMovie(item.show.id)" text color="green">
                View
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import mazeApi from '@/middleware/MazeApi'
import Progress from '~/components/progressComponents/Progress'

export default {
  components: {
    Progress
  },
  data () {
    return {
      movieName: this.$route.params.name,
      moviesList: [],
      loading: true
    }
  },
  mounted () {
    mazeApi
      .fetchMoviesByName(this.$route.params.name)
      .then((response) => {
        this.moviesList = response
        this.loading = false
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    singleMovie (id) {
      this.$router.push('/movies/' + id)
    }
  }
}
</script>

<style lang='stylus' scoped>
.v-progress-circular {
  margin: 12rem;
}
</style>
