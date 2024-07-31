<template>
    <section
        :class="[
            componentName,
            'theme-' + content.theme,
        ]"
    >
        <div class="content-container">
            <p 
                v-if="content?.label?.length"
                class="description-header"
            >
                {{ content.label }}
            </p>

            <h2
                v-if="content?.heading?.length"
                class="heading"
            >
                {{ content.heading }}
            </h2>

            <div class="quote-container">
                <transition name="slide-fade" mode="out-in">
                    <div 
                        class="quote-content"
                        :key="currentQuote.text"
                    >
                        <h3 class="quote">
                            <sup>"</sup>
                                <i>{{ isFullQuoteVisible || currentQuote.text.length <= maxQuoteLength ? currentQuote.text : truncatedQuote }}</i>
                            <sup>"</sup>
                        </h3>

                        <span 
                            v-if="!isFullQuoteVisible && currentQuote.text.length > maxQuoteLength"
                            class="read-more"
                            @click="isFullQuoteVisible = true" 
                        >
                            Read more
                        </span>

                        <p class="name">
                            {{ currentQuote.name }}
                        </p>
                    </div>
                </transition>
            </div>

            <div class="carousel-dots">
                <span 
                    v-for="(quote, index) in content.quotes" 
                    :key="index"
                    :class="{ active: index === currentIndex }"
                    @click="goToQuote(index)"
                    class="dot"
                ></span>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        name: 'quoteCarousel',
        props: {
            componentName: {
                type: String,
                default: 'quote-carousel'
            },
            content: {
                default: () => ({
                    "theme": "",
                    "label": "section label",
                    "heading": "section heading secondary",
                    "quotes": [
                        { 
                            text: "This is quote 1", 
                            name: "Person 1" 
                        },
                        { 
                            text: "This is quote 2", 
                            name: "Person 2" 
                        },
                        { 
                            text: "This is quote 3", 
                            name: "Person 3" 
                        },
                        { 
                            text: "This is quote 4", 
                            name: "Person 2" 
                        },
                        { 
                            text: "This is quote 5", 
                            name: "Person 3" 
                        },
                    ]

                }),
                type: Object
            }
        },
        data() {
            return {
                currentIndex: 0,
                timer: null,
                isFullQuoteVisible: false,
                maxQuoteLength: 100 // Adjust this value as needed
            };
        },
        computed: {
            currentQuote() {
                return this.content.quotes[this.currentIndex];
            },
            truncatedQuote() {
                if (this.currentQuote.text.length > this.maxQuoteLength) {
                    return this.currentQuote.text.substring(0, this.maxQuoteLength) + '...';
                }
                return this.currentQuote.text;
            }
        },
        methods: {
            nextQuote() {
                this.currentIndex = (this.currentIndex + 1) % this.content.quotes.length;
                this.isFullQuoteVisible = false; // Reset visibility when changing quote
            },
            goToQuote(index) {
                this.currentIndex = index;
                this.isFullQuoteVisible = false; // Reset visibility when changing quote
            },
            // startAutoScroll() {
            //     this.timer = setInterval(this.nextQuote, 10000);
            // },
            // stopAutoScroll() {
            //     clearInterval(this.timer);
            //     this.timer = null;
            // }
        },
        mounted() {
            // this.startAutoScroll();
        },
        beforeDestroy() {
            // this.stopAutoScroll();
        },
    }
</script>

<style lang="scss" scoped>
    @import "~/assets/css/main.scss";

    .quote-carousel {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding: 4rem;
        width: 100%;

        @media only screen and (max-width: 600px) {
            padding: 1rem;
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
            color: $secondary-color;
        }

        &.theme-color-2 {
            background-color: $color-2;
            color: $secondary-color;
        }

        &.theme-color-3 {
            background-color: $color-3;
            color: $primary-color;
        }

        .content-container {
            text-align: center;
        }

        .quote-container {
            align-items: center;
            display: flex;
            justify-content: center;
            padding: 2rem;

            @media only screen and (max-width: 600px) {
                padding: 2rem 0;
            }
        }

        .quote-content {
            flex: 1;
            text-align: center;

            .read-more {
                cursor: pointer;
                font-size: 1rem;
                text-decoration: underline;
            }

            .quote {
                margin-bottom: .3rem;
            }

            .name {
                margin-top: .7rem;
            }
        }

        .slide-fade-enter-active,
        .slide-fade-leave-active {
            transition: all 0.5s ease;
        }

        .slide-fade-enter,
        .slide-fade-leave-to {
            transform: translateX(100%);
            opacity: 0;
        }

        .carousel-dots {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 1rem;

            .dot {
                background-color: $color-3;
                border-radius: .5rem;
                cursor: pointer;
                height: 0.75rem;
                width: 0.75rem;
                transition: background-color 0.3s;

                &.active {
                    background-color: $secondary-color;
                    width: 2rem;
                }
            }
        }
    }
</style>
