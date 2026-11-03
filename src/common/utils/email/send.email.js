import nodemailer from "nodemailer";
import { APP_EMAIL, APP_PASSWORD, APPLECATION_NAME } from "../../../config.js";
import { BadRequestException } from "../../exceptions/error.exceptions.js";
export const UserEmailKey = ({email, subject})=>{
  return `User::${email}::${subject}::OTP`
}
export const UserEmailtrialsKey = ({email, subject})=>{
  return `${UserEmailKey({email, subject})}:TRIALS`
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: APP_EMAIL,
    pass: APP_PASSWORD,
  },
});

export const sendEmail = async ({
  to,
  cc,
  bcc,
  subject,
  text,
  html,
  attachments 
}) => {

  try {
    if (!to?.length && !cc?.length  && !bcc?.length) {
      throw BadRequestException("Missing email recipient")
    }
    if (!text?.length && !html?.length  && !attachments?.length) {
      throw BadRequestException("Missing email content")
    }
    const info = await transporter.sendMail({
      from: `"${APPLECATION_NAME}" <${APP_EMAIL}>`,
      to,
      cc,
      bcc,
      subject,
      text,
      html,
      attachments
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}