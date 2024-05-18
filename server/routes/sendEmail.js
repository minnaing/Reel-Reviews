import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "reelreviewstest@gmail.com",
        pass: "halyoqyczhmgbxrd"
      },
  });

  const mailOptions = {
    from: "reelreviewstest@gmail.com",
    to: "lchan2021@csu.fullerton.edu",
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  try {
      await transporter.sendMail(mailOptions);
      res.json({ message: "Email sent successfully" });
  } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email");
  }
};
