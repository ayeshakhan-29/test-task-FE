# URL Analysis Dashboard

A modern web application for managing and analyzing URLs. Built with React, TypeScript, and modern UI libraries.

## Features

- URL Management:
  - Add new URLs for analysis
  - View URL status (Crawling, Completed, Stopped)
  - Bulk delete URLs
  - Re-run analysis for URLs

- Results Dashboard:
  - View detailed analysis results
  - Sort and filter analyzed URLs
  - View heading tag counts (H1-H6)
  - Pagination support

- User Interface:
  - Responsive design with sidebar navigation
  - Modern UI components
  - Toast notifications for user feedback
  - Loading states and error handling

## Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - React Query
  - Framer Motion (animations)
  - Axios (HTTP client)
  - React Router DOM

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ayeshakhan-29/test-task-FE.git
   cd test-task-FE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   VITE_API_BASE_URL=your-api-url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and validations
├── pages/             # Page components
├── services/          # API services
└── types/            # TypeScript types
```

## API Integration

The application integrates with a backend API for:
- URL management (add, delete, re-run)
- URL analysis results
- User authentication

## Authentication

- Protected routes for authenticated users
- Login and signup pages
- Token-based authentication

## State Management

- React Context for global state
- React Query for data fetching and caching
- Local state management with hooks

## Styling

- Tailwind CSS for styling
- shadcn/ui components
- Responsive design with breakpoints
- Custom animations with Framer Motion

## Testing

The project includes:
- TypeScript type checking
- ESLint for code linting
- Jest for unit testing (to be implemented)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Contact

For any questions or issues, please open an issue in the repository.
