import { HorizontalBorder } from "../../ui/border";
import { SOCIAL_ITEMS } from "./utils/social-items";

import FooterSocialLink from "./components/footer-social-link";

export default function Footer() {
  return (
    <footer className="max-w-[1780px] mx-auto grid md:grid-cols-[40px_1fr_40px] py-4 md:py-0">
      <HorizontalBorder>
        <div className="shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 antialiased">
          <p className="mb-4 text-sm text-center text-muted-foreground sm:mb-0">
            &copy; 2025 Shortleap Inc.
          </p>

          <div className="flex justify-center items-center space-x-4">
            {SOCIAL_ITEMS.map((socialItem) => (
              <FooterSocialLink
                key={socialItem.label}
                socialItem={socialItem}
              />
            ))}
          </div>
        </div>
      </HorizontalBorder>
    </footer>
  );
}
