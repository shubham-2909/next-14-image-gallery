import { UnsplashImage } from "@/models/unsplash-image"
import { Alert } from "@/components/bootstrap"
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic Fetching - NextJS 13.4 Image Gallery",
}

// export const revalidate = 0

export default async function page() {
  const resp = await fetch(`${process.env.BASE_URL}/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`, {
    cache: "no-store",
    // cache: "no-cache" basically same
    // next: {
    //   revalidate: 0
    // } // TODO Same as revalidate
  })
  const image: UnsplashImage = await resp.json()
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;
  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches data dynamically</strong>.
        Every time you refresh the page, you get a new image from the Unsplash API.
      </Alert>

      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadow mw-100 h-100"
      />
      by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  );
}
