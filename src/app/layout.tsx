import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {ThemeProvider} from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Hot Takes",
    description: "DEBATE. DISCUSS. DECIDE.",
    icons: {
        icon: [
            {
                url: "/icons/flame.svg",
                type: "image/svg+xml",
            }
        ],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                window.ENV_GEMINI_API_KEY = "${process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''}";
                console.log("API key status:", window.ENV_GEMINI_API_KEY ? "Available" : "Not available");
              } catch (e) {
                console.error("Error setting up environment variables:", e);
              }
            `,
          }}
        />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
