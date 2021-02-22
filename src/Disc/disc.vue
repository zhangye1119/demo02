<template>
  <div class="details">
    <div class="header">
      <span>{{ gdDetails.name }}</span>
      <img :src="gdDetails.coverImgUrl" />
    </div>
    <div class="lists">
      <ul>
        <li
          v-for="item in allSongs"
          :key="item.id"
          @click="
            goSongsPlay(item.id, item.name, item.al.picUrl, item.ar[0].name)
          "
        >
          <img :src="item.al.picUrl" />
          <!-- <span>{{item.}}</span> -->
          <!-- <span>{{item.name}}</span> -->
          <div class="al">
            <span>{{ item.name }}</span>
            <div class="ar">
              <span>{{ item.ar[0].name }} — </span>
              <span>{{ item.al.name }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getDetails();
    // setTimeout(()=>{
    // this.getAllTracks()
    // }, 1000);
  },
  data() {
    return {
      //歌单详情总数据(部分)
      gdDetails: [],
      //trackids
      trackIds: {
        idsZu: [],
        ids: "",
      },
      //总的歌曲
      allSongs: [],
    };
  },
  methods: {
    async getDetails() {
      const { data: res } = await this.$http.get("/playlist/detail", {
        params: { id: this.$route.params.id },
      });
      // console.log(res);
      this.gdDetails = res.playlist;
      res.playlist.trackIds.forEach((item) => {
        this.trackIds.idsZu.push(item.id);
        this.trackIds.ids = this.trackIds.idsZu.join(",");
      });
      // console.log(this.trackIds.ids);
      // if(res.code == 200){
      const { data: a } = await this.$http.get("/song/detail", {
        params: { ids: this.trackIds.ids },
      });
      // console.log(a);
      this.allSongs = a.songs;

      // }
    },
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
  },
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  width: 100%;
  height: 250px;
  span {
    position: absolute;
    color: #fff;
    margin-left: 22%;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.lists {
  display: flex;
  span {
    color: black;
  }
  li {
    margin-bottom: 5px;
    display: flex;
    height: 50px;
    img {
      width: 50px;
      // height: 100%;
    }
  }
}
.ar {
  // overflow: hidden;
  span {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
}
</style>