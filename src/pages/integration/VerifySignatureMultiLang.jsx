import { useState } from "react";
import { CodeBlock } from "./integration";
import { languages } from "./languages";

export const VerifySignatureMultiLang = () => {
  const [language, setLang] = useState(languages[0]);

  const codeSnippets = {
    typescript: `/**
 * Verifies response signature from Bridg.Money API
 * Canonical format:
 * STATUS | PATH | TIMESTAMP | RAW_RESPONSE_STRING
 */

import crypto from "crypto";

export function verifyResponseSignature({
  status,
  path,
  timestamp,
  rawBody, // MUST be raw response string
  signature,
  apiSecret,
}) {
  const canonicalString = [
    status,
    path,
    timestamp,
    rawBody
  ].join("|");

  const expectedSignature = crypto
    .createHmac("sha256", apiSecret)
    .update(canonicalString)
    .digest("hex");

  const sigBuf = Buffer.from(signature, "hex");
  const expBuf = Buffer.from(expectedSignature, "hex");

  if (sigBuf.length !== expBuf.length) return false;

  return crypto.timingSafeEqual(sigBuf, expBuf);
}
`,

    java: `/**
 * Verifies response signature from Bridg.Money API
 * Canonical format:
 * STATUS | PATH | TIMESTAMP | RAW_RESPONSE_STRING
 */

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

public class ResponseVerifier {

  public static boolean verifySignature(
      String status,
      String path,
      String timestamp,
      String rawBody, // MUST be exact response string
      String signature,
      String apiSecret
  ) throws Exception {

    String canonicalString = String.join("|",
        status,
        path,
        timestamp,
        rawBody
    );

    Mac mac = Mac.getInstance("HmacSHA256");
    SecretKeySpec secretKey =
        new SecretKeySpec(apiSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

    mac.init(secretKey);

    byte[] hash = mac.doFinal(canonicalString.getBytes(StandardCharsets.UTF_8));
    String expectedSignature = bytesToHex(hash);

    return constantTimeEquals(expectedSignature, signature);
  }

  private static boolean constantTimeEquals(String a, String b) {
    if (a.length() != b.length()) return false;
    int result = 0;
    for (int i = 0; i < a.length(); i++) {
      result |= a.charAt(i) ^ b.charAt(i);
    }
    return result == 0;
  }

  private static String bytesToHex(byte[] bytes) {
    StringBuilder sb = new StringBuilder();
    for (byte b : bytes) {
      sb.append(String.format("%02x", b));
    }
    return sb.toString();
  }
}
`,

    python: `"""
Verifies response signature from Bridg.Money API
Canonical format:
STATUS | PATH | TIMESTAMP | RAW_RESPONSE_STRING
"""

import hmac
import hashlib

def verify_signature(status, path, timestamp, raw_body, signature, api_secret):

    canonical_string = "|".join([
        str(status),
        path,
        timestamp,
        raw_body  # MUST be exact raw response string
    ])

    expected_signature = hmac.new(
        api_secret.encode("utf-8"),
        canonical_string.encode("utf-8"),
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(signature, expected_signature)
`,

    php: `<?php
/**
 * Verifies response signature from Bridg.Money API
 * Canonical format:
 * STATUS | PATH | TIMESTAMP | RAW_RESPONSE_STRING
 */

function verifySignature(
    $status,
    $path,
    $timestamp,
    $rawBody, // MUST be exact response string
    $signature,
    $apiSecret
) {

    $canonicalString = implode('|', [
        $status,
        $path,
        $timestamp,
        $rawBody
    ]);

    $expectedSignature = hash_hmac(
        'sha256',
        $canonicalString,
        $apiSecret
    );

    return hash_equals($expectedSignature, $signature);
}
?>
`,
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md">
        <p className="font-semibold mb-2">Response Signature Verification</p>
        <p className="font-mono text-xs">
          STATUS | PATH | TIMESTAMP | RAW_RESPONSE_STRING
        </p>
        <p className="mt-2">
          • Delimiter must be pipe (<strong>|</strong>) • Use the exact raw
          response body (do NOT re-stringify JSON) • Signature algorithm:{" "}
          <strong>HMAC-SHA256 (hex)</strong>• Use constant-time comparison
        </p>
      </div>

      <div className="flex gap-3 text-sm">
        {languages.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded-md ${
              language === l
                ? "bg-[#96DC03] text-black"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <CodeBlock
        fileName={`verifySignature.${language}`}
        code={codeSnippets[language]}
      />
    </div>
  );
};
