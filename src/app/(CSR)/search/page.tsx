
import { Metadata } from "next"
import { SearchPage } from "./SearchPage"

export const metadata: Metadata = {
  title: "search - Nextjs 14 Image gallery"
}
export default function Page() {
  return (
    <SearchPage />
  )
}
