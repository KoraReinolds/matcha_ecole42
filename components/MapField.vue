<template lang="pug">

  InputWrapper
    template(v-slot:title)
      div(
        :class="$style.title"
      ) {{ title }}

    template(
      v-if="realLocation"
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
          hint-content="You"
          cluster-name="1"
        )
        Button(
          v-if="value"
          :class="$style.curCoord"
          @click="$emit('change', null)"
        ) Set my curent place
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
  }),
  props: {
    title: String,
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
      this.$emit('change', { x: coords[0], y: coords[1] })
    }
  },
  mounted() {
  }
};
</script>

<style module lang="scss">

  @import '@/assets/css/skeleton-animation.scss';
  @import '@/assets/css/title.scss';

  .skeleton {
    @include skeleton-mixin();
    width: 100%;
    height: 500px;
  }

  .title {
    @include titleMixin()
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
