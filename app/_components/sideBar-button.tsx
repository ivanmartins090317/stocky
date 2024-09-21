'use client'
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import Link from 'next/link'


interface SideBarButtonsProps {
  children: React.ReactNode
  href: string
}


const SideBarButton = ({children, href}: SideBarButtonsProps ) =>{
  const pathname = usePathname()
  return(
    <Button
     variant={pathname === `${href}` ? "secondary" : "ghost"}
     asChild
     >   
    <Link href={href}>{children}</Link>
    </Button>

  )
}

export default SideBarButton