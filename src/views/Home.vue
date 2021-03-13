<template>
    <v-container text-center>
        <div class="home">
            <h4>{{ $t('title') }}</h4>
            <v-btn @click="openMenu" class="mt-10">{{
                $t('showSample')
            }}</v-btn>
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'home',
    methods: {
        openMenu: () => {
            // When user tap the button dispatch an event into the dom.
            // Its will trigger the drawer Open event in (componnents/Drawer.vue)
            document.dispatchEvent(new CustomEvent('toggleDrawer', {}));
        },
    },
};
</script>

<style scoped>

</style>
