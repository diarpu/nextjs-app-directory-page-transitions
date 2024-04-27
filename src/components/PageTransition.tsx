'use client'

import { useIsFirstRender } from '@/hooks/useIsFirstRender'
import { useStore } from '@/store'
import { cn } from '@/utils/cn'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
}

export function saveScrollPosition(
  url: string,
  setRoutingPageOffset: (val: number) => void
): void {
  const scrollPos = { x: window.scrollX, y: window.scrollY }
  setRoutingPageOffset(scrollPos.y)
  sessionStorage.setItem(url, JSON.stringify(scrollPos))
}

function clearAllScrollPos(): void {
  sessionStorage.clear()
}

function restoreScrollPos(url: string): void {
  const scrollPos = JSON.parse(
    sessionStorage.getItem(url) || JSON.stringify({ x: 0, y: 0 })
  )
  if (scrollPos) {
    window.scrollTo({
      top: scrollPos.y,
      left: scrollPos.x,
      behavior: 'smooth'
    })
  }
}

export default function PageTransition({ children }: Props) {
  const pathname = usePathname()
  const currentRef = useRef<HTMLDivElement>(null)
  const tempRef = useRef<HTMLDivElement>(null)
  const lastRef = useRef<HTMLCollection | null>(null)
  const [currentPath, setCurrentPath] = useState<string>(pathname)
  const [shouldScrollRestore, setShouldScrollRestore] = useState<boolean>(false)
  const isFirstRender = useIsFirstRender()
  const {
    isTransitionActive,
    setIsTransitionActive,
    routingPageOffset,
    setRoutingPageOffset
  } = useStore()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
      restoreScrollPos(pathname)

      const onReload = (): void => {
        clearAllScrollPos()
      }

      window.addEventListener('beforeunload', onReload)

      window.addEventListener('popstate', () => {
        const scrollPos = { x: window.scrollX, y: window.scrollY }
        setRoutingPageOffset(scrollPos.y)
        setShouldScrollRestore(true)
      })

      return () => {
        window.removeEventListener('beforeunload', onReload)
      }
    }
  }, [pathname])

  useLayoutEffect(() => {
    if (!currentRef.current) return
    if (!lastRef.current) lastRef.current = currentRef.current.children
    if (currentRef.current && tempRef.current) {
      const tempFirstChild = tempRef.current.children[0]
      const lastFirstChild = lastRef.current[0]
      if (tempFirstChild && lastFirstChild) {
        tempFirstChild.appendChild(lastFirstChild.cloneNode(true))
      }
      lastRef.current = currentRef.current.children
    }
  }, [pathname])

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    if (currentRef.current && tempRef.current && !isFirstRender) {
      mm.add(
        {
          isDesktop: '(min-width: 772px)',
          isMobile: '(max-width: 771px)'
        },
        (context) => {
          const { isMobile } = context.conditions as {
            isDesktop: boolean
            isMobile: boolean
          }

          const tl = gsap.timeline({
            defaults: {
              ease: 'expo.out',
              duration: isMobile ? 1.4 : 1.8,
              transformOrigin: 'bottom'
            }
          })

          tl.set(tempRef.current, {
            width: '100vw',
            height: '100dvh',
            overflow: 'hidden'
          })

          tl.set(currentRef.current, {
            position: 'absolute',
            top: '100dvh',
            left: '0',
            width: '100vw',
            height: '100dvh',
            overflow: 'hidden'
          })

          tl.fromTo(
            tempRef.current,
            {
              scale: 1
            },
            {
              scale: 0.85,
              onStart: () => {
                setIsTransitionActive(true)
              }
            }
          )

          tl.fromTo(
            currentRef.current,
            {
              top: '100vh'
            },
            {
              top: 0,
              onComplete: () => {
                setCurrentPath(pathname)
                setIsTransitionActive(false)
                setRoutingPageOffset(0)

                if (shouldScrollRestore) {
                  setTimeout(() => {
                    restoreScrollPos(pathname)
                    setShouldScrollRestore(false)
                  }, 500)
                }
              }
            },
            '-=1.2'
          )

          tl.set(currentRef.current, {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'visible'
          })
        }
      )
    }
  }, [isFirstRender, pathname, setIsTransitionActive])

  return (
    <div
      className={cn(
        'content relative',
        isTransitionActive && 'overflow-hidden bg-blue-600'
      )}
    >
      {pathname !== currentPath && (
        <div
          key={pathname + ' temp'}
          ref={tempRef}
          className={cn('temp transition')}
        >
          <div
            className="origin-center will-change-transform"
            style={{
              transform: `translateY(-${routingPageOffset}px)`
            }}
          ></div>
        </div>
      )}

      <div key={pathname} ref={currentRef} className={cn('next transition')}>
        <div className="bg-gray-1">{children}</div>
      </div>
    </div>
  )
}
