# Ground Rules for anphatindustry Website Repository

## 1. Code Structure & Organization
- Use Next.js App Router (src/app) for all routing.
- Organize components by feature: home, admin, layout, shared, ui, sections.
- Separate data (src/data), logic/helpers (src/lib), and types (src/types).
- Keep all Vietnamese text in Unicode (UTF-8), never ASCII.

## 2. Data Handling
- Always provide static fallback for dynamic data (e.g., services, blogs) to prevent 404 if DB is empty.
- Use TypeScript strict mode for all code.
- Update types in src/types when adding new data structures.

## 3. UI/UX & Styling
- Use Tailwind CSS for all styling; avoid inline styles unless necessary.
- Maintain responsive design for all pages/components.
- Use only Google Fonts (Oxanium, Manrope) as configured.
- Test UI on multiple devices and browsers before merging.

## 4. Routing & SEO
- Use dynamic routing ([slug]) for detail/category pages.
- Ensure all pages have proper metadata for SEO.
- No dead links: check all navigation and footer links regularly.

## 5. Security & Admin
- Protect all admin routes with NextAuth and middleware.
- Never expose sensitive data or credentials in the codebase.
- Separate admin and public code clearly.

## 6. Coding Standards
- Use ESLint and Prettier; fix all lint errors before commit.
- Use clear, consistent naming for files, variables, and components.
- Write reusable, pure components where possible.
- Document all utility functions and complex logic in code comments.

## 7. Localization & Encoding
- All Vietnamese content must use proper Unicode with diacritics.
- Check for and fix any mojibake or encoding issues immediately.

## 8. Version Control & Deployment
- Commit early, commit often; use clear commit messages (e.g., fix: ..., feat: ...).
- Always check build (`npm run build`) before pushing to main/master.
- Update docs/SPEC.html and docs/GROUND_RULES.md with any major changes.

## 9. Documentation
- Keep SPEC.html and GROUND_RULES.md up to date.
- Document new features, routes, or architectural changes clearly.

## 10. Review & QA
- Review all code via pull requests; no direct push to main/master.
- Test all pages after major changes, especially dynamic routes and admin features.

## 11. Design & Aesthetics Standards
- Maintain strict brand consistency: use only approved colors, fonts, and logos throughout the site.
- Prioritize a clean, minimalist layout with ample white space for readability and focus.
- Ensure all navigation is intuitive and accessible within 1–2 clicks from the homepage.
- Highlight primary call-to-action (CTA) buttons with clear, consistent styling.
- All forms must be user-friendly, with clear validation and error messages.
- Design must be fully responsive and mobile-first; test on multiple devices and browsers.
- Use only high-quality, optimized images (WebP/JPG), and consistent icon sets; all images must have descriptive alt text.
- Apply subtle, purposeful animations only where they enhance user experience—never distract or slow down the interface.
- Guarantee accessibility: sufficient color contrast, keyboard navigation, semantic headings, and ARIA labels where needed.
- Regularly review UI for dead links, broken layouts, or inconsistent elements before each release.

---

These ground rules ensure code quality, maintainability, and a robust user experience for the anphatindustry website. All contributors must follow these strictly.