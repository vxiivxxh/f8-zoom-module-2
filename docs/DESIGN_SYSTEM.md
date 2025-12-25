# Design System

Based on analysis of `music.youtube.com`.

## Color Palette

### Backgrounds
- **Main Background**: `#030303` (Almost Black)
- **Sidebar / Header**: `#030303` (Often blends with main, or pure black `#000000` in some states)
- **Player Bar**: `#212121` (Dark Grey)
- **Hover/Active State**: `#FFFFFF1A` (White with ~10% opacity) or `#2a2a2a`

### Typography
- **Primary Font**: `Roboto` (Weights: 400, 500)
- **Headings**: `YouTube Sans` (Weights: 700) - *Fallbacks: Roboto, sans-serif*
- **Secondary Font**: `Roboto` (Weights: 400)

### Brand Indicators
- **Accent (Logo/Play)**: `#FF0000` (YouTube Red)

## Layout Dimensions

### Fixed Elements
- **Top Bar (Header)**: `64px` height
- **Player Bar (Footer)**: `72px` height
- **Sidebar (Desktop)**: `240px` width

### Z-Index Layers
- **Header**: `z-20`
- **Sidebar**: `z-10`
- **Player Bar**: `z-30` (Always on top)
- **Overlays/Modals**: `z-50`
