<template>
  <div class="badge">
    <slot></slot>
    <span v-show="!hidden"
          class="badge-content"
          :class="[
          isDot && 'is-dot',
          $slots.default && 'is-fixed'
          ]
          ">{{content}}</span>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    value: [Number, String],
    hidden: {
      type: Boolean,
      default: false
    },
    max: Number,
    isDot: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    content() {
      if (this.isDot) {
        return ''
      }
      if (typeof this.value === 'number' && typeof this.max === 'number') {
        return this.value > this.max ? `${this.max}+` : this.value
      }
      return this.value
    }
  }
}
</script>

<style>
.badge {
  display: inline-block;
  position: relative;
  margin: 10px 20px;
}
.badge-content {
  line-height: 18px;
  padding: 0 5px;
  border-radius: 10px;
  font-size: 12px;
  color: #fff;
  background: #fa5555;
}
.is-fixed {
  position: absolute;
  top: 0;
  right: 10px;
  transform: translateX(100%) translateY(-50%);
}
.is-dot {
  position: absolute;
  right: 5px;
  width: 8px;
  height: 8px;
  padding: 0;
}
</style>

