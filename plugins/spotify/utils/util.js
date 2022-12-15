export const bufferToBase64 = (input) => {
  if (typeof input === "string") {
    return input;
  }
  const arr = new Uint8Array(input);
  return window.btoa(String.fromCharCode(...arr));
};

/**
 * Return a URL Safe base64 string
 */
export const base64ToBase64Url = (base64Str) => {
  return base64Str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
