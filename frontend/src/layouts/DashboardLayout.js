import Sidebar from "../components/Sidebar"

export const DashboardLayout = ({ children }) => {
  return (
    <>
        <Sidebar />
        {/* <main className="content">{children}</main> */}
        <main className="content">
        <h1>Dashboard Layout</h1> {/* Test message */}
        {children}
      </main>
    </>
  )
}
