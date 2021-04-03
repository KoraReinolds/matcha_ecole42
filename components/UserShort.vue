<template lang="pug">

  div(
    v-if="user"
    :class="$style.user"
  )
    div(
      :class="$style.img_container"
    )
      CustomImage(
        :class="$style.image"
        :images="user.images"
        rounded
      )
      RoundedIcon(
        :class="[$style.gender, $style[`${user.gender}_color`]]"
        :name="user.gender"
        :size="24"
      )
      Icon(
        :class="[$style.gender_mobile]"
        :name="user.gender"
        :size="24"
        :mask="true"
      )
    div(
      :class="$style.info_container"
    )
      div(
        :class="$style.info_line"
      )
        Icon(
          v-if="type"
          :class="[$style.icon, $style[`${type}_color`]]"
          :name="type"
        )
        NameLink(
          :user="user"
        )
      span(
        :class="$style.time"
      ) {{ getDate(time) }}

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import NameLink from '@/components/NameLink.vue'
import RoundedIcon from '@/components/RoundedIcon.vue'
import Icon from '@/components/Icon.vue'
import CustomImage from '@/components/CustomImage.vue'

export default {
  name: 'userShort',
  data: () => ({
  }),
  props: {
    user: Object,
    type: String,
    time: String,
  },
  components: {
    RoundedIcon,
    Icon,
    CustomImage,
    NameLink,
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    getDate(time) {
      return new Date(time).toLocaleString('ru', {
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
      });
    },
    ...mapMutations({
    }),
    ...mapActions({
    }),
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

@import '@/assets/css/map-colors.scss';

@mixin userMixin(
  $gender-display: none,
  $gender-mobile-display: block,
) {

  .user {
    height: 96px;
    display: flex;
    width: 100%;
    &:not(.user:last-child) {
      margin-bottom: 20px;
    }
  }

  .img_container {
    display: flex;
    position: relative;
    margin-right: 15px;
  }

  .image {
    max-height: 96px;
    min-height: 96px;
    max-width: 96px;
    min-width: 96px;
  }

  .gender {
    display: $gender-display;
    position: relative;
    z-index: 1;
    opacity: 0.7;
    right: 15px;
  }

  .gender_mobile {
    display: $gender-mobile-display;
    position: absolute;
    color: white;
    opacity: 0.4;
  }

  .info_container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .info_line {
    display: flex;
    .icon {
      margin-right: 10px;
    }
  }

  .time {
    font-size: 0.8em;
    color: gray;
  }

}

@include userMixin(
  $gender-display: block,
  $gender-mobile-display: none,
);

@media (max-width: 600px) {
  @include userMixin(
  );
}

</style>
