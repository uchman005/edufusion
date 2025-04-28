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
    Request Details:
    -------------------
    Name: ${name}
    School: ${school}
    Email: ${email}
    Phone: ${phone}
    Additional Information: ${message || "None provided"}
  `.trim();
      await sendMail("godwinudu01@gmail.com", name, "New Request", emailBody);
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
