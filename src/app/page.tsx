import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export default async function Home() {
  const filePath = path.join(process.cwd(), 'docs', 'ofertas_promissoras_cnh.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const htmlContent = await marked.parse(fileContent);

  return (
    <main className="min-h-screen bg-[oklch(0.98_0.003_80)] text-[oklch(0.15_0.01_250)] p-8 sm:p-12">
      <div 
        className="mx-auto max-w-3xl prose prose-slate 
          [&>h1]:text-4xl [&>h1]:font-extrabold [&>h1]:mb-6 [&>h1]:text-black
          [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:border-b [&>h2]:pb-2
          [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-3
          [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-4
          [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2
          [&>a]:text-blue-600 [&>a]:underline [&>a]:font-medium
          [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:bg-blue-50 [&>blockquote]:p-4 [&>blockquote]:rounded-r-lg [&>blockquote]:my-6
          [&>hr]:my-8 [&>hr]:border-[oklch(0.9_0.008_250)]
          [&_strong]:font-bold [&_strong]:text-black
          [&_code]:bg-[oklch(0.92_0.01_250)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-sm [&_code]:font-mono"
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
    </main>
  );
}
