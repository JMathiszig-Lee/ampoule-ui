<template>
  <div class="progress">
    <span class="label">{{ done }}/{{ total }}</span>
    <div class="outer">
      <div class="bar" v-bind:style="{ width: percent + '%' }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CountDown extends Vue {
  @Prop() private done!: number;
  @Prop() private total!: number;

  get percent () {
    return Math.round((this.done / this.total) * 100)
  }
}
</script>

<style scoped lang="scss">
.progress {
  width: 150px;
  display: inline-block;
  margin-right: 50px;
}

.label {
  display: inline-block;
  vertical-align: top;
  line-height: 15px;
  margin-right: 10px;
  font-weight: 600;
}

.outer {
  display: inline-block;
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 5px;
  .bar {
    background-color: #2196f3;
    border-radius: 5px;
    height: 15px;
  }
}
</style>
