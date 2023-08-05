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

<script>
import RunSet from '@/components/RunSet.vue'
import { defineComponent } from 'vue'
import ProgressBar from '@/components/ProgressBar.vue'
// import { SetData, SetResult } from '@/types'
import { watch } from 'vue'

export default defineComponent ({
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
  name: 'Session',
  components : {
    RunSet,
    ProgressBar
  },
  props:['setData'],

  data() {
    return {
      baseData: {
        SetId: '',
        TargetDrug: '',
        TimeLimit: 0,
        Ampoules: []
      },
      sequence: 0,
      loading: true,
      pause: false
  }
  watch(this.paused, (newX) => {
    if (!this.paused) {
      this.getRemote()
    }
  })
 
  },
  methods:{
    handleResult (result) {
    result.SessionId = this.$route.params.SessionId
    result.Sequence = this.sequence
    result.Correct = (this.baseData.TargetDrug === result.SelectedAmpoule)
    // this.target = this.targetList[this.sequence]

    const data = {
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

    fetch(process.env.VUE_APP_DJANGO_URL +'/results/', {
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
  },
  doPause () {
    this.paused = !this.paused
    this.baseData = {
      SetId: '',
      TargetDrug: '',
      TimeLimit: 0,
      Ampoules: []
    }
  },
  getRemote () {
    this.loading = true
    return new Promise((resolve, reject) => {
      fetch(process.env.VUE_APP_DJANGO_URL +'/getdrugs/?format=json&session_id=' + this.$route.params.SessionId)
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.baseData = data
          this.loading = false
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  
  },
  

  beforeMount () {
    this.getRemote()
  },
  

  // watch(paused, () =>  {
  //   if (!this.paused) {
  //     this.getRemote()
  //   }
  // })

  /* get targetDrug () {
    return this.baseData.TargetDrug
  }

  get ampoules () {
    return this.baseData
  } */

})

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
