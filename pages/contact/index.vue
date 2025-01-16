<template>
    <div>
        <StoryblokComponent v-if="story" :blok="story.content" />

        <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <!-- Hidden honeypot field to prevent bot submissions -->
  <input type="hidden" name="form-name" value="contact" />
  <p hidden>
    <label>Don’t fill this out: <input name="bot-field" /></label>
  </p>
  <p>
    <label>Your Name: <input type="text" name="name" required /></label>
  </p>
  <p>
    <label>Your Email: <input type="email" name="email" required /></label>
  </p>
  <p>
    <label>Your Role: 
      <select name="role[]" multiple>
        <option value="leader">Leader</option>
        <option value="follower">Follower</option>
      </select>
    </label>
  </p>
  <p>
    <label>Message: <textarea name="message" required></textarea></label>
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