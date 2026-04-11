import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins} from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "NexLearn",
  description: "NextLearn Logic Question and Answered",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/auth/authLogo.svg" type="image/svg+xml" />
      </head>
      <body className={`${poppins.className} min-h-full flex flex-col`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <Toaster richColors closeButton expand={true} duration={3000} />
      </body>
    </html>
  );
}
