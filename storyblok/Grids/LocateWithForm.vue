<template>
	<section v-editable="blok" :class="[
		// dynamicClass
	]" class="locate-with-form">
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

					<p v-if="blok?.hoursDisclaimer?.length" class="caption">
						{{ blok.hoursDisclaimer }}
					</p>
				</div>

				<div class="item map-container">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2379.0623944185127!2d-2.60763780280054!3d53.39582374823473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b01384ce48643%3A0xac18d13908e83b6b!2sConnelly%20Upholstery!5e0!3m2!1sen!2suk!4v1680204064653!5m2!1sen!2suk"
						style="border: 0" allowfullscreen="" loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"></iframe>
				</div>
			</div>

			<div class="row bottom-row">
				<h3 v-if="blok?.formHeading?.length">{{ blok.formHeading }}</h3>

				<h5 v-if="blok?.formSubHeading?.length">{{ blok.formSubHeading }}</h5>
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
								<textarea name="message" v-model="formData.message" required></textarea>
							</label>

							<div class="upload-section">
								<span class="caption">Attach photos (optional)</span>
								<div class="upload-zone" :class="{ 'is-dragging': isDragging }"
									@dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
									@drop.prevent="handleDrop" @click="$refs.fileInput.click()">
									<input type="file" ref="fileInput" @change="handleFileChange" multiple
										accept="image/*,.pdf" />
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
										fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"
										stroke-linejoin="miter">
										<polyline points="16 16 12 12 8 16"></polyline>
										<line x1="12" y1="12" x2="12" y2="21"></line>
										<path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
									</svg>
									<p class="upload-prompt">Click or drag files here</p>
									<p class="upload-hint">JPG, PNG, PDF</p>
								</div>
								<div v-if="selectedFiles.length" class="file-summary">
									<button type="button" class="summary-toggle"
										@click="isFilesExpanded = !isFilesExpanded">
										<span>{{ selectedFiles.length }} {{ selectedFiles.length === 1 ? 'photo' :
											'photos' }} attached</span>
										<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11"
											viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
											stroke-linecap="square"
											:style="{ transform: isFilesExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s' }">
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</button>
									<ul v-if="isFilesExpanded" class="file-chips">
										<li v-for="(file, index) in selectedFiles" :key="file.name">
											<span class="file-name">{{ file.name }}</span>
											<button type="button" class="remove-file" @click.stop="removeFile(index)"
												aria-label="Remove file">×</button>
										</li>
									</ul>
								</div>
							</div>

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
			selectedFiles: [],
			isDragging: false,
			isFilesExpanded: false,
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
		handleFileChange(event) {
			this.mergeFiles(Array.from(event.target.files));
		},
		handleDrop(event) {
			this.isDragging = false;
			this.mergeFiles(Array.from(event.dataTransfer.files));
		},
		mergeFiles(incoming) {
			const existing = this.selectedFiles.map(f => f.name);
			const deduped = incoming.filter(f => !existing.includes(f.name));
			this.selectedFiles = [...this.selectedFiles, ...deduped];
		},
		removeFile(index) {
			this.selectedFiles.splice(index, 1);
			if (!this.selectedFiles.length) this.$refs.fileInput.value = '';
		},
		filesToBase64(files) {
			return Promise.all(
				files.map(file => new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onload = () => resolve({
						filename: file.name,
						content: reader.result.split(',')[1],
						contentType: file.type,
					});
					reader.onerror = reject;
					reader.readAsDataURL(file);
				}))
			);
		},
		async handleSubmit() {
			this.isSubmitting = true;
			this.submissionResult = null;
			this.submissionMessage = '';

			try {
				const attachments = this.selectedFiles.length
					? await this.filesToBase64(this.selectedFiles)
					: [];

				const { success, message } = await $fetch('/api/send-email', {
					method: 'POST',
					body: { ...this.formData, attachments },
				});

				this.submissionResult = 'success';
				this.submissionMessage = message;
				this.formData.name = '';
				this.formData.email = '';
				this.formData.telephone = '';
				this.formData.location = '';
				this.formData.message = '';
				this.selectedFiles = [];
				this.isFilesExpanded = false;
				this.$refs.fileInput.value = '';
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

				.caption {
					font-size: .75rem;
				}

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

				@media (max-width: 900px) {
					gap: 0;
				}

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

					.upload-section {
						display: flex;
						flex-direction: column;
						gap: .5rem;

						>.caption {
							font-size: .6rem;
							text-transform: uppercase;
						}
					}

					.upload-zone {
						align-items: center;
						border: 1px dashed #ccc;
						border-bottom: 3px dashed #ccc;
						color: #aaa;
						cursor: pointer;
						display: flex;
						flex-direction: row;
						gap: .6rem;
						padding: .75rem;
						transition: border-color .2s, color .2s, background .2s;

						input[type="file"] {
							display: none;
						}

						svg {
							flex-shrink: 0;
							opacity: .5;
							transition: opacity .2s;
						}

						.upload-prompt {
							font-size: .7rem;
							margin: 0;
						}

						.upload-hint {
							font-size: .6rem;
							letter-spacing: .05em;
							margin: 0 0 0 auto;
							text-transform: uppercase;
						}

						&:hover,
						&.is-dragging {
							background: $color-3;
							border-color: $color-1;
							color: $color-1;

							svg {
								opacity: 1;
							}
						}
					}

					.file-summary {
						display: flex;
						flex-direction: column;
						gap: .2rem;
					}

					.summary-toggle {
						align-items: center;
						background: $color-3;
						border: none;
						border-left: 2px solid $color-1;
						color: $tertiary-color;
						cursor: pointer;
						display: flex;
						font-size: .6rem;
						gap: .4rem;
						justify-content: space-between;
						padding: .3rem .5rem;
						text-transform: uppercase;
						letter-spacing: .05em;
						width: 100%;

						&:hover {
							color: $color-1;
						}
					}

					.file-chips {
						display: flex;
						flex-direction: column;
						gap: .2rem;
						list-style: none;
						margin: 0;
						padding: 0;

						li {
							align-items: center;
							background: $color-3;
							border-left: 2px solid $color-1;
							display: flex;
							font-size: .6rem;
							justify-content: space-between;
							padding: .25rem .4rem;
						}

						.file-name {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.remove-file {
							background: none;
							border: none;
							color: #aaa;
							cursor: pointer;
							flex-shrink: 0;
							font-size: .85rem;
							line-height: 1;
							padding: 0 0 0 .5rem;

							&:hover {
								color: #c33131;
							}
						}
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
							margin-top: 0.5rem;
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