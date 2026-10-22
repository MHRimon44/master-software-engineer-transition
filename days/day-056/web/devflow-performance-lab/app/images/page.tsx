import Image from 'next/image';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Image optimization',
  description: 'Learn image sizing and layout stability.',
  alternates: { canonical: '/images' },
};
export default function Images() {
  return (
    <>
      <span className="pill">Image Lab</span>
      <h1>Reserve space and ship efficient images</h1>
      <p className="muted">
        A local SVG avoids external-network dependencies; use an actual large JPG/PNG/AVIF to
        compare transferred bytes and image optimization.
      </p>
      <div className="hero">
        <Image
          src="/dashboard-illustration.svg"
          alt="Stylized analytics dashboard illustration"
          width={1200}
          height={560}
          sizes="(max-width: 1000px) 100vw, 1000px"
          priority
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="grid box">
        <article className="card">
          <h3>CLS prevention</h3>
          <p>Width and height provide an intrinsic aspect ratio before image load.</p>
        </article>
        <article className="card">
          <h3>LCP candidate</h3>
          <p>
            For a genuinely above-the-fold hero, prioritize loading. Do not prioritize every image.
          </p>
        </article>
      </div>
    </>
  );
}
