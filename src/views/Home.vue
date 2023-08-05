<template>
  <div class="home">
    <h1>Welcome to the Drug/Ampoule selection evaluator</h1>
    <p>
      This is some copy explaining why this is an important thing and the value
      of researching it and the methadology.
    </p>
    <h3>How this works</h3>
    <p>We collect:</p>
    <ul>
      <li>Age range</li>
      <li>Speciality</li>
      <li>Grade/Years of experience</li>
    </ul>
    <div>
      <router-link to="/session/new" tag="button" class="btn btn-info"
        >Get Started</router-link
      >
    </div>
  </div>
</template>

<script>

export default { 
  name: 'Home'
}

</script>

<style scoped lang="scss">
.home {
  text-align: left;
  div {
    text-align: center;
  }
}
</style>
