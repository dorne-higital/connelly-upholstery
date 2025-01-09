<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
            dynamicClass
        ]"
        class="gallery"
    >
        <div 
            v-if="blok?.label?.length && blok?.heading?.length && blok?.subheading?.length"
            :style="{ 
            }"
			class="content-container"
		>
            <p 
                v-if="blok?.label?.length"
                class="description-header"
            >
                {{ blok.label }}
            </p>

            <h1 v-if="blok?.heading?.length">
                {{ blok.heading }}
            </h1>

            <h4 v-if="blok?.subheading?.length">
                {{ blok.subheading }}
            </h4>
        </div>

        <div class="block-container">
            <StoryblokComponent
                v-for="blok in blok.image"
                :key="blok._uid"
                :blok="blok"
            />
        </div>

        <nuxt-link 
            v-if="blok?.linkText?.length"
            :to="blok.linkUrl.cached_url"
            class="button"
        >
            {{ blok.linkText }}
        </nuxt-link>
    </section>
</template>

<script>
    export default {
        name: 'gallery',
        componentName: {
            type: String,
            default: 'gallery'
        },
        props: {
            blok: {
                type: Object
            }
        },
        data() {
            return {
                // Define color mappings in data
                colorClassMapping: {
                    '#3b4944': 'color-1',
                    '#273664': 'color-2',
                    '#885219': 'color-3',
                    '#efefef': 'color-4',
                    '#FEFCFB': 'color-5',
                }
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

    .gallery {
		align-items: center;
        background: $bg-tertiary;
        color: $tertiary-color;
        display: flex;
        flex-direction: column;
        padding: 2rem 5rem;
        text-align: center;
        width: 100%;

        @media (max-width: 600px) {
            padding: 2rem 1rem;
            width: 100%;
        }

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

        .content-container {
            flex: 1;
            max-width: $sw;
            padding: 1rem 2rem;
            text-align: center;
        }

        .block-container {
            display: flex;
            flex-wrap: wrap;
            padding: 1rem;
            max-width: $sw;

            @media (max-width: 600px) {
                padding: 0;
                width: 100%;
            }
        }

        .button {
            background-color: $primary-color;
            border: 2px solid transparent;
            color: $secondary-color;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            padding: .75rem 2.25rem;
            transition: .2s;

            &:hover {
                border: 2px solid $secondary-color;
                transition: .3s;
            }
        }
    }
</style>