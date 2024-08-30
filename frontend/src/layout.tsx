import { Toaster } from "@/components/ui/toaster"
 
export default function RootLayout({ children }) {
    return (
      <>
        <main>{children}</main>
        <Toaster />
      </>
    );
  }