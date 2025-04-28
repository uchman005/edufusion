import html from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import Elysia, { t } from "elysia";

new Elysia()
  .use(
    staticPlugin({
      prefix: "/public",
      assets: "./public",
    })
  )
  .use(html())
  .get("/", () => Bun.file("./public/index.html"))
  .post("/submit", ({body})=>{
    const {name, email, school, phone, message} = body;
    const emailBody = `
    Request Details:
    -------------------
    Name: ${name}
    School: ${school}
    Email: ${email}
    Phone: ${phone}
    Additional Information: ${message || 'None provided'}
  `.trim();
  
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String({format: "email"}),
      school: t.String(),
      phone: t.String(),
      message: t.String()
    })
  })
  .listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 8000}`);
  });
