<template>
   <div>
     
    <TabBar  />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import TabBar from '../components/tabBar.vue'
export default {
  components: {
    TabBar
  },
  // data(){
  //   return {
  //     num:200
  //   }
  // }
}
</script>

<style>

</style>