<template lang="pug">

  div(
    v-if="user"
    :class="$style.user"
  )
    div(
      :class="$style.img_container"
    )
      CustomImage(
        height="96px"
        width="96px"
        rounded
        :src="user.src"
      )
      RoundedIcon(
        :class="$style.gender"
        :icon="['male', 'female', 'bisexual'][user.gender - 1]"
        :mask="mobile"
        :size="6"
      )
    div(
      :class="$style.info_container"
    )
      div(
        :class="$style.info_line"
      )
        font-awesome-icon.fa-2x(
          v-if="action"
          :class="[$style.icon, `${action}_color`, action]"
          :icon="icons[action]"
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
import CustomImage from '@/components/CustomImage.vue'
import iconsMixin from '@/mixins/iconMixin'

export default {
  name: 'userShort',
  data: () => ({
    action: '',
  }),
  props: {
    user: Object,
    time: String,
  },
  components: {
    RoundedIcon,
    CustomImage,
    NameLink,
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
    }),
    ...mapActions({
    }),
  },
  mounted() {
    this.action = {
      LIKE: 'like',
      PROFILE_LOAD: 'visit',
      CONNECTED: 'connected',
      SEND_MESSAGE: 'messages',
      DISCONNECTED: 'dislike',
    }[this.user.type]
  },
};
</script>

<style module lang="scss">

@mixin userMixin(
  $gender-display: none,
) {

  .user {
    height: 96px;
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    .img_container {
      display: flex;
      position: relative;
      margin-right: 15px;
      .gender {
        display: $gender-display;
        position: relative;
        z-index: 1;
        opacity: 0.7;
        right: 15px;
      }
    }
    .info_container {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
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
  }

}

@include userMixin(
  $gender-display: block,
);

@media (max-width: 600px) {
  @include userMixin(
  );
}

</style>
