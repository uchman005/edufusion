import { SendMailClient } from "zeptomail";

const url = "api.zeptomail.com/";
const token = `Zoho-enczapikey ${process.env.EMAIL_PASS}`;

let client = new SendMailClient({ url, token });
export default async function sendMail(
  email: string,
  name: string,
  subject: string,
  body: string
) {
  try {
    client.sendMail({
      from: {
        address: "noreply@myedufusion.com",
        name: "noreply",
      },
      to: [
        {
          email_address: {
            address: email,
            name: name,
          },
        },
        {
          email_address:{
            address: "info@myedufusion.com",
            name: "edufusion"
          }
        }
      ],
      subject: subject,
      htmlbody: body,
    });
    return true;
  } catch (error) {
    return false;
  }
}