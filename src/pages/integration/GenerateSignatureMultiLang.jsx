import { useState } from "react";
import { CodeBlock } from "./integration";
import { languages } from "./languages";

export const GenerateSignatureMultiLang = () => {
  const [language, setLang] = useState(languages[0]);

  const codeSnippets = {
    typescript: `/**
 * Generates HMAC-SHA256 signature for Bridg.Money API
 * Canonical format:
 * METHOD | PATH | TIMESTAMP | BODY
 */

import crypto from "crypto";

export function generateApiSignature({
  method,
  path,
  body,
  apiSecret,
}) {
  const timestamp = Date.now().toString();

  const canonicalBody =
    ["GET", "DELETE", "HEAD", "OPTIONS"].includes(method.toUpperCase())
      ? ""
      : body
        ? JSON.stringify(body)
        : "";

  const canonicalString = [
    method.toUpperCase(),
    path,
    timestamp,
    canonicalBody,
  ].join("|");

  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(canonicalString)
    .digest("hex");

  return { timestamp, signature };
}
`,

    java: `/**
 * Generates HMAC-SHA256 signature for Bridg.Money API
 * Canonical format:
 * METHOD | PATH | TIMESTAMP | BODY
 */

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class SignatureUtil {

  public static String generateSignature(
      String method,
      String path,
      String body,
      String apiSecret,
      String timestamp
  ) throws Exception {

    String canonicalBody =
        (method.equalsIgnoreCase("GET")
        || method.equalsIgnoreCase("DELETE")
        || method.equalsIgnoreCase("HEAD")
        || method.equalsIgnoreCase("OPTIONS"))
        ? ""
        : (body != null ? body : "");

    String canonicalString = String.join("|",
        method.toUpperCase(),
        path,
        timestamp,
        canonicalBody
    );

    Mac mac = Mac.getInstance("HmacSHA256");
    SecretKeySpec secretKey =
        new SecretKeySpec(apiSecret.getBytes("UTF-8"), "HmacSHA256");

    mac.init(secretKey);

    byte[] hash = mac.doFinal(canonicalString.getBytes("UTF-8"));

    return bytesToHex(hash);
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
Generates HMAC-SHA256 signature for Bridg.Money API
Canonical format:
METHOD | PATH | TIMESTAMP | BODY
"""

import hmac
import hashlib
import json
import time

def generate_signature(method, path, body, api_secret):
    timestamp = str(int(time.time() * 1000))

    if method.upper() in ["GET", "DELETE", "HEAD", "OPTIONS"]:
        canonical_body = ""
    else:
        canonical_body = json.dumps(body) if body else ""

    canonical_string = "|".join([
        method.upper(),
        path,
        timestamp,
        canonical_body
    ])

    signature = hmac.new(
        api_secret.encode("utf-8"),
        canonical_string.encode("utf-8"),
        hashlib.sha256
    ).hexdigest()

    return {
        "timestamp": timestamp,
        "signature": signature
    }
`,

    php: `<?php
/**
 * Generates HMAC-SHA256 signature for Bridg.Money API
 * Canonical format:
 * METHOD | PATH | TIMESTAMP | BODY
 */

function generateSignature($method, $path, $body, $apiSecret) {

    $timestamp = (string) round(microtime(true) * 1000);

    $upperMethod = strtoupper($method);

    if (in_array($upperMethod, ['GET', 'DELETE', 'HEAD', 'OPTIONS'])) {
        $canonicalBody = '';
    } else {
        $canonicalBody = $body
            ? json_encode($body, JSON_UNESCAPED_SLASHES)
            : '';
    }

    $canonicalString = implode('|', [
        $upperMethod,
        $path,
        $timestamp,
        $canonicalBody
    ]);

    $signature = hash_hmac(
        'sha256',
        $canonicalString,
        $apiSecret
    );

    return [
        'timestamp' => $timestamp,
        'signature' => $signature
    ];
}
?>
`,
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md">
        <p className="font-semibold mb-2">Canonical Request Format</p>
        <p className="font-mono text-xs">METHOD | PATH | TIMESTAMP | BODY</p>
        <p className="mt-2">
          • Delimiter must be pipe (<strong>|</strong>) • Timestamp must be in
          milliseconds • GET/DELETE/HEAD/OPTIONS must have empty body •
          Signature algorithm: <strong>HMAC-SHA256 (hex)</strong>
        </p>
      </div>

      {/* Language Switcher */}
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
        fileName={`generateSignature.${language}`}
        code={codeSnippets[language]}
      />
    </div>
  );
};
