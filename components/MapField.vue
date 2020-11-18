<template lang="pug">
  div.map-field(
    v-if="showMap && (location || value)"
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
      div.btn.curCoord(
        v-if="value"
        @click="$emit('input', '');"
      ) set my curent place
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'MapField',
  data: () => ({
    showMap: false,
  }),
  props: {
    data: Object,
    value: [Object, String],
    location: Object,
  },
  components: {
  },
  computed: {
    ...mapGetters({
    }),
    mark: function() {
      let loc = this.value || this.location;
      return [loc.x, loc.y];
    },
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
    position: relative;
    padding: 10px 0;
    width: 100%;
    height: 500px;
    .curCoord {
      position: absolute;
      top: 20px;
      left: 10px;
    }
  }
}
</style>
