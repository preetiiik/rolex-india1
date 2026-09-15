import nodemailer from "nodemailer";

export default async function handler(req, res) {
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

    // Validate required fields
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

    // Email validation
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Phone validation
    const phonePattern =
      /^\+?[0-9]{10,15}$/;

    if (!phonePattern.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number.",
      });
    }

    // Check environment variables
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

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
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
            margin-top: 20px;
          ">

            <tr>
              <td style="
                padding: 12px;
                border: 1px solid #ddd;
                font-weight: bold;
                width: 40%;
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
}