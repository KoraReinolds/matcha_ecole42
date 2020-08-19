<template lang="pug">
  div.short-list
    UserShort(
      v-for="(userData, index) in notifList"
      :key="'notif'+index+userData.login"
      :user="userData.target"
      :action="userData.action"
      :time="userData.created"
    )
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import UserShort from '@/components/UserShort.vue';

export default {
  name: 'notif',
  components: {
    UserShort,
  },
  computed: {
    ...mapGetters({
      notifList: 'history/NOTIFICATIONS',
    }),
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      getNotifications: 'history/GET_NOTIFICATIONS',
    }),
  },
  mounted() {
    this.getNotifications();
  },
};
</script>
<style scoped lang="scss">

.short-list {
  padding: 50px 10px;
}

.list-enter-active {
  transition: all 0.5s;
  transition-delay: 0.5s;
}

.list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.list-move {
  transition: transform 0.5s;
}

</style>
