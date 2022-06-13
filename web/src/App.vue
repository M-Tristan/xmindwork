<template>
  <div>
    <index></index>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import index from "./view/index.vue";

export default defineComponent({
  components: {
    index,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}
</style>
