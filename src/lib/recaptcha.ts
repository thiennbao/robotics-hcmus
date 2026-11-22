export async function verifyRecaptchaToken(
  token: string,
  expectedAction?: string
): Promise<{ success: boolean; message?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ [reCAPTCHA] RECAPTCHA_SECRET_KEY is not set. Bypassing in development.");
      return { success: true };
    }
    return { success: false, message: "Hệ thống bảo mật chưa được cấu hình khóa bí mật." };
  }

  if (!token) {
    return { success: false, message: "Vui lòng hoàn tất xác thực bảo mật reCAPTCHA." };
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", token);

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await response.json();

    if (!data.success) {
      console.error("[reCAPTCHA] Verification failed:", data["error-codes"]);
      return { success: false, message: "Xác thực reCAPTCHA không thành công. Vui lòng thử lại." };
    }

    // Với reCAPTCHA v3, kiểm tra điểm tin cậy score (ngưỡng 0.5)
    if (typeof data.score === "number" && data.score < 0.5) {
      console.warn("[reCAPTCHA] Low score detected:", data.score);
      return { success: false, message: "Hệ thống phát hiện hành vi đáng ngờ. Vui lòng thử lại." };
    }

    if (expectedAction && data.action && data.action !== expectedAction) {
      console.warn("[reCAPTCHA] Action mismatch:", data.action, "expected:", expectedAction);
      return { success: false, message: "Hành động xác thực không hợp lệ." };
    }

    return { success: true };
  } catch (error) {
    console.error("[reCAPTCHA] Error connecting to verification service:", error);
    return { success: false, message: "Lỗi kết nối tới dịch vụ xác thực bảo mật. Vui lòng thử lại sau." };
  }
}
