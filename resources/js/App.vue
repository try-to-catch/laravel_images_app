<template>
    <div class="container mx-auto pt-4">
        <form class="w-50 mx-auto text-center">
            <input v-model="title" type="text" name="title" class="form-control">
            <div ref="dropzone" class="bg-dark text-white text-center p-5 btn d-block my-2">Upload</div>
            <button @click.prevent="store" type="submit" class="btn btn-outline-primary d-block w-100">Submit</button>
        </form>

        <div class="mt-5">
            <div v-if="post">
                <h3>{{ post.title }}</h3>
                <div v-for=" image in post.images " :key="image.url">
                    <img :src="image.url" alt="">
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import {Dropzone} from "dropzone";

export default {
    name: "App.vue",
    data() {
        return {
            dropzone: null,
            title: '',
            post: null
        }
    },
    methods: {
        store() {
            this.$nextTick().then(() => {
                const data = new FormData()
                const files = this.dropzone.getAcceptedFiles();

                files.forEach(file => {
                    data.append('images[]', file)
                    this.dropzone.removeFile(file)
                })
                data.append('title', this.title)

                this.title = null

                axios.post('/api/posts', data).then(()=>{this.getPost()})
            })
        },
        getPost() {
            axios.get('/api/posts').then(res => {
                this.post = res.data.data
                console.log(res)
            })
        }
    },
    mounted() {
        this.dropzone = new Dropzone(this.$refs.dropzone, {
            url: '#',
            autoProcessQueue: false,
            maxFiles: 2,
            acceptedFiles: 'image/*,',
            addRemoveLinks: true
        })

        this.getPost()
    }
}
</script>
