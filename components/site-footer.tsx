import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { FOOTER_LINKS, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const socialIcons = {
    Facebook: <Facebook className="h-5 w-5" />,
    Twitter: <Twitter className="h-5 w-5" />,
    Instagram: <Instagram className="h-5 w-5" />,
    LinkedIn: <Linkedin className="h-5 w-5" />,
  }

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rudzz2-kW10vPBxBMsWLPgY2Be1WUV1RH2wvz.svg"
                alt="Rudzz Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-rudzz-blue">{SITE_NAME}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{SITE_DESCRIPTION}</p>
            <div className="mt-4 flex space-x-4">
              {Object.entries(socialIcons).map(([name, icon]) => (
                <Link key={name} href="#" className="text-muted-foreground hover:text-rudzz-blue" aria-label={name}>
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          <FooterLinkSection title="Quick Links" links={FOOTER_LINKS.quickLinks} />
          <FooterLinkSection title="Company" links={FOOTER_LINKS.company} />
          <FooterLinkSection title="Legal" links={FOOTER_LINKS.legal} />
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

interface FooterLinkSectionProps {
  title: string
  links: { name: string; href: string }[]
}

function FooterLinkSection({ title, links }: FooterLinkSectionProps) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-rudzz-blue">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="text-muted-foreground hover:text-rudzz-blue">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

