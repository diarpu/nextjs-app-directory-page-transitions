import Hero from '@/components/Hero'
import NewLink from '@/components/NewLink'
import { Metadata } from 'next'

export default async function Home() {
  return (
    <main>
      <Hero
        title="Next.js App Directory Page Transitions using gsap"
        description="This is a simple example of using Nextjs Page Transition in App
            Directory."
        cta={{
          path: '/page-2',
          text: 'Go Page 2'
        }}
      />
      <section className="flex h-screen items-center justify-center bg-green-800 py-16">
        <NewLink link={{ path: '/page-2', text: 'Go Page 2' }} />
      </section>
      <section className="flex h-screen items-center justify-center bg-cyan-800 py-16">
        <NewLink link={{ path: '/page-2', text: 'Go Page 2' }} />
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Next.js App Directory Page Transitions using gsap',
  description:
    'Demo of page transitions with Next.js App Directory and gsap library.'
}
