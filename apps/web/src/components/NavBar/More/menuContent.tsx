import { useTranslation } from 'react-i18next'

export interface MenuSection {
  title: string
  items: MenuItem[]
  closeMenu?: () => void
}

export interface MenuItem {
  label: string
  href: string
  internal?: boolean
  overflow?: boolean
  closeMenu?: () => void
}

export const useMenuContent = (): MenuSection[] => {
  const { t } = useTranslation()
  return [
    {
      title: t('App'),
      items: [
        { label: t('Pool'), href: '/pool', internal: true, overflow: true },
        { label: t('Analytics'), href: '/analytics' , internal: true},
      ],
    },
    {
      title: t('Company'),
      items: [
        { label: t('Blog'), href: 'https://blog.oton.ai' , internal: true},
        { label: t('Developers'), href: '/developers' , internal: true},
      ],
    },
    {
      title: t('Need help?'),
      items: [
        { label: t('Contact us'), href: '/contact' , internal: true},
        { label: t('Help Center'), href: '/help' , internal: true},
      ],
    },
  ]
}
