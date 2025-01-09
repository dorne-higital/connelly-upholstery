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
        max-width: 33%;
        padding: 1rem;

        @media (max-width: 600px) {
            max-width: 50%;
            min-height: 100%;
            object-fit: cover;
            padding: .5rem;
        }

		img {
			max-width: 100%;
			object-fit: cover;
		}
    }
</style>