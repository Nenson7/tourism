import Image from "next/image"

type Guide = {
  name: string
  photo: string
  address: string
  contact?: string
  remarks?: string
  bloodGroup?: string
}

export default function GuideCard({ guide }: { guide: Guide} ) {
  const { name, photo, address, contact, remarks, bloodGroup } = guide

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer animate-fadeInUp">
      {/* Image Section */}
      <div className="relative h-72 sm:h-76 lg:h-96 w-full overflow-hidden">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
        />
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4">
        <div className="mb-2 sm:mb-3">
          {/* Name */}
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <svg
              className="w-4 h-4 text-green-600 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.2 0-9.6 1.6-9.6 4.9V22h19.2v-3.1c0-3.3-6.4-4.9-9.6-4.9z"/>
            </svg>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">
              {name}
            </h3>
          </div>

          {/* Info fields */}
          <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              {/* map pin */}
              <svg
                className="w-3 h-3 text-blue-500 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zM7 9c0-2.8 2.2-5 5-5s5 2.2 5 5c0 2.9-3 7.6-5 10.3C10 16.6 7 11.9 7 9z"/>
              </svg>
              <p className="text-xs sm:text-sm text-gray-600">{address}</p>
            </div>

            <div className="flex items-center gap-2">
              {/* phone */}
              <svg
                className="w-3 h-3 text-green-500 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.6 10.8c1.3 2.6 3.5 4.8 6.1 6.1l2-2c.2-.2.5-.3.8-.2 1 .3 2 .5 3.1.5.4 0 .8.3.8.8v3.2c0 .4-.4.8-.8.8C9.8 20 4 14.2 4 7.2c0-.4.4-.8.8-.8H8c.4 0 .8.3.8.8 0 1.1.2 2.1.5 3.1.1.3 0 .6-.2.8l-2 2z"/>
              </svg>
              <p className="text-xs sm:text-sm text-gray-600">
                {contact || "Not available"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* info */}
              <svg
                className="w-3 h-3 text-purple-500 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <p className="text-xs sm:text-sm text-gray-600">{remarks}</p>
            </div>

            <div className="flex items-center gap-2">
              {/* blood drop */}
              <svg
                className="w-3 h-3 text-red-500 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.7c-3.5 3.8-6 7.7-6 11.2 0 3.3 2.7 6.1 6 6.1s6-2.7 6-6.1c0-3.5-2.5-7.4-6-11.2z"/>
              </svg>
              <p className="text-xs sm:text-sm text-gray-600">
                Blood Group: {bloodGroup || "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
