import "../styles/globalStyles.css";
import type { AppProps } from "next/app";
import { UserContext } from "@lib/context";
import { useUserData } from "@hooks/useUserData";
import { Navigation } from "@components/Navigation";
import { Footer } from "@components/Footer";
import { LoadingSpinner } from "@components/Spinner";
import { Toaster } from "react-hot-toast";
import { ToastOptions } from "@styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Navigation />
      <main>
        <LoadingSpinner />
        <Component {...pageProps} />
      </main>
      <Footer />
      <Toaster position="top-center" toastOptions={ToastOptions} />
    </UserContext.Provider>
  );
}
export default MyApp;
