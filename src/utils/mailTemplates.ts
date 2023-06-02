export const newUserMailTemplate = ({ name, email }: { name: string; email: string }) => {
	let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our App</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.5;
        }

        h1 {
          color: #333;
        }

        p {
          margin-bottom: 1rem;
        }

        ul {
          list-style-type: none;
          padding: 0;
          margin-bottom: 1rem;
        }

        li {
          margin-bottom: 0.5rem;
        }

        strong {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to Our App</h1>
      <p>Dear {{name}},</p>
      <p>Thank you for joining our app. We're excited to have you on board!</p>
      <p>Your account details:</p>
      <ul>
        <li><strong>Name:</strong> {{name}}</li>
        <li><strong>Email:</strong> {{email}}</li>
      </ul>
      <p>If you have any questions or need assistance, feel free to contact our support team.</p>
      <p>Best regards,</p>
      <p>The App Team</p>
    </body>
    </html>
  `;

	html = html.replace(/{{name}}/g, name);
	html = html.replace(/{{email}}/g, email);

	return html;
};
