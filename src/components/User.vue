<template>
  <div class='User'>
    <div class="User__info name">{{user_data.name}}</div>
    <div class="User__info age">{{user_data.age}} y.o</div>
    <div class="User__info job">{{user_data.job}}</div>
    <div class="User__info stage">{{user_data.grade}}</div>
    <div class="User__info language">{{user_data.language}}</div>
  </div>
</template>

<script>
  export default {
    name: "User",
    props: {
      user_data: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>
