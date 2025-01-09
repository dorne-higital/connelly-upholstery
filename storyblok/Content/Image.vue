<template>
    <section
        v-editable="blok"
        class="image"
    >
		<img 
			:src="blok.image.filename" 
			:alt="blok.image.alt"
		>
    </section>
</template>

<script>
    export default {
        name: 'image',
        props: {
            componentName: {
                type: String,
                default: 'image'
            },
            blok: {
                type: Object,
            }
        },
        computed: {
        }
    }
</script>

<style lang="scss" scoped>
    @import "~/assets/css/main.scss";

    .image {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        padding: 1rem;
		max-width: 50%;

        @media (max-width: 600px) {
            flex-direction: column-reverse;
            padding: 1rem 0;
            max-width: 100%;
        }

		img {
			max-width: 100%;
			object-fit: cover;
		}
    }
</style>