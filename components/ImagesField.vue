<template lang="pug">

  InputWrapper(
    :class="[$style.images_field, { [$style.error]: errorMsg }]"
    :error="errorMsg"
  )
    template(v-slot:title)
      div(
        :class="$style.title"
      ) {{ title }}

    div(:class="$style.images")
      div(
        :class="$style.image_box"
        v-for="(img, index) in value"
        :key="'img'+img.index"
      )
        CustomImage(
          :class="$style.image"
          :src="img.src"
          :key="'user_image'+img.index"
          @click="$emit('change', value.map(val => ({ ...val, avatar: img === val })))"
        )
        RoundedIcon(
          :class="$style.delete_mark"
          name="times-circle"
          @click="deleteImg(img)"
        )
        RoundedIcon(
          :class="$style.main_mark"
          v-if="img.avatar"
          name="check"
        )
      label(
        :class="$style.image_box"
        v-if="value && value.length < 5"
        for="file"
      )
        Icon(
          :class="$style.choose_file"
          name="plus"
        )
        input(
          :class="$style.inputfile"
          type="file"
          id="file"
          @change="$store.dispatch('forms/LOAD_IMAGE', $event.target.files)"
        )

</template>

<script>
import CustomImage from '@/components/CustomImage.vue'
import InputWrapper from '@/components/InputWrapper.vue'
import Icon from '@/components/Icon.vue'
import RoundedIcon from '@/components/RoundedIcon.vue'

export default {
  name: 'imagesFielld',
  components: {
    CustomImage,
    InputWrapper,
    Icon,
    RoundedIcon,
  },
  props: {
    errorMsg: String,
    title: String,
    value: Array,
    maxImages: Number,
  },
  methods: {
    deleteImg(img) {
      let newImages = this.value.filter(val => val !== img) // удаляем изображение
      if (img.avatar && newImages.length) {
        newImages[0].avatar = true // если удалили аватар устанавливаем первое изображение в качестве аватара
      }
      this.$emit('change', newImages)
    },
  },
}
</script>

<style module lang="scss">

  @import '@/assets/css/title.scss';
  @import '@/assets/css/remove_from_screen.scss';
  @import '@/assets/css/field_border_color.scss';

  @mixin imageFieldMixin(
    $base-color: $main-color,
    $text-color: #000,
    $error: false,
  ) {

    @if $error == true {
      $base-color: $error-color;
      $text-color: $error-color;
    }

    .title {
      @include titleMixin(
        $base-color: $base-color,
      )
    }

    .image_box {
      cursor: pointer;
      position: relative;
      border: solid 1px;
      @include fieldBorderColorMixin(
        $base-color: $base-color,
      );
    }

    .delete_mark {
      cursor: pointer;
      color: $base-color;
      position: absolute;
      top: 10px;
      right: 10px;
    }
    
    .main_mark {
      color: $base-color;
      position: absolute;
      bottom: 10px;
      left: 10px;
    }

    .choose_file {
      cursor: pointer;
      position:absolute;
      color: $base-color;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

  }

  .images_field {

    @include imageFieldMixin();

    &.error {

      @include imageFieldMixin($error: true);

    }

  }

  .inputfile {
    @include removeFromScreenMixin();
  }

  .images {
    margin: 10px 0 20px 0;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    grid-auto-rows: 300px;
  }

  .image {
    width: 100%;
    height: 100%;
  }

</style>
