import Link from "next/link";
import { Search, ShieldCheck, Home } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find your next home with <span className="text-blue-600">confidence</span>.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Kenya&apos;s trusted real estate platform. We verify every listing and agent manually so you never have to worry about scams or fake homes.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/search"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Start Searching
              </Link>
              <Link href="/recommendations" className="text-sm font-semibold leading-6 text-gray-900">
                See Recommended <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to know, upfront.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  100% Verified
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Every property and agent is manually screened. Honest photos, honest prices.</dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  Utility Transparency
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Know before you visit if it has council water, borehole, fiber internet, or backup power.</dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  Direct Connect
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Skip the middlemen. Message landlords and agents directly on WhatsApp with one click.</dd>
              </div>

            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
