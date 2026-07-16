---
name: Emerald & Marble Design System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#3f4943'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#6f7a72'
  outline-variant: '#bec9c1'
  surface-tint: '#0b6c4b'
  primary: '#004d34'
  on-primary: '#ffffff'
  primary-container: '#006747'
  on-primary-container: '#8fe2ba'
  inverse-primary: '#84d7af'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#414343'
  on-tertiary: '#ffffff'
  tertiary-container: '#585a5a'
  on-tertiary-container: '#d1d1d1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a0f4ca'
  primary-fixed-dim: '#84d7af'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-mobile: 20px
  section-padding: 120px
---

## Brand & Style

This design system embodies a premium, minimalist Islamic aesthetic, blending traditional spiritual motifs with high-end modernism. The brand personality is serene, authoritative, and sophisticated, targeting a discerning audience that appreciates both cultural heritage and contemporary digital refinement.

The visual style is a fusion of **Minimalism** and **Tactile Luxury**. It utilizes vast whitespace to create a sense of peace (Sakinah), while incorporating subtle textures like white marble and intricate geometric patterns (Mashrabiya) to provide depth. The overall emotional response should be one of tranquility, reverence, and trustworthiness.

## Colors

The palette is anchored by **Emerald Green**, symbolizing life and paradise, used primarily for key brand moments and primary actions. **Gold/Bronze** serves as a precious accent, reserved for highlights, ornamental borders, and secondary calls to action.

The background is not a flat white but a tiered system of **White Marble** textures and off-whites to prevent eye strain and enhance the premium feel. Neutral tones are strictly cool-greys and deep charcoals to ensure the warmth of the gold accents truly resonates.

## Typography

The typographic hierarchy relies on the contrast between the literary elegance of **Playfair Display** and the functional precision of **Manrope**. 

Headlines should utilize the thin and regular weights of the serif face to maintain an editorial, "literary" feel. Body text is set in Manrope with generous line heights to ensure maximum legibility against the marble-textured backgrounds. Labels and small metadata should use increased letter spacing and uppercase styling to evoke the feeling of high-end boutique signage.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to maintain the "framed" look of a luxury publication, transitioning to a fluid model on mobile. A 12-column grid is used with exceptionally wide gutters (32px) to reinforce the minimalist, airy narrative.

Vertical spacing is intentionally "oversized." Section headers should be separated by a minimum of 120px on desktop to allow the content to breathe. Use "safe zones" around geometric patterns to ensure they act as subtle textures rather than distracting elements.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and **Ambient Shadows**. Instead of harsh shadows, use multi-layered, low-opacity emerald or gold-tinted blurs to create a "glow" effect rather than a physical drop.

1.  **Base Layer:** White marble texture (subtle noise and grey veining).
2.  **Surface Layer:** Pure white cards with a 1px Gold (#C5A059) or Light Grey (#E0E0E0) border.
3.  **Elevated Layer:** Floating elements with a soft, diffused 20% opacity shadow tinted with the primary Emerald Green.

Geometric Islamic patterns should be applied as a background-clip or a 5% opacity overlay on the base layer, never on top of functional text.

## Shapes

The shape language is **Soft (1)**. While the overall aesthetic is modern, sharp 90-degree corners are avoided to maintain a welcoming, organic feel. 

Corner radii are kept small (4px to 8px) to reflect the architectural precision of Islamic geometry. Decorative elements, such as image masks or icon containers, may use more complex "Eight-Point Star" (Khatim) shapes to reinforce the cultural context without cluttering the UI.

## Components

### Buttons
Primary buttons use a solid Emerald Green fill with white text. Secondary buttons are "Ghost" style with a 1px Gold border and Gold text. Hover states should feature a subtle expansion of the gold border or a soft green glow.

### Input Fields
Inputs are minimalist: a single bottom border in Gold or a light grey, which thickens and changes to Emerald on focus. Labels should float above the field in the `label-sm` style.

### Cards
Cards use a pure white background to pop against the marble texture. They feature a 1px light-grey border and a very subtle 8-pointed star pattern watermark in the bottom right corner at 3% opacity.

### Navigation
The top bar is transparent on scroll, becoming a frosted glass (glassmorphism) Emerald-tinted surface only when necessary for legibility. Menu items use Manrope Medium with generous horizontal padding.

### Ornamental Dividers
Replace standard horizontal rules with a custom SVG line that features a small geometric node (diamond or star) in the center, rendered in Gold.