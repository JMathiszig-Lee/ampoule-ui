<template>
  <div class="timer">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="circle">
        <circle class="elapsed" cx="50" cy="50" r="45"></circle>
        <path
          :stroke-dasharray="animationFraction"
          v-bind:class="animationColour"
          class="remaining"
          d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
        ></path>
      </g>
    </svg>
    <span class="label">{{ timeLeftString }}</span>
  </div>
</template>

<script>
import { watch } from 'vue'
// import { Vue } from 'vue-property-decorator'

// import { Component, Prop, Vue } from 'vue-property-decorator'

// @Component
export default {
  // @Prop() private timeLimit!: number;
  // @Prop() private timeLeft!: number;
  name: 'CountDown',
  props: {
    timeLimit: Number,
    timeLeft: Number
  },
  data (){
    return {
      timeLeftString: 0,
      animationFraction: 1
    }
  },
  methods:{
    timeLefttoString () {
    if (this.timeLeft <= 0) {
      // return '0.000'
      this.timeLeftString = '0.000'
    }
    // return this.timeLeft.toFixed(3)
    // return this.timeLeft.toFixed(3)
    this.timeLeftString = this.timeLeft.toFixed(3)
  },
  changeFraction () {
    const remaining = this.timeLeft * 1000
    const rawTimeFraction = remaining / this.timeLimit
    if (remaining <= 0) {
      // return '283'
      this.animationFraction = 283
    }
    this.animationFraction = (rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction)) * 283 + ' 283'
    // return (rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction)) * 283 + ' 283'
  },
  animateColour () {
    const remaining = this.timeLeft
    if (remaining > 2) {
      this.animationColour = 'green'
    }
    else if (remaining > 1) {
      this.animationColour =  'orange'
    }
    else if (remaining >= 0) {
      this.animationColour = 'red'
    }
    // this.animationColour =  'red'
  }
  },
  watch : {
    timeLeft() {
      this.timeLefttoString()
      this.changeFraction()
      this.animateColour()
    }
  }
  
}
</script>

<style scoped lang="scss">
.timer {
  display: inline-block;
  position: relative;
  width: 250px;
  height: 250px;
  vertical-align: top;
  margin-top: 15px;
  margin-left: 30px;

  svg {
    transform: scaleX(-1);

    .circle {
      fill: none;
      stroke: none;
    }

    .elapsed {
      stroke-width: 7px;
      stroke: grey;
    }

    .remaining {
      stroke-width: 7px;
      stroke-linecap: round;
      transform: rotate(90deg);
      transform-origin: center;
      transition: 1ms linear all;
      fill-rule: nonzero;
      stroke: currentColor;

      &.green {
        color: rgb(65, 184, 131);
      }

      &.orange {
        color: orange;
      }

      &.red {
        color: red;
      }
    }
  }

  .label {
    position: absolute;
    width: 250px;
    height: 250px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
  }
}
</style>
