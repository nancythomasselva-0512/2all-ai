import crypto from "crypto";

// Secret key derived from environment variable or secure fallback key
const ENCRYPTION_SECRET = process.env.DATABASE_ENCRYPTION_KEY || "2all-ai-secure-encryption-key-32chars!!";
const ALGORITHM = "aes-256-cbc";

/**
 * Encrypt sensitive text data (API keys, secrets, tokens) before saving to DB
 */
export function encryptData(text: string): string {
  if (!text) return "";
  try {
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(ENCRYPTION_SECRET, "salt", 32);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
  } catch (error) {
    console.error("Data encryption error:", error);
    return text;
  }
}

/**
 * Decrypt data retrieved from DB
 */
export function decryptData(encryptedText: string): string {
  if (!encryptedText || !encryptedText.includes(":")) return encryptedText;
  try {
    const [ivHex, encrypted] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const key = crypto.scryptSync(ENCRYPTION_SECRET, "salt", 32);
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Data decryption error:", error);
    return encryptedText;
  }
}
