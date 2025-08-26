import {
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="bg-[#FDF6EE] text-[#4a3c2a] mt-12">
      <div className=" mx-8 px-6 py-10 border-t border-x rounded-t-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo + Tagline */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              <a
                href="https://raghavgoel.online"
                target="_blank"
                rel="noopener noreferrerF"
              >
                Raghav Goel
              </a>
            </h2>
            <p className="text-sm text-gray-600">Learn, Build, and Grow.</p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 mr-4 mt-8 md:mt-0">
            <div>
              <h3 className="font-semibold mb-3">Explore</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a className="hover:text-black">About</a>
                </li>
                <li>
                  <a className="hover:text-black">Projects</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Socials</h3>
              <div className="flex space-x-4 text-xl">
                <a
                  href="https://twitter.com/raaaghavvvvv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandX className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/raghav-goel01"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a className="hover:text-black">Terms</a>
            <a className="hover:text-black">Privacy</a>
            <a className="hover:text-black">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
