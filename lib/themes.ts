// Theme definitions for Pseuzy
// Each theme has a name, description, and color values

// Define the Theme interface
export interface Theme {
  id: string
  name: string
  description: string
  colors: {
    primary: string
    primaryDark: string
    primaryLight: string
    secondary: string
    accentCool: string
    accentWarm: string
    accentLight: string
    accentLighter: string
    muted: string
    uiPurple: string
    uiLavender: string
  }
  isDark?: boolean
  isHighContrast?: boolean
  activeColor?: string
}

// Original theme based on the provided color scheme
export const purpleLogicTheme: Theme = {
  id: "purple-logic",
  name: "Purple Logic",
  description: "The default theme with rich purples and vibrant accents",
  colors: {
    primary: "#1B0637",
    primaryDark: "#150428",
    primaryLight: "#2D1155",
    secondary: "#A888D8",
    accentCool: "#1868E8",
    accentWarm: "#D3FD53",
    accentLight: "#EEECFE",
    accentLighter: "#DAD0F2",
    muted: "#9E98A9",
    uiPurple: "#622CA0",
    uiLavender: "#A888D8",
  },
}

// Themes based on the original color scheme
export const themes: Theme[] = [
  purpleLogicTheme,

  // Midnight Coder - Dark variant of the original
  {
    id: "midnight-coder",
    name: "Midnight Coder",
    description: "A darker, more intense version of the default theme",
    colors: {
      primary: "#0F0320",
      primaryDark: "#080215",
      primaryLight: "#1A0B3D",
      secondary: "#8A6BC0",
      accentCool: "#0F4BB8",
      accentWarm: "#B8E035",
      accentLight: "#D8D0F0",
      accentLighter: "#B8A8D8",
      muted: "#7A7489",
      uiPurple: "#4A1C80",
      uiLavender: "#8A6BC0",
    },
    isDark: true,
  },

  // Lavender Fields - Lighter variant
  {
    id: "lavender-fields",
    name: "Lavender Fields",
    description: "A softer, lighter version with pastel purples",
    colors: {
      primary: "#4A2D80",
      primaryDark: "#3A1F70",
      primaryLight: "#6A4DA0",
      secondary: "#C0A8E8",
      accentCool: "#5A8AFF",
      accentWarm: "#E0FF8A",
      accentLight: "#F5F0FF",
      accentLighter: "#E8E0FA",
      muted: "#B0AAC0",
      uiPurple: "#7A4DC0",
      uiLavender: "#C0A8E8",
    },
  },

  // Electric Violet - More vibrant variant
  {
    id: "electric-violet",
    name: "Electric Violet",
    description: "A high-energy theme with vibrant purples and electric accents",
    colors: {
      primary: "#2A0A5A",
      primaryDark: "#1A0545",
      primaryLight: "#3F1580",
      secondary: "#B090FF",
      accentCool: "#2080FF",
      accentWarm: "#EEFF00",
      accentLight: "#F0E8FF",
      accentLighter: "#E0D0FF",
      muted: "#A090C0",
      uiPurple: "#7A20D0",
      uiLavender: "#B090FF",
    },
  },

  // Twilight Logic - Blue-purple variant
  {
    id: "twilight-logic",
    name: "Twilight Logic",
    description: "A twilight-inspired theme with blue-purple gradients",
    colors: {
      primary: "#1A1A4A",
      primaryDark: "#10103A",
      primaryLight: "#2A2A6A",
      secondary: "#8A90D8",
      accentCool: "#3060C0",
      accentWarm: "#C0E050",
      accentLight: "#E8ECFF",
      accentLighter: "#D0D8F0",
      muted: "#8A90B0",
      uiPurple: "#4040A0",
      uiLavender: "#8A90D8",
    },
  },

  // Royal Purple - Rich, royal variant
  {
    id: "royal-purple",
    name: "Royal Purple",
    description: "A rich, royal theme with deep purples and gold accents",
    colors: {
      primary: "#2C0852",
      primaryDark: "#1E0538",
      primaryLight: "#3F1270",
      secondary: "#C09AE0",
      accentCool: "#4050C0",
      accentWarm: "#FFD700",
      accentLight: "#F5EEFF",
      accentLighter: "#E5D5F5",
      muted: "#AA95C0",
      uiPurple: "#6A1CB0",
      uiLavender: "#C09AE0",
    },
  },

  // Neon Synth - Cyberpunk variant
  {
    id: "neon-synth",
    name: "Neon Synth",
    description: "A cyberpunk-inspired theme with neon accents",
    colors: {
      primary: "#0A0A20",
      primaryDark: "#050510",
      primaryLight: "#15153A",
      secondary: "#9A70D0",
      accentCool: "#00AAFF",
      accentWarm: "#FF00AA",
      accentLight: "#E0E0FF",
      accentLighter: "#C8C8F0",
      muted: "#7070A0",
      uiPurple: "#AA20FF",
      uiLavender: "#9A70D0",
    },
    isDark: true,
  },

  // Amethyst - Crystal-inspired variant
  {
    id: "amethyst",
    name: "Amethyst",
    description: "A crystal-inspired theme with amethyst purples",
    colors: {
      primary: "#3A1060",
      primaryDark: "#280A45",
      primaryLight: "#4C1A80",
      secondary: "#D0A0E0",
      accentCool: "#6080E0",
      accentWarm: "#E0C060",
      accentLight: "#F8F0FF",
      accentLighter: "#EAE0F5",
      muted: "#B0A0C0",
      uiPurple: "#8030C0",
      uiLavender: "#D0A0E0",
    },
  },

  // Educational app themes

  // Focus Mode - High contrast for focus
  {
    id: "focus-mode",
    name: "Focus Mode",
    description: "A high-contrast theme designed for maximum focus and readability",
    colors: {
      primary: "#000000",
      primaryDark: "#000000",
      primaryLight: "#202020",
      secondary: "#707070",
      accentCool: "#0066CC",
      accentWarm: "#FFCC00",
      accentLight: "#F5F5F5",
      accentLighter: "#E0E0E0",
      muted: "#707070",
      uiPurple: "#404040",
      uiLavender: "#707070",
    },
    isHighContrast: true,
  },

  // Ocean Calm - Blue-based calm theme
  {
    id: "ocean-calm",
    name: "Ocean Calm",
    description: "A calming blue theme that reduces eye strain during long study sessions",
    colors: {
      primary: "#1A3A5A",
      primaryDark: "#102030",
      primaryLight: "#2A5080",
      secondary: "#70A0C0",
      accentCool: "#30A0E0",
      accentWarm: "#E0C070",
      accentLight: "#F0F5FA",
      accentLighter: "#E0EAF5",
      muted: "#80A0B0",
      uiPurple: "#3060A0",
      uiLavender: "#70A0C0",
    },
  },

  // Forest Mind - Green-based focus theme
  {
    id: "forest-mind",
    name: "Forest Mind",
    description: "A nature-inspired theme with forest greens for a refreshing learning experience",
    colors: {
      primary: "#1A3A2A",
      primaryDark: "#102018",
      primaryLight: "#2A5040",
      secondary: "#70A080",
      accentCool: "#30A080",
      accentWarm: "#E0A040",
      accentLight: "#F0F8F5",
      accentLighter: "#E0F0E8",
      muted: "#80A090",
      uiPurple: "#306050",
      uiLavender: "#70A080",
    },
  },

  // Warm Sunset - Orange/red warm theme
  {
    id: "warm-sunset",
    name: "Warm Sunset",
    description: "A warm, inviting theme with sunset colors for a cozy learning environment",
    colors: {
      primary: "#3A2018",
      primaryDark: "#281410",
      primaryLight: "#503028",
      secondary: "#C08070",
      accentCool: "#E06030",
      accentWarm: "#FFC060",
      accentLight: "#FFF5F0",
      accentLighter: "#F5E8E0",
      muted: "#A08078",
      uiPurple: "#804030",
      uiLavender: "#C08070",
    },
  },

  // Chalk Board - Classic education theme
  {
    id: "chalk-board",
    name: "Chalk Board",
    description: "A classic education-inspired theme reminiscent of traditional classrooms",
    colors: {
      primary: "#1A2A1A",
      primaryDark: "#101810",
      primaryLight: "#2A3A2A",
      secondary: "#A0B0A0",
      accentCool: "#60A060",
      accentWarm: "#FFFFFF",
      accentLight: "#F0F5F0",
      accentLighter: "#E0E8E0",
      muted: "#808A80",
      uiPurple: "#405040",
      uiLavender: "#A0B0A0",
    },
    isDark: true,
  },

  // Minimal Light - Clean, minimal light theme
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "A clean, minimal light theme for distraction-free learning",
    colors: {
      primary: "#404040",
      primaryDark: "#303030",
      primaryLight: "#505050",
      secondary: "#909090",
      accentCool: "#4080C0",
      accentWarm: "#E0A040",
      accentLight: "#FFFFFF",
      accentLighter: "#F0F0F0",
      muted: "#A0A0A0",
      uiPurple: "#606060",
      uiLavender: "#909090",
    },
  },

  // Minimal Dark - Clean, minimal dark theme
  {
    id: "minimal-dark",
    name: "Minimal Dark",
    description: "A clean, minimal dark theme for night-time studying",
    colors: {
      primary: "#181818",
      primaryDark: "#101010",
      primaryLight: "#282828",
      secondary: "#707070",
      accentCool: "#4080C0",
      accentWarm: "#E0A040",
      accentLight: "#E0E0E0",
      accentLighter: "#404040",
      muted: "#606060",
      uiPurple: "#505050",
      uiLavender: "#707070",
    },
    isDark: true,
  },

  // Playful Learning - Colorful, fun theme
  {
    id: "playful-learning",
    name: "Playful Learning",
    description: "A colorful, playful theme that makes learning fun and engaging",
    colors: {
      primary: "#2A3A80",
      primaryDark: "#1A2860",
      primaryLight: "#3A4CA0",
      secondary: "#60C0A0",
      accentCool: "#40A0FF",
      accentWarm: "#FFA040",
      accentLight: "#F5FAFF",
      accentLighter: "#E0F0FF",
      muted: "#80A0C0",
      uiPurple: "#5080E0",
      uiLavender: "#60C0A0",
    },
  },

  // Neon Nights - A vibrant cyberpunk theme
  {
    id: "neon-nights",
    name: "Neon Nights",
    description: "A vibrant cyberpunk theme with electric colors",
    colors: {
      primary: "#FF0099",      // Hot pink
      primaryDark: "#990066",  // Deep pink
      primaryLight: "#FF66CC", // Light pink
      secondary: "#00FFFF",    // Cyan
      accentCool: "#0066FF",   // Bright blue
      accentWarm: "#FF6600",   // Orange
      accentLight: "#F0F0FF",  // Light blue-white
      accentLighter: "#E6E6FF",// Lighter blue-white
      muted: "#666699",        // Muted purple
      uiPurple: "#9933FF",     // Bright purple
      uiLavender: "#CC99FF"    // Light purple
    },
    isDark: true
  },

  // Forest Deep - A rich nature theme
  {
    id: "forest-deep",
    name: "Forest Deep",
    description: "Deep forest colors with earthy accents",
    colors: {
      primary: "#004D40",      // Deep teal
      primaryDark: "#00352D",  // Darker teal
      primaryLight: "#00796B", // Light teal
      secondary: "#8BC34A",    // Light green
      accentCool: "#4CAF50",   // Green
      accentWarm: "#FF9800",   // Orange
      accentLight: "#E8F5E9",  // Light green white
      accentLighter: "#F1F8E9",// Lighter green white
      muted: "#78909C",        // Blue grey
      uiPurple: "#009688",     // Teal
      uiLavender: "#80CBC4"    // Light teal
    }
  },

  // Solar Flare - A warm, energetic theme
  {
    id: "solar-flare",
    name: "Solar Flare",
    description: "Warm, energetic colors inspired by the sun",
    colors: {
      primary: "#FF4400",      // Bright orange-red
      primaryDark: "#CC2200",  // Dark orange-red
      primaryLight: "#FF7744", // Light orange
      secondary: "#FFCC00",    // Yellow
      accentCool: "#FF8800",   // Orange
      accentWarm: "#FF2200",   // Red
      accentLight: "#FFF5F0",  // Light orange-white
      accentLighter: "#FFF0E6",// Lighter orange-white
      muted: "#CC9988",        // Muted orange
      uiPurple: "#FF6622",     // Orange-red
      uiLavender: "#FFAA88"    // Light orange
    }
  },

  // Arctic Frost - A cool, crisp theme
  {
    id: "arctic-frost",
    name: "Arctic Frost",
    description: "Cool, crisp colors inspired by arctic ice",
    colors: {
      primary: "#006699",      // Deep blue
      primaryDark: "#004466",  // Darker blue
      primaryLight: "#0088CC", // Light blue
      secondary: "#00CCFF",    // Cyan
      accentCool: "#0099CC",   // Medium blue
      accentWarm: "#FF9900",   // Orange
      accentLight: "#F0FAFF",  // Light blue-white
      accentLighter: "#E6F7FF",// Lighter blue-white
      muted: "#99CCDD",        // Muted blue
      uiPurple: "#0077AA",     // Blue
      uiLavender: "#66CCEE"    // Light blue
    }
  },

  // Midnight Garden - A dark floral theme
  {
    id: "midnight-garden",
    name: "Midnight Garden",
    description: "Dark theme with rich floral accents",
    colors: {
      primary: "#330033",      // Deep purple
      primaryDark: "#220022",  // Darker purple
      primaryLight: "#660066", // Light purple
      secondary: "#FF3399",    // Pink
      accentCool: "#9933CC",   // Purple
      accentWarm: "#FF6699",   // Light pink
      accentLight: "#FFE6FF",  // Light purple-white
      accentLighter: "#FFF0FF",// Lighter purple-white
      muted: "#996699",        // Muted purple
      uiPurple: "#993399",     // Medium purple
      uiLavender: "#FF99FF"    // Light purple
    },
    isDark: true
  },

  // Desert Sands - A warm, earthy theme
  {
    id: "desert-sands",
    name: "Desert Sands",
    description: "Warm, earthy colors inspired by the desert",
    colors: {
      primary: "#996633",      // Brown
      primaryDark: "#664422",  // Dark brown
      primaryLight: "#CC8844", // Light brown
      secondary: "#FFCC66",    // Sand
      accentCool: "#CC9933",   // Gold
      accentWarm: "#FF6633",   // Orange
      accentLight: "#FFF9F0",  // Light sand
      accentLighter: "#FFF5E6",// Lighter sand
      muted: "#CC9966",        // Muted sand
      uiPurple: "#AA7744",     // Medium brown
      uiLavender: "#DDAA66"    // Light brown
    }
  },

  // Ocean Depths - A deep sea theme
  {
    id: "ocean-depths",
    name: "Ocean Depths",
    description: "Deep, rich colors inspired by the ocean",
    colors: {
      primary: "#003366",      // Deep blue
      primaryDark: "#002244",  // Darker blue
      primaryLight: "#004488", // Light blue
      secondary: "#0099CC",    // Cyan
      accentCool: "#0077AA",   // Medium blue
      accentWarm: "#FF9933",   // Orange
      accentLight: "#E6F3FF",  // Light blue-white
      accentLighter: "#F0F8FF",// Lighter blue-white
      muted: "#6699CC",        // Muted blue
      uiPurple: "#005588",     // Blue
      uiLavender: "#66AADD"    // Light blue
    },
    isDark: true
  },

  // Electric Dreams - A bold, retro theme
  {
    id: "electric-dreams",
    name: "Electric Dreams",
    description: "Bold, retro-inspired colors",
    colors: {
      primary: "#6600FF",      // Bright purple
      primaryDark: "#4400CC",  // Dark purple
      primaryLight: "#8833FF", // Light purple
      secondary: "#00FFCC",    // Turquoise
      accentCool: "#33CCFF",   // Blue
      accentWarm: "#FF3366",   // Pink
      accentLight: "#F5F0FF",  // Light purple-white
      accentLighter: "#FAF5FF",// Lighter purple-white
      muted: "#9988CC",        // Muted purple
      uiPurple: "#7733FF",     // Medium purple
      uiLavender: "#AA88FF"    // Light purple
    }
  }
]

// Original themes using the provided color palette
export const originalThemes: Theme[] = [
  {
    id: "cosmic-twilight",
    name: "Cosmic Twilight",
    description: "A modern theme with cosmic-inspired colors",
    colors: {
      primary: "#1868E8",
      primaryDark: "#1B0637",
      primaryLight: "#49207C",
      secondary: "#A888D8",
      accentCool: "#622CA0",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
  },
  {
    id: "mystic-depths",
    name: "Mystic Depths",
    description: "A deep, mystical theme with rich purples",
    colors: {
      primary: "#1B0637",
      primaryDark: "#301457",
      primaryLight: "#49207C",
      secondary: "#A888D8",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
    isDark: true,
  },
  {
    id: "aurora-borealis",
    name: "Aurora Borealis",
    description: "A vibrant theme inspired by the northern lights",
    colors: {
      primary: "#49207C",
      primaryDark: "#301457",
      primaryLight: "#622CA0",
      secondary: "#A888D8",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
  },
  {
    id: "deep-space",
    name: "Deep Space",
    description: "A dark theme inspired by the depths of space",
    colors: {
      primary: "#301457",
      primaryDark: "#1B0637",
      primaryLight: "#49207C",
      secondary: "#A888D8",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
    isDark: true,
  },
  {
    id: "sunset-purple",
    name: "Sunset Purple",
    description: "A warm theme inspired by purple sunsets",
    colors: {
      primary: "#622CA0",
      primaryDark: "#49207C",
      primaryLight: "#A888D8",
      secondary: "#DAD0F2",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
  },
  {
    id: "moonlit-garden",
    name: "Moonlit Garden",
    description: "A serene theme inspired by moonlit gardens",
    colors: {
      primary: "#A888D8",
      primaryDark: "#622CA0",
      primaryLight: "#DAD0F2",
      secondary: "#EEECFE",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
  },
  {
    id: "crystal-cave",
    name: "Crystal Cave",
    description: "A sparkling theme inspired by crystal formations",
    colors: {
      primary: "#DAD0F2",
      primaryDark: "#A888D8",
      primaryLight: "#EEECFE",
      secondary: "#622CA0",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
  },
  {
    id: "northern-lights",
    name: "Northern Lights",
    description: "A theme inspired by the ethereal aurora borealis",
    colors: {
      primary: "#1868E8",
      primaryDark: "#1B0637",
      primaryLight: "#49207C",
      secondary: "#622CA0",
      accentCool: "#A888D8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
    isDark: true,
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "A refreshing theme inspired by ocean waves",
    colors: {
      primary: "#49207C",
      primaryDark: "#301457",
      primaryLight: "#622CA0",
      secondary: "#A888D8",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
  },
  {
    id: "royal-court",
    name: "Royal Court",
    description: "A regal theme with rich purples and golden accents",
    colors: {
      primary: "#622CA0",
      primaryDark: "#49207C",
      primaryLight: "#A888D8",
      secondary: "#DAD0F2",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
    isDark: true,
  },
  {
    id: "spring-dawn",
    name: "Spring Dawn",
    description: "A fresh theme inspired by early spring mornings",
    colors: {
      primary: "#A888D8",
      primaryDark: "#622CA0",
      primaryLight: "#DAD0F2",
      secondary: "#EEECFE",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
  },
  {
    id: "twilight-garden",
    name: "Twilight Garden",
    description: "A serene theme inspired by evening gardens",
    colors: {
      primary: "#DAD0F2",
      primaryDark: "#A888D8",
      primaryLight: "#EEECFE",
      secondary: "#622CA0",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
  },
  {
    id: "cosmic-horizon",
    name: "Cosmic Horizon",
    description: "A theme inspired by the edge of space",
    colors: {
      primary: "#1B0637",
      primaryDark: "#301457",
      primaryLight: "#49207C",
      secondary: "#622CA0",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
    isDark: true,
  },
  {
    id: "mystic-fog",
    name: "Mystic Fog",
    description: "A mysterious theme with ethereal purples",
    colors: {
      primary: "#49207C",
      primaryDark: "#301457",
      primaryLight: "#622CA0",
      secondary: "#A888D8",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
  },
  {
    id: "crystal-spring",
    name: "Crystal Spring",
    description: "A fresh theme with crystal-clear purples",
    colors: {
      primary: "#622CA0",
      primaryDark: "#49207C",
      primaryLight: "#A888D8",
      secondary: "#DAD0F2",
      accentCool: "#1868E8",
      accentWarm: "#D3FD53",
      accentLight: "#EEECFE",
      accentLighter: "#DAD0F2",
      muted: "#9E98A9",
      uiPurple: "#622CA0",
      uiLavender: "#A888D8",
    },
  },
]

// Industry standard themes
export const industryThemes: Theme[] = [
  {
    id: "github-light",
    name: "GitHub Light",
    description: "GitHub's light theme",
    colors: {
      primary: "#2F81F7",
      primaryDark: "#1F6FEB",
      primaryLight: "#58A6FF",
      secondary: "#6E7781",
      accentCool: "#79C0FF",
      accentWarm: "#F97583",
      accentLight: "#C8E1FF",
      accentLighter: "#F6F8FA",
      muted: "#8B949E",
      uiPurple: "#8250DF",
      uiLavender: "#D2A8FF",
    },
  },
  {
    id: "github-dark",
    name: "GitHub Dark",
    description: "GitHub's dark theme",
    colors: {
      primary: "#1F6FEB",
      primaryDark: "#1F6FEB",
      primaryLight: "#58A6FF",
      secondary: "#6E7681",
      accentCool: "#79C0FF",
      accentWarm: "#F97583",
      accentLight: "#C8E1FF",
      accentLighter: "#0D1117",
      muted: "#8B949E",
      uiPurple: "#8250DF",
      uiLavender: "#D2A8FF",
    },
    isDark: true,
  },
  {
    id: "vscode-light",
    name: "VS Code Light",
    description: "VS Code's light theme",
    colors: {
      primary: "#007ACC",
      primaryDark: "#005999",
      primaryLight: "#1A8CD8",
      secondary: "#6E7681",
      accentCool: "#007ACC",
      accentWarm: "#D73A49",
      accentLight: "#E5E5E5",
      accentLighter: "#F3F3F3",
      muted: "#6E7681",
      uiPurple: "#6F42C1",
      uiLavender: "#B392AC",
    },
  },
  {
    id: "vscode-dark",
    name: "VS Code Dark",
    description: "VS Code's dark theme",
    colors: {
      primary: "#007ACC",
      primaryDark: "#005999",
      primaryLight: "#1A8CD8",
      secondary: "#6E7681",
      accentCool: "#007ACC",
      accentWarm: "#D73A49",
      accentLight: "#1E1E1E",
      accentLighter: "#252526",
      muted: "#6E7681",
      uiPurple: "#6F42C1",
      uiLavender: "#B392AC",
    },
    isDark: true,
  },
  {
    id: "slack-light",
    name: "Slack Light",
    description: "Slack's light theme",
    colors: {
      primary: "#1264A3",
      primaryDark: "#0D4B7C",
      primaryLight: "#1A7BC1",
      secondary: "#1D1C1D",
      accentCool: "#1264A3",
      accentWarm: "#E01E5A",
      accentLight: "#FFFFFF",
      accentLighter: "#F8F8F8",
      muted: "#696969",
      uiPurple: "#4A154B",
      uiLavender: "#B39DFF",
    },
  },
  {
    id: "slack-dark",
    name: "Slack Dark",
    description: "Slack's dark theme",
    colors: {
      primary: "#1264A3",
      primaryDark: "#0D4B7C",
      primaryLight: "#1A7BC1",
      secondary: "#1D1C1D",
      accentCool: "#1264A3",
      accentWarm: "#E01E5A",
      accentLight: "#1D1C1D",
      accentLighter: "#2D2C2D",
      muted: "#696969",
      uiPurple: "#4A154B",
      uiLavender: "#B39DFF",
    },
    isDark: true,
  },
  {
    id: "discord-light",
    name: "Discord Light",
    description: "Discord's light theme",
    colors: {
      primary: "#5865F2",
      primaryDark: "#4752C4",
      primaryLight: "#7983F5",
      secondary: "#2C2F33",
      accentCool: "#5865F2",
      accentWarm: "#F04747",
      accentLight: "#FFFFFF",
      accentLighter: "#F2F3F5",
      muted: "#99AAB5",
      uiPurple: "#9B84EE",
      uiLavender: "#B9BBBE",
    },
  },
  {
    id: "discord-dark",
    name: "Discord Dark",
    description: "Discord's dark theme",
    colors: {
      primary: "#5865F2",
      primaryDark: "#4752C4",
      primaryLight: "#7983F5",
      secondary: "#2C2F33",
      accentCool: "#5865F2",
      accentWarm: "#F04747",
      accentLight: "#36393F",
      accentLighter: "#2F3136",
      muted: "#99AAB5",
      uiPurple: "#9B84EE",
      uiLavender: "#B9BBBE",
    },
    isDark: true,
  },
]

// High Contrast Themes for Accessibility
export const accessibilityThemes: Theme[] = [
  {
    id: "high-contrast-light",
    name: "High Contrast Light",
    description: "Maximum contrast light theme for accessibility",
    colors: {
      primary: "#000000",      // Black
      primaryDark: "#1A1A1A",  // Dark grey
      primaryLight: "#333333", // Light grey
      secondary: "#0000CC",    // Blue
      accentCool: "#006600",   // Green
      accentWarm: "#CC0000",   // Red
      accentLight: "#FFFFFF",  // White
      accentLighter: "#F5F5F5",// Off-white
      muted: "#666666",        // Grey
      uiPurple: "#330099",     // Purple
      uiLavender: "#6633CC"    // Light purple
    },
    isHighContrast: true
  },
  {
    id: "high-contrast-dark",
    name: "High Contrast Dark",
    description: "Maximum contrast dark theme for accessibility",
    colors: {
      primary: "#FFFFFF",      // White
      primaryDark: "#E6E6E6",  // Light grey
      primaryLight: "#CCCCCC", // Lighter grey
      secondary: "#00FFFF",    // Cyan
      accentCool: "#00FF00",   // Green
      accentWarm: "#FF0000",   // Red
      accentLight: "#000000",  // Black
      accentLighter: "#1A1A1A",// Dark grey
      muted: "#999999",        // Grey
      uiPurple: "#CC99FF",     // Light purple
      uiLavender: "#E6CCFF"    // Lighter purple
    },
    isDark: true,
    isHighContrast: true
  }
]

// Export all themes
export const allThemes = [...originalThemes, ...industryThemes, ...accessibilityThemes]

// Get theme by name
export function getThemeByName(name: string): Theme | undefined {
  return allThemes.find((theme) => theme.name === name)
}

// Get active theme
export function getActiveTheme(): Theme {
  // Default to the first theme if none is set
  return allThemes[0]
}

// Get theme by ID
export function getThemeById(id: string): Theme {
  return allThemes.find((theme) => theme.id === id) || allThemes[0]
}

// Get all themes
export function getAllThemes(): Theme[] {
  return allThemes
}

// Get themes by category
export function getThemesByCategory(): { original: Theme[]; educational: Theme[] } {
  return {
    original: originalThemes,
    educational: industryThemes,
  }
}

