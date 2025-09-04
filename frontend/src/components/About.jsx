// import React from 'react'

// export default function About() {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">About</h2>
        
//         <p className="text-gray-600 mb-3 text-base sm:text-lg">
//           This app scans medical reports, estimates disease risks (keyword-based), 
//           and suggests fruits/veggies, sleep, and lifestyle changes. 
//           <span className="font-semibold text-red-500"> It does not provide medicines.</span>
//         </p>
        
//         <p className="text-gray-700 text-sm sm:text-base">
//           <span className="font-semibold">Contact:</span> support@healthcare.local
//         </p>
//       </div>
//     </div>
//   )
// }
import React from 'react'

export default function About() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">About</h2>
        <p className="text-gray-600 mb-3 text-base sm:text-lg">
          This app scans medical reports, estimates disease risks (keyword-based), 
          and suggests fruits/veggies, sleep, and lifestyle changes. 
          <span className="font-semibold text-red-500"> It does not provide medicines.</span>
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          <span className="font-semibold">Contact:</span> support@healthcare.local
        </p>
      </div>
    </div>
  )
}