<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
            dynamicClass
        ]"
    >
        <div 
            class="content-container"
            :style="{ 
                'text-align': blok.align 
            }"
        >
            <p 
                v-if="blok?.label?.length"
                class="description-header"
            >
                {{ blok.label }}
            </p>

            <h2
                v-if="blok?.heading?.length"
                class="heading"
            >
                {{ blok.heading }}
            </h2>

            <h4
                v-if="blok?.subheading?.length"
                class="subheading"
            >
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
        name: 'textColOne',
        props: {
            componentName: {
                type: String,
                default: 'text-col-one'
            },
            blok: {
                type: Object
            },
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
            // Resolves the rich text into HTML
            resolvedRichText() {
                if (this.blok?.description) {
                    const resolver = new RichTextResolver();
                    return resolver.render(this.blok.description); // Resolve the rich text field
                }
                return '';
            },

            dynamicClass() {
                const color = this.blok.bgColour.value;
                return this.colorClassMapping[color] || '';
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~/assets/css/main.scss";

    .text-col-one {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        padding: 5rem 2rem;
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
            display: flex;
            flex-direction: column;
            padding: 1rem 2rem 0;
            width: 100%;

            @media (max-width: 600px) {
                padding: 1rem 0;
            }

            .button {
                background-color: $bg-secondary;
                border: 2px solid $bg-secondary;
                color: $secondary-color;
                cursor: pointer;
                margin-top: 1rem;
                padding: .5rem 1.5rem;
                transition: .3s;
                width: fit-content;

                &:hover {
                    background-color: transparent;
                    color: $primary-color;
                    transition: .3s;
                }
            }
        }
    }
</style>