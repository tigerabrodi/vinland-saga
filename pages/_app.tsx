import '../styles/globalStyles.css'
import type { AppProps } from 'next/app'
import { UserContext } from '@lib/context'
import { useUserData } from '@hooks/auth/useUserData'
import { Navigation } from '@components/Navigation'
import { Footer } from '@components/Footer'
import { LoadingSpinner } from '@components/Spinner'
import { Toaster } from 'react-hot-toast'
import { ToastOptions } from '@styles/theme'
import { NewRecipeModal } from '@components/NewRecipeModal'
import { useNewRecipeStore } from '@lib/store'

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData()
  const { isModalOpen } = useNewRecipeStore()

  return (
    <UserContext.Provider value={userData}>
      <Navigation />
      <main>
        <LoadingSpinner />
        <Component {...pageProps} />
      </main>
      {isModalOpen && <NewRecipeModal />}
      <Footer />
      <Toaster position="top-center" toastOptions={ToastOptions} />
    </UserContext.Provider>
  )
}
export default MyApp
