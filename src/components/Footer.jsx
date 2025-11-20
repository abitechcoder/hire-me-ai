import { Linkedin, Twitter, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Bottom bar */}
        <div className="flex justify-between gap-4">
          <p
            className="text-gray-400 text-center text-sm mb-4 md:mb-0"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            <strong>© 2025 B-MESON LIMITED.</strong> All rights reserved.
          </p>
          <p
            className="text-gray-400 text-center text-sm mb-4 md:mb-0"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            HireMe AI is a product of <strong>B-MESON Limited</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
}