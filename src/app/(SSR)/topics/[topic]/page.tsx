import { UnsplashImage } from '@/models/unsplash-image'
import Image from 'next/image'
import React from 'react'
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstrap"
import { Metadata } from 'next';
type Props = {
  params: { topic: string }
  // if u're using searchParams use like
  // searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  return ["health", "fitness", "coding"].map(topic => ({ topic }))
}

export function generateMetadata({ params: { topic } }: Props): Metadata {
  return {
    title: `${topic} - Nextjs 14 Image gallery`
  }
}
// export const revalidate = 0
export default async function Page({ params: { topic } }: Props) {
  const resp = await fetch(`${process.env.BASE_URL}/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${topic}&count=30`)
  const images: UnsplashImage[] = await resp.json()
  return (
    <div>
      <div>
        <Alert>
          This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the URL has a dynamic parameter.
          Pages that are not included in generateStaticParams will be fetched & rendered on first access and then <strong>cached for subsequent requests</strong> (this can be disabled).
        </Alert>

        <h1>{topic}</h1>
        {
          images.map(image => (
            <Image
              src={image.urls.raw}
              width={250}
              height={250}
              alt={image.description}
              key={image.urls.raw}
              className={styles.image}
            />
          ))
        }
      </div>
    </div>
  )
}
