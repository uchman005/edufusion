import html from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import Elysia, { t } from "elysia";
import sendMail from "./mail";

new Elysia()
  .use(
    staticPlugin({
      prefix: "/public",
      assets: "./public",
    })
  )
  .use(html())
  .get("/", () => Bun.file("./public/index.html"))
  .post(
    "/submit",
    async ({ body }) => {
      const { name, email, school, phone, message } = body;
      const emailBody = `
        <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to KenEi Health</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 8px; }
          .header { text-align: center; font-size: 24px; color: #333; }
          .content { font-size: 16px; color: #555; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="header">Request Details</h1>
          -------------------
          <div class="content">
            <p>Name: ${name}</p>
            <p>School: ${school}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Additional Information: ${message || "None provided"}</p>
          </div>
        </div>
      </body> 
  `;
      await sendMail(
        "godwinudu01@gmail.com",
        name,
        "New Request",
        emailBody
      );
      return { success: true, message: "Request submitted successfully" };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String({ format: "email" }),
        school: t.String(),
        phone: t.String(),
        message: t.String(),
      }),
    }
  )
  .listen(process.env.PORT || 8000, () => {
    console.log(
      `Server is running on http://localhost:${process.env.PORT || 8000}`
    );
  });
