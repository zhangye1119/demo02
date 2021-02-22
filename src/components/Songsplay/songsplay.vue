<template>
  <div class="songsdetails">
    <div class="title">
      <span>{{ this.$route.params.name }}</span>
      <span>{{ this.$route.params.arname }}</span>
    </div>
    <div id="changePic" class="ly_pic" @click="changeLy_pic">
      <img
        id="box"
        v-if="show"
        class="i1"
        :src="this.$route.params.picUrl"
        alt=""
      />
      <ul ref="lyricUl" v-else>
        <li
        :class="`gccl ${lyricsIndex === index ? 'active' : ''}`"
        
        v-for="(item, index) in lyrics"
        :key="index"
        
      >
        {{ item.text }}
      </li>
      </ul>
      
    </div>
    <!-- <div class="changeLy">
       <p>歌词</p>
    </div> -->
    <audio
      id="audio1"
      controls
      :src="url"
      @play="bofang"
      @pause="zanting"
      @ended="zanting"
      autoplay
    ></audio>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      show: true,
      url: "",
      //歌词
      lyrics: [],
      lyricsIndex: 0,
      swiperOptions: {
        direction: "vertical",
      },
    };
  },
  created() {
    this.getSongsUrl();
    this.getLyrics();
  
  },
  methods: {
   
    bofang() {
      if (box.className == "i1") {
        box.className = "i2";
      } else {
        box.className = "i1";
      }
      this.lyricsPlay();
      
      console.log(this.mySswiper);
     
    },
    zanting() {
      box.className = "i1";
      window.clearInterval(this.lyricsTimer);
    },
    //播放完成
    audioComplete() {},
    back() {
      this.$router.back(-1);
    },
    //图片、歌词切换功能
    changeLy_pic() {
      this.show = !this.show;
    },
    //获取歌曲url
    async getSongsUrl() {
      //  this.$route.params.id = this.$route.params.id + ''
      const { data: res } = await this.$http.get("/song/url", {
        params: { id: this.$route.params.id },
      });
      // console.log(typeof this.$route.params.id );

      // console.log(res);
      this.url = res.data[0].url;
      // console.log(this.url);
    },
    //获取歌词
    async getLyrics() {
      const { data: res } = await this.$http.get("/lyric", {
        params: { id: this.$route.params.id },
      });
      // console.log(res);
      let gc = res.lrc.lyric.split("\n");

      gc.forEach((item) => {
        let temp_arr = item.split("]");

        let text = temp_arr.pop();
        temp_arr.forEach((el) => {
          let obj = {};
          let time_arr = el.substr(1, el.length - 1).split(":");
          // console.log(temp_arr);
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]);
          obj.time = s;
          obj.text = text;
          this.lyrics.push(obj);
          // console.log(s);
        });
       
        // this.lyrics.push(text)
      });
      // console.log(this.lyrics);
    },
    //歌词滚动
    lyricsPlay() {
      
      this.lyricsTimer = setInterval(() => {
        // console.log("chenggong");
        //音频总时长  s
        let duration = document.getElementById("audio1").duration;
        //音频播放当前时间  s
        let currentTime = document.getElementById("audio1").currentTime;
        if (currentTime > duration) {
          this.audioComplete();
          return;
        } else {
          let n;
          this.lyrics.find((item, index) => {
            // console.log(item);
            if (Math.round(currentTime) === item.time) {
              n = index;
              return true;
            }
            return false;
          });
          if (n ) {
            // && n !== this.lyricsIndex
            this.lyricsIndex = n;
            this.$refs.lyricUl.style.transform = `translateY(${100 - (50 * (n + 1))}px)`
            // console.log(this.$refs.lyricUl);
            
            // console.log(this.$refs.lyricP);
            // let index = this.lyricsIndex - 4;
            // index < 0 ? (index = 0) : null;
           
            // this.swiper.slideTo(idnex,200)           
          }
        }
      }, 1000);
    },
    //销毁计时器
    stopTimer(){
      clearInterval(this.lyricsTimer )
    
    }
  },
  computed:{
    swiper() {
        return this.$refs.mySwiper.$swiper
      }
  },
  mounted() {
    document.body.style.backgroundColor = "darkcyan";
    
  },
  beforeDestroy() {
    document.body.removeAttribute("style");
  },
  destroyed(){
    this.stopTimer()
  }
};
</script>

<style lang="less" scoped>
.title {
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
}
.i2 {
  display: block;
  width: 50%;
  // height: 100%;
  margin: 20% auto;
  border-radius: 50%;
  animation: myfirst 20s infinite;
  @keyframes myfirst {
    100% {
      transform: rotate(360deg);
    }
  }
  animation-play-state: running;
}
.i1 {
  display: block;
  width: 50%;
  // height: 100%;
  margin: 20% auto;
  border-radius: 50%;
  animation: myfirst 20s infinite;
  @keyframes myfirst {
    100% {
      transform: rotate(360deg);
    }
  }
  animation-play-state: paused;
}

audio {
  position: fixed;
  margin-left: 35px;
  bottom: 5%;
}
.songsdetails {
  // position: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ly_pic {
  margin-top: 50px;
  width: 100%;
  height: 400px;
  overflow: scroll;
  li {
    padding: 5px 0;
  }
  .gccl {
    margin-top: 20px;
    text-align: center;
  }
  .gccl.active {
    margin-top: 20px;
    text-align: center;
    color: aqua;
  }
  // .swiper-slide gl{
  //   margin-top: 20px;
  //   text-align: center;
  //   color: aqua;
  // }
}
</style>