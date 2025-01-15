<template>
    <section 
        v-editable="blok"
        class="page-header"
    >
        <div 
            class="header-container"
            :style="{ 
                backgroundColor: blok.bgColour.value 
            }"
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
            blok: {
                type: Object
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "~/assets/css/main.scss";

    .page-header {
        .header-container {
            align-items: center;
            background: $bg-tertiary;
            clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
            color: $primary-color;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 4rem;

            @media (max-width: 600px) {
                flex-wrap: wrap;
                gap: 1rem;
                padding: 3rem 1rem 5rem;
                text-align: center;
            }

            //////////////////
            // Theme styles //
            //////////////////
            
            &.dark {
                background: $bg-secondary;
                color: $secondary-color;
            }
            
            &.color-1 {
                background: $color-1;
                color: $primary-color;
            }
            
            &.color-2 {
                background: $color-2;
                color: $primary-color;
            }
            
            &.gradient-1 {
                background: linear-gradient($bg-primary, $color-1);
                color: $primary-color;
            }
            
            &.gradient-2 {
                background: linear-gradient($bg-primary, $color-2);
                color: $primary-color;
            }
        }  
    }
</style>