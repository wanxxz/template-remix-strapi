import { type PropsWithChildren } from 'react'
import { Breadcrumb } from 'src/components/breadcrumb'
import { Menu } from 'src/components/menu'

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <Menu />
      <div className="content">
        <Breadcrumb />
        <div>{children}</div>
      </div>
    </div>
  )
}
