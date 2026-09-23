import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function adminApp() {
  if (getApps().length) return getApps()[0]!;

  let credential: object;

  // Vercel / production: use JSON string from environment variable
  if (process.env.FIREBASE_ADMIN_CREDENTIAL_JSON) {
    credential = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL_JSON);
  } else {
    // Local development: read from file path
    const credentialPath = process.env.FIREBASE_ADMIN_CREDENTIAL_PATH;
    if (!credentialPath) throw new Error("FIREBASE_ADMIN_CREDENTIAL_PATH or FIREBASE_ADMIN_CREDENTIAL_JSON is not configured.");
    credential = JSON.parse(readFileSync(resolve(process.cwd(), credentialPath), "utf8"));
  }

  return initializeApp({ credential: cert(credential as Parameters<typeof cert>[0]) });
}

export const adminAuth = () => getAuth(adminApp());
export const adminDb = () => getFirestore(adminApp());
