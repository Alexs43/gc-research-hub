import React from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faList } from '@fortawesome/free-solid-svg-icons';
export default function page() {
    return (
        <div className="w-full px-10 py-14  overflow-hidden ml-64 h-screen">
            <h1 className='text-4xl text-primaryBlack py-2'>Publication Management</h1>
            <hr className="border-2 border-primaryGreen" />
            <div className="w-full h-full flex justify-center items-center gap-10">
                <Link className=' bg-offWhite hover:bg-offWhiteDarker transition-colors w-4/12 aspect-square shadow-md rounded-md flex flex-col items-center justify-center' href="/admin/publish-paper/publish">
                    <FontAwesomeIcon icon={faUpload} fixedWidth className='text-9xl text-primaryGreen' />
                    <p className=' text-primaryGreen text-2xl font-bold'>Publish Paper</p>
                </Link>
                <Link className=' bg-offWhite hover:bg-offWhiteDarker transition-colors w-4/12 aspect-square shadow-md rounded-md flex flex-col items-center justify-center' href="/admin/publish-paper/manage-paper">
                    <FontAwesomeIcon icon={faList} fixedWidth className='text-9xl text-primaryGreen' />
                    <p className=' text-primaryGreen text-2xl font-bold'>Manage Paper</p>
                </Link>

            </div>
        </div>
    )
}
