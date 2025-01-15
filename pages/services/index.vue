<template>
    <div>
        <StoryblokComponent v-if="story" :blok="story.content" />
    </div>
</template>

<script setup>
    const story = await useAsyncStoryblok('services', { version: 'draft' },
        { 
        customParent: 'https://app.storyblok.com' 
        }
    )

    useHead({
        title: 'Connelly Upholstery | Services',
        meta: [
            {
                name: 'description',
                content: 'Services page'
            },
            {
                property: 'og:title',
                content: 'Connelly Upholstery | Services'
            },
            {
                property: 'og:description',
                content: 'Services page'
            },
        ]
    })
</script>