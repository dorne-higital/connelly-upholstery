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
        title: 'Connelly Upholstery | Get to know us',
        meta: [
            {
                name: 'description',
                content: 'About page'
            },
            {
                property: 'og:title',
                content: 'Connelly Upholstery | Get to know us'
            },
            {
                property: 'og:description',
                content: 'About page'
            },
        ]
    })
</script>