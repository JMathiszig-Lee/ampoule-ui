<template>
  <div class="start">
    <div>
      <vue-form-generator
        :schema="schema"
        :model="model"
        :options="formOptions"
      ></vue-form-generator>
      <router-link to="/session/1" tag="button" class="btn btn-success"
        >Start</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'

@Component({
  components: {
    'vue-form-generator': VueFormGenerator.component
  }
})

export default class Start extends Vue {
  model = {
    years: '',
    speciality: '',
    email: ''
  }

  schema = {
    fields: [
      {
        type: 'input',
        inputType: 'Number',
        label: 'Years of Experience',
        model: 'years',
        required: true,
        validator: 'integer'
      },
      {
        type: 'select',
        label: 'Speciality',
        model: 'speciality',
        values: [
          { name: 'Anaesthetics', id: 'GAS' },
          { name: 'Emergency Medicine', id: 'A+E' },
          { name: 'Intensive Care', id: 'ICM' },
          { name: 'Other', id: 'OTH' }
        ],
        required: true
      },
      {
        type: 'input',
        inputType: 'email',
        label: 'E-mail',
        model: 'email',
        placeholder: 'E-mail address',
        validator: 'email'
      }
    ]
  }

  formOptions = {
    validateAfterLoad: true,
    validateAfterChanged: true,
    validateAsync: true
  }
}
</script>

<style lang="scss">
.start {
  text-align: left;
}

fieldset {
  border: 0;
}
</style>
