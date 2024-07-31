<template>
    <section
        :class="[
            componentName,
            'theme-' + content.theme,
            'order-' + content.order,
        ]"
    >
        <div class="content-container">
            <p 
                v-if="content?.label?.length" 
                class="description-header"
            >
                {{ content.label }}
            </p>

            <h1 v-if="content?.heading?.length">
                {{ content.heading }}
            </h1>

            <h4 v-if="content?.subheading?.length">
                {{ content.subheading }}
            </h4>

            <div class="card-container">
                <div 
                    v-for="(card, index) in content.cards" 
                    :key="index" 
                    class="card"
                >
                    <component 
                        :is="resolveIconComponent(card.icon)" 
                        class="card-icon" 
                    />

                    <div class="card-content">
                        <h4 class="card-title">
                            {{ card.title }}
                        </h4>

                        <p v-if="content?.cards[index].description?.length">
                            {{ card.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="img-container">
            <img 
                :src="content.image.src" 
                :alt="content.image.alt"
            >
        </div>
    </section>
</template>
  
<script>
    import { defineAsyncComponent } from 'vue';

    export default {
        name: 'textImageIconsSplit',
        props: {
            componentName: {
                type: String,
                default: 'text-image-icons-split'
            },
            content: {
                default: () => ({
                    theme: "",
                    order: "image-text",
                    label: "section label",
                    heading: "section heading secondary",
                    subheading: "optional section subheading",
                    image: {
                        src: "",
                        alt: ""
                    },
                    cards: [
                        {
                            icon: "icon-home",
                            title: "Card 1",
                            description: "Example description",
                        },
                        {
                            icon: "icon-business",
                            title: "Card 2",
                            description: "Example description",
                        },
                    ]
                }),
                type: Object
            }
        },
        methods: {
            resolveIconComponent(iconName) {
                // Use defineAsyncComponent to dynamically import the icon components
                try {
                    return defineAsyncComponent(() => import(`@/components/icons/${iconName}.vue`));
                } catch (e) {
                    console.error(`Icon component ${iconName} not found.`);
                    return null;
                }
            }
        }

    }
</script>
  
<style lang="scss" scoped>
    @import "~/assets/css/main.scss";

    .text-image-icons-split {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        padding: 5rem 2rem;
        width: 100%;

        @media only screen and (max-width: 600px) {
            flex-direction: column-reverse;
            padding: 3rem 0;
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

        //////////////////
        // Order styles //
        //////////////////

        &.order-image-text {
            flex-direction: row-reverse;

            @media only screen and (max-width: 600px) {
                flex-direction: column;
            }
        }

        &.order-text-image {
            flex-direction: row;

            @media only screen and (max-width: 600px) {
                flex-direction: column;
            }
        }

        .content-container {
            flex: 1;
            padding: 1rem 2rem;
            width: 50%;

            @media only screen and (max-width: 600px) {
                padding: 0 1rem;
                width: 100%;
            }

            .card-container {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 1rem;
                width: 100%;

                .card {
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    gap: 1rem;
                    padding: .5rem;
                    width: 45%;

                    @media only screen and (max-width: 600px) {
                        padding: 0;
                        width: 100%;

                        h4 {
                            font-size: 1.3rem;
                        }

                        svg {
                            height: 3rem;
                        }
                    }

                    h4,
                    p {
                        margin-bottom: 0;
                    }

                    p {
                        font-size: .9rem;
                    }
                }
            }
        }

        .img-container {
            flex: 1;
            width: 50%;

            @media only screen and (max-width: 600px) {
                width: 100%;
            }

            img {
                max-height: 30rem;
                object-fit: cover;
                width: 100%;
            }
        }
    }
</style>
  