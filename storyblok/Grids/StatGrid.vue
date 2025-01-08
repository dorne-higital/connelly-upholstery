<template>
    <section
        v-editable="blok"
        :class="[
            dynamicClass
        ]"
        class="stat-grid"
    >
        <div class="block-container">
            <StoryblokComponent
                v-for="card in blok.stats"
                :key="card._uid"
                :blok="card"
            />
        </div>
    </section>
</template>

<script>
    export default {
        name: 'statGrid',
        componentName: {
            type: String,
            default: 'stat-grid'
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

    .stat-grid {
		align-items: center;
        background: $bg-tertiary;
        color: $tertiary-color;
        display: flex;
        flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
        padding: 2rem;
        width: 100%;

        @media (max-width: 600px) {
            padding: 2rem 1rem;
            width: 100%;
        }

        &.color-1 {
            background-color: $color-4;
            color: $secondary-color;
        }

        &.color-2 {
            background-color: $color-1;
            color: $secondary-color;
        }

        &.color-3 {
            background-color: $color-2;
            color: $secondary-color;
        }

        &.color-4 {
            background-color: $color-3;
        }

        &.color-5 {
            background-color: $secondary-color;
        }

        .block-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
			justify-content: center;
			width: 100%;
            max-width: $sw;

            @media (max-width: 600px) {
                padding: 0;
                width: 100%;
            }
        }
    }
</style>