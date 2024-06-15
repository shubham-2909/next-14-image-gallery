import { UnsplashImage } from "@/models/unsplash-image"
import { Alert } from "@/components/bootstrap"
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Static Fetching - NextJS 14.2 Image Gallery",
}
export default async function page() {
  const resp = await fetch(`${process.env.BASE_URL}/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
  const image: UnsplashImage = await resp.json()
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;
  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches and caches data at build time</strong>.
        Even though the Unsplash API always returns a new image, we see the same image after refreshing the page until we compile the project again.
      </Alert>
      <Image
        src={image.urls.raw}
        alt={image.description}
        width={width}
        height={height}
        className="rounded shadow mw-100 h-100"
      />
      by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  )
}
