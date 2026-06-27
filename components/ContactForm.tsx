"use client";

import { useState, FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

type FormData = { name: string; email: string; message: string; website: string };
type FormErrors = Partial<Record<keyof FormData, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name required.";
  else if (data.name.trim().length < 2) errors.name = "Min 2 characters.";
  if (!data.email.trim()) errors.email = "Email required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Invalid email format.";
  if (!data.message.trim()) errors.message = "Message required.";
  else if (data.message.trim().length < 10) errors.message = "Min 10 characters.";
  return errors;
}

type ContactFormProps = {
  headingLevel?: 1 | 2;
  formsubmitAction: string;
};

export default function ContactForm({
  headingLevel = 2,
  formsubmitAction,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.website.trim()) return;

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch(formsubmitAction, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Portfolio contact — ${formData.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data: { success?: boolean | string; message?: string } =
        await res.json();

      if (
        !res.ok ||
        data.success === false ||
        data.success === "false"
      ) {
        if (data.message?.toLowerCase().includes("activation")) {
          throw new Error(
            "Channel pending activation — submit once more in a few minutes.",
          );
        }
        throw new Error(data.message || "Transmission failed.");
      }

      setStatus("success");
      setServerMessage(
        "Thank you for reaching out. Your message has been received — I'll respond with care and attention.",
      );
      setFormData({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      setStatus("error");
      setServerMessage(
        err instanceof Error ? err.message : "Transmission failed.",
      );
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="pt-10 md:pt-12 pb-24 md:pb-32 overflow-x-clip">
      <div className="mx-auto max-w-6xl px-6 md:px-12 flex flex-col items-center text-center min-w-0 w-full">
        <ScrollReveal className="w-full max-w-xl">
          <p className="hud-label text-cyan mb-4">[ CONTACT ]</p>
          <SectionHeading
            level={headingLevel}
            id="contact-heading"
            className="font-display text-3xl md:text-5xl uppercase tracking-wider text-ghost mb-4"
          >
            Init Contact
          </SectionHeading>
          <p className="text-ghost-muted text-sm font-mono mb-12 mx-auto">
            &gt; Open a secure channel. All fields required.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80} className="w-full max-w-xl">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full neon-border bg-navy-light/50 p-6 md:p-8 space-y-6 text-left"
            aria-label="Contact form"
          >
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="name" className="hud-label text-cyan block mb-2">
                NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="hud-input w-full px-4 py-3 text-sm"
                placeholder="enter_name"
              />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-2 text-xs text-pink font-mono">
                  ERR: {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="hud-label text-cyan block mb-2">
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="hud-input w-full px-4 py-3 text-sm"
                placeholder="user@domain.net"
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-2 text-xs text-pink font-mono">
                  ERR: {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="hud-label text-cyan block mb-2">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="hud-input w-full px-4 py-3 text-sm resize-y min-h-[120px]"
                placeholder="transmit_message..."
              />
              {errors.message && (
                <p id="message-error" role="alert" className="mt-2 text-xs text-pink font-mono">
                  ERR: {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "[ TRANSMITTING... ]" : "[ SEND ]"}
            </button>

            {status === "success" && (
              <div role="status" className="p-4 border border-cyan/40 bg-cyan/5 text-cyan text-xs font-mono">
                OK: {serverMessage}
              </div>
            )}

            {status === "error" && (
              <div role="alert" className="p-4 border border-pink/40 bg-pink/5 text-pink text-xs font-mono">
                FAIL: {serverMessage}
              </div>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
