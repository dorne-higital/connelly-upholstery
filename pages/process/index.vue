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
        title: 'Connelly Upholstery | The process to a perfect upholstered piece of furniture',
        meta: [
            {
                name: 'description',
                content: 'Learn about Connelly Upholstery’s detailed process for restoring and upholstering furniture. From consultation to final delivery, we ensure top-quality craftsmanship at every step.'
            },
            {
                property: 'og:title',
                content: 'Connelly Upholstery | Our Upholstery & Restoration Process'
            },
            {
                property: 'og:description',
                content: 'Explore our step-by-step upholstery and furniture restoration process, designed to bring new life to your furnishings with expert care and precision.'
            },
            {
                name: 'keywords',
                content: 'upholstery process, furniture restoration process, how upholstery works, Connelly Upholstery, restoration steps, custom upholstery, craftsmanship'
            },
            {
                property: 'og:type',
                content: 'website'
            }
        ]
    })
</script>