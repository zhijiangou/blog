import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const dataDir = path.join(process.cwd(), 'data');

    await fs.writeFile(
      path.join(dataDir, 'albums.json'),
      JSON.stringify(data.albums, null, 2)
    );

    await fs.writeFile(
      path.join(dataDir, 'posts.json'),
      JSON.stringify(data.posts, null, 2)
    );

    await fs.writeFile(
      path.join(dataDir, 'music.json'),
      JSON.stringify(data.music, null, 2)
    );

    await fs.writeFile(
      path.join(dataDir, 'social-links.json'),
      JSON.stringify(data.socialLinks, null, 2)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}
