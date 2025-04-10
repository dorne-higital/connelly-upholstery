// server/api/send-email.js
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, telephone, location, message } = body;

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
      from: `"${name}" <enquiries@connellyupholstery.co.uk>`, // Use the sender's email from the form
      to: 'enquiries@connellyupholstery.co.uk', // The recipient email address
      subject: `New Contact Form Submission from ${name}`,
	  html: `
		<table border="0" cellpadding="0" cellspacing="0" width="100%">
			<tr>
			<td bgcolor="#f4f4f4" align="center" style="padding: 20px;">
				<table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 5px;">
				<tr>
					<td style="padding: 30px;">
					<h2 style="color: #007bff; margin-top: 0; margin-bottom: 20px;">New Contact Form Submission</h2>
					<p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
					<p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
					<p style="margin-bottom: 10px;"><strong>Telephone:</strong> ${telephone}</p>
					<p style="margin-bottom: 10px;"><strong>Location:</strong> ${location}</p>
					<p style="margin-bottom: 15px;"><strong>Message:</strong></p>
					<div style="border: 1px solid #ddd; padding: 15px; border-radius: 3px;">
						<p style="margin-top: 0;">${message}</p>
					</div>
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