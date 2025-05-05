<template>
    <div>
        <StoryblokComponent v-if="story" :blok="story.content" />
    </div>
</template>

<script setup>
    const story = await useAsyncStoryblok('home', { version: 'draft' },
        { 
            customParent: 'https://app.storyblok.com' 
        }
    )

    useHead({
        title: 'Connelly Upholstery | Your local Upholstery expert',
        meta: [
            {
                name: 'description',
                content: 'Connelly Upholstery offers expert upholstery services, furniture restoration, and bespoke fabric solutions for homes and businesses. Serving [Your City/Region], we bring new life to your furniture with craftsmanship you can trust.'
            },
            {
                property: 'og:title',
                content: 'Connelly Upholstery | Expert Upholstery & Furniture Restoration'
            },
            {
                property: 'og:description',
                content: 'Discover premium upholstery and furniture restoration with Connelly Upholstery. From domestic to commercial projects, we deliver quality and care every time.'
            },
            {
                name: 'keywords',
                content: 'upholstery services, furniture restoration, custom upholstery, fabric repair, Connelly Upholstery, [Your City] upholstery, commercial upholstery, domestic upholstery'
            },
            {
                property: 'og:type',
                content: 'website'
            }
        ]
    })
</script>