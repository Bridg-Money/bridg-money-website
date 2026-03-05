import { useState } from "react";
import { CodeBlock } from "./integration";
import { languages } from "./languages";

const Webhook = () => {
  const [language, setLang] = useState(languages[0]);

  const codeSnippets = {
    typescript: `
import crypto from "crypto";

export function verifyWebhookSignature({
  timestamp,
  rawBody,
  signature,
  webhookSecret,
}) {

  const tolerance = 5 * 60 * 1000;
  const diff = Math.abs(Date.now() - Number(timestamp));

  if (diff > tolerance) {
    throw new Error("Webhook timestamp expired");
  }

  const canonical = \`\${timestamp}|\${rawBody}\`;

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(canonical)
    .digest("hex");

  return expectedSignature === signature;
}
`,

    java: `
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

public class WebhookVerifier {

  public static boolean verifySignature(
      String timestamp,
      String rawBody,
      String signature,
      String webhookSecret
  ) throws Exception {

    long tolerance = 5 * 60 * 1000;
    long diff = Math.abs(System.currentTimeMillis() - Long.parseLong(timestamp));

    if (diff > tolerance) {
      throw new RuntimeException("Webhook timestamp expired");
    }

    String canonical = timestamp + "|" + rawBody;

    Mac mac = Mac.getInstance("HmacSHA256");

    SecretKeySpec key =
        new SecretKeySpec(webhookSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

    mac.init(key);

    byte[] hash = mac.doFinal(canonical.getBytes(StandardCharsets.UTF_8));

    String expected = bytesToHex(hash);

    return expected.equals(signature);
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

    python: `
import hmac
import hashlib
import time

def verify_webhook_signature(timestamp, raw_body, signature, webhook_secret):

    tolerance = 300
    diff = abs(time.time() - int(timestamp) / 1000)

    if diff > tolerance:
        raise Exception("Webhook timestamp expired")

    canonical = timestamp + "|" + raw_body

    expected = hmac.new(
        webhook_secret.encode(),
        canonical.encode(),
        hashlib.sha256
    ).hexdigest()

    return expected == signature
`,

    php: `
<?php

function verifyWebhookSignature(
    $timestamp,
    $rawBody,
    $signature,
    $webhookSecret
) {

    $tolerance = 300000;
    $diff = abs(round(microtime(true) * 1000) - (int)$timestamp);

    if ($diff > $tolerance) {
        throw new Exception("Webhook timestamp expired");
    }

    $canonical = $timestamp . "|" . $rawBody;

    $expected = hash_hmac(
        "sha256",
        $canonical,
        $webhookSecret
    );

    return hash_equals($expected, $signature);
}
?>
`,
  };

  return (
    <>
      <p className="mb-5">
        Webhooks allow your application to receive real-time updates about
        payout status changes.
      </p>

      <h2 className="text-xl font-semibold mb-3">Webhook Payload</h2>

      <CodeBlock
        fileName="webhook_payload.json"
        code={`{
  "payoutWebhookId": "1ee3be28-0330-48eb-b89c-8290413c81f8",
  "event": "Successful",
  "data": {
    "status": 11,
    "timestamp": "2026-03-04 17:05:15.000000",
    "businessId": "1b313206-049a-11f1-8a8e-0a0c26167b3f",
    "responseCode": "100",
    "transactionId": "BMPT2026030400007",
    "responseMessage": "Operation Success",
    "payoutTransactionId": "45e254c0-17ec-11f1-8a8e-0a0c26167b3f"
  }
}`}
      />

      <h2 className="text-xl font-semibold mb-3">Webhook Event Types</h2>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Event</th>
              <th className="border px-4 py-2 text-left">Status Code</th>
              <th className="border px-4 py-2 text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border px-4 py-2 font-medium">Initiated</td>
              <td className="border px-4 py-2">3</td>
              <td className="border px-4 py-2">
                The payout request has been created and submitted for
                processing.
              </td>
            </tr>

            <tr>
              <td className="border px-4 py-2 font-medium">Successful</td>
              <td className="border px-4 py-2">11</td>
              <td className="border px-4 py-2">
                The payout has been processed successfully and funds were
                transferred.
              </td>
            </tr>

            <tr>
              <td className="border px-4 py-2 font-medium">Failed</td>
              <td className="border px-4 py-2">12</td>
              <td className="border px-4 py-2">
                The payout failed during processing.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mb-3">Webhook Headers</h2>

      <ul className="list-disc pl-5 mb-5">
        <li>
          <strong>x-webhook-timestamp</strong>
        </li>
        <li>
          <strong>x-webhook-signature</strong>
        </li>
        <li>
          <strong>x-webhook-alg</strong> (sha256)
        </li>
      </ul>

      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md mb-5">
        <p className="font-semibold mb-2">Canonical String</p>

        <p className="font-mono text-xs">TIMESTAMP | RAW_REQUEST_BODY</p>

        <p className="mt-2">
          Use the exact raw request body received by your server when verifying
          the webhook signature.
        </p>
      </div>

      <div className="flex gap-3 text-sm mb-3">
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
        fileName={`verifyWebhook.${language}`}
        code={codeSnippets[language]}
      />
    </>
  );
};

export default Webhook;
