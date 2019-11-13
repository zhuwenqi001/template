<template>
  <div v-if="GLOBAL.gateway">
    <template v-for="item in menus">
      <template v-if="!item.hidden">
        <el-submenu
          @click.native="executeRouter(item)"
          v-if="item.children.length > 0"
          :key="item.path"
          :index="item.path"
        >
          <template slot="title">
            <c-icon :icon-class="item.menu_icon" class-name="i-icon"></c-icon>
            <span slot="title">{{ item.menu_name }}</span>
          </template>
          <sub-menu
            :menus="item.children"
            @executeRouter="executeRouter"
          ></sub-menu>
        </el-submenu>
        <el-menu-item
          class="el-menu--nochildren"
          @click="executeRouter(item)"
          :index="item.name"
          :key="item.name"
          v-else
        >
          <c-icon :icon-class="item.menu_icon" class-name="i-icon"></c-icon>
          <span slot="title">{{ item.menu_name }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
  <div v-else>
    <template v-for="item in menus">
      <template v-if="!item.hidden && item.subMenus.length > 0">
        <el-menu-item
          v-if="
            item.noMe &&
              item.subMenus[0] &&
              item.subMenus[0].noMe &&
              item.subMenus[0].subMenus[0] &&
              !item.subMenus[0].subMenus[0].noMe
          "
          @click="executeRouter(item.subMenus[0].subMenus[0])"
          :index="item.subMenus[0].subMenus[0].name"
          :key="item.subMenus[0].subMenus[0].name"
          class="el-menu--nochildren"
        >
          <c-icon
            :icon-class="item.subMenus[0].subMenus[0].icon"
            class-name="i-icon"
          ></c-icon>
          <span slot="title">{{ item.subMenus[0].subMenus[0].title }}</span>
        </el-menu-item>
        <el-menu-item
          v-else-if="item.noMe && item.subMenus[0] && !item.subMenus[0].noMe"
          class="el-menu--nochildren"
          v-for="_item in item.subMenus"
          @click="executeRouter(_item)"
          :index="_item.name"
          :key="_item.name"
        >
          <c-icon :icon-class="_item.icon" class-name="i-icon"></c-icon>
          <span slot="title">{{ _item.title }}</span>
        </el-menu-item>
        <el-submenu
          v-else
          @click.native="executeRouter(item)"
          :key="item.path"
          :index="item.path"
        >
          <template slot="title">
            <c-icon :icon-class="item.icon" class-name="i-icon"></c-icon>
            <span slot="title">{{ item.title }}</span>
          </template>
          <template v-for="child in item.subMenus">
            <template v-if="!child.hidden">
              <sub-menu
                v-if="child.subMenus[0] && !child.subMenus[0].noMe"
                :menus="[child]"
                @executeRouter="executeRouter"
                :key="child.name"
              ></sub-menu>
              <sub-menu
                v-else-if="
                  child.subMenus[0] &&
                    child.subMenus[0].subMenus[0] &&
                    !child.subMenus[0].subMenus[0].noMe
                "
                :menus="[child.subMenus[0]]"
                @executeRouter="executeRouter"
                :key="child.subMenus[0].name"
              ></sub-menu>
              <el-menu-item
                v-else
                :index="child.name"
                :key="child.name"
                @click.native="executeRouter(child)"
              >
                <span v-if="child.title">{{ child.title }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-submenu>
      </template>
    </template>
  </div>
</template>
<script>
import CIcon from '@/modules/components/icon/CIcon'
export default {
  name: 'subMenu',
  components: { CIcon },
  props: {
    menus: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    executeRouter(menu) {
      this.$emit('executeRouter', menu)
    }
  }
}
</script>
