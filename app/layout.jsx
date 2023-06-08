import "./globals.css";
import { Inter } from "next/font/google";

import styles from "./page.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DJ Events",
  description: "Find the latest DJ and other musical events",
  keywords: "music, dj,edm,events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <Header />

          <div className={styles.container}>{children}</div>
          <Footer />
          <div id="modal-root"></div>
        </AuthProvider>
      </body>
    </html>
  );
}
