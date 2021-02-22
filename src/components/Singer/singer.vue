<template>
  <div class="gs">
    <ul>
      <li v-for="item in singerInfo" :key="item.index" @click="goSingerDetails(item.id,item.picUrl,item.name)">
        <img
          :src="item.picUrl"
          alt=""/>
        <p id="nm">{{item.name}}</p>
        
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.getSingerList();
  },
  data() {
    return {
        //歌手信息
        singerInfo:{}
    };
  },
  methods: {
    //获取歌手列表
    async getSingerList() {
      const {data:res} = await this.$http.get("/artist/list");
      this.singerInfo = res.artists
      console.log(res);
    },
    //点击进入歌手详情页面
    goSingerDetails(id,picUrl,name){
      this.$router.push({
        name:'singerDetails',
        params:{
          id,
          picUrl,
          name
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>

ul {
  margin: 2px;
  li {
     display: flex;
     align-items: center;
     padding: 3px 0;
    img {
      width: 25%;
      height: 25%;
    }
    p{
      margin-left: 10%;
    }
  }
}
</style>