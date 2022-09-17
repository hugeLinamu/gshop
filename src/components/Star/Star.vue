<template>
   
    <div class="star" :class="`star-`+size">
        <span  
        v-for="(item,index) in starClasses" 
        :key="index"
        class="star-item"
        :class="item"
        >
        </span>
    </div>
    <!-- <div class="star" :class="`star-${size}`">
      
     <span class="star-item" v-for="(sc, index) in starClasses" :key="index" :class="sc"></span>
    </div> -->
</template>

<script>

  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'

export default {
    name:'Star',
    props:{
      score: Number,
      size: Number
    },
    computed:{
        starClasses(){
          const scs = []
          const {score} = this
          let int = Math.floor(score)
          let flo = score*10 - int*10
          // 向scs中添加n个CLASS_ON
          for(let i = 0; i< int ;i++){
              scs.push(CLASS_ON)
          }
          // 向scs中添加0/1个CLASS_HALF
          if(flo>=5){// 大于0.5 ,就半星
              scs.push(CLASS_HALF)
          }
          // 向scs中添加n个CLASS_OFF
           while(scs.length<5) {
           scs.push(CLASS_OFF)
          }
            return scs
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    //根据像素比缩放1px像素边框
    @media only screen and (-webkit-device-pixel-ratio: 2 )
      .border-1px
        &::before
          transform scaleY(.5)
    
    @media only screen and (-webkit-device-pixel-ratio: 3 )
      .border-1px
        &::before
          transform scaleY(.333333)
    
    //根据像素比来使用 2x图 3x图
    bg-image($url)
      background-image: url($url + "@2x.png")
      @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
        background-image: url($url + "@3x.png")


    .star //2x图 3x图
      float left
      font-size 0
      .star-item
        display inline-block
        background-repeat no-repeat
      &.star-48
        .star-item
          width 20px
          height 20px
          margin-right 22px
          background-size 20px 20px
          &:last-child
            margin-right: 0
          &.on
            bg-image('./images/star48_on')
          &.half
            bg-image('./images/star48_half')
          &.off
            bg-image('./images/star48_off')
      &.star-36
        .star-item
          width 15px
          height 15px
          margin-right 6px
          background-size 15px 15px
          &:last-child
            margin-right 0
          &.on
            bg-image('./images/star36_on')
          &.half
            bg-image('./images/star36_half')
          &.off
            bg-image('./images/star36_off')
      &.star-24
        .star-item
          width 10px
          height 10px
          margin-right 3px
          background-size 10px 10px
          &:last-child
            margin-right 0
          &.on
            bg-image('./images/star24_on')
          &.half
            bg-image('./images/star24_half')
          &.off
            bg-image('./images/star24_off')
  </style>