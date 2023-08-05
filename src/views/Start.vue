<template>
  <div class="start">
    <div>
      <FormKit type="form" @submit="createUser" >
        <FormKitSchema :schema="schema"/>
      </FormKit>
      <!-- <router-link to="/session/1" tag="button" class="btn btn-success"
        >Start</router-link> -->
    </div>
  </div>
</template>

<script setup>
import { FormKitSchema, FormKit } from '@formkit/vue'

const axios = require('axios');

const schema= [
    {
      $formkit: 'number',
      name: 'years',
      type: 'input',
      inputType: 'Number',
      label: 'Years of Experience',
      validation: 'required|integer'
    },
    {
      $formkit: 'select',
      name: 'speciality',
      label: 'Speciality',
      options: [
        { label: 'Anaesthetics', value: 'GAS' },
        { label: 'Emergency Medicine', value: 'A+E' },
        { label: 'Intensive Care', value: 'ICM' },
        { label: 'Other', value: 'OTH' }
      ],
      validation: 'required'
    },
    {
      $formkit: 'text',
      label: 'E-mail',
      name: 'email',
      placeholder: 'E-mail address',
      validation: 'required|email'
    }
  ]
const config = {
  headers:{
    "Access-Control-Allow-Origin": "*"
  }
}
function createUser(fields) {
  console.log(fields)
  axios.post(process.env.VUE_APP_DJANGO_URL + '/register/',{
    years: fields.years,
    speciality: fields.speciality,
    email: fields.email
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
}

</script>

<style lang="scss">
.start {
  text-align: left;
}

fieldset {
  border: 10;
}
</style>
