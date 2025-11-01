import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
  try {
    await resend.emails.send({
      from: "Crazy Bot <onboarding@resend.dev>", // sender name
      to: "muzammill78646@gmail.com",                 // your email
      subject: "Srija has said YES 💫",
      html: `
        <div style="font-family: sans-serif; text-align: center;">
          <h2>🌹 Srija has said YES!</h2>
          <p>The date is confirmed under the stars ✨</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
