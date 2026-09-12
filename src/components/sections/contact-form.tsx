"use client";

import { FiArrowUpRight } from "react-icons/fi";

/** Intentionally local-only: no endpoint, storage, or false success state. */
export function ContactForm() {
  return <form className="contact-form" aria-label="Contact form preview" aria-describedby="contact-preview-note" onSubmit={(event) => event.preventDefault()}>
    <div className="contact-field-row"><label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" placeholder="What should I call you?" /></label><label htmlFor="contact-email">Email address<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label></div>
    <label htmlFor="contact-message">What are you thinking?<textarea id="contact-message" name="message" rows={3} placeholder="An idea, a question, a new possibility…" /></label>
    <div className="contact-form-bottom"><p id="contact-preview-note">Form preview only. Nothing is sent or saved—use the links above to reach me.</p><button type="button" className="connect-button">Let&apos;s connect <FiArrowUpRight aria-hidden="true" /></button></div>
  </form>;
}
