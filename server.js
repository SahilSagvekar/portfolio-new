import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors({ origin: "https://portfolio-new-six-gold.vercel.app", credentials: true }));
app.use(express.json()); // body parser

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sahilsagvekar230@gmail.com",      // ✅ replace with your email
        pass: "oaks btak mhft ugbo", 
      },
    });

    await transporter.sendMail({
      from: email,
      to: "sahilsagvekar230@gmail.com",
      subject: `Portfolio Contact from ${name}`,
      text: message,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error sending email" });
  }
});

app.listen(5050, () => console.log("🚀 Server started on http://localhost:5050"));