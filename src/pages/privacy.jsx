import React, { useContext, useMemo } from "react";
import { ThemeContext } from "./../styles/theme";
import Head from "next/head";

export default function PrivacyPage() {
  const [theme] = useContext(ThemeContext);

  // Theme-aware tokens (keep inline, no CSS module needed)
  const t = useMemo(() => {
    const isDark = theme === "dark";
    return {
      isDark,
      bg: isDark ? "#0b0f14" : "#ffffff",
      fg: isDark ? "#e5e7eb" : "#111827",
      muted: isDark ? "#9ca3af" : "#6b7280",
      cardBg: isDark ? "#111827" : "#f6f7f9",
      border: isDark ? "#1f2937" : "#e5e7eb",
      link: isDark ? "#60a5fa" : "#2563eb",
      hrOpacity: isDark ? 0.6 : 0.3,
    };
  }, [theme]);

  return (
    <>
      <Head>
        <title>Privacy Notice – Amazon Developer Integration</title>
        <meta
          name="description"
          content="Privacy notice for Amazon SP-API / Login with Amazon integration."
        />
      </Head>

      {/* Ensure body/background matches your theme */}
      <style jsx global>{`
        body {
          background: ${t.bg};
          color: ${t.fg};
        }
        a {
          color: ${t.link};
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>

      <main
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "48px 16px 64px",
          lineHeight: 1.6,
          background: t.bg,
          color: t.fg,
        }}
      >
        <h1 style={{ marginBottom: 8 }}>
          Privacy Notice – Amazon Developer Integration
        </h1>

        <p style={{ color: t.muted, marginTop: 0 }}>
          This page explains how data is handled when you authorize our Amazon
          integration (e.g., SP-API / Login with Amazon).
        </p>

        <div
          style={{
            background: t.cardBg,
            border: `1px solid ${t.border}`,
            borderRadius: 12,
            padding: 16,
            marginTop: 20,
          }}
        >
          <strong>Status:</strong> This integration may be in development and used
          for internal testing. If enabled for a user, it will only access data
          that you explicitly authorize through Amazon’s consent screen.
        </div>

        <h2 style={{ marginTop: 28 }}>Who we are</h2>
        <p>
          This privacy notice applies to the Amazon integration provided by{" "}
          <strong>ATV Axiomatic</strong> (the “Application”). If you have
          questions, contact:{" "}
          <a href="mailto:ab.tech.ventures@gmail.com">
            ab.tech.ventures@gmail.com
          </a>
          .
        </p>

        <h2 style={{ marginTop: 28 }}>What data we access</h2>
        <p>
          When you authorize the Application via Amazon, it may request access to
          certain Amazon Seller or Advertising data, depending on the permissions
          (scopes) you approve. This may include:
        </p>
        <ul>
          <li>
            Account identifiers needed for access (e.g., seller/marketplace
            identifiers)
          </li>
          <li>
            Product catalog and listing content (e.g., ASIN/SKU, title, bullets,
            images, attributes)
          </li>
          <li>Orders and fulfillment information (only if you authorize those scopes)</li>
          <li>
            Performance and business reports/metrics (e.g., sales, traffic,
            conversion, inventory)
          </li>
          <li>Advertising metrics and campaign data (only if you authorize advertising scopes)</li>
        </ul>
        <p>
          We only access the specific categories of data that correspond to the
          scopes you grant.
        </p>

        <h2 style={{ marginTop: 28 }}>How we use the data</h2>
        <ul>
          <li>Displaying your account data inside the Application</li>
          <li>Analyzing listings/metrics to generate recommendations and diagnostics</li>
          <li>Producing reports and summaries you request</li>
          <li>Improving reliability, security, and performance (e.g., logging errors)</li>
        </ul>

        <h2 style={{ marginTop: 28 }}>Data storage and retention</h2>
        <ul>
          <li>
            <strong>In transit:</strong> Data is transmitted over encrypted
            connections (HTTPS/TLS).
          </li>
          <li>
            <strong>At rest:</strong> If stored, data is protected using
            appropriate access controls and encryption where feasible.
          </li>
          <li>
            <strong>Retention:</strong> We retain data only as long as necessary
            to provide the service and meet legitimate operational needs.
          </li>
        </ul>

        <h2 style={{ marginTop: 28 }}>Data sharing</h2>
        <p>
          We do <strong>not</strong> sell Amazon data. We do not share Amazon data
          with third parties except:
        </p>
        <ul>
          <li>
            Service providers that help run the Application (e.g., hosting,
            monitoring), under confidentiality obligations
          </li>
          <li>When required by law, regulation, or valid legal process</li>
          <li>To protect rights, safety, and prevent fraud or abuse</li>
        </ul>

        <h2 style={{ marginTop: 28 }}>Your choices and controls</h2>
        <ul>
          <li>
            <strong>Revoke access:</strong> You can revoke the Application’s
            access at any time from Amazon’s app authorization / permissions
            area.
          </li>
          <li>
            <strong>Data deletion request:</strong> Email{" "}
            <a href="mailto:ab.tech.ventures@gmail.com">
              ab.tech.ventures@gmail.com
            </a>{" "}
            with subject <code>Data Deletion Request</code>.
          </li>
          <li>
            <strong>Scope control:</strong> Access is limited to the scopes you
            approve on Amazon’s consent screen.
          </li>
        </ul>

        <hr
          style={{
            marginTop: 40,
            border: 0,
            borderTop: `1px solid ${t.border}`,
            opacity: t.hrOpacity,
          }}
        />

        <p style={{ fontSize: 13, color: t.muted, marginTop: 12 }}>
          <strong>Last updated:</strong> December 24, 2025
        </p>
      </main>
    </>
  );
}
