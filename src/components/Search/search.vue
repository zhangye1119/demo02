<template>
  <div class="sr">
    <div class="top">
      <input type="text" v-model="queryInfo.keywords" @keyup.enter="getSearch" />
    <button @click="getSearch" >搜索</button>
    </div>
    <div class="songs">
      <ul>
      <li v-for="item in getData" :key="item.index">
        <span>{{item.name}}</span>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        //输入框绑定
        keywords: "",
      },
      //拿到的数据
      getData:{
        name:'',
        artistName:''
      }
    };
  },
  created() {
    // this.getSearch()
  },
  methods: {
    async getSearch() {
      const { data: res } = await this.$http.get("/search", {
        params: this.queryInfo,
      });
      console.log(res);
      this.getData = res.result.songs
      console.log(this.getData);
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  margin-top: 20px;
  text-align: center;
}
</style>