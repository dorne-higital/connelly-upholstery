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
    );

    useHead({
        title: 'Connelly Upholstery | Get in touch',
        meta: [
            {
                name: 'description',
                content: 'Get in touch with Connelly Upholstery for expert furniture restoration, custom upholstery, and fabric repairs. Request a free quote or ask us any questions—serving both residential and commercial clients.'
            },
            {
                property: 'og:title',
                content: 'Contact Connelly Upholstery | Get in touch'
            },
            {
                property: 'og:description',
                content: 'Need expert upholstery services? Contact Connelly Upholstery today for custom furniture restoration, repair, and upholstery services for homes and businesses.'
            },
            {
                name: 'keywords',
                content: 'contact upholstery business, furniture repair quote, custom upholstery services, Connelly Upholstery contact, upholstery consultation, commercial upholstery services, fabric repair'
            },
            {
                property: 'og:type',
                content: 'website'
            }
        ]
    });
</script>

<style scoped>
	.success-message {
		color: green;
		margin-top: 10px;
	}

	.error-message {
		color: red;
		margin-top: 10px;
	}
</style>