import type { AnalyzedUrl } from "@/lib/validations/results";

const titles = [
  "Homepage",
  "About Us",
  "Contact",
  "Products",
  "Services",
  "Blog Post 1",
  "Blog Post 2",
  "Pricing",
  "FAQ",
  "Privacy Policy",
];
const htmlVersions = ["HTML5", "HTML 4.01", "XHTML 1.0"];
const domains = ["example.com", "anothersite.org", "myservice.net", "dev.io"];

const brokenLinksExamples = [
  'https://example.com/missing-page',
  'https://example.com/old-link',
  'https://example.com/expired-offer',
  'https://example.com/deleted-resource',
  'https://example.com/404-page'
];

export function generateDummyResults(count: number = 15): AnalyzedUrl[] {
  const results: AnalyzedUrl[] = [];
  
  // First 10 items (page 1)
  for (let i = 0; i < Math.min(count, 10); i++) {
    const id = `url-${i + 1}`;
    const title = titles[i % titles.length];
    const domain = domains[i % domains.length];
    const url = `https://${domain}/${title.toLowerCase().replace(/\s/g, "-")}`;
    const htmlVersion = htmlVersions[i % htmlVersions.length];
    const internalLinks = 10 + Math.floor(Math.random() * 40);
    const externalLinks = 5 + Math.floor(Math.random() * 15);
    const hasBrokenLinks = i % 3 === 0; // 1/3 chance of broken links
    const brokenLinks = hasBrokenLinks ? 1 + Math.floor(Math.random() * 3) : 0;
    const brokenLinksList = hasBrokenLinks 
      ? Array.from({ length: brokenLinks }, (_, idx) => 
          brokenLinksExamples[idx % brokenLinksExamples.length])
      : [];
    const hasLoginForm = i % 4 === 0; // 25% chance of having a login form
    const statusCode = hasBrokenLinks ? 404 : 200;

    results.push({
      id,
      title,
      url,
      htmlVersion,
      internalLinks,
      externalLinks,
      brokenLinks,
      brokenLinksList,
      hasLoginForm,
      statusCode,
    });
  }

  // Next 5 items (page 2) if count > 10
  for (let i = 10; i < count; i++) {
    const id = `url-${i + 1}`;
    const title = `Page ${i + 1} - ${titles[(i + 3) % titles.length]}`;
    const domain = domains[(i + 1) % domains.length];
    const url = `https://${domain}/page-${i + 1}`;
    const htmlVersion = htmlVersions[(i + 1) % htmlVersions.length];
    const internalLinks = 15 + Math.floor(Math.random() * 35);
    const externalLinks = 3 + Math.floor(Math.random() * 12);
    const hasBrokenLinks = i % 4 === 0; // 25% chance of broken links
    const brokenLinks = hasBrokenLinks ? 1 + Math.floor(Math.random() * 2) : 0;
    const brokenLinksList = hasBrokenLinks 
      ? Array.from({ length: brokenLinks }, (_, idx) => 
          brokenLinksExamples[(idx + 1) % brokenLinksExamples.length])
      : [];
    const hasLoginForm = i % 5 === 0; // 20% chance of having a login form
    const statusCode = hasBrokenLinks ? 404 : 200;

    results.push({
      id,
      title,
      url,
      htmlVersion,
      internalLinks,
      externalLinks,
      brokenLinks,
      brokenLinksList,
      hasLoginForm,
      statusCode,
    });
  }

  return results;
}

// Generate 15 items by default
export const dummyResults = generateDummyResults(15);
