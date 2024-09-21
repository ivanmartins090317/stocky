interface Params{
  id: string
}

const Sale = ({params : {id}} : {params: Params}) =>{
  return (
    <div className="w-full bg-gray-100">
      <h3  className="p-5">
        SALE PAGE {id}
        </h3>
    </div>
  )
}


export default Sale