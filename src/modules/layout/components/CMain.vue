<template>
  <section
    class="c-main"
    ref="cmain"
    :style="{ height: pageHeight }"
    @scroll="scrollThrottle()"
  >
    <div class="c-main__inner">
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view></router-view>
        </keep-alive>
      </transition>
      <frame-view
        v-show="!viewType"
        :selectTab="selectTab"
        :iframeUrl="iframeUrl"
      ></frame-view>
    </div>
  </section>
</template>
<script>
import { throttle } from 'throttle-debounce'
import FrameView from '@/modules/components/frame/FrameView.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'CMain',
  components: {
    FrameView
  },
  data() {
    return {
      pageHeight: 'auto',
      selectTab: '',
      iframeUrl: '',
      redHeight: ''
    }
  },
  computed: {
    ...mapState({
      viewType: state => state.frame.viewType,
      navOpen: state => state.common.navOpen
    }),
    cachedViews() {
      return this.$store.getters.getCacheViews
    }
  },
  watch: {
    $route(to) {
      this.catView(to)
    },
    navOpen() {
      this.computedHeight()
    }
  },
  created() {
    this.catView(this.$route)
    this.scrollThrottle = throttle(300, this.mainScroll)
    this.resizeThrottle = throttle(500, this.computedHeight)
    window.addEventListener('resize', () => {
      this.resizeThrottle()
    })
  },
  mounted() {
    this.computedHeight()
  },
  methods: {
    ...mapActions({
      catViewType: 'frame/catViewType',
      addFrameViews: 'frame/addFrameViews',
      setTagsShadow: 'tagsView/setTagsShadow'
    }),
    computedHeight() {
      this.redHeight =
        document.getElementById('c-header').clientHeight +
        document.getElementById('c-tabs').clientHeight
      this.pageHeight =
        document.documentElement.clientHeight - this.redHeight + 'px'
    },
    catView(to) {
      if (to.meta.iframe) {
        this.selectTab = to.meta.iframe
        this.iframeUrl = to.meta.iframeUrl || ''
        this.catViewType(false)
        this.addFrameViews(to)
      } else {
        this.catViewType(true)
      }
    },
    mainScroll() {
      let shadowStatus = this.$refs.cmain.scrollTop > 0 ? true : false
      this.setTagsShadow(shadowStatus)
    }
  }
}
</script>
<style lang="scss" scoped>
.c-main {
  overflow: auto;
  position: relative;
  width: 100%;
  .c-main__inner {
    display: inline-block;
    min-width: 1000px;
  }
}
</style>
