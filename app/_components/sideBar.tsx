import SideBarButton from "./sideBar-button"
import { BoxIcon, LayoutGrid, ShoppingBasketIcon } from 'lucide-react'

const SideBar = () =>{
  return (
    <div className="w-96 h-full text-center p-4 bg-white">
      <div className="title">
        <h1 className="font-bold text-2xl p-5">STOCKLY</h1>
      </div>

      <div className="flex flex-col gap-4"> 
      <SideBarButton href="/">          
        <div className="flex w-full gap-2 justify-center items-center">
          <LayoutGrid size={15}/>
            Dashboard
        </div>
      </SideBarButton>

      <SideBarButton href="/products">           
        <div className="flex items-center gap-2">
          <BoxIcon size="15"/>
          Produtos
        </div>
      </SideBarButton>

      <SideBarButton href="/sale">      
      <div className="flex items-center gap-2">      
          <ShoppingBasketIcon size="15"/>
              Vendas
      </div>
      </SideBarButton>
      </div>
    </div>
  )
}

export default SideBar