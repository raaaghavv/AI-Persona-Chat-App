import { IconMessageDots, IconPhone, IconCalendar } from "@tabler/icons-react";
import { Verified } from "lucide-react";

export default function PersonaIntro({ persona }) {
  return (
    <>
      <div className="flex items-center gap-6 bg-white p-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-medium text-gray-600 overflow-hidden">
          {(
            <img
              src={persona.image}
              alt={persona.name}
              className="w-full h-full object-cover"
            />
          ) || persona.name[0]}
        </div>

        {/* Info Section */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-semibold">{persona.name} - Trial</h2>
            <Verified className="text-white fill-orange-500 w-7 h-7" />
          </div>
          <p className="text-gray-500 text-sm">{persona.oneLiner}</p>

          {/* Action Buttons */}
          <div className="mt-3 flex gap-3">
            <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-orange-600 transition">
              <IconMessageDots size={16} />
              Chat
            </button>
            {/* <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-orange-600 transition">
              <IconPhone size={16} />
              Call
            </button> */}
          </div>
        </div>
      </div>

      {/* Description Section */}
      {/* <div className="pt-4">
        <h2 className="flex items-center text-gray-800 font-medium mb-2">
          <span className="mr-2">≡</span> Description
        </h2>
        <p className="text-gray-600 text-sm">Brendon AI Life Coach: Trial</p>
      </div> */}
    </>
  );
}
