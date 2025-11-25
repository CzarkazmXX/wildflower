import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function onRequestPost(context) {
    try {
        const body = await context.request.json()
        const { name, email, message } = body

        // Validate input
        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: 'All fields are required' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        }

        // Save to Supabase
        const supabaseUrl = context.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey = context.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
            method: 'POST',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                name,
                email,
                message,
                created_at: new Date().toISOString()
            })
        })

        if (!supabaseResponse.ok) {
            const error = await supabaseResponse.text()
            console.error('Supabase error:', error)
            return new Response(
                JSON.stringify({ error: 'Failed to save submission' }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                }
            )
        }

        // Send email via Resend
        try {
            await resend.emails.send({
                from: 'Contact Form <onboarding@resend.dev>',
                to: context.env.CONTACT_EMAIL,
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

        return new Response(
            JSON.stringify({ success: true, message: 'Form submitted successfully!' }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    } catch (error) {
        console.error('Contact form error:', error)
        return new Response(
            JSON.stringify({ error: 'An unexpected error occurred' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        )
    }
}
