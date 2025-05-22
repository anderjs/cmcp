import React from "react"
import { PuffLoader } from "react-spinners"

const Fallback: React.FC = () => {
  return (
    <div className="h-screen grid place-items-center">
      <PuffLoader color="#34d399" size={300} />
    </div>
  )
}

export default Fallback;