<template>
    <div>
        <StoryblokComponent v-if="story" :blok="story.content" />
    </div>
</template>

<script setup>
    const story = await useAsyncStoryblok('process', { version: 'draft' },
        { 
        customParent: 'https://app.storyblok.com' 
        }
    )

    useHead({
        title: 'Connelly Upholstery | Process',
        meta: [
            {
                name: 'description',
                content: 'Process page'
            },
            {
                property: 'og:title',
                content: 'Connelly Upholstery | Process'
            },
            {
                property: 'og:description',
                content: 'Process page'
            },
        ]
    })
</script>