import { NextRequest, NextResponse } from "next/server";
export async function PUT (request: NextRequest){
  try {
    const body = await request.formData();
    const url =  body.get('url')!.toString();
    const file = body.get('file');
    const formData = new FormData();
    formData.append('file', file!);
    const res = await fetch(url!,{method:'PUT',headers:{'Content-Type': 'multipart/form-data'},body:formData}).then(()=>{console.log('success')}).catch(()=>{console.log('error')})
    return  NextResponse.json(200);
  } catch (error) {
    console.log(error,"error")
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}