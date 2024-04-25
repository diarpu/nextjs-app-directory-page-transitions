'use client'

import { useStore } from '@/store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { saveScrollPosition } from './PageTransition'
import { cn } from '@/utils/cn'

export default function NewLink({
  link,
  className
}: {
  link: { path: string; text: string }
  className?: string
}) {
  const { isTransitionActive, setRoutingPageOffset } = useStore()
  const pathname = usePathname()

  return (
    <Link
      key={link.path}
      onClick={(e) => {
        if (isTransitionActive) e.preventDefault()
        saveScrollPosition(pathname, setRoutingPageOffset)
      }}
      className={cn(
        'rounded-full bg-white px-4 py-2 text-sm font-semibold uppercase text-black',
        className
      )}
      href={link.path}
    >
      {link.text}
    </Link>
  )
}
