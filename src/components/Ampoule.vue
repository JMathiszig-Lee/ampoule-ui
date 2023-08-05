<template>
  <div
    class="ampoule"
    v-bind:class="{ loading: loading, selected: selected, active: active }"
    v-on:click="click"
  >
    <div v-if="loading" class="lds-dual-ring"></div>
    <img
      :src="src"
      v-bind:class="{ active: active, selected: selected }"
      @load="onImgLoad"
    />
  </div>
</template>

<script >

// @Component
export default {
  // @Prop() private id!: string;
  // @Prop() private src!: string;
  // @Prop() private active!: boolean;

  name: 'CountDown',
  props: {
    id: String,
    src: String,
    active: Boolean
  },

  data() {
    return {
      loading: Boolean = true,
      selected : Boolean = false,
    }
  },

  methods: {
    onImgLoad () {
    this.$emit('loaded', this.id)
    this.loading = false
  },

  click () {
    if (this.active) {
      this.$emit('selected', this.id)
      this.selected = true
    }
  },
  }
  
}
</script>

<style scoped lang="scss">
.ampoule {
  display: block;
  float: left;
  margin: 5px;
  width: 65px; //91px;
  height: 253px; //355px;
  padding: 5px;
  box-sizing: content-box;
  background: #acacac;
  border-radius: 4px;

  &.loading {
    background: #acacac;
  }

  &.active,
  &.selected {
    background: inherit;
  }

  &.selected {
    box-shadow: 0 0 0 4px #2c3e50 !important;
    cursor: default;
  }

  &.correct {
    box-shadow: 0 0 0 4px rgb(65, 184, 131) !important;
    cursor: default;
  }

  &.error {
    box-shadow: 0 0 0 4px red !important;
    cursor: default;
  }

  img {
    visibility: hidden;
    width: 100%;
    &.active,
    &.selected {
      visibility: visible;
    }
  }

  &.active:hover {
    box-shadow: 0 0 0 4px #ffb81c;
    cursor: pointer;
  }
}

.lds-dual-ring {
  width: 52px;
  height: 40px;
  margin: auto;
  position: relative;
  top: 45%;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 24px;
  height: 24px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(59, 59, 59);
  border-color: rgb(59, 59, 59) transparent rgb(59, 59, 59) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
