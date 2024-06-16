"use client"
import { UnsplashImage } from '@/models/unsplash-image'
import Image from 'next/image'
import React, { FormEvent, useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import styles from "./SearchPage.module.css"
export function SearchPage() {
  const [searchResults, setsearchResults] = useState<UnsplashImage[] | null>(null)
  const [loading, setLoading] = useState(false)


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const query = formData.get("query")?.toString().trim()

    if (query) {
      try {
        setsearchResults(null)
        setLoading(true)
        const response = await fetch(`/api/search?query=${query}`)
        const images: UnsplashImage[] = await response.json()
        setsearchResults(images)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side</strong>.
        In order to not leak API credentials, the request is sent to a NextJS <strong>route handler</strong> that runs on the server.
        This route handler then fetches the data from the Unsplash API and returns it to the client.
      </Alert>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='search-input'>
          <Form.Label>
            Search query
          </Form.Label>
          <Form.Control
            name="query"
            placeholder="E.g. cats, hotdogs, ..."
          />
        </Form.Group>
        <Button type='submit' className='mb-3'>Search</Button>
      </Form>


      <div className="d-flex flex-column align-items-center">
        {loading && <Spinner animation="border" />}
        {searchResults?.length === 0 && <p>Nothing found. Try a different query!</p>}
      </div>
      {
        searchResults && <>
          {searchResults.map(image => (
            <Image
              key={image.urls.raw}
              src={image.urls.raw}
              width={250}
              height={250}
              alt={image.description}
              className={styles.image}
            />
          ))}
        </>
      }
    </div>
  )
}
