import { Header } from '../components'
import { Cart } from '../components'
import { Outlet } from 'react-router'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="lg:grid lg:grid-cols-2 xl:grid-cols-3">
        <section className="p-6 xl:col-span-2 lg:mb-[30rem] xl:mb-[20rem]">
          <Outlet />
        </section>
        <Cart />
      </main>
    </>
  )
}