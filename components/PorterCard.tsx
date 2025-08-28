import Image from "next/image";

type Porter = {
  name: string;
  photo: string;
  address: string;
  contact?: string;
  remarks?: string;
  bloodGroup?: string;
};

const PorterCard = ({ porter }: { porter: Porter }) => {
  const { name, photo, address, contact, remarks, bloodGroup } = porter;

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-transform duration-300 cursor-pointer animate-fade-in-up">
      {/* Image Section */}
      <div className="relative h-72  sm:h-76 lg:h-96 overflow-hidden">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 bg-slate-100">
        <div className="mb-2 sm:mb-3">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            {/* User Icon */}
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">{name}</h3>
          </div>

          <div className="space-y-2 mb-2 sm:mb-3">
            {/* Address */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zM7 9c0-2.8 2.2-5 5-5s5 2.2 5 5c0 2.9-2.2 6.3-5 9.9C9.2 15.3 7 11.9 7 9z" />
              </svg>
              <p className="text-xs sm:text-sm text-gray-600">{address}</p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.7 3.6 4.9 6.3 6.3l2.1-2.1c.3-.3.8-.4 1.2-.3 1.3.4 2.7.6 4.1.6.7 0 1.2.5 1.2 1.2V21c0 .7-.5 1.2-1.2 1.2C10.5 22.2 1.8 13.5 1.8 3.2 1.8 2.5 2.3 2 3 2h3.5c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.8.6 4.1.1.4 0 .9-.3 1.2l-2.1 2.3z" />
              </svg>
              <p className="text-xs sm:text-sm text-gray-600">{contact || "Not available"}</p>
            </div>

            {/* Remarks */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm.9 15h-1.8v-6h1.8v6zm0-8h-1.8V7h1.8v2z" />
              </svg>
              <p className="text-xs sm:text-sm text-gray-600">{remarks}</p>
            </div>

            {/* Blood Group */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.1L6.5 8.3c-2.8 3.2-2.3 8.1 1 10.6 3.2 2.6 7.8 2.2 10.4-1 2.5-3.1 2.1-7.7-1-10.3L12 2.1z" />
              </svg>
              <p className="text-xs sm:text-sm text-gray-600">
                Blood Group: {bloodGroup || "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PorterCard;
