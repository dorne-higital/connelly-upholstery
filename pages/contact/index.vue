<template>
    <div>
        <StoryblokComponent v-if="story" :blok="story.content" />
    </div>
</template>

<script setup>
    const story = await useAsyncStoryblok('contact', { version: 'draft' },
        { 
        customParent: 'https://app.storyblok.com' 
        }
    )

    useHead({
        title: 'Connelly Upholstery | Contact us',
        meta: [
            {
                name: 'description',
                content: 'Contact page'
            },
            {
                property: 'og:title',
                content: 'Connelly Upholstery | Contact us'
            },
            {
                property: 'og:description',
                content: 'Contact page'
            },
        ]
    })
</script>