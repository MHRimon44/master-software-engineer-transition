import { ImageResponse } from 'next/og';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#102b4a',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: 64,
        fontWeight: 700,
      }}
    >
      <div>DevFlow</div>
      <div style={{ fontSize: 34, fontWeight: 400 }}>Performance + SEO Lab</div>
    </div>,
    size,
  );
}
