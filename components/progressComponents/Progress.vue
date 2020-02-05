<template>
  <div class="text-xs-center">
    <v-progress-circular
      :size="150"
      :width="8"
      indeterminate
      value="waitText"
      color="green"
    >
      {{ waitText }}
    </v-progress-circular>
  </div>
</template>
<script>
export default {
  props: ['showWait'],
  data () {
    return {
      waitText: this.showWait
    }
  }
}
</script>
