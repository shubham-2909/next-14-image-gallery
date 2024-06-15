import { notFound } from "next/navigation"
import { Alert } from "@/components/bootstrap"
import { cache } from "react"
import { Metadata } from "next"
type Props = {
  params: { username: string }
}

async function getUser(username: string) {
  const resp = await fetch(`${process.env.BASE_URL}/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
  if (resp.status === 404) notFound()
  return await resp.json()
}

// const getUserCached = cache(getUser) Use cache if you're not using the native fetch

export async function generateMetadata({ params: { username } }: Props): Promise<Metadata> {
  const user = await getUser(username)
  return {
    title: ([user.first_name, user.last_name].filter(Boolean).join(" ") || user.username) + " - NextJS 14 Image Gallery",
  }
}
export default async function Page({ params: { username } }: Props) {
  const user = await getUser(username)

  return (
    <div>
      <Alert>
        This profile page uses <strong>generateMetadata</strong> to set the <strong>page title</strong> dynamically from the API response.
      </Alert>

      <h1>{user.username}</h1>
      <p>First name: {user.first_name}</p>
      <p>Last name: {user.last_name}</p>
      <a href={"https://unsplash.com/" + user.username}>Unsplash profile</a>
    </div>
  );

}
