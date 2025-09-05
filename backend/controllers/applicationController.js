import Application from "../models/Application.js";
import nodemailer from "nodemailer";

const normalizeStatus = (s) =>
  typeof s === "string" && s.trim()
    ? s.trim().charAt(0).toUpperCase() + s.trim().slice(1).toLowerCase()
    : undefined;

// Create
export const createApplication = async (req, res) => {
  try {
    const app = new Application(req.body);
    await app.save();
    res.status(201).json(app);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read all
export const getApplications = async (req, res) => {
  const apps = await Application.find();
  res.json(apps);
};

// Read one
export const getApplication = async (req, res) => {
  const app = await Application.findById(req.params.id);
  res.json(app);
};

// Update
export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    let updates = req.body;

    if (updates.status) {
      updates.status =
        updates.status.charAt(0).toUpperCase() +
        updates.status.slice(1).toLowerCase();
    }

    const application = await Application.findByIdAndUpdate(id, updates, { new: true });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // If status was updated, send email automatically
    if (updates.status) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const { subject, html } = getEmailTemplate(
        updates.status,
        `${application.firstName} ${application.lastName || ""}`,
        application.projectAppliedFor
      );

      await transporter.sendMail({
        from: `"Your Company" <${process.env.EMAIL_USER}>`,
        to: application.email,
        subject,
        text: `Hello ${application.firstName}, your application status is: ${updates.status}.`,
        html,
      });
    }

    res.json(application);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ message: "Failed to update application" });
  }
};

// Delete
export const deleteApplication = async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: "Application deleted" });
};

const getEmailTemplate = (status, applicantName, projectName) => {
  if (status === "Accepted") {
    return {
      subject: "🎉 Congratulations! Your Application Has Been Accepted",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:auto; padding:20px; border:1px solid #eee; border-radius:8px;">
          <h2 style="color:#4CAF50;">Congratulations, ${applicantName}!</h2>
          <p>We are excited to inform you that your application for the <b>${projectName}</b> project has been <b>accepted</b>.</p>
          <p>Our team will reach out soon with the next steps.</p>
          <hr style="margin:20px 0; border:none; border-top:1px solid #eee;">
          <p style="font-size:0.9em; color:#777;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `,
    };
  } else if (status === "Rejected") {
    return {
      subject: "Application Update",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:auto; padding:20px; border:1px solid #eee; border-radius:8px;">
          <h2 style="color:#E53935;">Thank you, ${applicantName}</h2>
          <p>We appreciate your interest in the <b>${projectName}</b> project.</p>
          <p>Unfortunately, your application has not been selected at this time. Please don’t be discouraged — we encourage you to apply for future opportunities.</p>
          <hr style="margin:20px 0; border:none; border-top:1px solid #eee;">
          <p style="font-size:0.9em; color:#777;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `,
    };
  } else {
    return {
      subject: "Application Status Update",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:auto; padding:20px; border:1px solid #eee; border-radius:8px;">
          <h2>Hello, ${applicantName}</h2>
          <p>Your application status has been updated to: <b>${status}</b>.</p>
          <hr style="margin:20px 0; border:none; border-top:1px solid #eee;">
          <p style="font-size:0.9em; color:#777;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `,
    };
  }
};

// Notify applicant via email
export const notifyApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Setup Nodemailer transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Get proper template
    const { subject, html } = getEmailTemplate(
      status,
      `${application.firstName} ${application.lastName || ""}`,
      application.projectAppliedFor
    );

    // ✅ Send email using template
    await transporter.sendMail({
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to: application.email,
      subject,
      html,
    });

    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};