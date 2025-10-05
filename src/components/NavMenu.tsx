import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthProvider';
import { useMutation } from '@tanstack/react-query';
import { logOutUser } from '@/api/AuthApi';
import { toast } from 'react-toastify';
import { getRandomString } from '@/utils/helpers';
import { Avatar, AvatarVariants } from '@/ui/Avatar';
import { variants } from '@/utils/constants';

export default function NavMenu() {

  const navigate = useNavigate();
  const { clearToken, user } = useAuth()

  const [name,lastname] = user.name.split(' ');
  const randomVariant = getRandomString(variants);

  const { mutate } = useMutation({
    mutationFn: logOutUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      clearToken()
      navigate('/login');  
    },
  });

  const handleLogOut = () => {
    mutate();
  };

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-gradient-to-l hover:bg-gradient-to-r from-cyan-500 to-blue-500">
        <Bars3Icon className='w-8 h-8 text-white ' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5 flex flex-col items-center">
            <p className='text-center pb-2'>Hola: { user.name }</p>

            <Avatar 
              variant={randomVariant as AvatarVariants} 
              size='md'
            >
              { name?.at(0) }
              { lastname?.at(0) }
            </Avatar>

            <button
              className='block p-2 hover:text-purple-950'
              type='button'
              onClick={handleLogOut}
            >
              Cerrar Sesión
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}