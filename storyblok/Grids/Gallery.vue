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
        width: 100%;

        @media (max-width: 600px) {
            padding: 2rem 1rem;
            width: 100%;
        }

        //////////////////
        // Theme styles //
        //////////////////
        
        &.theme-dark {
            background-color: $bg-secondary;
            color: $secondary-color;
        }

        &.theme-color-1 {
            background-color: $color-1;
            color: $primary-color;
        }

        &.theme-color-2 {
            background-color: $color-2;
            color: $secondary-color;
        }

        .content-container {
            flex: 1;
            padding: 1rem 2rem;
            max-width: $sw;
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
    }
</style>