<template lang="pug">

  InputWrapper(
    :class="{ [$style.error]: data.errorMsg }"
    :error="data.errorMsg"
  )
    template(v-slot:title)
      div.title.left {{ data.title }}
    div(:class="$style.content")
      div(:class="$style.images")
        label(
          :class="[$style.image, $style.add]"
          v-if="value && value.length < 5"
          for="file"
        )
          font-awesome-icon.fa-2x(
            :class="$style.choose_file"
            icon="plus"
          )
          input(
            :class="$style.inputfile"
            type="file"
            id="file"
            @change="loadImage($event.target.files)"
          )
        div(
          :class="$style.image"
          v-for="(img, index) in value"
          :key="'img'+img.index"
        )
          font-awesome-icon.fa-2x(
            :class="$style.delete_mark"
            icon="times-circle"
            @click="deleteImg(img)"
          )
          CustomImage(
            :src="img.src"
            :key="'user_image'+img.index"
            @click="setAsMainImg(img)"
          )
          font-awesome-icon.fa-2x(
            :class="[$style.icon, $style.main_mark]"
            v-if="img.avatar"
            icon="check"
          )

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import CustomImage from '@/components/CustomImage.vue'
import InputWrapper from '@/components/InputWrapper.vue'

export default {
  name: 'imagesFielld',
  components: {
    CustomImage,
    InputWrapper,
  },
  data: () => ({
  }),
  props: {
    data: Object,
    value: Array,
  },
  methods: {
    ...mapMutations({
    }),
    ...mapActions({
      loadImage: 'forms/LOAD_IMAGE',
    }),
    deleteImg(img) {
      let newImages = this.value
        .filter(val => val !== img) // удаляем изображение
        .map((val, index) => ({ ...val, index })) // сохраняем порядок для сервера
      if (img.avatar && newImages.length) {
        newImages[0].avatar = true // если удалили аватар устанавливаем первое изображение в качестве аватара
      }
      this.$emit('input', newImages)
    },
    setAsMainImg(img) {
      this.$emit('input', this.value.map(val => ({ ...val, avatar: img === val })))
    },
  },
  mounted() {
  },
};
</script>

<style module lang="scss">

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
  .error {
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

</style>
