import { Upload } from "@/components/upload"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
            >
              <path d="M15 11h.01" />
              <path d="M11 15h.01" />
              <path d="M16 16h.01" />
              <path d="M2 16l20 6-6-20A20 20 0 0 0 2 16" />
            </svg>
            <h1 className="text-xl font-bold text-gray-800">EcoDish</h1>
          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            Sign In
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Don't worry eat happy</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Upload a cooking video and our AI will generate meal ideas and a shopping list for you in seconds.
          </p>
          <Upload />
        </section>

        <Features />
      </main>

      <footer className="bg-gray-50 py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">© 2025 EcoDish. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-green-600">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-green-600">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

