<template lang="pug">
  div.pagination.only_laptop(
      v-if="lastPage !== 1"
    )
    span.page.first(
      v-show="currentPage > 2"
      @click="getUsers(1)"
    ) {{ 1 }}
    span.page.prev(
      v-show="currentPage > 1"
      @click="getUsers(currentPage - 1)"
    ) {{ currentPage - 1 }}
    span.page.cur.active(
      v-show="users.length"
    ) {{ currentPage }}
    span.page.next(
      v-show="currentPage < lastPage"
      @click="getUsers(currentPage + 1)"
    ) {{ currentPage + 1 }}
    span.page.last(
      v-show="currentPage + 1 < lastPage"
      @click="getUsers(lastPage)"
    ) {{ lastPage }}
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  name: 'paginator',
  computed: {
    ...mapGetters({
      users: 'users/USERS',
      currentPage: 'users/CUR_PAGE',
      lastPage: 'users/LAST_PAGE',
    }),
  },
  methods: {
    ...mapActions({
      getUsers: 'users/GET_USERS',
    }),
  },
};
</script>

<style scoped lang="scss">
@media (min-width: map-get($grid-breakpoints, sm)) {
  .pagination {
    margin-top: 30px;
    height: 50px;
    width: 100%;
    .page {
      font-size: 20px;
      margin-right: 5px;
      color: #fff;
      display: inline-block;
      border-radius: 5px;
      line-height: 50px;
      text-align: center;
      background-color: $main-color;
      width: 50px;
      height: 50px;
      cursor: pointer;
      &.active {
        cursor: default;
      }
    }
    .cur {
      background-color: rgba($color: $main-color, $alpha: 0.5);
    }
  }
}
</style>
