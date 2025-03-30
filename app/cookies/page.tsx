import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl px-4 md:px-6">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Cookie Policy</h1>
              <p className="mt-2 text-gray-500">Last updated: March 28, 2023</p>
            </div>

            <div className="prose max-w-none">
              <p>
                This Cookie Policy explains how Rudzz Auto Repair Marketplace ("we", "us", or "our") uses cookies and
                similar technologies on our website and services. This policy is part of our Privacy Policy and explains
                what cookies are, how we use them, and your choices regarding cookies.
              </p>

              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit
                a website. They are widely used to make websites work more efficiently, provide a better user
                experience, and give website owners information about how their site is being used.
              </p>

              <h2>2. Types of Cookies We Use</h2>
              <p>We use the following types of cookies on our website:</p>

              <h3>Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable basic functions like page
                navigation, secure areas access, and service requests. The website cannot function properly without
                these cookies.
              </p>

              <h3>Preference Cookies</h3>
              <p>
                These cookies allow the website to remember choices you make (such as your preferred language or the
                region you are in) and provide enhanced, more personal features.
              </p>

              <h3>Analytics Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our website by collecting and reporting
                information anonymously. They help us improve the way our website works.
              </p>

              <h3>Marketing Cookies</h3>
              <p>
                These cookies are used to track visitors across websites. The intention is to display ads that are
                relevant and engaging for the individual user.
              </p>

              <h2>3. Specific Cookies We Use</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Cookie Name</th>
                    <th className="border border-gray-300 p-2 text-left">Type</th>
                    <th className="border border-gray-300 p-2 text-left">Purpose</th>
                    <th className="border border-gray-300 p-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">_rudzz_session</td>
                    <td className="border border-gray-300 p-2">Essential</td>
                    <td className="border border-gray-300 p-2">Maintains user session state</td>
                    <td className="border border-gray-300 p-2">Session</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">_rudzz_auth</td>
                    <td className="border border-gray-300 p-2">Essential</td>
                    <td className="border border-gray-300 p-2">Authentication token</td>
                    <td className="border border-gray-300 p-2">30 days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">_rudzz_preferences</td>
                    <td className="border border-gray-300 p-2">Preference</td>
                    <td className="border border-gray-300 p-2">Stores user preferences</td>
                    <td className="border border-gray-300 p-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">_ga</td>
                    <td className="border border-gray-300 p-2">Analytics</td>
                    <td className="border border-gray-300 p-2">Google Analytics - Distinguishes users</td>
                    <td className="border border-gray-300 p-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">_gid</td>
                    <td className="border border-gray-300 p-2">Analytics</td>
                    <td className="border border-gray-300 p-2">Google Analytics - Distinguishes users</td>
                    <td className="border border-gray-300 p-2">24 hours</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">_fbp</td>
                    <td className="border border-gray-300 p-2">Marketing</td>
                    <td className="border border-gray-300 p-2">Facebook Pixel - Tracks conversions</td>
                    <td className="border border-gray-300 p-2">3 months</td>
                  </tr>
                </tbody>
              </table>

              <h2>4. Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics,
                deliver advertisements, and so on. These cookies may be placed by:
              </p>
              <ul>
                <li>Google Analytics</li>
                <li>Facebook</li>
                <li>Stripe (for payment processing)</li>
                <li>Other analytics and advertising partners</li>
              </ul>

              <h2>5. Managing Cookies</h2>
              <p>
                Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse
                cookies, or to alert you when cookies are being sent. The methods for doing so vary from browser to
                browser, and from version to version.
              </p>
              <p>
                You can generally find how to manage cookies in your browser in the "Help", "Tools" or "Edit" menu. Here
                are links to instructions for some common browsers:
              </p>
              <ul>
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rudzz-blue hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rudzz-blue hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rudzz-blue hover:underline"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rudzz-blue hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
              <p>
                Please note that if you choose to refuse cookies, you may not be able to use the full functionality of
                our website.
              </p>

              <h2>6. Cookie Consent</h2>
              <p>
                When you first visit our website, you will be shown a cookie banner that allows you to accept or decline
                non-essential cookies. You can change your preferences at any time by clicking on the "Cookie Settings"
                link in the footer of our website.
              </p>

              <h2>7. Changes to This Cookie Policy</h2>
              <p>
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
                Cookie Policy on this page and updating the "Last updated" date at the top of this policy.
              </p>

              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us at{" "}
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

