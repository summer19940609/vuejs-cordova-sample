<template lang="html">
  <div class="home">
    <van-tabs v-model="active" :value="activeTab">
      <van-tab title="游戏综合" value="tab2">
        <home-list title="热门推荐" :topics="topics.games_hot"></home-list>
        <home-list title="暴雪" :topics="topics.games_blizzard"></home-list>
        <home-list title="沃尔沃" :topics="topics.games_valve"></home-list>
        <home-list title="网游" :topics="topics.games_online"></home-list>
        <home-list title="手游" :topics="topics.games_mobile"></home-list>
      </van-tab>
      <van-tab title="游戏综合" value="tab3">
        <home-list title="杂谈" :topics="topics.water"></home-list>
      </van-tab>
      <van-tab title="游戏综合" value="tab4">
        <home-list title="CCQ" :topics="topics.wow"></home-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import topics from '../data/topics.js';
import HomeList from './home_list.vue';

export default {
    data() {
        return {
            activeTab: 'tab1',
            topics: topics,
            my_favs: null,
            message: '',
            toast: false,
            open: false,
            docked: true,
            settings: false,
            is_wifi: false,
        };
    },
    mounted: function () {

    },
    methods: {

    },
    components: {
        HomeList,
    },
};
</script>

<style lang="css">
.menu {
    margin-left: 40px;
}
.home {
    width: 100%;
}
.avatar {
    text-align: center;
}
.avatar-paper {
    position: relative;
    margin-top: 30px;
    margin-bottom: 20px;
    margin-left: 80px;
    width: 100px;
}
</style>
