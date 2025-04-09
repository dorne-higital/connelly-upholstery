<template>
    <section
        v-editable="blok"
        :class="[
            // dynamicClass
        ]"
        class="locate-with-form"
    >
        <div class="block-container">
			<div class="row">
				<div class="item">
					<h3>{{ blok.heading }}</h3>

					<ul class="hours" v-if="openingHours">
						<li v-for="(hours, day) in openingHours" :key="day">
							<p>{{ day }}</p>
							<p>{{ hours }}</p>
						</li>
					</ul>
				</div>
			</div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'locateWithForm',
        componentName: {
            type: String,
            default: 'locate-with-form'
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
				},
				openingHours: null,
            };
        },
		mounted() {
			this.fetchOpeningHours();
		},
        computed: {
            // dynamicClass() {
            //     const color = this.blok.bgColour.value;
            //     return this.colorClassMapping[color] || '';
            // },
		},
		methods: {
			async fetchOpeningHours() {
				try {
					const response = await fetch(
						`https://api.storyblok.com/v2/cdn/datasource_entries?datasource=opening-hours&token=XFpR0AEuvI2nLhpnj3F3iwtt&version=draft`
					);
					const data = await response.json();
					this.openingHours = Object.fromEntries(
					data.datasource_entries.map((entry) => [entry.name, entry.value])
					);
				} catch (error) {
					console.error("Error fetching opening hours:", error);
				}
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