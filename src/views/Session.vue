<template>
  <div class="session">
    <div class="controls">
      <ProgressBar :done="this.sequence" :total="100" />
      <button class="btn btn-info" style="width: 131px" v-on:click="doPause">
        {{ paused ? "Resume ▶️" : "Pause &#9208;" }}
      </button>
      <router-link to="/" tag="button" class="btn btn-danger">Quit</router-link>
    </div>
    <transition name="slide" mode="out-in">
      <RunSet
        :setData="this.baseData"
        @setResult="handleResult"
        :key="this.baseData.SetId"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import RunSet from '@/components/RunSet.vue'
import ProgressBar from '@/components/ProgressBar.vue'

import { SetData, SetResult } from '@/types'

@Component({
  components: {
    RunSet,
    ProgressBar
  }
})

export default class Session extends Vue {
  /* baseData: SetData = {
    SetId: '123456',
    TargetDrug: 'Fentanyl',
    TimeLimit: 3 * 1000,
    Ampoules: [
      { Id: '1234', ImageSrc: '/assets/blackwhite/adrenaline.png' },
      { Id: '2345', ImageSrc: '/assets/industry/dexamethasone.png' },
      { Id: '3456', ImageSrc: '/assets/industry/meteraminol.png' },
      { Id: '4567', ImageSrc: '/assets/iso/fentanyl.png' },
      { Id: '5678', ImageSrc: '/assets/iso/midazolam.png' },
      { Id: '6789', ImageSrc: '/assets/iso/clonidine.png' }
    ]
  }

  targetList = ['Bupivicaine', 'Adrenaline', 'Dexamethasone', 'Midazolam', 'Meteraminol', 'Clonidine', 'Fentanyl']
  target = 'Fentanyl'
  */

  baseData: SetData = {
    SetId: '',
    TargetDrug: '',
    TimeLimit: 0,
    Ampoules: []
  }

  sequence = 0
  loading = true
  paused = false

  beforeMount () {
    this.getRemote()
  }

  doPause () {
    this.paused = !this.paused
    this.baseData = {
      SetId: '',
      TargetDrug: '',
      TimeLimit: 0,
      Ampoules: []
    }
  }

  @Watch('paused')
  onPauseStateChange () {
    if (!this.paused) {
      this.getRemote()
    }
  }

  /* get targetDrug () {
    return this.baseData.TargetDrug
  }

  get ampoules () {
    return this.baseData
  } */

  handleResult (result: SetResult) {
    result.SessionId = this.$route.params.SessionId
    result.Sequence = this.sequence
    result.Correct = (this.baseData.TargetDrug === result.SelectedAmpoule)
    // this.target = this.targetList[this.sequence]

    const data: any = {
      // eslint-disable-next-line
      set_id: result.SetId,
      time: result.Time,
      correct: result.Correct,
      // eslint-disable-next-line
      sequence_id: result.Sequence,
      // eslint-disable-next-line
      session_id: result.SessionId,
      group: this.baseData.Group
    }
    if (result.SelectedAmpoule !== '') {
      data.selected = result.SelectedAmpoule
    }
    console.log(data)

    fetch('https://mysterious-taiga-04569.herokuapp.com/results/', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => console.log(res))

    if (!this.paused) {
      this.getRemote()
    }
    this.sequence++
    console.log(result)
  }

  getRemote () {
    this.loading = true
    return new Promise((resolve, reject) => {
      fetch('https://mysterious-taiga-04569.herokuapp.com/getdrugs/?format=json&session_id=' + this.$route.params.SessionId)
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.baseData = data
          this.loading = false
          resolve()
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }
}
</script>

<style scoped lang="scss">
.session {
  white-space: nowrap;
  text-align: center;
  overflow: hidden;
}

.controls {
  //background: #24292e;
  width: 100%;
  height: 60px;
  //color: #ffffff;
  padding: 16px 32px;
  box-sizing: border-box;

  .progress {
    padding-top: 6px;
    float: left;
  }

  .btn {
    float: right;
    margin-top: -7px;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-enter,
.slide-leave-active {
  opacity: 0;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-active {
  transform: translateX(-100%);
}
</style>
