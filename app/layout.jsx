import { Roboto } from "next/font/google";
import "./globals.css";
import ClientProviders from "./(components)/_client_providers";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Dynamic Form Builder",
  description: "Visually create and customize forms with drag-and-drop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
