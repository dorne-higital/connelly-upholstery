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
        title: 'Connelly Upholstery | Our work',
        meta: [
            {
                name: 'description',
                content: 'Work page'
            },
            {
                property: 'og:title',
                content: 'Connelly Upholstery | Our work'
            },
            {
                property: 'og:description',
                content: 'Work page'
            },
        ]
    })
</script>