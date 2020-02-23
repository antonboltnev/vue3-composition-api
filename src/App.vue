<template>
  <div id="app">
    <Layout-optional v-if="optional"/>
    <Layout-composition v-else/>
  </div>
</template>

<script>
  import LayoutOptional from "./components/Layout-optional";
  import LayoutComposition from './components/Layout-composition'

  export default {
    name: 'app',
    components: {
      LayoutOptional,
      LayoutComposition
    },
    data: () => {
      return {
        optional: false
      }
    }
  }
</script>
