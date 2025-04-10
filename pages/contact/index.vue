<template>
    <div>
        <StoryblokComponent v-if="story" :blok="story.content" />

        <!-- <form @submit.prevent="handleSubmit">
            <p>
                <label>Your Name: <input type="text" name="name" v-model="formData.name" required /></label>
            </p>
            <p>
                <label>Your Email: <input type="email" name="email" v-model="formData.email" required /></label>
            </p>
            <p>
                <label>Your Role: <select name="role[]" multiple v-model="formData.role">
                    <option value="enquiry">Enquiry</option>
                    <option value="help">Help</option>
                </select></label>
            </p>
            <p>
                <label>Message: <textarea name="message" v-model="formData.message" required></textarea></label>
            </p>
            <p>
                <button type="submit" :disabled="isSubmitting">
                    <span v-if="isSubmitting">Sending...</span>
                    <span v-else>Send</span>
                </button>
            </p>

            <div v-if="submissionResult === 'success'" class="success-message">
                {{ submissionMessage }}
            </div>
            <div v-if="submissionResult === 'error'" class="error-message">
                {{ submissionMessage }}
            </div>
        </form> -->
    </div>
</template>

<script setup>
    const story = await useAsyncStoryblok('contact', { version: 'draft' },
        {
            customParent: 'https://app.storyblok.com'
        }
    );

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
    });

    // const formData = reactive({
    //     name: '',
    //     email: '',
    //     role: [],
    //     message: '',
    // });

    // const isSubmitting = ref(false);
    // const submissionResult = ref(null); // Can be 'success' or 'error'
    // const submissionMessage = ref('');

    // const handleSubmit = async () => {
    //     isSubmitting.value = true;
    //     submissionResult.value = null;
    //     submissionMessage.value = '';

    //     try {
    //         const { success, message } = await $fetch('/api/send-email', {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         submissionResult.value = 'success';
    //         submissionMessage.value = message;
    //         // Optionally reset the form
    //         formData.name = '';
    //         formData.email = '';
    //         formData.role = [];
    //         formData.message = '';
    //     } catch (error) {
    //         submissionResult.value = 'error';
    //         submissionMessage.value = error.message || 'An error occurred while sending the email.';
    //         console.error('Form submission error:', error);
    //     } finally {
    //         isSubmitting.value = false;
    //     }
    // };
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