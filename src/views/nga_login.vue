<template>
  <v-container class="login-container">
    <iframe id="nga-login" name="iff" src="https://ngabbs.com/nuke/account_copy.html?login" scrolling="no" frameborder="0" border="0" style="border: 0px; margin: auto;"></iframe>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            iframeUrl: ''
        };
    },
    mounted() {

    },
    methods: {

    },

};
</script>

<style scoped>
.login-container {
    height: 100%;
    padding: 0;
}
#nga-login {
    width: 100%;
    height: 100%;
}
</style>
