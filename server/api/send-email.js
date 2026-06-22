// server/api/send-email.js
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, telephone, location, message, attachments = [] } = body;

  // Basic input validation (you might want to add more robust validation)
  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please fill in all required fields.',
    });
  }

  // Configure your email transporter
  const transporter = nodemailer.createTransport({
    // Replace with your email service details
    host: 'smtp.hostinger.com',
    port: 465, // Or the port your SMTP server uses
    secure: true, // Use `true` if your SMTP server requires TLS/SSL
    auth: {
      user: 'enquiries@connellyupholstery.co.uk',
      pass: 'ManCity1966!',
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <enquiries@connellyupholstery.co.uk>`,
      to: 'enquiries@connellyupholstery.co.uk',
      subject: `New Contact Form Submission from ${name}`,
      attachments: attachments.map(file => ({
        filename: file.filename,
        content: Buffer.from(file.content, 'base64'),
        contentType: file.contentType,
      })),
	  html: `
		<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f1f1; font-family: Georgia, serif;">
			<tr>
				<td align="center" style="padding: 32px 16px;">
					<table border="0" cellpadding="0" cellspacing="0" width="560" style="background-color: #ffffff;">

						<!-- Header -->
						<tr>
							<td style="background-color: #273664; padding: 28px 32px;">
								<p style="margin: 0 0 4px 0; font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #a8b4d4;">Connelly Upholstery</p>
								<h1 style="margin: 0; font-size: 22px; font-weight: normal; color: #FEFCFB; letter-spacing: 0.5px;">New Enquiry</h1>
							</td>
						</tr>

						<!-- Amber accent bar -->
						<tr>
							<td style="background-color: #885219; height: 3px; font-size: 0; line-height: 0;">&nbsp;</td>
						</tr>

						<!-- Fields -->
						<tr>
							<td style="padding: 28px 32px 0;">
								<table border="0" cellpadding="0" cellspacing="0" width="100%">

									<tr>
										<td style="padding-bottom: 20px; border-bottom: 1px solid #efefef;">
											<p style="margin: 0 0 3px; font-family: Arial, sans-serif; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #885219;">Name</p>
											<p style="margin: 0; font-size: 15px; color: #343434;">${name}</p>
										</td>
									</tr>

									<tr>
										<td style="padding: 18px 0; border-bottom: 1px solid #efefef;">
											<p style="margin: 0 0 3px; font-family: Arial, sans-serif; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #885219;">Email</p>
											<p style="margin: 0; font-size: 15px; color: #343434;"><a href="mailto:${email}" style="color: #273664; text-decoration: none;">${email}</a></p>
										</td>
									</tr>

									<tr>
										<td style="padding: 18px 0; border-bottom: 1px solid #efefef;">
											<p style="margin: 0 0 3px; font-family: Arial, sans-serif; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #885219;">Telephone</p>
											<p style="margin: 0; font-size: 15px; color: #343434;">${telephone || '—'}</p>
										</td>
									</tr>

									<tr>
										<td style="padding: 18px 0; border-bottom: 1px solid #efefef;">
											<p style="margin: 0 0 3px; font-family: Arial, sans-serif; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #885219;">Location</p>
											<p style="margin: 0; font-size: 15px; color: #343434;">${location || '—'}</p>
										</td>
									</tr>

									<tr>
										<td style="padding: 18px 0 28px;">
											<p style="margin: 0 0 10px; font-family: Arial, sans-serif; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: #885219;">Message</p>
											<div style="border-left: 3px solid #273664; padding: 12px 16px; background-color: #f9f9f9;">
												<p style="margin: 0; font-size: 15px; color: #343434; line-height: 1.6;">${message}</p>
											</div>
										</td>
									</tr>

								</table>
							</td>
						</tr>

						<!-- Footer -->
						<tr>
							<td style="background-color: #efefef; padding: 14px 32px;">
								<p style="margin: 0; font-family: Arial, sans-serif; font-size: 10px; color: #888; letter-spacing: 0.5px;">This enquiry was submitted via connellyupholstery.co.uk</p>
							</td>
						</tr>

					</table>
				</td>
			</tr>
		</table>
	`,
    });

    return { success: true, message: 'Thank you for your enquiry, we will be in touch as soon as possible!' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email. Please try again later.',
    });
  }
});