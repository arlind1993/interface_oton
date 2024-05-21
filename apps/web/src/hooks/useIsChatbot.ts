import { useLocation } from 'react-router-dom'

export function useIsChatbotPage() {
  const { pathname } = useLocation()
  return pathname.startsWith('/chatbot')
}
