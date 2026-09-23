import { Resend } from "resend";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const recipient = process.argv[2];
  
  if (!recipient) {
    console.error("Usage: npx tsx scripts/test-resend.ts <recipient-email>");
    process.exit(1);
  }

  console.log("Checking environment variables...");
  
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: RESEND_API_KEY is not set in .env.local");
    process.exit(1);
  } else {
    console.log("✅ RESEND_API_KEY is set");
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!fromEmail) {
    console.error("❌ Error: RESEND_FROM_EMAIL is not set in .env.local");
    process.exit(1);
  } else {
    console.log(`✅ RESEND_FROM_EMAIL is set to: ${fromEmail}`);
  }

  console.log(`\nAttempting to send test email to ${recipient}...`);

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromEmail,
      to: recipient,
      subject: "Clinicify Test Email",
      html: "<p>If you are reading this, your Resend configuration is working correctly.</p>",
    });

    if (result.error) {
      console.error("\n❌ Email provider returned an error:");
      console.error(result.error.message);
      console.error(result.error);
    } else {
      console.log("\n✅ Email sent successfully!");
      console.log(`Provider ID: ${result.data?.id}`);
    }
  } catch (error) {
    console.error("\n❌ Exception occurred while sending email:");
    console.error(error instanceof Error ? error.message : error);
  }
}

main();
