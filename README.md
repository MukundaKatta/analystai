# AnalystAI

AI-powered document analysis platform that extracts structured insights from financial reports and business documents.

<!-- Add screenshot here -->

## Features

- **Document Matrix** — Upload multiple documents and ask questions across all of them simultaneously
- **AI-Powered Extraction** — Automatically extract revenue, growth rates, headcount, risks, and ESG data
- **Citation Tracking** — Every answer includes page-level citations for verification
- **Confidence Scores** — Each extraction displays a confidence score for reliability assessment
- **Bulk Analysis** — Process multiple documents in parallel with batch question support
- **Chart Generation** — Visualize extracted data with interactive Recharts visualizations
- **Export Support** — Download analysis results for further processing

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **AI Integration:** OpenAI SDK
- **Charts:** Recharts
- **Database:** Supabase (with SSR helpers)
- **Notifications:** react-hot-toast
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key
- Supabase project

### Installation

```bash
git clone <repo-url>
cd analystai
npm install
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # UI components for document matrix
├── lib/              # Store, Supabase client, utilities
└── types/            # TypeScript type definitions
```

## License

MIT
