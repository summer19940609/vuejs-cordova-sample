// Require Cordova plugin : cordova-plugin-camera

<template>
    <v-container text-center>
        <img v-if="imagePath !== ''" :src="imagePath" />
        <v-btn @click="takePicture">拍照</v-btn>
    </v-container>
</template>
<script>
import { nativeAlert } from '../libs/index';

export default {
    name: 'camera',
    data() {
        return {
            imagePath: '',
        };
    },
    methods: {
        takePicture() {
            if (navigator.camera) {
                navigator.camera.getPicture(this.setPicture, this.error, {});
            } else {
                // If the navigator.camera is not available display generic error to the user.
                this.error();
            }
        },
        // Set the picture path in the data of the vue
        // this action will automatically update the view.
        setPicture(imagePath) {
            this.imagePath = imagePath;
        },
        error() {
            nativeAlert('发生错误');
        },
    },
};
</script>

<style scoped>
img {
    width: 50%;
    display: block;
    margin: auto;
}
</style>
