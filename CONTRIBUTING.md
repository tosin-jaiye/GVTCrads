# Contributing to GVTCards

First off, thank you for considering contributing to GVTCards! It's people like you that make GVTCards such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. By participating, you are expected to uphold this standard.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any examples of similar features in other applications**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure your code follows the existing style guidelines
4. Make sure your code lints without errors
5. Update the documentation if needed
6. Write a clear and descriptive commit message

## Development Setup

1. Clone your fork of the repo
   ```bash
   git clone https://github.com/your-username/GVTCrads.git
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up your `.env.local` file (see `.env.example`)

4. Run the development server
   ```bash
   npm run dev
   ```

5. Make your changes and test thoroughly

## Style Guidelines

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

### JavaScript/React Style Guide

- Use functional components and hooks
- Follow the existing code formatting (2 spaces for indentation)
- Use meaningful variable and function names
- Comment complex logic
- Use ES6+ features where appropriate

### File Naming

- Use PascalCase for component files (e.g., `ClientResultPage.js`)
- Use camelCase for utility files (e.g., `get-stripe.js`)
- Use kebab-case for API routes (e.g., `checkout_sessions`)

## Questions?

Feel free to reach out to [badewolegoodluck55@gmail.com](mailto:badewolegoodluck55@gmail.com) if you have any questions.

---

Thank you for contributing to GVTCards!
