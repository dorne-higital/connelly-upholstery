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
        title: 'Connelly Upholstery | Upholstery & Repair Services',
        meta: [
            {
                name: 'description',
                content: 'Discover the full range of upholstery services offered by Connelly Upholstery, including domestic and business upholstery, furniture repairs, and custom foam interiors.'
            },
            {
                property: 'og:title',
                content: 'Connelly Upholstery | Upholstery & Repair Services'
            },
            {
                property: 'og:description',
                content: 'Explore our professional upholstery and repair services for homes and businesses. We provide expert craftsmanship in reupholstery, repairs, and foam replacements.'
            },
            {
                name: 'keywords',
                content: 'upholstery services, furniture repair, domestic upholstery, commercial upholstery, foam interiors, Connelly Upholstery, custom upholstery'
            },
            {
                property: 'og:type',
                content: 'website'
            }
        ]
    })
</script>