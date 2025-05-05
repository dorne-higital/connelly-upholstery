<template>
  <div>
      <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>

<script setup>
  // Fetch the Storyblok content
  const story = await useAsyncStoryblok('home', { version: 'draft' },
      { 
          customParent: 'https://app.storyblok.com' 
      }
  )

  // Set page meta tags
  useHead({
      title: 'Connelly Upholstery | Your favourite local upholstery expert',
      meta: [
          {
              name: 'description',
              content: 'Your favourite local upholstery expert'
          },
          {
              property: 'og:title',
              content: 'Connelly Upholstery | Your favourite local upholstery expert'
          },
          {
              property: 'og:description',
              content: 'Your favourite local upholstery expert'
          },
      ]
  })
</script>
