<template>
    <section
        :class="[
            componentName,
        ]"
    >
        <div class="hero-banner">
            <div class="hero-content">
                <p class="description-header">Connelly Upholstery</p>

                <h1>
                    Your favourite local Upholstery expert!
                </h1>

                <nuxt-link 
                    to="/contact"
                    class="button primary"
                >
                    Get in touch
                </nuxt-link>
            </div>

            <div class="img-container">
                <img 
                    src="~/assets/images/gallery/blue_sofa.jpeg" 
                    alt=""
                >
                
                <img 
                    src="~/assets/images/gallery/cross_sofa.jpeg" 
                    alt=""
                >
                
                <img 
                    src="~/assets/images/gallery/silver_sofa.jpg" 
                    alt=""
                    class="last-of-type"
                >
            </div>
        </div>

        <div class="hero-shape"></div>
    </section>
</template>

<script>
    export default {
        name: 'heroMain',
        props: {
            componentName: {
                type: String,
                default: 'hero-main'
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~/assets/css/main.scss";

    .hero-main {
        background-color: $color-3;
        padding: 2rem 5rem 5rem;
    }

    .hero-banner {
        align-items: center;
        color: $primary-color;
        display: flex;
        gap: 5rem;
        justify-content: center;

        .hero-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            padding: 5rem 0;
            text-align: left;
            width: 50%;

            .description-header {
                border-bottom: 1px solid $color-1;
                color: $color-1;
                font-weight: 500;
                width: fit-content;
            }

            .button {
                background-color: $color-1;
                border: 2px solid $color-3;
                color: $secondary-color;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 300;
                margin: .5rem 0;
                padding: .75rem 2.25rem;
                transition: .2s;
                width: fit-content;

                &:hover {
                    // background-color: transparent;
                    border: 2px solid $color-1;
                    transition: .3s;
                }
            }
        }

        .img-container {
            display: flex;
            flex: 1;
            flex-wrap: wrap;
            width: 50%;

            img {
                // box-shadow: -.75rem .75rem 0 0 $color-1;
                border: 1rem solid $color-1;
                max-height: 16rem;
                min-height: 16rem;
                object-fit: cover;
                width: 50%;

                &:first-of-type {
                    border-right: none;
                }
            }

            .last-of-type {
                border-top: none;
                width: 100%;
            }
        }
    }
</style>