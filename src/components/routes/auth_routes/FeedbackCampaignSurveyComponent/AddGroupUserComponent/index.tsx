import { PlusCircleIcon, PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'

const AddGroupUserComponent = () => {
    return (
        <div>
            <button className="flex items-center gap-1 py-2 bg-[#E7F0EC] text-xs text-black px-4 rounded-2xl mt-2">
                <span>
                    {' '}
                    <PlusIcon className="w-4 h-4" />
                </span>{' '}
                Add your group users
            </button>
        </div>
    )
}

export default AddGroupUserComponent
