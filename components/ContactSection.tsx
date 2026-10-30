"use client";

import React, { useState } from "react";
import {
  User,
  Building2,
  Mail,
  Globe,
  Package,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  CheckCircle2,
} from "lucide-react";
import styles from "./ContactSection.module.css";

interface ContactSectionProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

const PRODUCTS_LIST = [
  "Basmati Rice (1121 Supreme Long Grain)",
  "Pure Refined Cane Sugar (ICUMSA 45)",
  "Specialty Estate Coffee (Arabica Dark Roast)",
  "Royal Jumbo Cashews (W240 Whole)",
  "Katarni Premium Fragrant Rice",
  "Mixed Container / Full Agro Portfolio",
  "Custom Commodity Sourcing Enquiry",
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Saudi Arabia",
  "Germany",
  "Canada",
  "Australia",
  "Singapore",
  "Nepal",
  "India",
  "France",
  "Netherlands",
  "Italy",
  "Japan",
  "South Korea",
  "Qatar",
  "Kuwait",
  "Oman",
  "Bahrain",
  "South Africa",
  "Kenya",
  "Malaysia",
  "New Zealand",
  "Switzerland",
  "Belgium",
  "Spain",
  "Turkey",
  "Other International Market",
];

export default function ContactSection({ onOpenQuoteModal }: ContactSectionProps) {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    country: "United States",
    product: PRODUCTS_LIST[0],
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact-section" className={styles.contactSection} aria-labelledby="contact-heading">
      <div className={styles.container}>
        {/* Compact Glassmorphic Card */}
        <div className={styles.unifiedGlassCard}>
          {/* Card Header with "Get In Touch With Us" in Maroon */}
          <div className={styles.cardHeader}>
            <h1 id="contact-heading" className={styles.cardTitle}>
              Get In Touch With Us
            </h1>
            <p className={styles.cardDesc}>
              Fill in your details below. Our trade desk will respond with certified lot metrics and pricing within 24 business hours.
            </p>
          </div>

          {/* Form Content */}
          {isSubmitted ? (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>
                <CheckCircle2 size={24} />
              </div>
              <h4>Enquiry Received with Care</h4>
              <p>
                Thank you, <strong>{formData.name}</strong>. Our senior trade specialist for <strong>{formData.product}</strong> has been notified and will respond to <strong>{formData.email}</strong> within 24 business hours with certified lot sheets and pricing.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className={styles.submitBtn}
                style={{ marginTop: 12, padding: "10px 22px", fontSize: 12 }}
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.formGrid}>
              {/* Row 1: Name & Company */}
              <div className={styles.twoCols}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-name" className={styles.fieldLabel}>
                    Name <span>*</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} />
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className={styles.textInput}
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-company" className={styles.fieldLabel}>
                    Company Name <span>*</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Building2 className={styles.inputIcon} />
                    <input
                      id="contact-company"
                      type="text"
                      required
                      placeholder="e.g. Continental Foodways Ltd"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className={styles.textInput}
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Business Email & Country */}
              <div className={styles.twoCols}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-email" className={styles.fieldLabel}>
                    Business Email <span>*</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} />
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="elena@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className={styles.textInput}
                    />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-country" className={styles.fieldLabel}>
                    Country <span>*</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Globe className={styles.inputIcon} />
                    <select
                      id="contact-country"
                      required
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className={styles.selectInput}
                    >
                      {COUNTRIES.map(c => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: Product Interested In */}
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-product" className={styles.fieldLabel}>
                  Product Interested In <span>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Package className={styles.inputIcon} />
                  <select
                    id="contact-product"
                    required
                    value={formData.product}
                    onChange={e => setFormData({ ...formData, product: e.target.value })}
                    className={styles.selectInput}
                  >
                    {PRODUCTS_LIST.map(p => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Message */}
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-message" className={styles.fieldLabel}>
                  Message <span style={{ color: "#8c7e74", fontWeight: 400, fontSize: "11px" }}>(Optional)</span>
                </label>
                <div className={styles.inputWrapper}>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Specify target volume (e.g. 1 x 20ft FCL or 25 MT), preferred packaging (retail pouches / bulk sacks), target discharge port, or sample requests..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className={styles.textareaInput}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                {isSubmitting ? (
                  "Sending Enquiry..."
                ) : (
                  <>
                    Submit Commodity Enquiry <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Bottom Bar: Address, Email, Phone, Request a Quote Button */}
        <div className={styles.bottomBar}>
          {/* Card 1: Registered Origin Address */}
          <div className={styles.contactInfoCard}>
            <div className={styles.contactIconCircle}>
              <MapPin size={20} />
            </div>
            <div className={styles.contactCardMeta}>
              <span className={styles.contactMetaLabel}>Origin Hub &amp; Network</span>
              <span className={styles.contactMetaValue}>xxxxxx, Nepal (Port &amp; CFS Network)</span>
            </div>
          </div>

          {/* Card 2: Email */}
          <a href="mailto:info@monagrow.com" className={styles.contactInfoCard}>
            <div className={styles.contactIconCircle}>
              <Mail size={20} />
            </div>
            <div className={styles.contactCardMeta}>
              <span className={styles.contactMetaLabel}>Direct Trade Desk</span>
              <span className={styles.contactMetaValue}>info@monagrow.com</span>
            </div>
          </a>

          {/* Card 3: Phone */}
          <a href="tel:+97714589200" className={styles.contactInfoCard}>
            <div className={styles.contactIconCircle}>
              <Phone size={20} />
            </div>
            <div className={styles.contactCardMeta}>
              <span className={styles.contactMetaLabel}>Trade Enquiry Desk</span>
              <span className={styles.contactMetaValue}>+977 1 4589200</span>
            </div>
          </a>

          {/* Card 4: Request a Quote CTA */}
          <div className={styles.quoteActionBlock}>
            <button
              type="button"
              onClick={() => onOpenQuoteModal?.("Monagrow Bulk Commodities")}
              className={styles.quoteCtaBtn}
            >
              Request a Quote <ArrowUpRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
