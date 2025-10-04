import { Link } from "react-router-dom"

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={'antialiased text-9xl'}>404</h2>
        <p className="font-semibold text-xl">Whoops! parece que la pagina que buscas no existe</p>
        <p className="font-light">
          <span>Puedes regresar al </span>
          <Link to='/' className="font-normal hover:underline transition-all">Inicio</Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <img
         src='/imgs/starman_750x750.png'
         alt="Startman"
         className="p-5 sm:p-0"
         width={550}
         height={550}
        />
      </div>
    </div>
  )
}
