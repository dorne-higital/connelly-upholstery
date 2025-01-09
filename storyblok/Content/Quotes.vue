<template>
    <section
        v-editable="blok"
        class="quotes"
    >
        <div class="content-container">
            <h4 v-if="blok?.quote?.length">
                "{{ blok.quote }}"
			</h4>

            <p 
				v-if="blok?.author?.length"
				class="quote-author"
			>
                - {{ blok.author }}
			</p>
        </div>

    </section>
</template>

<script>
    export default {
        name: 'quotes',
        components: {
        },
        props: {
            componentName: {
                type: String,
                default: 'quotes'
            },
            blok: {
                type: Object,
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~/assets/css/main.scss";

    .quotes {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        padding: 5rem 2rem;
        width: 100%;

        @media (max-width: 600px) {
            flex-direction: column;
            padding: 2rem 1rem;
            width: 100%;
        }

		.content-container {
			margin: 0 auto;
			text-align: center;
			width: 80%;

			.quote-author {
			}
		}
    }
</style>