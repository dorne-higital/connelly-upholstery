<template>
    <section
        v-editable="blok"
        :class="[
            blok.imageAlign,
            dynamicClass
        ]"
        class="image-cards"
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
    export default {
        name: 'imageCards',
        props: {
            componentName: {
                type: String,
                default: 'image-cards'
            },
            blok: {
                type: Object,
            }
        },
        data() {
            return {
            };
        },
        computed: {
            dynamicClass() {
                const color = this.blok.bgColour.value;
                return this.colorClassMapping[color] || '';
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~/assets/css/main.scss";

    .image-cards {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        padding: 5rem 2rem;
        width: 100%;

        &.color-1 {
            background-color: $color-4;
            color: $secondary-color;

            a {
                color: $secondary-color;
                cursor: pointer;
            }
        }

        &.color-2 {
            background-color: $color-1;
            color: $secondary-color;

            a {
                color: $secondary-color;
                cursor: pointer;
            }
        }

        &.color-3 {
            background-color: $color-2;
            color: $secondary-color;

            a {
                color: $secondary-color;
                cursor: pointer;
            }
        }

        &.color-4 {
            background-color: $color-3;

            a {
                cursor: pointer;
            }
        }

        &.color-5 {
            background-color: $secondary-color;

            a {
                cursor: pointer;
            }
        }

        @media (max-width: 600px) {
            flex-direction: column-reverse;
            padding: 2rem 1rem;
            width: 100%;

            &.top {
                flex-direction: column;
            }

            &.text-image {
                flex-direction: column;
            }
        }

        &.text-image {
            flex-direction: row-reverse;

            .content-container {
                align-items: flex-end;
                text-align: right;
            }
        }

        .content-container {
            align-items: flex-start;
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            padding: 1rem 2rem;
            text-align: left;
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