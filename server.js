import express from "express";
import nodemailer from "nodemailer";
// import process from "node:process";
import "dotenv/config";

console.log("EMAIL_USER loaded:", !!process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", !!process.env.EMAIL_PASS);

const app = express();
const PORT = 5000;

app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    const {
      entityName,
      contactPerson,
      email,
      phone,
      quantity,
      material,
    } = req.body;

    if (
      !entityName ||
      !contactPerson ||
      !email ||
      !phone ||
      !quantity ||
      !material
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phonePattern =
      /^\+?[0-9]{10,15}$/;

    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (!phonePattern.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number.",
      });
    }

    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      console.error(
        "EMAIL_USER or EMAIL_PASS is missing."
      );

      return res.status(500).json({
        success: false,
        message: "Email service is not configured.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email.trim(),

      subject: `New Enquiry - ${contactPerson.trim()}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: 0 auto;
          padding: 20px;
          color: #333;
        ">

          <h2 style="color: #2F6F7E;">
            New Website Enquiry
          </h2>

          <p>
            A new enquiry has been submitted
            through the Rolex India website.
          </p>

          <table style="
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          ">

            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">
                Entity Name
              </td>
              <td style="padding: 12px; border: 1px solid #ddd;">
                ${entityName}
              </td>
            </tr>

            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">
                Contact Person
              </td>
              <td style="padding: 12px; border: 1px solid #ddd;">
                ${contactPerson}
              </td>
            </tr>

            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">
                Email ID
              </td>
              <td style="padding: 12px; border: 1px solid #ddd;">
                ${email}
              </td>
            </tr>

            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">
                Phone No.
              </td>
              <td style="padding: 12px; border: 1px solid #ddd;">
                ${phone}
              </td>
            </tr>

            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">
                Quantity Required
              </td>
              <td style="padding: 12px; border: 1px solid #ddd;">
                ${quantity}
              </td>
            </tr>

            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">
                Material
              </td>
              <td style="padding: 12px; border: 1px solid #ddd;">
                ${material}
              </td>
            </tr>

          </table>

          <p style="
            margin-top: 25px;
            color: #666;
            font-size: 13px;
          ">
            This enquiry was submitted from the
            Rolex India website.
          </p>

        </div>
      `,
    });

    console.log(
      "Enquiry email sent successfully."
    );

    return res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully.",
    });

  } catch (error) {
    console.error(
      "Contact form error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to send enquiry. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Backend server running on http://localhost:${PORT}`
  );
});