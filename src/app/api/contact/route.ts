import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, message } = body

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Save to Supabase
        const { data, error: dbError } = await supabase
            .from('contact_submissions')
            .insert([
                {
                    name,
                    email,
                    message,
                    created_at: new Date().toISOString()
                }
            ])
            .select()

        if (dbError) {
            console.error('Supabase error:', dbError)
            return NextResponse.json(
                { error: 'Failed to save submission' },
                { status: 500 }
            )
        }

        // Send email via Resend
        try {
            await resend.emails.send({
                from: 'Contact Form <onboarding@resend.dev>',
                to: process.env.CONTACT_EMAIL!,
                subject: `New Contact Form Submission from ${name}`,
                html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
            })
        } catch (emailError) {
            console.error('Email error:', emailError)
            // Don't fail the request if email fails, data is already saved
        }

        return NextResponse.json(
            { success: true, message: 'Form submitted successfully!' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        )
    }
}
