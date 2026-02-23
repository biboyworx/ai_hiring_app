# THEME.md

# 🎨 Design System & UI Standards

This document defines the official design system, theme tokens, and UI implementation rules for the project.  
All UI development must follow these standards to ensure consistency, scalability, and maintainability.

---

# 1. Brand Theme

## 🎨 Color Palette

| Role        | Hex       | Usage |
|------------|-----------|-------|
| Primary    | #024466   | Main brand color, headers, primary buttons |
| Secondary  | #0487C9   | Secondary buttons, highlights, links |
| Accent     | #F47A33   | Call-to-action, badges, alerts |
| Background | #F8FAFC   | App background |
| Surface    | #FFFFFF   | Cards, modals, containers |

---

## ✅ Color Usage Rules

- **Primary** → Main actions, navigation bars, active states  
- **Secondary** → Supporting actions and hover states  
- **Accent** → Important CTAs only. Avoid overuse.  
- **Background** → Full screen background  
- **Surface** → Cards, forms, sheets, modals  

### Prohibited
- Do not hardcode hex values inside components.
- Always reference theme tokens.

---

# 2. Typography

## Font Guidelines

- Headings → Bold with clear hierarchy  
- Body → Regular weight, high readability  
- Buttons → Medium or SemiBold  
- Labels → Medium  
- Captions → Regular, smaller size  

## Hierarchy Scale

| Type   | Size  | Weight     |
|--------|-------|------------|
| H1     | 28–32 | Bold       |
| H2     | 22–24 | SemiBold   |
| H3     | 18–20 | Medium     |
| Body   | 14–16 | Regular    |
| Small  | 12–13 | Regular    |

---

# 3. Spacing System

Use a 4pt spacing scale:

4, 8, 12, 16, 20, 24, 32, 40, 48


## Usage Rules

- Section spacing → 24–32  
- Card padding → 16–20  
- Button padding → 12–16  
- Screen horizontal padding → 16–20  

Maintain consistent vertical rhythm across screens.

---

# 4. Border Radius

| Size   | Value |
|--------|-------|
| Small  | 6     |
| Medium | 10    |
| Large  | 16    |
| Full   | 9999  |

---

# 5. Shadows

Keep elevation subtle and consistent.

- Cards → Light shadow  
- Modals → Medium shadow  
- Floating buttons → Stronger shadow  

Avoid heavy or harsh shadows.

---

# 🧩 UI Stack

## Core Libraries

- **Gluestack UI** → Primary component system  
- **NativeWind** → Utility-first styling  
- **StyleSheet** → Performance-critical or complex styles  

---

# Component Strategy

## Use Gluestack UI For

- Buttons  
- Inputs  
- Select  
- Modal  
- Toast  
- Alert  
- Form controls  
- Layout primitives  

## Use NativeWind For

- Spacing  
- Layout (flex, grid)  
- Responsive styling  
- Quick prototyping  

## Use StyleSheet Only When

- Performance optimization is required  
- Complex conditional styles  
- Animated styles  
- Reusable style objects  

---

# 🧱 Component Standards

## Buttons

### Variants

- Primary  
- Secondary  
- Outline  
- Ghost  
- Danger  

### States

- Default  
- Hover  
- Pressed  
- Disabled  
- Loading  

Minimum height: **44px**

---

## Inputs

Every input must include:

- Label  
- Placeholder  
- Error message  
- Helper text (optional)  
- Disabled state  

---

## Cards

- Background → Surface  
- Padding → 16–20  
- Border radius → Medium  
- Optional subtle shadow  

---

## Modals

- Centered layout  
- Surface background  
- Large border radius  
- Clear primary CTA + secondary cancel action  

---

# 🧭 Layout Rules

- Avoid nested scroll views  
- Maintain consistent horizontal padding  
- Avoid edge-to-edge text  
- Preserve visual breathing room  
- Maintain minimum touch target of 44px  

---

# 🌙 Dark Mode (Future Ready)

## Suggested Dark Palette

| Role            | Hex       |
|-----------------|-----------|
| Background      | #0F172A   |
| Surface         | #1E293B   |
| Primary         | #0487C9   |
| Text Primary    | #FFFFFF   |
| Text Secondary  | #94A3B8   |

Ensure contrast meets accessibility standards.

---

# ♿ Accessibility

- Minimum contrast ratio → WCAG AA  
- Minimum button height → 44px  
- Clear focus states  
- Do not rely on color alone for meaning  
- All inputs must have accessible labels  

---

# 🚀 Development Rules

- Do not hardcode colors  
- Use theme tokens  
- Maintain spacing scale consistency  
- Keep components reusable  
- Avoid unnecessary inline styles  
- Separate logic from presentation  

---

# Governance

All new UI components must comply with this document.  
Changes to the theme system must be documented and reviewed before implementation.
