<template>
    <div>
        <StoryblokComponent v-if="story" :blok="story.content" />

        <form name="contact" netlify>
            <p>
                <label>Name <input type="text" name="name" /></label>
            </p>
            <p>
                <label>Email <input type="email" name="email" /></label>
            </p>
            <p>
                <button type="submit">Send</button>
            </p>
        </form>
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