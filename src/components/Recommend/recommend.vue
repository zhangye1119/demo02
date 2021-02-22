<template>
  <div class="re">
    <swiper class="recom" :auto-update="true" ref="mySwiper" :options="swiperOptions" >
      <swiper-slide v-for="item in bannerList" :key="item.index" >
        <img :src="item.imageUrl" >
      </swiper-slide>     
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="hot">
      <h3>热门歌单推荐</h3> 
      <ul>
        <li v-for="item in songsList" :key="item.id" @click="intoGdDetails(item.id)">     
            <img :src="item.picUrl" >  
            <div class="wenan">
              <span>{{item.copywriter}}</span>   
              <span>{{item.name}}</span>
            </div>
        </li>   
      </ul>
    </div>
   
  </div>
  
</template>

<script>
// import Disc from '@/components/Disc/disc.vue'
import { Swiper, SwiperSlide} from 'vue-awesome-swiper'

// import 'swiper/swiper-bundle.css'
import 'swiper/css/swiper.css'
export default {
  components:{
    Swiper, 
    SwiperSlide,
  },
  data(){
    return{
      //banner数据
      bannerList:[],
      //推荐歌单数据
      songsList:[],
      swiperOptions:{      
        pagination: {
           el: '.swiper-pagination'
        },
        autoplay:{
           delay: 2500,
            disableOnInteraction: false
        }

      }
    }
  },
  created(){
    this.getBanner()
    this.getSongsList()
  },
 
  methods:{
    //获取banner
    async getBanner(){
      const {data:res} = await this.$http.get('/banner')
      // console.log(res)
      this.bannerList = res.banners  
    },
    
    //获取推荐歌单
    async getSongsList(){
      const {data:res} = await this.$http.get('/personalized')
      console.log(res)
      this.songsList = res.result
      // console.log(this.songsList);
    },
    //点击歌单 进入歌单详情
    intoGdDetails(id){
      
      this.$router.push({
        name:'disc',
        params:{
          id
        }
      })
    }
  },
  
  
}
</script>

<style lang="less" scoped>

  .re{
    margin-top: 2px;
  }
  .recom{
    width: 100%;
    height: 120px;  
    img{
      width: 100%;
      height: 100%;
    }
  } 
  h3{
    text-align: center;
    color:blue
  }
  li{
    display: flex;
    margin-bottom: 10px;
    img{
      width: 20%;
    }
    .wenan{
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      margin-top: 10px;
      margin-left: 5px;
      span{
        flex: 1;
      }
    }
  }
  
 
</style>