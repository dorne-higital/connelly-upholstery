<template>
    <section
        v-editable="blok"
        :class="[
            componentName,
            dynamicClass
        ]"
        class="quote-carousel"
    >
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
        </div>

		<carousel 
			v-bind="carouselSettings"
			class="quote-container"
		>
			<slide
				v-for="blok in blok.quotes"
				:key="blok._uid"
			>
				<StoryblokComponent
					:blok="blok"
				/>
			</slide>

			<template #addons>
				<Navigation />
				<Pagination />
			</template>
		</carousel>

    </section>
</template>

<script>
	import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

	import 'vue3-carousel/dist/carousel.css'

    export default {
        name: 'quoteCarousel',
        components: {
			Carousel,
			Slide,
			Pagination,
			Navigation,
        },
        props: {
            componentName: {
                type: String,
                default: 'quote-carousel'
            },
            blok: {
                type: Object,
            }
        },
        data() {
            return {
                carouselSettings: {
                    autoplay:  6000,
                    itemsToShow: 1,
                    snapAlign: 'center',
                    wrapAround: true,
                },
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

    .quote-carousel {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 5rem 2rem;
		text-align: center;
        width: 100%;

        @media (max-width: 600px) {
            flex-direction: column;
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
        
		.quote-container {
			text-align: center;
			width: 100%;
		}
    }
</style>