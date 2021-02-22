<template>
  <div class="tb">
      <ul>
          <li @click="getRecommed">推荐</li>
          <li @click="getSinger">歌手</li>
          <li @click="getRank">排行</li>
          <li @click="getSearch">搜索</li>      
          <!-- <li>{{num}}</li>  -->
      </ul>
  </div>
</template>

<script>
export default {
  // props:{
  //   num:Number
  // },
  methods:{
      getRecommed(){
          this.$router.push('/recommend')
      },
      getSinger(){
          this.$router.push('/singer')
      },
      getRank(){
        this.$router.push('/rank')
      },
      getSearch(){
          this.$router.push('/search')
      }
  }
}
</script>

<style lang="less"  >
*{
    margin: 0;
    padding: 0;
}
.tb{
  // position: fixed;
  // width: 100%;
  // z-index: 10;
  // top: 0px;
  // background-color:#fff;
  //  height: 10%;
   position: -webkit-sticky;
  position: sticky;
  top: 2px;
  li{
    list-style: none;
    color: cadetblue;
  }
  ul{
    // margin-top: 20px;
    // padding: 0;
    // margin: 0;
    li{
      color: aliceblue
    };
    display: flex;
    justify-content: space-around;
    background-color: cadetblue
  }
}



</style>