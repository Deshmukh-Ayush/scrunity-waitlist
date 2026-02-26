import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Scrunity <noreply@scrunity.com>",
      to: email,
      subject: "Welcome to Scrunity Waitlist",
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background-color: #0a0a0a; color: #f5f5f5; border-radius: 30px;">
          <img src="https://scrunity-waitlist.vercel.app/logo/scrunity-logo-light.png" alt="Scrunity Logo" width="60" height="60" style="margin-bottom: 24px;" />
          
          <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 16px 0; color: #f5f5f5;">
            Scrunity AI
          </h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #a3a3a3; margin: 0 0 24px 0;">
            Welcome to the Waitlist
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #a3a3a3; margin: 0 0 24px 0;">
            Thank you for joining the <strong style="color: #f5f5f5;">Scrunity AI</strong> waitlist. We're building something special. A platform where you can dump every messed up document on a white canvas and research your ideas with AI and there are a ton of things planned.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #a3a3a3; margin: 0 0 24px 0;">
            You'll be among the first to know when we launch. Stay tuned!
          </p>
          
          <div style="border-top: 1px solid #262626; padding-top: 24px; margin-top: 32px;">
            <p style="font-size: 13px; color: #525252; margin: 0;">
              Scrunity © 2026 &mdash; Brainstorm your ideas like a Pro.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send confirmation email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
