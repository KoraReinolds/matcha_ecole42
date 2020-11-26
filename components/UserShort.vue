<template lang="pug">

  div.user(
    v-if="user"
  )
    div.img-container
      RoundedIcon.gender(
        :icon="['ban', 'bisexual', 'male', 'female'][user.gender]"
        :mask="mobile"
        :size="6"
      )
      span.image
        CustomImage(
          height="96px"
          width="96px"
          rounded
          :src="user.images"
        )
    div.info-container(
      :class="[$route.name]"
    )
      div.info-line
        font-awesome-icon.icon.fa-2x(
          :class="[`${action}_color`, action]"
          :icon="icons[action]"
        )
        NameLink(
          :user="user"
        )
      span.time {{ getDate(time) }}

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import NameLink from '@/components/NameLink.vue';
import RoundedIcon from '@/components/RoundedIcon.vue';
import CustomImage from '@/components/CustomImage.vue';
import ChatLink from '@/components/ChatLink.vue';
import Like from '@/components/Like.vue';
import iconsMixin from '@/mixins/iconMixin';

export default {
  name: 'userShort',
  props: {
    user: Object,
    time: String,
    action: String,
  },
  components: {
    RoundedIcon,
    CustomImage,
    NameLink,
    ChatLink,
    Like,
  },
  mixins: [iconsMixin],
  computed: {
    ...mapGetters({
      mobile: 'IS_MOBILE',
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
      like: 'users/LIKE',
    }),
    ...mapActions({
    }),
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">

.user {
  height: 96px;
  display: flex;
  max-width: 600px;
  width: 100%;
  margin-bottom: 12px;
  .img-container {
    position: relative;
    @media (max-width: map-get($grid-breakpoints, sm)) { min-width: 120px; };
    @media (min-width: map-get($grid-breakpoints, sm)) { width: 200px; };
    .gender {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      @media (max-width: map-get($grid-breakpoints, sm)) {
        opacity: 0.7;
        color: $font-color;
      };
    }
    .image {
      display: inline-block;
      position: relative;
      width: 96px;
      height: 96px;
      @media (min-width: map-get($grid-breakpoints, sm)) { left: 70px; };
    }
  }
  .info-container {
    position: relative;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .info-line {
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
}

</style>
