import ExamNavbar from '@/features/exam/Layout/ExamNavbar'
import React from 'react'

function ExamLayout({children}: {children: React.ReactNode}) {
  return (
   <div className="flex flex-col h-screen">
      {/* Fixed Navbar */}
      <ExamNavbar />

      {/* Main content */}
      <main className="flex-1 bg-[#F4FCFF] flex flex-col overflow-y-auto md:overflow-hidden">
        {children}
      </main>
    </div>
  )
}

export default ExamLayout