import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.SANITY_API_DATASET || "production"
export const apiVersion = "2023-05-03"

// Basic client for fetching data - no preview mode
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for better performance
  // No token needed for public data
})

// Client with read token for authenticated requests
export const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

// Client with write token for content migration
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

// Helper function to generate image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
