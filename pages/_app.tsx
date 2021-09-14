import "../styles/globalStyles.css";
import type { AppProps } from "next/app";
import { UserContext } from "@lib/context";
import { useUserData } from "@hooks/useUserData";

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <main>
        <Component {...pageProps} />
      </main>
    </UserContext.Provider>
  );
}
export default MyApp;
