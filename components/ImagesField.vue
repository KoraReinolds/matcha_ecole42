<template lang="pug">
  div.image-field(:class="{ error: data.errorMsg }")
    div.title.left {{ data.title }}
    div.content
      div.images
        label.image.add(
          v-if="data.value.length < 5"
          for="file"
        )
          font-awesome-icon.fa-2x.choose_file(
            icon="plus"
          )
          input.inputfile(
            type="file"
            id="file"
            @change="processFile($event)"
          )
        div.image(
          v-for="img in data.value"
          :key="'img'+img.index"
        )
          font-awesome-icon.fa-2x.delete_mark(
            icon="times-circle"
            @click="deleteImg(img)"
          )
          CustomImage(
            :src="img.src"
            :key="'user_image'+img.index"
            @click="setAsMainImg(img.index)"
          )
          font-awesome-icon.icon.main_mark.fa-2x(
            v-if="data.main === img.index"
            icon="check"
          )
    div.tooltip-field {{ data.errorMsg }}
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import CustomImage from '@/components/CustomImage.vue';
import axios from 'axios';

export default {
  name: 'imagesFielld',
  components: {
    CustomImage,
  },
  data: () => ({
  }),
  props: {
    data: Object,
  },
  methods: {
    ...mapMutations({
      setMainImg: 'forms/SET_MAIN_IMAGE',
    }),
    ...mapActions({
      loadImage: 'forms/LOAD_IMAGE',
    }),
    deleteImg(img) {
      this.$emit('input', this.data.value.filter(val => val !== img));
      if (this.data.value.length) {
        if (img.index === this.data.main) this.setAsMainImg(this.data.value[0].index);
      } else this.setAsMainImg(-1);
    },
    setAsMainImg(index) {
      this.setMainImg(index);
    },
    processFile({ target: { files } }) {
      this.loadImage(files);
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.image-field {
  .content {
    padding: 10px 0 20px 0;
    .inputfile {
      width: 0px;
      height: 0px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }

    .images {
      display: flex;
      @media (max-width: 480px) {
        min-height: 130px;
        flex-wrap: wrap;
        margin: 20px 0;
      }
      .image {
        cursor: pointer;
        position: relative;
        @media (max-width: 480px) {
          width: 50%;
          padding: 5px;
          height: auto;
        }
        @media (min-width: 480px) {
          width: 200px;
          height: 300px;
          margin-right: 10px;
        }
        .img {
          width: 100%;
          height: 100%;
        }
        .delete_mark {
          cursor: pointer;
          color: $main-color;
          position: absolute;
          top: 10px;
          right: 10px;
        }
        .main_mark {
          color: $main-color;
          position: absolute;
          bottom: 10px;
          left: 10px;
        }
        &.add {
          border: 2px solid $main-color;
          padding-right: 0;
        }
      }
    }
    .choose_file {
      cursor: pointer;
      position:absolute;
      color: $main-color;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &.error {
    .images .image.add {
      border: 2px solid $error-color;
    }
    .tooltip-field,
    .choose_file {
      color: $error-color;
    }
    label:before {
      background: rgba($color: $error-color, $alpha: 0.75) !important;
    }
  }
}
</style>
