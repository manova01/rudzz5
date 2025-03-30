import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl px-4 md:px-6">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
              <p className="mt-2 text-gray-500">Last updated: March 28, 2023</p>
            </div>

            <div className="prose max-w-none">
              <p>
                Welcome to Rudzz Auto Repair Marketplace. These Terms of Service ("Terms") govern your use of our
                website, services, and applications (collectively, the "Services"). By accessing or using our Services,
                you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our
                Services.
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Services, you acknowledge that you have read, understood, and agree to be
                bound by these Terms. If you are using the Services on behalf of a company or other legal entity, you
                represent that you have the authority to bind such entity to these Terms.
              </p>

              <h2>2. Description of Services</h2>
              <p>
                Rudzz is an online marketplace that connects car owners with auto repair service providers. We provide a
                platform for users to search for, compare, and book auto repair services. Rudzz does not provide auto
                repair services directly.
              </p>

              <h2>3. User Accounts</h2>
              <p>
                To access certain features of our Services, you may need to create an account. You are responsible for
                maintaining the confidentiality of your account credentials and for all activities that occur under your
                account. You agree to provide accurate and complete information when creating your account and to update
                your information as necessary to keep it accurate and complete.
              </p>

              <h2>4. User Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Services in any way that violates any applicable law or regulation</li>
                <li>
                  Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or
                  entity
                </li>
                <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
                <li>Collect or store personal data about other users without their consent</li>
                <li>Use the Services to send unsolicited communications</li>
                <li>Use the Services for any harmful, fraudulent, or illegal purpose</li>
              </ul>

              <h2>5. Service Providers</h2>
              <p>
                Service providers listed on our platform are independent contractors and not employees or agents of
                Rudzz. Rudzz does not guarantee the quality, safety, or legality of services provided by service
                providers. Users are solely responsible for their interactions with service providers.
              </p>

              <h2>6. Payments and Fees</h2>
              <p>
                Rudzz may charge fees for certain aspects of our Services. All fees are non-refundable unless otherwise
                specified. Service providers may set their own prices for services offered through our platform. Rudzz
                collects payments from users on behalf of service providers and remits payment to service providers
                after deducting applicable fees.
              </p>

              <h2>7. Cancellation Policy</h2>
              <p>
                Cancellation policies may vary by service provider. Users should review the cancellation policy for each
                service before booking. Rudzz reserves the right to charge cancellation fees in accordance with the
                applicable cancellation policy.
              </p>

              <h2>8. Intellectual Property</h2>
              <p>
                The Services and all content and materials included on the Services, including but not limited to text,
                graphics, logos, images, and software, are the property of Rudzz or its licensors and are protected by
                copyright, trademark, and other intellectual property laws.
              </p>

              <h2>9. Privacy</h2>
              <p>
                Your use of our Services is also governed by our Privacy Policy, which is incorporated into these Terms
                by reference. Please review our{" "}
                <Link href="/privacy" className="text-rudzz-blue hover:underline">
                  Privacy Policy
                </Link>{" "}
                to understand our practices.
              </p>

              <h2>10. Disclaimer of Warranties</h2>
              <p>
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h2>11. Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL RUDZZ, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE
                SERVICES.
              </p>

              <h2>12. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Rudzz and its officers, directors, employees, and
                agents from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees
                (including reasonable attorneys' fees) arising from or relating to your use of the Services or your
                violation of these Terms.
              </p>

              <h2>13. Termination</h2>
              <p>
                Rudzz may terminate or suspend your access to the Services at any time, with or without cause, and with
                or without notice. Upon termination, your right to use the Services will immediately cease.
              </p>

              <h2>14. Changes to Terms</h2>
              <p>
                Rudzz reserves the right to modify these Terms at any time. We will provide notice of significant
                changes by posting the updated Terms on our website. Your continued use of the Services after such
                changes constitutes your acceptance of the new Terms.
              </p>

              <h2>15. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California,
                without regard to its conflict of law provisions.
              </p>

              <h2>16. Dispute Resolution</h2>
              <p>
                Any dispute arising out of or relating to these Terms or the Services shall be resolved through binding
                arbitration in accordance with the rules of the American Arbitration Association.
              </p>

              <h2>17. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:legal@rudzz.com" className="text-rudzz-blue hover:underline">
                  legal@rudzz.com
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

