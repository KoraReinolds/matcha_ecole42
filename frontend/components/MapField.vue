<template lang="pug">
  div.map-field(
    v-if="showMap"
  )
    span.title.left {{ data.title }}
    yandex-map.map(
      :coords="mark"
      @click="getCoord"
      zoom="15"
      :cluster-options="{ 1: { clusterDisableClickZoom: true } }"
      :behaviors="['drag', 'scrollZoom']"
      :controls="[]"
    )
      ymap-marker(
        markerId="1"
        marker-type="placemark"
        :coords="mark"
        hint-content="Your markplace"
        :balloon="{header: 'header', body: 'body', footer: 'footer'}"
        cluster-name="1"
      )
</template>

<script>
export default {
  name: 'MapField',
  data: () => ({
    showMap: false,
  }),
  props: {
    data: Object,
  },
  components: {
    },
  computed: {
    mark: function() {
      return [this.data.value.x, this.data.value.y];
    }
  },
  methods: {
    getCoord(e) {
      let coords = e.get('coords');
      this.$emit('input', { x: coords[0], y: coords[1] });
    }
  },
  mounted() {
    this.showMap = true;
  }
};
</script>

<style scoped lang="scss">
.map-field {
  .map {
    padding: 10px 0;
    width: 100%;
    height: 500px;
  }
}
</style>
