<template>
  <div>
    <div class="pic">
      <img :src="this.$route.params.picUrl" alt="" />
    </div>
    <div class="title" :class="navBarFixed == true ? 'navBarWrap' : ''">
      <p @click="setShow">主页</p>
      <p @click="setSee">歌曲</p>
    </div>
    <div class="content_1" v-if="show">
      <p>姓名:{{ artist.name }}</p>
      <p>简介:{{ artist.desc }}</p>
    </div>
    <div class="content_2" v-if="see">
      <ul>
        <li
          v-for="item in artist.hotSongs"
          :key="item.index"
          @click="
            goSongsPlay(item.id, item.name, item.al.picUrl, item.ar[0].name)
          "
        >
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getSingerDesc();
  },
  mounted(){
    window.addEventListener("scroll",this.hidemenu)
  },
  data() {
    return {
      show: true,
      see: false,
      //歌手信息
      artist: {
        name: "",
        desc: "",
        hotSongs: [],
      },
      navBarFixed :false
    };
  },
  methods: {
    //吸顶
    hidemenu(){
      let scrollTop = window.pageYOffset ||
       document.documentElement.scrollTop ||
       document.body.scrollTop;
       if(scrollTop > 200){
         this.navBarFixed = true
       }else{
         this.navBarFixed = false
       }
    },
    //获取歌手描述以及所有歌曲
    async getSingerDesc() {
      const { data: res } = await this.$http.get("/artists", {
        params: { id: this.$route.params.id },
      });
      console.log(res);
      this.artist.name = res.artist.name;
      this.artist.desc = res.artist.briefDesc;
      this.artist.hotSongs = res.hotSongs;
    },
    //点击进入播放页面
    goSongsPlay(id, name, picUrl, arname) {
      this.$router.push({
        name: "songsplay",
        params: {
          id,
          name,
          picUrl,
          arname,
        },
      });
    },
    setShow() {
      this.show = true;
      this.see = false;
    },
    setSee() {
      this.show = false;
      this.see = true;
    },
  },
};
</script>

<style lang="less" scoped>
img {
  width: 100%;
}
.title {
  display: flex;
  justify-content: space-around;
  color: chocolate;
}
.navBarWrap{
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
}
li {
  padding: 5px;
  color: cadetblue;
}
</style>