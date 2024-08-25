import { NextRequest, NextResponse } from "next/server";

export async function PUT (request: NextRequest){
  try {
    const body = await request.formData();
    console.log(body,"body")
    const url =  body.get('url')!.toString();
    const file = body.get('file');
    const formData = new FormData();
    formData.append('file', file!);
    const res = await fetch(url!,{method:'PUT',headers:{'Content-Type': 'multipart/form-data'},body:formData}).then(()=>{console.log('success')}).catch(()=>{console.log('error')})
    // console.log(await res)
    return  NextResponse.json(200);
    //   const rawBody = await request.text();
  //   const data = JSON.parse(rawBody).data.attributes;
  //   const signature = request.headers.get("persona-signature") as string;
  //   const reqBody = {
  //     signature,
  //     userId: Number(data.payload.data.attributes['reference-id']),
  //     event: data.name,
  //     rawBody: rawBody,
  //   };
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     api_key: process.env.FRONTEND_API_KEY,
  //   };
  //   const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/services/persona`, reqBody, { headers });
  //   const resData = response.data;
  //   if (resData?.data && resData?.data?.statusCode >= 400) {
  //     throw new Error(resData.data.message);
  //   }
  //   return NextResponse.json({}, {
  //     status: 200,
  //   });
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