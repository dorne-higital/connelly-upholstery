<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
            dynamicClass
        ]"
    >
        <div class="content-container">
            <div 
                class="content"
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
            </div>

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
        name: 'callToActionBlock',
        props: {
            componentName: {
                type: String,
                default: 'call-to-action-block'
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
            dynamicClass() {
                const color = this.blok.bgColour.value;
                return this.colorClassMapping[color] || '';
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~/assets/css/main.scss";

    .call-to-action-block {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        padding: 3rem 1rem;
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

            .content-container {
                .button {
                    background-color: transparent;
                    border: 2px solid $bg-primary;
                    color: $secondary-color;

                    &:hover {
                        background-color: $bg-primary;
                        color: $primary-color;
                    }
                }
            }
        }

        &.color-2 {
            background-color: $color-1;
            color: $secondary-color;

            a {
                color: $secondary-color;
                cursor: pointer;
            }

            .content-container {
                .button {
                    background-color: transparent;
                    border: 2px solid $bg-primary;
                    color: $secondary-color;

                    &:hover {
                        background-color: $bg-primary;
                        color: $primary-color;
                    }
                }
            }
        }

        &.color-3 {
            background-color: $color-2;
            color: $secondary-color;

            a {
                color: $secondary-color;
                cursor: pointer;
            }

            .content-container {
                .button {
                    background-color: transparent;
                    border: 2px solid $bg-primary;
                    color: $secondary-color;

                    &:hover {
                        background-color: $bg-primary;
                        color: $primary-color;
                    }
                }
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
            align-items: center;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 0 auto;
            max-width: $sw;
            padding: 0 1rem;
            width: 100%;

            .button {
                background-color: $bg-secondary;
                border: 2px solid $bg-secondary;
                color: $secondary-color;
                cursor: pointer;
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