import React from 'react'
import { Media } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Locale } from '@/utilities/locale'
import Script from 'next/script'
import { cn } from '@/utilities/utils'
import localFont from 'next/font/local'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const rasbern = localFont({
  src: [
    {
      path: '../../../../public/fonts/Rasbern-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Rasbern-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-rasbern',
})

const grotesk = localFont({
  src: [
    {
      path: '../../../../public/fonts/AlteHaasGroteskRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/AlteHaasGroteskBold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-grotesk',
})

interface LayoutProps {
  children: React.ReactNode
  params?: Promise<{ lang: Locale }>
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = params ? await params : { lang: 'pt' as Locale }
  const payload = await getPayload({ config })
  const setting = await payload.findGlobal({
    slug: 'settings',
    locale: lang,
    depth: 2,
    fallbackLocale: 'pt',
  })
  const imgFavicon = setting?.favicon as Media

  return (
    <html lang="en">
      <head>
        {imgFavicon?.url && (
          <link rel="icon" href={imgFavicon.url} type="image/<generated>" sizes="<generated>" />
        )}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '952912943539520');
              fbq('track', 'PageView');
              `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=952912943539520&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className={cn('scroll-smooth overflow-x-hidden', rasbern.variable, grotesk.variable)}>
        <main>{children}</main>
      </body>
    </html>
  )
}
