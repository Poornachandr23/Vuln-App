import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, Server, Database, Code, CreditCard, ShieldAlert, Network, UserCog, Users, ExternalLink, Workflow, FileCode, MousePointerClick, Cookie } from 'lucide-react';

// Structure vulnerabilities by category
const vulnerabilityCategories = [
  {
    category: "Authentication & Session Issues",
    icon: <UserCog className="h-5 w-5 mr-2" />,
    vulnerabilities: [
      { name: "Broken Authentication", description: "Weak or missing controls on login, potentially allowing easy guessing or bypass.", tags: ["Login", "Password"] },
      { name: "Session Fixation", description: "Ability to set or reuse another user's session ID.", tags: ["Session", "Cookie"] },
      { name: "Session Hijacking", description: "Stealing session tokens via other flaws like XSS or insecure transport.", tags: ["Session", "XSS", "MITM"] },
      { name: "Brute Force Attacks", description: "Lack of rate limiting on login or token validation, allowing repeated guesses.", tags: ["Login", "Rate Limit"] },
      { name: "Insecure Password Reset", description: "Exploitable reset links (predictable tokens, HTTP transport, insufficient validation).", tags: ["Password Reset", "Token"] },
    ]
  },
  {
    category: "Access Control & Authorization",
    icon: <Users className="h-5 w-5 mr-2" />,
    vulnerabilities: [
      { name: "Insecure Direct Object Reference (IDOR)", description: "Accessing unauthorized resources (e.g., other users' orders/profiles) via predictable IDs in URLs/requests.", tags: ["IDOR", "URL", "API"] },
      { name: "Broken Access Control (BAC)", description: "Users accessing functions or data they shouldn't have access to.", tags: ["Authorization", "Permissions"] },
      { name: "Vertical Privilege Escalation", description: "A normal user gaining access to administrative functions.", tags: ["Admin", "Privilege"] },
      { name: "Horizontal Privilege Escalation", description: "A user gaining access to another user's data or session.", tags: ["User Data", "Session"] },
    ]
  },
  {
    category: "Business Logic Vulnerabilities",
    icon: <Workflow className="h-5 w-5 mr-2" />,
    vulnerabilities: [
      { name: "Payment Tampering", description: "Modifying payment values (price, quantity, total) in client-side requests before checkout.", tags: ["Checkout", "Price", "Quantity"] },
      { name: "Coupon Abuse", description: "Reusing single-use coupons, applying multiple discounts, or using invalid/predictable codes.", tags: ["Coupon", "Discount", "Checkout"] },
      { name: "Race Conditions", description: "Exploiting timing issues between concurrent requests (e.g., applying a coupon twice, double withdrawal).", tags: ["Concurrency", "Checkout", "API"] },
      { name: "Inventory Manipulation", description: "Attempting to purchase items shown as out of stock or manipulating inventory counts.", tags: ["Inventory", "Stock"] },
      { name: "Order Manipulation", description: "Changing order details (status, items, address) after submission.", tags: ["Order", "API"] },
      { name: "Logic Bypass", description: "Skipping required steps in a process, like skipping payment to access content.", tags: ["Workflow", "Payment"] },
    ]
  },
   {
    category: "Input Validation & Injection Flaws",
    icon: <Code className="h-5 w-5 mr-2" />,
    vulnerabilities: [
      { name: "SQL Injection (SQLi)", description: "Injecting malicious SQL commands through input fields (search, login, forms) to manipulate database queries.", tags: ["SQL", "Database", "Input"] },
      { name: "Command Injection", description: "Executing arbitrary operating system commands via vulnerable input fields (e.g., in tools that use shell commands).", tags: ["OS", "Shell", "Input"] },
      { name: "XML External Entity (XXE)", description: "Exploiting XML parsers by injecting external entity references to read local files or perform SSRF.", tags: ["XML", "Parser", "File Read", "SSRF"] },
      { name: "Cross-Site Scripting (XSS)", description: "Injecting malicious scripts into web pages viewed by other users (Reflected, Stored, DOM-based).", tags: ["XSS", "JavaScript", "HTML", "Input"] },
      { name: "Cross-Site Request Forgery (CSRF)", description: "Forcing an authenticated user's browser to send forged requests to perform unwanted actions (e.g., change password, submit order).", tags: ["CSRF", "Session", "Request"] },
    ]
  },
   {
    category: "Information Disclosure",
    icon: <FileCode className="h-5 w-5 mr-2" />,
    vulnerabilities: [
      { name: "Sensitive Data Exposure", description: "Leaking credentials, API keys, tokens, PII in source code, responses, logs, or error messages.", tags: ["Credentials", "API Key", "PII", "Leak"] },
      { name: "Error Leakages", description: "Revealing stack traces, database errors, or internal system details in error messages shown to users.", tags: ["Error", "Debug", "Stack Trace"] },
      { name: "Directory Listing Enabled", description: "Web server configured to show the contents of directories lacking an index file.", tags: ["Server Config", "File Listing"] },
      { name: "Misconfigured CORS", description: "Cross-Origin Resource Sharing policies allowing untrusted domains to make requests and read sensitive data.", tags: ["CORS", "API", "Browser Policy"] },
    ]
  },
   {
    category: "Client-Side & Browser-Based Flaws",
    icon: <MousePointerClick className="h-5 w-5 mr-2" />,
    vulnerabilities: [
      { name: "DOM-based XSS", description: "Manipulating the Document Object Model via JavaScript in the browser to execute malicious scripts.", tags: ["DOM XSS", "JavaScript", "Client-Side"] },
      { name: "Clickjacking", description: "Tricking users into clicking on hidden or disguised UI elements (e.g., buttons in an invisible iframe) to perform actions.", tags: ["UI Redressing", "iframe", "Click"] },
      { name: "Open Redirect", description: "Redirecting users to arbitrary external (potentially malicious) URLs via improperly validated redirect parameters.", tags: ["Redirect", "Phishing", "URL"] },
      { name: "JavaScript Injection", description: "Injecting and executing JavaScript code, often via insecure handling of JSONP, eval(), or other dynamic code execution methods.", tags: ["JavaScript", "JSONP", "eval"] },
    ]
  },
   {
    category: "Infrastructure/Transport Layer",
    icon: <Network className="h-5 w-5 mr-2" />,
    vulnerabilities: [
      { name: "Insecure Cookies", description: "Cookies lacking security flags like HttpOnly (prevents JS access), Secure (HTTPS only), or SameSite (prevents CSRF).", tags: ["Cookie", "Session", "HTTPS", "CSRF"] },
      { name: "Unvalidated Redirects & Forwards", description: "Redirecting or forwarding requests server-side without validating the target URL/path, potentially leading to SSRF or access control bypass.", tags: ["Redirect", "SSRF", "Server-Side"] },
      // Add more infrastructure issues like missing security headers, TLS issues if applicable
    ]
  }
];

export default function VulnerabilitiesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Implemented Vulnerabilities</h1>
      <p className="text-muted-foreground mb-8">
        This page lists the types of vulnerabilities intentionally included in VulnStore. Explore the application to find where they exist!
        Look for <ShieldAlert className="inline-block h-4 w-4 text-destructive" /> icons and hints throughout the site.
      </p>

      <div className="space-y-8">
        {vulnerabilityCategories.map((category) => (
          <Card key={category.category}>
            <CardHeader className="flex flex-row items-center">
              {category.icon}
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {category.vulnerabilities.map((vuln) => (
                  <li key={vuln.name} className="border-l-4 border-destructive pl-4 py-2 bg-card rounded-r-md">
                    <h3 className="font-semibold">{vuln.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{vuln.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {vuln.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

        <div className="mt-12 p-4 border border-primary rounded-md bg-primary/5 text-center">
            <h2 className="text-xl font-semibold text-primary mb-2">Disclaimer</h2>
            <p className="text-sm text-primary/80">
                This application is a learning tool. The vulnerabilities are simulated or hinted at within the frontend structure.
                A full implementation would require a backend (like PHP and a database) where these flaws would be coded insecurely.
                Use this as a guide to understand where and how these vulnerabilities typically manifest in a real web application.
            </p>
        </div>
    </div>
  );
}
