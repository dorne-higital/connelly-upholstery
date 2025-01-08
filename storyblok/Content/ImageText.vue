<template>
    <section
        v-editable="blok"
        :style="{ 
            backgroundColor: blok.bgColour.value 
        }"
        :class="[
            blok.imageAlign
        ]"
        class="image-text"
    >
        <div class="img-container">
            <img 
                :src="blok.image.filename" 
                :alt="blok.image.alt"
            >
        </div>

        <div class="content-container">
            <p 
                v-if="blok?.label?.length"
                class="description-header"
            >
                {{ blok.label }}
            </p>

            <h2 v-if="blok?.heading?.length">
                {{ blok.heading }}
            </h2>

            <h4 v-if="blok?.subheading?.length">
                {{ blok.subheading }}
            </h4>

            <div v-html="resolvedRichText"></div>

            <nuxt-link 
                v-if="blok?.linkText?.length"
                :to="blok.linkUrl.cached_url"
                class="button"
            >
                {{ blok.linkText }}
            </nuxt-link>
        </div>
    </section>
</template>

<script>
    import { RichTextResolver } from '@storyblok/vue';

    export default {
        name: 'imageText',
        props: {
            componentName: {
                type: String,
                default: 'image-text'
            },
            blok: {
                type: Object,
            }
        },
        computed: {
            // Resolves the rich text into HTML
            resolvedRichText() {
                if (this.blok?.description) {
                    const resolver = new RichTextResolver();
                    return resolver.render(this.blok.description); // Resolve the rich text field
                }
                return '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~/assets/css/main.scss";

    .image-text {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        padding: 5rem 2rem;
        width: 100%;

        @media (max-width: 600px) {
            flex-direction: column-reverse;
            padding: 2rem 1rem;
            width: 100%;

            &.top {
                flex-direction: column;
            }
        }

        .content-container {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            padding: 1rem 2rem;
            width: 50%;

            @media (max-width: 600px) {
                padding: 1rem;
                width: 100%;
            }

            .button {
                border-bottom: 1px solid;
                width: fit-content;
            }
        }

        .img-container {
            flex: 1;
            width: 50%;

            @media (max-width: 600px) {
                width: 100%;
            }

            img {
                max-height: 30rem;
                width: 100%;
                object-fit: cover;

                @media (max-width: 600px) {
                    max-height: 20rem;
                }
            }
        }
    }
</style>