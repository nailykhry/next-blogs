import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-6 text-white bg-[#4c24e5]">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-bold">InkSpire</h2>
            <p className="text-sm text-white">
              © {new Date().getFullYear()} Made with 💖 Naily.
            </p>
          </div>

          <div className="flex space-x-4">
            <Link href="/" className="text-white hover:text-gray-400">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-gray-400">
              About
            </Link>
            <Link href="/privacy" className="text-white hover:text-gray-400">
              Privacy Policy
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M24 4.557a9.832 9.832 0 01-2.828.775A4.932 4.932 0 0023.337 3.5a9.868 9.868 0 01-3.127 1.195 4.917 4.917 0 00-8.381 4.482A13.94 13.94 0 011.671 3.149a4.92 4.92 0 001.523 6.56A4.902 4.902 0 01.964 9.15v.061a4.917 4.917 0 003.946 4.827 4.902 4.902 0 01-2.212.084 4.922 4.922 0 004.6 3.417A9.868 9.868 0 010 20.544a13.897 13.897 0 007.548 2.212c9.056 0 14.01-7.508 14.01-14.01 0-.213-.004-.426-.014-.637A10.02 10.02 0 0024 4.557z" />
              </svg>
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.29h3.127V8.408c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.465.098 2.797.143v3.244l-1.92.001c-1.504 0-1.796.714-1.796 1.762v2.31h3.59l-.467 3.415h-3.123V24h6.116c.73 0 1.325-.593 1.325-1.326V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/in/nailykhairiya/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M22.23 0H1.77C.792 0 0 .774 0 1.728v20.543C0 23.225.792 24 1.77 24h20.46C23.208 24 24 23.226 24 22.272V1.728C24 .774 23.208 0 22.23 0zM7.121 20.452H3.561V9h3.56v11.452zM5.342 7.632c-1.145 0-2.066-.93-2.066-2.073 0-1.142.921-2.073 2.066-2.073 1.146 0 2.073.931 2.073 2.073 0 1.143-.927 2.073-2.073 2.073zM20.452 20.452h-3.56V14.91c0-1.316-.027-3.01-1.837-3.01-1.837 0-2.117 1.434-2.117 2.917v5.635h-3.56V9h3.417v1.561h.049c.476-.901 1.635-1.852 3.364-1.852 3.6 0 4.267 2.368 4.267 5.451v6.292z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
