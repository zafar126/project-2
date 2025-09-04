// import React from "react";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-200 text-center py-6 mt-8">
//       <div className="text-sm">
//         © {new Date().getFullYear()} <span className="font-semibold">HealthCare</span> — 
//         Email: <a href="mailto:support@healthcare.local" className="text-blue-400 hover:underline">
//           support@healthcare.local
//         </a>
//       </div>
//       <div className="text-xs text-gray-400 mt-2">
//         This is an educational demo, not a medical device.
//       </div>
//     </footer>
//   );
// }
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 text-center py-6 mt-8">
      <div className="text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">HealthCare</span> — 
        Email: <a href="mailto:support@healthcare.local" className="text-blue-400 hover:underline">
          support@healthcare.local
        </a>
      </div>
      <div className="text-xs text-gray-400 mt-2">
        This is an educational demo, not a medical device.
      </div>
    </footer>
  );
}
