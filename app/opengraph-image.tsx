import { ImageResponse } from 'next/og';
import { SITE_DESCRIPTION } from '@/lib/site';

export const alt = 'Joydeep Sarkar, Fintech Product Leader';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#faf6ee',
          color: '#1a1a1a',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: 'uppercase', color: '#8a6d1f' }}>
          Fintech Product Leader
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, marginTop: 24, lineHeight: 1.05 }}>Joydeep Sarkar</div>
        <div style={{ fontSize: 34, marginTop: 32, color: '#444', maxWidth: 900, lineHeight: 1.35 }}>
          {SITE_DESCRIPTION}
        </div>
        <div style={{ fontSize: 26, marginTop: 48, color: '#8a6d1f' }}>joydeepsarkar.me</div>
      </div>
    ),
    size
  );
}
