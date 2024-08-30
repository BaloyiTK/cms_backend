import nodemailer from "nodemailer";

export const passwordResetEmail = async (token, user, type) => {
  // If no errors occur, send an email to the user
  const resetDateTime = user.updatedAt;

  console.log(user.updatedAt);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS, // your email address
      pass: process.env.EMAIL_PASS1, // your email password
    },
  });

  const resetLink = `${process.env.RESET_PASSWORD_URL}?token=${token}`;

 
  let currentDate = new Date();
  const expirationTime = new Date(currentDate.getTime() + 60 * 60 * 1000);

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };

  const formattedExpirationTime = new Intl.DateTimeFormat('en-US', options).format(expirationTime);



  if (type === "forgot") {
    const message = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Password Reset Request</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                margin: 0;
                padding: 0;
              }
    
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
              }
    
              h1 {
                font-size: 24px;
                margin-bottom: 20px;
                text-align: center;
              }
    
              p {
                margin-bottom: 20px;
              }
    
              a {
                color: #fff;
                background-color: #007bff;
                border-color: #007bff;
                display: inline-block;
                font-weight: 400;
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                border: 1px solid transparent;
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                line-height: 1.5;
                border-radius: 0.25rem;
                text-decoration: none;
              }
    
              a:hover {
                background-color: #0069d9;
                border-color: #0062cc;
              }
    
              .footer {
                margin-top: 20px;
                text-align: center;
              }
    
              .footer p {
                margin-bottom: 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Password Reset Request</h1>
    
              <p>Dear ${user.username},</p>
    
              <p>We received a request to reset your password for your account with us. To complete this process, please click on the button below to reset your password:</p>
    
              <p><a href="${resetLink}" target="_blank">Reset Password</a></p>
    
               <p>Please note that the link will expire in 1 hour, which is on ${formattedExpirationTime}. If you do not reset your password within this time, you may need to request a new link.</p>
    
              <p>If you did not request a password reset, please ignore this message and contact us immediately if you suspect any unauthorized access to your account.</p>
    
              <div class="footer">
                <p>Best regards,<br>[Your Company/Website Name]</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }

    await transporter.sendMail(message);
  } else {
    const message = {
      from: process.env.EMAIL_ADDRESS, // sender address
      to: user.email, // list of receivers
      subject: "Your Password Has Been Successfully Reset", // Subject line
      text: "Please reset your password using the link below", // plain text body
      html: `<!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset Confirmation for Basani Primary School</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              margin: 0;
              padding: 0;
            }
            h1 {
              font-size: 28px;
              margin-bottom: 20px;
              text-align: center;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .message {
              background-color: #f2f2f2;
              border-radius: 5px;
              padding: 20px;
            }
            .message p {
              margin-bottom: 20px;
            }
            .message ul {
              margin: 0;
              padding: 0;
              margin-bottom: 20px;
            }
            .message li {
              list-style-type: none;
              margin-bottom: 5px;
            }
            .message a {
              color: #007bff;
              text-decoration: none;
            }
            .message a:hover {
              text-decoration: underline;
            }
            .footer {
              background-color: #007bff;
              color: #fff;
              font-size: 14px;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Password Reset Confirmation</h1>
              <div class="message">
                <p>Dear ${user.username},</p>
    
                <p>We would like to confirm that your password reset for XpandCMS has been successfully.</p>
    
                <p>If you did not initiate this request, please contact our support team immediately at <a href="mailto:${process.env.EMAIL_ADDRESS}">${process.env.EMAIL_ADDRESS}</a>.</p>
    
                <p>Details of the reset:</p>
                <ul>
                  <li>Date and Time: ${resetDateTime}</li>
                </ul>
    
                <p>If you have any questions or concerns regarding this password reset, please do not hesitate to contact our support team. We are always here to help.</p>
    
              </div>
    
              <div class="footer">
                <p>Thank you for choosing XpandCMS.</p>
                
              </div>
          </div>
        </body>
        </html>`, // html body
    };

    await transporter.sendMail(message);
  }
};
