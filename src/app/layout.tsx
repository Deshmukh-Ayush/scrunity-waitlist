import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { PostHogProvider } from "./providers";

const insrif = Instrument_Serif({
  weight: "400",
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Scrunity — Join the Waitlist",
  description: "Research your ideas like a Pro with Scrunity. Import everything, use AI, and create mind-maps and flows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${insrif.className} antialiased`}
      >
        <PostHogProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </PostHogProvider>
      </body>
    </html>
  );
}
