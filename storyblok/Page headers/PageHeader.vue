<template>
    <section 
        v-editable="blok"
        :class="[
            componentName,
        ]"
    >
        <div 
            class="header-container"
            :class="[
                dynamicClass,
                blok.shape
            ]"
        >
            <p 
                v-if="blok?.label?.length"
                class="description-header"
            >
                {{ blok.label }}
            </p>

            <h1
                v-if="blok?.heading?.length"
            >
                {{ blok.heading }}
            </h1>

            <h3
                v-if="blok?.subheading?.length"
            >
                {{ blok.subheading }}
            </h3>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'pageHeader',
        components: {
            
        },
        props: {
            componentName: {
                type: String,
                default: 'page-header'
            },
            blok: {
                type: Object
            }
        },
        data() {
            return {
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

    .page-header {
        .header-container {
            align-items: center;
            background: $bg-tertiary;
            color: $primary-color;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 7rem 4rem 4rem;

            &.straight {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }

            &.angular {
                clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
            }

            &.slash {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);
            }

            @media (max-width: 600px) {
                flex-wrap: wrap;
                gap: 1rem;
                padding: 6rem 1rem 5rem;
                text-align: center;
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
        }  
    }
</style>