import { fetchStories } from './fetchStories.ts'

export default defineNuxtConfig({
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (!nitroConfig || nitroConfig.dev) {
        return
      }
      const token = 'XFpR0AEuvI2nLhpnj3F3iwtt'
 
      let cache_version = 0
 
      // other routes that are not in Storyblok with their slug.
      let routes = ['/'] // adds home directly but with / instead of /home
      try {
        const result = await fetch(`https://api.storyblok.com/v2/cdn/spaces/me?token=${token}`)
 
        if (!result.ok) {
          throw new Error('Could not fetch Storyblok data')
        }
        // timestamp of latest publish
        const space = await result.json()
        cache_version = space.space.version
 
        // Recursively fetch all routes and set them to the routes array
        await fetchStories(routes, cache_version)
       // Adds the routes to the prerenderer
        nitroConfig.prerender.routes.push(...routes)
      } catch (error) {
        console.error(error)
      }
    },
  },

  css: ['@/assets/css/main.css'],

  modules: [
    [
      '@storyblok/nuxt',
      {
        accessToken: 'XFpR0AEuvI2nLhpnj3F3iwtt',
        apiOptions: {
          region: '' // Set 'US" if your space is created in US region (EU default)
        }
      },
    ],
  ],

  components: {
    global: true,
    dirs: ['~/components']
  },

  compatibilityDate: '2025-01-08',
})