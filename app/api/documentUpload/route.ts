import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.formData();
    const url = body.get('url')!.toString();
    const file = body.get('file');
    const formData = new FormData();
    formData.append('file', file!);
    await axios.put(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return NextResponse.json({ status: 'SUCCESS', message: 'File uploaded successfully' });

  } catch (error) {
    console.error('Error', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to upload file' },
      { status: 500 }
    );
  }
}