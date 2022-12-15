/**
 * Proof Key for Code Exchange (PKCE) protocol
 *
 * RFC: https://tools.ietf.org/html/rfc7636
 */

import { base64ToBase64Url, bufferToBase64 } from "./util";

export const CODE_VERIFIER_BYTE_LENGTH = 86;

/**
 * Generate a cryptographic random string using the unreserved characters.
 * with a minimum length of 43 characters and a maximum length of 128 characters.
 */
function getRandomString(lengthBytes: number) {
  // generate random values and load them into byteArray.
  const byteArray = new Uint8Array(lengthBytes);
  window.crypto.getRandomValues(byteArray);

  // Convert array to string
  const randomString = bufferToBase64(byteArray);
  return randomString;
}

/**
 * Generate SHA-256 of the codeVerifier
 */
function sha256(codeVerifier: string): Promise<ArrayBuffer> {
  const buffer = new TextEncoder().encode(codeVerifier);
  return window.crypto.subtle.digest("SHA-256", buffer);
}

/**
 * PKCE Authentication
 * Generate the "Code Verifier" for PKCE Oauth
 *
 * RFC: https://www.rfc-editor.org/rfc/rfc7636#section-4.1
 */
export function generateCodeVerifier() {
  const verifier = getRandomString(CODE_VERIFIER_BYTE_LENGTH);
  return base64ToBase64Url(verifier);
}

/**
 * PKCE Authentication: Generate the Code Challenge
 *
 * - A code_challenge is the hashed version of your code_verifier.
 * - The code challenge is the Base64URL (with no padding) encoded SHA256 hash of the code verifier.
 *
 * ```
 * code_challenge = BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))
 * ```
 *
 *  RFC: https://www.rfc-editor.org/rfc/rfc7636#section-4.2
 */
export async function generateCodeChallenge(codeVerifier: string) {
  // Hash the code verifier using the SHA256 algorithm
  const hashedArrayBuffer = await sha256(codeVerifier);
  const digestHash = bufferToBase64(hashedArrayBuffer);
  // Remove reserved charaters
  const codeChallenge = base64ToBase64Url(digestHash);

  return codeChallenge;
}
