<template>
    <v-container text-center>
        <div class="home">
            <h4>主页</h4>
            <v-btn @click="openMenu" class="mt-10">打开侧边栏</v-btn>
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'home',
    created() {
        this.$store.commit('setTitle', '主页');
    },
    methods: {
        openMenu: () => {
            // When user tap the button dispatch an event into the dom.
            // Its will trigger the drawer Open event in (componnents/Drawer.vue)
            document.dispatchEvent(new CustomEvent('toggleDrawer', {}));
        },
    },
};
</script>

<style scoped></style>
