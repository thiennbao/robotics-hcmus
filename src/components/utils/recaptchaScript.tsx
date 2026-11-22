"use client";

import Script from "next/script";

export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LcgyywuAAAAAARglVzRb2ASeCfX_dJqYBu2rzPE";

export const RecaptchaScript = () => {
  if (!RECAPTCHA_SITE_KEY) return null;

  return (
    <Script
      id="recaptcha-v3"
      src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
      strategy="afterInteractive"
    />
  );
};

export const getRecaptchaToken = (action: string): Promise<string> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve("");
      return;
    }

    const execute = () => {
      if (!window.grecaptcha || !RECAPTCHA_SITE_KEY) {
        resolve("");
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          ?.execute(RECAPTCHA_SITE_KEY, { action })
          .then((token) => resolve(token))
          .catch((err) => {
            console.error("[reCAPTCHA] execute error:", err);
            resolve("");
          });
      });
    };

    if (window.grecaptcha) {
      execute();
    } else {
      let attempts = 0;
      const checkInterval = setInterval(() => {
        attempts++;
        if (window.grecaptcha) {
          clearInterval(checkInterval);
          execute();
        } else if (attempts >= 30) {
          clearInterval(checkInterval);
          resolve("");
        }
      }, 100);
    }
  });
};
