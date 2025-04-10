<template>
    <section
        v-editable="blok"
        :class="[
            // dynamicClass
        ]"
        class="locate-with-form"
    >
        <div class="block-container">
            <div class="row top-row">
                <div class="item">
                    <h3 v-if="blok?.heading?.length">{{ blok.heading }}</h3>

                    <ul class="hours" v-if="openingHours">
                        <li v-for="(hours, day) in openingHours" :key="day">
                            <p>{{ day }}</p>
                            <p>{{ hours }}</p>
                        </li>
                    </ul>
                </div>

                <div class="item map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2379.0623944185127!2d-2.60763780280054!3d53.39582374823473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b01384ce48643%3A0xac18d13908e83b6b!2sConnelly%20Upholstery!5e0!3m2!1sen!2suk!4v1680204064653!5m2!1sen!2suk"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

            <div class="row bottom-row">
				<h3 v-if="blok?.formHeading?.length">{{ blok.formHeading }}</h3>
				<form @submit.prevent="handleSubmit">
					<div class="form-row">
						<div class="form-column left">
							<label for="name" class="caption">
								Your name
								<input type="text" name="name" v-model="formData.name" required />
							</label>

							<label for="email" class="caption">
								Email address
								<input type="email" name="email" v-model="formData.email" required />
							</label>

							<label for="telepone" class="caption">
								Contact number
								<input type="tel" name="telephone" v-model="formData.telephone" required />
							</label>
							
							<label for="location" class="caption">
								Where are you located?
								<input type="text" name="location" v-model="formData.location" required />
							</label>
						</div>
						<div class="form-column right">
							<label for="message" class="caption">
								Message
								<textarea name="message" v-model="formData.message" required ></textarea>
							</label>

							<button type="submit" class="button primary" :disabled="isSubmitting">
								<span v-if="isSubmitting">Sending...</span>
								<span v-else>Send</span>
							</button>

							<div v-if="submissionResult === 'success'" class="success-message">
								{{ submissionMessage }}
							</div>
							<div v-if="submissionResult === 'error'" class="error-message">
								{{ submissionMessage }}
							</div>
						</div>
					</div>
				</form>
            </div>
        </div>
    </section>
</template>

<script>
    import { reactive, ref } from 'vue';

    export default {
        name: 'locateWithForm',
        componentName: {
            type: String,
            default: 'locate-with-form'
        },
        props: {
            blok: {
                type: Object
            }
        },
        data() {
            return {
                colorClassMapping: {
                    '#3b4944': 'color-1',
                    '#273664': 'color-2',
                    '#885219': 'color-3',
                    '#efefef': 'color-4',
                    '#FEFCFB': 'color-5',
                },
                openingHours: null,
                formData: reactive({
                    name: '',
                    email: '',
                    telephone: '',
                    location: '',
                    message: '',
                }),
                isSubmitting: ref(false),
                submissionResult: ref(null),
                submissionMessage: ref(''),
            };
        },
        mounted() {
            this.fetchOpeningHours();
        },
        computed: {
            // dynamicClass() {
            //     const color = this.blok.bgColour.value;
            //     return this.colorClassMapping[color] || '';
            // },
        },
        methods: {
            async fetchOpeningHours() {
                try {
                    const response = await fetch(
                        `https://api.storyblok.com/v2/cdn/datasource_entries?datasource=opening-hours&token=XFpR0AEuvI2nLhpnj3F3iwtt&version=draft`
                    );
                    const data = await response.json();
                    this.openingHours = Object.fromEntries(
                    data.datasource_entries.map((entry) => [entry.name, entry.value])
                    );
                } catch (error) {
                    console.error("Error fetching opening hours:", error);
                }
            },
            async handleSubmit() {
                this.isSubmitting = true;
                this.submissionResult = null;
                this.submissionMessage = '';

                try {
                    const { success, message } = await $fetch('/api/send-email', {
                        method: 'POST',
                        body: this.formData,
                    });

                    this.submissionResult = 'success';
                    this.submissionMessage = message;
                    this.formData.name = '';
                    this.formData.email = '';
                    this.formData.telephone = '';
                    this.formData.location = '';
                    this.formData.message = '';
                } catch (error) {
                    this.submissionResult = 'error';
                    this.submissionMessage = error.message || 'An error occurred while sending the email.';
                    console.error('Form submission error:', error);
                } finally {
                    this.isSubmitting = false;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~/assets/css/main.scss";

    .locate-with-form {
        align-items: center;
        background: $bg-primary;
        color: $tertiary-color;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        padding: 2rem;
        width: 100%;

        @media (max-width: 600px) {
            padding: 2rem 1rem;
            width: 100%;
        }

        &.color-1 {
            background-color: $color-4;
            color: $secondary-color;
        }

        &.color-2 {
            background-color: $color-1;
            color: $secondary-color;
        }

        &.color-3 {
            background-color: $color-2;
            color: $secondary-color;
        }

        &.color-4 {
            background-color: $color-3;
        }

        &.color-5 {
            background-color: $secondary-color;
        }

        .block-container {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            max-width: $sw;

            @media (max-width: 600px) {
                padding: 0;
                width: 100%;
            }

            .row.top-row {
                display: flex;
                flex-direction: row;
                gap: 3rem;
                width: 100%;

                .item {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    padding: 1rem;

                    .hours {
                        li {
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                        }
                    }

                    iframe {
                        border-radius: inherit;
                        height: 100%;
                        width: 100%;
                    }
                }

                @media (max-width: 900px) {
                    flex-direction: column;
                    gap: 1.5rem;
                }
            }

			.bottom-row {
				padding: 1rem;
			}

            .row {
				.form-row {
					display: flex;
					flex-direction: row;
					gap: 2rem;
					width: 100%;

					.form-column {
						flex: 1;
						display: flex;
						flex-direction: column;
						gap: .5rem;

						.caption {
							font-size: .6rem;
							text-transform: uppercase;
						}

						input[type="text"],
						input[type="email"],
						input[type="number"],
						input[type="tel"],
						textarea,
						select {
							border: 1px solid #ccc;
							border-bottom: 3px solid #ccc;
							box-sizing: border-box;
							padding: 1rem .75rem;
							width: 100%;

							&:focus {
								outline: none;
							}
						}

						textarea {
							min-height: 150px;
							max-width: 100% !important;
							resize: none;
						}
						
						&.right {
							display: flex;
							flex-direction: column;
						}

						.primary {
							border: 2px solid $color-3;
							background-color: $color-1;
							color: $secondary-color;
							cursor: pointer;
							padding: .75rem;

							&:hover {
								border-color: $color-1;
								transition: .5s;
							}
						}
					}

					@media (max-width: 768px) {
						flex-direction: column;

						.form-column {
							width: 100%;

							&.right {
								margin-top: 1.5rem;
							}
						}
					}
				}
			}

            .row.full-width {
                margin-top: 2rem;
            }
        }
    }

    .success-message {
		border: 1px solid #35a635;
		border-bottom-width: 3px;
        color: #35a635;
		padding: .5rem;
		text-align: center;
    }

    .error-message {
		border: 1px solid #c33131;
		border-bottom-width: 3px;
        color: #c33131;
		padding: .5rem;
		text-align: center;
    }
</style>