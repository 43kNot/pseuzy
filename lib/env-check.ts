// This file checks for required environment variables
// and provides fallbacks where possible

export function checkEnvironment() {
  const requiredVars = [
    "NEXT_PUBLIC_SANITY_PROJECT_ID",
    "SANITY_API_DATASET",
    "SANITY_API_READ_TOKEN",
    "SANITY_API_WRITE_TOKEN",
  ]

  const missing = requiredVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missing.join(", ")}`)
    console.warn("Some functionality may be limited.")
  }

  // Set defaults for optional variables
  if (!process.env.SANITY_API_DATASET) {
    process.env.SANITY_API_DATASET = "production"
  }
}
