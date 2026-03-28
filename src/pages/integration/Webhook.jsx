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
    diff = abs(time.time() - int(timestamp) / 1000.0)

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

  const rawBodySnippets = {
    typescript: `
// Express.js — capture raw body before parsing
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  },
}));

app.post("/webhook", (req, res) => {
  const timestamp = req.headers["x-webhook-timestamp"];
  const signature = req.headers["x-webhook-signature"];
  const rawBody = req.rawBody; // use this — not JSON.stringify(req.body)

  const isValid = verifyWebhookSignature({
    timestamp,
    rawBody,
    signature,
    webhookSecret: process.env.WEBHOOK_SECRET,
  });

  if (!isValid) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  // respond immediately, process async
  res.status(200).json({ received: true });

  const { event, data } = req.body;
  processWebhookEvent(event, data);
});
`,
    java: `
// Spring Boot — read raw body as bytes
@PostMapping("/webhook")
public ResponseEntity<Map<String, Object>> handleWebhook(
    HttpServletRequest request,
    @RequestHeader("x-webhook-timestamp") String timestamp,
    @RequestHeader("x-webhook-signature") String signature
) throws Exception {

    byte[] bodyBytes = request.getInputStream().readAllBytes();
    String rawBody = new String(bodyBytes, StandardCharsets.UTF_8);

    boolean isValid = WebhookVerifier.verifySignature(
        timestamp,
        rawBody,
        signature,
        System.getenv("WEBHOOK_SECRET")
    );

    if (!isValid) {
        return ResponseEntity.status(401).body(Map.of("error", "Invalid signature"));
    }

    // respond 200 immediately
    return ResponseEntity.ok(Map.of("received", true));
}
`,
    python: `
# Flask — read raw body before parsing
from flask import Flask, request, jsonify
import json, os

app = Flask(__name__)

@app.route("/webhook", methods=["POST"])
def webhook():
    timestamp = request.headers.get("x-webhook-timestamp")
    signature = request.headers.get("x-webhook-signature")
    raw_body = request.get_data(as_text=True)  # raw string before parsing

    is_valid = verify_webhook_signature(
        timestamp,
        raw_body,
        signature,
        os.environ["WEBHOOK_SECRET"]
    )

    if not is_valid:
        return jsonify({"error": "Invalid signature"}), 401

    body = json.loads(raw_body)
    event = body.get("event")
    data = body.get("data")

    # respond immediately, process async
    return jsonify({"received": True}), 200
`,
    php: `
<?php
// Read raw body before any parsing
$rawBody = file_get_contents("php://input");
$timestamp = $_SERVER["HTTP_X_WEBHOOK_TIMESTAMP"] ?? "";
$signature = $_SERVER["HTTP_X_WEBHOOK_SIGNATURE"] ?? "";

$isValid = verifyWebhookSignature(
    $timestamp,
    $rawBody,
    $signature,
    getenv("WEBHOOK_SECRET")
);

if (!$isValid) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid signature"]);
    exit;
}

$body = json_decode($rawBody, true);
$event = $body["event"];
$data = $body["data"];

http_response_code(200);
echo json_encode(["received" => true]);
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
          <strong>x-webhook-timestamp</strong> — Unix timestamp in milliseconds
          when the webhook was sent
        </li>
        <li>
          <strong>x-webhook-signature</strong> — HMAC-SHA256 hex signature for
          verifying authenticity
        </li>
        <li>
          <strong>x-webhook-alg</strong> (sha256)
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">Signature Verification</h2>

      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-md mb-5">
        <p className="font-semibold mb-2">Canonical String</p>

        <p className="font-mono text-xs">TIMESTAMP|RAW_REQUEST_BODY</p>

        <p className="mt-2">
          Use the exact raw request body received by your server — do not parse
          or re-serialize it. Any change to whitespace or key ordering will
          cause verification to fail.
        </p>

        <p className="mt-2">
          Webhooks older than <strong>5 minutes</strong> will be rejected to
          prevent replay attacks. Ensure your server clock is in sync (NTP).
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

      <h2 className="text-xl font-semibold mt-8 mb-3">Receiving Webhooks</h2>

      <p className="text-sm text-gray-600 mb-4">
        The following examples show how to capture the raw request body and
        verify the signature in your webhook endpoint. Always respond with{" "}
        <code className="bg-gray-100 px-1 rounded">200</code> immediately and
        process the event asynchronously to avoid timeouts.
      </p>

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
        fileName={`webhookEndpoint.${language}`}
        code={rawBodySnippets[language]}
      />

      <h2 className="text-xl font-semibold mt-8 mb-3">Best Practices</h2>

      <ul className="list-disc pl-5 mb-5 text-sm text-gray-700 space-y-2">
        <li>
          <strong>Always verify the signature</strong> before processing any
          webhook event.
        </li>
        <li>
          <strong>Respond with HTTP 200 immediately.</strong> If your endpoint
          takes too long, the webhook will be marked as failed. Process the
          event asynchronously after responding.
        </li>
        <li>
          <strong>Store your webhook secret securely</strong> using environment
          variables — never hardcode it in your source code.
        </li>
        <li>
          <strong>Handle duplicate events.</strong> Use{" "}
          <code className="bg-gray-100 px-1 rounded">payoutWebhookId</code> to
          deduplicate in case the same webhook is delivered more than once.
        </li>
        <li>
          <strong>Keep your server clock synced</strong> using NTP. Webhooks
          older than 5 minutes are rejected.
        </li>
      </ul>
    </>
  );
};

export default Webhook;
