<template>
    <div>
        <StoryblokComponent v-if="story" :blok="story.content" />
    </div>
</template>

<script setup>
    const story = await useAsyncStoryblok('work', { version: 'draft' },
        { 
        customParent: 'https://app.storyblok.com' 
        }
    )

    useHead({
        title: 'Connelly Upholstery | Our Upholstery Projects',
        meta: [
            {
                name: 'description',
                content: 'View recent upholstery projects completed by Connelly Upholstery. Browse our recent work to see the quality of our domestic and commercial furniture transformations.'
            },
            {
                property: 'og:title',
                content: 'Connelly Upholstery | Our Upholstery Projects'
            },
            {
                property: 'og:description',
                content: 'Discover completed upholstery work by Connelly Upholstery, showcasing our craftsmanship in restoring and transforming furniture for homes and businesses.'
            },
            {
                name: 'keywords',
                content: 'upholstery projects, completed projects, furniture restoration, Connelly Upholstery work, before and after, upholstery showcase'
            },
            {
                property: 'og:type',
                content: 'website'
            }
        ]
    })
</script>