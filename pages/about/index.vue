<template>
    <div>
        <StoryblokComponent v-if="story" :blok="story.content" />
    </div>
</template>

<script setup>
    const story = await useAsyncStoryblok('about', { version: 'draft' },
        { 
        customParent: 'https://app.storyblok.com' 
        }
    )

    useHead({
        title: 'Connelly Upholstery | Your trusted local Upholstery expert',
        meta: [
            {
                name: 'description',
                content: 'Discover Connelly Upholstery, your trusted experts in furniture restoration, custom upholstery, and fabric repair. Learn about our history, craftsmanship, and commitment to quality for homes and businesses.'
            },
            {
                property: 'og:title',
                content: 'About Connelly Upholstery | Quality Upholstery & Furniture Restoration'
            },
            {
                property: 'og:description',
                content: 'Meet the skilled team behind Connelly Upholstery. We specialize in transforming and restoring furniture with precision and care, serving domestic and commercial clients.'
            },
            {
                name: 'keywords',
                content: 'upholstery business, furniture restoration, custom upholstery, fabric repair, Connelly Upholstery, domestic upholstery, commercial upholstery, furniture repair services'
            },
            {
                property: 'og:type',
                content: 'website'
            }
        ]
    })
</script>