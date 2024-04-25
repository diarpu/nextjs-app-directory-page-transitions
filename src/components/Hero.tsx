'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import NewLink from './NewLink'

export default function Hero({
  title,
  description,
  cta: { path, text }
}: {
  title?: string
  description?: string
  cta: {
    path: string
    text: string
  }
}) {
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  useLayoutEffect(() => {
    // Animación para el título
    const tl = gsap.timeline({
      defaults: {
        ease: 'expo.out',
        duration: 1
      }
    })

    tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 })
    tl.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0 },
      '-=0.6'
    )
  }, [])

  return (
    <section className="flex h-screen items-center justify-center bg-black py-16">
      <div className="mx-auto max-w-screen-xl px-5 md:px-8 lg:px-10">
        {title && (
          <h1
            ref={titleRef}
            className="mb-5 text-center text-3xl font-bold text-white"
          >
            {title}
          </h1>
        )}
        {description && (
          <p ref={descriptionRef} className="mb-5 mt-4 text-center text-white">
            {description}
          </p>
        )}
        <div className="flex justify-center">
          <NewLink link={{ path, text }} />
        </div>
      </div>
    </section>
  )
}
