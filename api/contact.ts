import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Only POST is allowed
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      entityName,
      contactPerson,
      email,
      phone,
      quantity,
      material,
    } = req.body || {};

    // ==============================
    // REQUIRED FIELD VALIDATION
    // ==============================

    if (
      !entityName?.trim() ||
      !contactPerson?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !quantity?.trim() ||
      !material?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // ==============================
    // EMAIL VALIDATION
    // ==============================

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // ==============================
    // PHONE VALIDATION
    // EXACTLY 10 DIGITS
    // ==============================

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number must contain exactly 10 digits.",
      });
    }

    // ==============================
    // QUANTITY VALIDATION
    // ==============================

    const quantityPattern = /^[0-9]+$/;

    if (!quantityPattern.test(quantity.trim())) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity should contain numbers only.",
      });
    }

    if (Number(quantity) <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity must be greater than 0.",
      });
    }

    // ==============================
    // ENVIRONMENT VARIABLES
    // ==============================

    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      console.error(
        "EMAIL_USER or EMAIL_PASS is missing."
      );

      return res.status(500).json({
        success: false,
        message:
          "Email service is not configured.",
      });
    }

    // ==============================
    // GMAIL TRANSPORTER
    // ==============================

    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    // ==============================
    // SEND EMAIL
    // ==============================

    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_USER,

      replyTo: email.trim(),

      subject:
        `New Enquiry - ${contactPerson.trim()}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: 0 auto;
          padding: 30px;
          color: #333;
        ">

          <h2 style="
            color: #2F6F7E;
            margin-bottom: 10px;
          ">
            New Website Enquiry
          </h2>

          <p>
            A new enquiry has been submitted
            through the Rolex India website.
          </p>

          <table style="
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
          ">

            <tr>
              <td style="
                padding: 12px;
                border: 1px solid #ddd;
                font-weight: bold;
              ">
                Entity Name
              </td>

              <td style="
                padding: 12px;
                border: 1px solid #ddd;
              ">
                ${entityName}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 12px;
                border: 1px solid #ddd;
                font-weight: bold;
              ">
                Contact Person
              </td>

              <td style="
                padding: 12px;
                border: 1px solid #ddd;
              ">
                ${contactPerson}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 12px;
                border: 1px solid #ddd;
                font-weight: bold;
              ">
                Email ID
              </td>

              <td style="
                padding: 12px;
                border: 1px solid #ddd;
              ">
                ${email}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 12px;
                border: 1px solid #ddd;
                font-weight: bold;
              ">
                Phone No.
              </td>

              <td style="
                padding: 12px;
                border: 1px solid #ddd;
              ">
                ${phone}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 12px;
                border: 1px solid #ddd;
                font-weight: bold;
              ">
                Quantity Required
              </td>

              <td style="
                padding: 12px;
                border: 1px solid #ddd;
              ">
                ${quantity}
              </td>
            </tr>

            <tr>
              <td style="
                padding: 12px;
                border: 1px solid #ddd;
                font-weight: bold;
              ">
                Material
              </td>

              <td style="
                padding: 12px;
                border: 1px solid #ddd;
              ">
                ${material}
              </td>
            </tr>

          </table>

          <p style="
            margin-top: 30px;
            color: #666;
            font-size: 13px;
          ">
            This enquiry was submitted from
            the Rolex India website.
          </p>

        </div>
      `,
    });

    console.log(
      "Enquiry email sent successfully."
    );

    return res.status(200).json({
      success: true,
      message:
        "Enquiry submitted successfully.",
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
}