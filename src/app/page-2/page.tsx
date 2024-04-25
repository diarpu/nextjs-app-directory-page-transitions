import NewLink from '@/components/NewLink'

export default async function Home() {
  return (
    <main>
      <section className="flex h-screen items-center justify-center bg-yellow-800 py-16">
        <NewLink link={{ path: '/', text: 'Go Home' }} />
      </section>
      <section className="flex h-screen items-center justify-center bg-green-800 py-16">
        <NewLink link={{ path: '/', text: 'Go Home' }} />
      </section>
      <section className="flex h-screen items-center justify-center bg-cyan-800 py-16">
        <NewLink link={{ path: '/', text: 'Go Home' }} />
      </section>
    </main>
  )
}
