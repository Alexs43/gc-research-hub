/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9g3CGU7EeZy
 */
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faFile } from "@fortawesome/free-solid-svg-icons"
export default function Component() {
  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <div className="w-64 bg-white p-4">
          <nav>
            <Link className="group flex items-center py-2 text-gray-500 hover:text-blue-500 transition-colors" href="#">
            <FontAwesomeIcon icon={faUser} fixedWidth className="w-5 h-5 mr-2 group-hover:animate-pulse"/>
              My Account
            </Link>
            <Link className="group flex items-center py-2 text-gray-500 hover:text-blue-500 transition-colors" href="#">
                <FontAwesomeIcon icon={faFile} fixedWidth className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              My Submissions
            </Link>
          
          </nav>
        </div>
      </div>
    </>
  )
}

