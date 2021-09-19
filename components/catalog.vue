<template>
  <div :class="['container', pin ? 'pin' : '']">
    <p v-if="!pin">{{ head }}</p>
    <div class="subject-entrance-list">
      <router-link v-for="item in subjects" :key="item.path" :to="item.path">{{
        item.label||item.title
      }}</router-link>
    </div>
  </div>
</template>

<script>
import * as Vue from "vue";

export default Vue.defineComponent({
  name: "Catalog",
  props: {
    root: {
      type: String,
      required: false,
      default: "/",
    },
    head: {
      type: String,
      required: false,
      default: "Catalog",
    },
    subjects: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    console.log(props.subjects)
    return props;
  },
  computed: {
    pin() {
      return this.$route.path !== this.root;
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  max-width: 600px;
  margin: auto;
  p {
    flex: 0 0 40px;
    text-align: center;
  }
  .subject-entrance-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    a {
      margin: 1em;
      text-decoration: none;
      padding: 8px 16px;
      background-color: whitesmoke;
      border-radius: 4px;
    }
  }
  &.pin {
    width: fit-content;
    position: absolute;
    left: 2em;
    bottom: calc(100vh - 5px);
    top: unset;
    border-bottom: 5px rgba(0, 0, 0, 0.3) solid;
    border-radius: 5px;
    transition: all 0.2s ease-in;
    transition-delay: 1s;
    background-color: #00000023;
    height: fit-content;
    padding: 8px 16px;
    .subject-entrance-list {
      display: flex;
      align-items: center;
      flex-flow: column nowrap;
      a {
        font-size: 12px;
        margin: 0;
        padding: 4px 8px;
      }
      a:not(:nth-last-child(1)) {
        margin-bottom: 4px;
      }
    }
    &:hover {
      transform: translate(0, calc(100% - 5px));
      border-color: transparent;
      transition: all 0.2s ease-out;
    }
  }
}
</style>
