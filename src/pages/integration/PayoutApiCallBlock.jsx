import { useState } from "react";
import { CodeBlock } from "./integration";
import { languages } from "./languages";

export const PayoutApiCallBlock = () => {
  const [language, setLanguage] = useState(languages[0]);

  const codeSnippets = {
    typescript: `/**
 * Initiate Payout - Bridg.Money API
 * Canonical format:
 * METHOD | PATH | TIMESTAMP | BODY
 */

import axios from "axios";
import crypto from "crypto";

const API_KEY = "YOUR_API_KEY";
const API_SECRET = "YOUR_API_SECRET";

async function initiatePayout() {
  const method = "POST";
  const path = "/v1/payouts";
  const baseUrl = "https://api-beta.bridg.money";

  const body = {
    beneficiaryId: "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
    amount: "100.00",
    transactionType: "I"
  };

  const timestamp = Date.now().toString();
  const payload = JSON.stringify(body);

  const canonical = [
    method.toUpperCase(),
    path,
    timestamp,
    payload
  ].join("|");

  const signature = crypto
    .createHmac("sha256", API_SECRET)
    .update(canonical)
    .digest("hex");

  const response = await axios.post(
    baseUrl + path,
    body,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "x-timestamp": timestamp,
        "x-signature": signature
      }
    }
  );

  console.log(response.data);
}

initiatePayout();
`,

    java: `/**
 * Initiate Payout - Bridg.Money API
 */

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class PayoutExample {

  private static final String API_KEY = "YOUR_API_KEY";
  private static final String API_SECRET = "YOUR_API_SECRET";

  public static void main(String[] args) throws Exception {

    String method = "POST";
    String path = "/v1/payouts";
    String baseUrl = "https://api-beta.bridg.money";

    String body = "{\\"beneficiaryId\\":\\"f81d4fae-7dec-11d0-a765-00a0c91e6bf6\\",\\"amount\\":\\"100.00\\",\\"transactionType\\":\\"I\\"}";

    String timestamp = String.valueOf(System.currentTimeMillis());

    String canonical = String.join("|",
        method.toUpperCase(),
        path,
        timestamp,
        body
    );

    Mac mac = Mac.getInstance("HmacSHA256");
    mac.init(new SecretKeySpec(API_SECRET.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));

    String signature = bytesToHex(
        mac.doFinal(canonical.getBytes(StandardCharsets.UTF_8))
    );

    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(baseUrl + path))
        .header("Content-Type", "application/json")
        .header("x-api-key", API_KEY)
        .header("x-timestamp", timestamp)
        .header("x-signature", signature)
        .POST(HttpRequest.BodyPublishers.ofString(body))
        .build();

    HttpClient client = HttpClient.newHttpClient();
    HttpResponse<String> response =
        client.send(request, HttpResponse.BodyHandlers.ofString());

    System.out.println(response.body());
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
Initiate Payout - Bridg.Money API
"""

import requests
import hmac
import hashlib
import time
import json

API_KEY = "YOUR_API_KEY"
API_SECRET = "YOUR_API_SECRET"

method = "POST"
path = "/v1/payouts"
base_url = "https://api-beta.bridg.money"

body = {
  "beneficiaryId": "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  "amount": "100.00",
  "transactionType": "I"
}

timestamp = str(int(time.time() * 1000))

payload = json.dumps(body, separators=(',', ':'))

canonical = "|".join([
  method.upper(),
  path,
  timestamp,
  payload
])

signature = hmac.new(
  API_SECRET.encode("utf-8"),
  canonical.encode("utf-8"),
  hashlib.sha256
).hexdigest()

headers = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
  "x-timestamp": timestamp,
  "x-signature": signature
}

response = requests.post(
  base_url + path,
  data=payload,
  headers=headers
)

print(response.json())
`,

    php: `<?php
/**
 * Initiate Payout - Bridg.Money API
 */

$API_KEY = "YOUR_API_KEY";
$API_SECRET = "YOUR_API_SECRET";

$method = "POST";
$path = "/v1/payouts";
$baseUrl = "https://api-beta.bridg.money";

$body = [
  "beneficiaryId" => "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
  "amount" => "100.00",
  "transactionType" => "I"
];

$timestamp = (string) round(microtime(true) * 1000);

$payload = json_encode($body, JSON_UNESCAPED_SLASHES);

$canonical = implode("|", [
    strtoupper($method),
    $path,
    $timestamp,
    $payload
]);

$signature = hash_hmac("sha256", $canonical, $API_SECRET);

$headers = [
  "Content-Type: application/json",
  "x-api-key: $API_KEY",
  "x-timestamp: $timestamp",
  "x-signature: $signature"
];

$ch = curl_init($baseUrl . $path);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
`,
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
        <p className="font-semibold mb-2">Important</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Delimiter must be pipe (<strong>|</strong>)
          </li>
          <li>Method must be uppercase</li>
          <li>Timestamp must be in milliseconds</li>
          <li>Sign the exact JSON string sent in the request</li>
          <li>HMAC algorithm: SHA256 (hex output)</li>
        </ul>
      </div>

      <div className="flex gap-3">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-4 py-2 rounded-md text-sm transition ${
              language === lang
                ? "bg-[#96DC03] text-black"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <CodeBlock
        fileName={`payout.${language === "typescript" ? "ts" : language}`}
        code={codeSnippets[language]}
      />
    </div>
  );
};
