<template>
    <div>
        <StoryblokComponent v-if="story" :blok="story.content" />
    </div>
</template>

<script setup>
    const story = await useAsyncStoryblok('home', { version: 'draft' },
        { 
        customParent: 'https://app.storyblok.com' 
        }
    )

    useHead({
      title: 'Connelly Upholstery | The home page',
      meta: [
          {
              name: 'description',
              content: 'Description'
          },
          {
              property: 'og:title',
              content: 'Connelly Upholstery | Home pahe'
          },
          {
              property: 'og:description',
              content: 'Description'
          },
      ]
  })
</script>