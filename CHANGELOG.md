# Changelog

All notable changes to the GVTCards project will be documented in this file.

## [Unreleased] - 2026-01-25

### Removed
- **Payment System**: Removed Stripe payment integration - all features are now completely free
- Removed pricing/subscription tiers from UI
- Removed Stripe dependencies and environment variables
- Removed checkout session API route functionality
- Removed "Upgrade to Pro" buttons and pricing pages

### Changed
- Updated application to be completely free with no subscriptions
- Modified homepage to remove all payment-related sections
- Updated README to reflect free tier only
- Simplified environment setup (no Stripe configuration needed)

## [1.0.0] - 2026-01-24

### Security
- **CRITICAL**: Moved Firebase credentials from hardcoded values to environment variables
- Removed exposed API keys and credentials from source code
- Updated `.env.example` with proper configuration template

### Fixed
- Fixed typo: Changed `position: 'buttom'` to `position: 'absolute'` in generate page ([generate/page.js:172](app/generate/page.js#L172))
- Fixed React key prop warnings by using proper unique keys instead of array indices
- Fixed Firebase analytics initialization to use async/await pattern
- Removed Clerk authentication dependency (was conflicting with Firebase Auth)

### Added
- Comprehensive error handling in OpenAI API route with:
  - Input validation (empty text, max length)
  - Specific error messages for rate limits, authentication errors
  - Response validation
- Input validation for sign-in page:
  - Email format validation
  - Password length validation
  - User-friendly Firebase error messages
- Input validation for sign-up page:
  - Email format validation
  - Password strength requirements
  - Duplicate email detection
- SEO metadata in root layout:
  - Page title and description
  - Open Graph tags
  - Keywords for better discoverability
- Proper TypeScript/JSDoc prop validation for layout component
- Google Fonts (Inter) integration for better typography

### Changed
- Cleaned up `layout.js` to remove Clerk provider and console.log statements
- Improved Firebase configuration to use modern async patterns
- Updated authentication flow to use Firebase exclusively
- Enhanced error messages throughout the application
- Improved code quality by addressing linter warnings

### Documentation
- Created comprehensive README.md with:
  - Project badges and tech stack
  - Detailed installation instructions
  - Usage examples
  - Screenshots section
  - Team information
  - Contribution guidelines
- Added CONTRIBUTING.md for open source collaboration
- Added MIT LICENSE file
- Created detailed .env.example with helpful comments

## Notes

This update focuses on security, code quality, and user experience improvements. All critical security vulnerabilities have been addressed, and the application now follows best practices for Next.js development.
