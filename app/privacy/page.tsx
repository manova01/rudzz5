import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl px-4 md:px-6">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
              <p className="mt-2 text-gray-500">Last updated: March 28, 2023</p>
            </div>

            <div className="prose max-w-none">
              <p>
                At Rudzz Auto Repair Marketplace, we take your privacy seriously. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2>1. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways, including:</p>

              <h3>Personal Data</h3>
              <p>
                When you register for an account, book a service, or contact us, we may collect personally identifiable
                information, such as:
              </p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address</li>
                <li>Payment information</li>
                <li>Vehicle information</li>
              </ul>

              <h3>Usage Data</h3>
              <p>We may also collect information about how you access and use our website and services, including:</p>
              <ul>
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Pages visited</li>
                <li>Time and date of your visit</li>
                <li>Time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We may use the information we collect about you for various purposes, including to:</p>
              <ul>
                <li>Create and manage your account</li>
                <li>Process transactions and send related information</li>
                <li>Connect you with service providers</li>
                <li>Provide and maintain our services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you promotional communications</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Improve our website and services</li>
                <li>Protect against unauthorized access and legal liability</li>
              </ul>

              <h2>3. Disclosure of Your Information</h2>
              <p>We may share your information with third parties in certain situations, including:</p>
              <ul>
                <li>With service providers when you book their services</li>
                <li>With third-party service providers who perform services on our behalf</li>
                <li>To comply with legal obligations</li>
                <li>To protect and defend our rights and property</li>
                <li>With your consent or at your direction</li>
              </ul>

              <h2>4. Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>The right to access personal information we hold about you</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to object to processing of your information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section
                below.
              </p>

              <h2>5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal
                information. However, please be aware that no method of transmission over the internet or electronic
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2>6. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and store certain
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
              <p>
                For more information about our use of cookies, please see our{" "}
                <Link href="/cookies" className="text-rudzz-blue hover:underline">
                  Cookie Policy
                </Link>
                .
              </p>

              <h2>7. Third-Party Websites</h2>
              <p>
                Our website may contain links to third-party websites. We have no control over and assume no
                responsibility for the content, privacy policies, or practices of any third-party websites or services.
              </p>

              <h2>8. Children's Privacy</h2>
              <p>
                Our services are not intended for use by children under the age of 13. We do not knowingly collect
                personally identifiable information from children under 13. If you are a parent or guardian and you are
                aware that your child has provided us with personal information, please contact us.
              </p>

              <h2>9. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
              </p>

              <h2>10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@rudzz.com" className="text-rudzz-blue hover:underline">
                  privacy@rudzz.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

