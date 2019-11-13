<template>
  <div :class="'l-wrapper skin-' + skin">
    <c-header v-if="!commonState.navOpen"></c-header>
    <!-- <c-header-nav v-if="navOpen"></c-header-nav> -->
    <div class="c-container" :class="classObj">
      <sidebar></sidebar>
      <div class="c-container__content">
        <!-- <c-tabs id="c-tabs" ref="cTabs"></c-tabs>
        <c-main></c-main> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { CommonState } from '@/store/types'

import CHeader from './components/CHeader.vue'
import CHeaderNav from './components/CHeaderNav.vue'
import Sidebar from './components/Sidebar.vue'
import CMain from './components/CMain.vue'
import CTabs from './components/CTabs.vue'

const commonModule = namespace('common')
@Component({
  name: 'Layout',
  components: {
    CHeader,
    // CHeaderNav,
    Sidebar
    // CMain,
    // CTabs
  }
})
export default class extends Vue {
  @commonModule.State(state => state) commonState!: CommonState
}
</script>
