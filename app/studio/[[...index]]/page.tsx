"use client"

import { NextStudio } from "next-sanity/studio"
import config from "../../../sanity.config"

export default function StudioPage() {
  // No preview configuration, just the standard studio
  return <NextStudio config={config} />
}
