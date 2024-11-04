<template>
    <div>
        <page-hero 
            :content='{
                "theme": "dark",
                "align": "centre",
                "label": "Connelly Upholstery",
                "heading": "A little about us",
                "image": {
                    "src": imageSrc,
                    "alt": "Header image of some of our work"
                }
            }'
        />
    </div>
</template>
  
<script>
    import imageSrc from '~/assets/images/gallery/business_chairs.jpeg';

    export default {
        data() {
            return {
                imageSrc
            }
        }
    }
</script>
  