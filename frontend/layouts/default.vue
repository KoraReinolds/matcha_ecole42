<template>
  <div class="wrapper">
    <nuxt/>
  </div>
</template>

<style lang="scss">

html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
.wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
body,
html {
  p {
    margin: 0;
  }
  div {
    text-align: left;
  }
  min-height: 100vh;
  height: 100%;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  fieldset {
    padding: 0;
    margin: 0;
    legend {
      padding: 0;
    }
  }
  input {
    border: none;
  }
}
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
</style>

