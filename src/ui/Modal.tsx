import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export interface ModalProps {
  showModal: boolean
  onClose: () => void 
  title: string
  children: React.ReactNode
}

export const Modal = ({ showModal, onClose, children, title }: ModalProps) => {
  return (
    <Transition appear show={showModal} as={Fragment}>
    <Dialog
      as='div'
      className='relative z-10'
      onClose={onClose}
    >
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed inset-0 bg-black/60' />
      </Transition.Child>

      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16'>
              <Dialog.Title as='h3' className='font-black text-4xl  my-5'>
                { title }
              </Dialog.Title>

             { children }
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}
