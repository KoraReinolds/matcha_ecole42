<template lang="pug">

  InputWrapper
    template(v-slot:title)
      div.title.left {{ data.title }}
    template(
      v-if="showMap && (realLocation)"
    )
      yandex-map(
        :class="$style.map"
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
        //- Button(
        //-   v-if="value"
        //-   :class="$style.curCoord"
        //-   @click="$emit('input', null);"
        //- ) Set my curent place
    div(
      :class="$style.skeleton"
      v-else
    )

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import InputWrapper from '@/components/InputWrapper.vue'
import Button from '@/components/Button.vue'

export default {
  name: 'MapField',
  data: () => ({
    showMap: false,
  }),
  props: {
    data: Object,
    value: [Object, String],
    realLocation: Object,
  },
  components: {
    InputWrapper,
    Button,
  },
  computed: {
    ...mapGetters({
    }),
    mark: function() {
      let loc = this.value || this.realLocation
      return [loc.x, loc.y]
    },
  },
  methods: {
    getCoord(e) {
      let coords = e.get('coords')
      this.$emit('input', { x: coords[0], y: coords[1] })
    }
  },
  mounted() {
    this.showMap = true
  }
};
</script>

<style module lang="scss">

  @import '@/assets/css/skeleton-animation.scss';

  .skeleton {
    @include skeleton-mixin();
    width: 100%;
    height: 500px;
  }

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
</style>
