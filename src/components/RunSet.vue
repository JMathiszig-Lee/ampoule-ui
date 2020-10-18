<template>
  <div class="study">
    <h1 v-if="setData.TargetDrug != ''">
      Please select: <span>{{ setData.TargetDrug.toUpperCase() }}</span>
    </h1>
    <h1 v-else></h1>
    <div class="ampoules">
      <Ampoule
        v-for="ampoule in setData.Ampoules"
        :key="ampoule.Id"
        :id="ampoule.Id"
        :src="ampoule.ImageSrc"
        :active="active"
        @loaded="imgLoaded"
        @selected="selectAmpoule"
      />
    </div>
    <CountDown
      v-if="timeLimit > 0"
      :timeLimit="timeLimit"
      :timeLeft="timeLeft"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import CountDown from '@/components/CountDown.vue'
import Ampoule from '@/components/Ampoule.vue'

import { SetData, SetResult } from '@/types'

@Component({
  components: {
    CountDown,
    Ampoule
  }
})

export default class RunSet extends Vue {
  @Prop() private setData!: SetData;

  loading = true;
  active = false;
  imgCount = 0;
  timeLimit = 0;
  startTime = 0;
  timeLeft = 0;
  tick = 0;

  beforeMount () {
    this.timeLimit = this.setData.TimeLimit
    this.timeLeft = this.timeLimit / 1000
  }

  startTimer (limit: number) {
    this.timeLimit = limit
    this.startTime = new Date().getTime()
    this.timeLeft = this.timeLimit / 1000
    this.tick = setInterval(() => {
      this.updateCountDown()
    }, 25)
  }

  updateCountDown () {
    const remaining: number = this.startTime + this.timeLimit - new Date().getTime()
    this.timeLeft = remaining / 1000
    if (remaining < 0) {
      this.active = false
      this.selectAmpoule('')
      clearInterval(this.tick)
    }
  }

  imgLoaded () {
    this.imgCount++
    if (this.imgCount === this.setData.Ampoules.length) {
      setTimeout(() => {
        this.loading = false
        this.active = true
        this.startTimer(this.setData.TimeLimit)
        this.imgCount = 0
      }, 1000)
    }
  }

  selectAmpoule (id: string) {
    clearInterval(this.tick)
    this.active = false
    const result: SetResult = {
      SetId: this.setData.SetId,
      SelectedAmpoule: id,
      Time: this.timeLimit - (this.timeLeft * 1000)
    }
    this.$emit('setResult', result)
  }
}
</script>

<style scoped lang="scss">
.study {
  display: inline-block;
}

h1 {
  font-weight: 100;
  span {
    font-weight: 600;
  }
}
.ampoules {
  display: inline-block;
}
</style>
